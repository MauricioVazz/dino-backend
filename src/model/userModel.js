import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcrypt from 'bcrypt';
import * as z from 'zod';

const prisma = new PrismaClient();

// Helper para avatar
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
}

function generateAvatar(name) {
    const firstLetter = name[0].toUpperCase();
    const color = randomColor();
    return `https://ui-avatars.com/api/?name=${firstLetter}&background=${color}&color=fff&size=150`;
}

// Schemas
const createUserSchema = z.object({
    name: z.string({ required_error: 'Nome é obrigatório' }).min(2),
    email: z.string({ required_error: 'Email é obrigatório' }).email(),
    password: z.string({ required_error: 'Senha é obrigatória' }).min(6),
    role: z.enum(['user', 'admin']).optional(),
    avatarUrl: z.string().url().optional()
});

const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    avatarUrl: z.string().url().optional()
});

// Helper de where flexível
const buildUserWhere = (identifier) => {
    if (typeof identifier === 'string' && identifier.includes('-')) {
        return { publicId: identifier };
    }

    if (typeof identifier === 'number') {
        return { id: identifier };
    }

    throw new Error('Identificador inválido');
};



// CRUD
export const createUser = async (data) => {
    const parsed = createUserSchema.safeParse(data);
    if (!parsed.success) {
        const err = new Error('Erro de validação');
        err.details = parsed.error.flatten().fieldErrors;
        throw err;
    }

    const email = parsed.data.email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
    const role = parsed.data.role || 'user';
    const avatarUrl = parsed.data.avatarUrl || generateAvatar(parsed.data.name);

    return prisma.user.create({
        data: { name: parsed.data.name, email, password: hashedPassword, role, avatarUrl },
        select: { id: true, publicId: true, name: true, email: true, role: true, avatarUrl: true, createdAt: true }
    });
};

export const getUser = async (identifier) => {
    return prisma.user.findUnique({
        where: buildUserWhere(identifier),
        select: {
            id: true,
            publicId: true,
            name: true,
            email: true,
            role: true,
            avatarUrl: true,
            createdAt: true,
            favorites: {
            select: {
                publicId: true,
                dinoName: true,
                createdAt: true
            }
}
        },
    });
};

// Buscar usuário para endpoint /auth/me (sem retornar id)
export const getUserByPublicId = async (publicId) => {
    return prisma.user.findUnique({
        where: { publicId },
        select: {
            publicId: true,
            name: true,
            email: true,
            role: true,
            avatarUrl: true,
            createdAt: true,
            favorites: true,
        },
    });
};

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            publicId: true,
            name: true,
            email: true,
            role: true,
            avatarUrl: true,
            createdAt: true,
        },
    });
};

export const updateUser = async (identifier, data) => {
    const parsed = updateUserSchema.safeParse(data);
    if (!parsed.success) {
        const err = new Error('Erro de validação');
        err.details = parsed.error.flatten().fieldErrors;
        throw err;
    }

    const updateData = {
        ...(parsed.data.name && { name: parsed.data.name }),
        ...(parsed.data.email && { email: parsed.data.email.trim().toLowerCase() }),
        ...(parsed.data.password && { password: await bcrypt.hash(parsed.data.password, 10) }),
        ...(parsed.data.avatarUrl && { avatarUrl: parsed.data.avatarUrl }),
    };

    return prisma.user.update({
        where: buildUserWhere(identifier),
        data: updateData,
        select: { id: true, publicId: true, name: true, email: true, role: true, avatarUrl: true, createdAt: true }
    });
};

export const deleteUser = async (identifier) => {
    return prisma.user.delete({
        where: buildUserWhere(identifier),
        select: {
            id: true,
            publicId: true,
            email: true,
        },
    });
};