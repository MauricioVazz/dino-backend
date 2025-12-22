import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import bcrypt from 'bcrypt';
import * as z from 'zod';

const prisma = new PrismaClient();

// Zod schema para User completo
const userSchema = z.object({
    id: z.number().int().positive().optional(),
    publicId: z.string().uuid().optional(),
    email: z.string({ required_error: 'Email é obrigatório' }).email(),
    password: z.string({ required_error: 'Senha é obrigatória' }).min(6),
    createdAt: z.date().optional(),
});

// Validação (partial para updates)
const validateUser = (user, partial = false) => {
    const schema = partial ? userSchema.partial() : userSchema;
    const result = schema.safeParse(user);
    if (result.success) return { success: true, data: result.data };
    return { success: false, errors: result.error.flatten().fieldErrors };
};

// Helper de where flexível
const isUUID = (value) =>
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const buildUserWhere = (identifier) => {
    if (typeof identifier === 'number' && Number.isInteger(identifier)) {
        return { id: identifier };
    }

    if (isUUID(identifier)) {
        return { publicId: identifier };
    }

    throw new Error('Identificador inválido');
};


// CRUD
export const createUser = async (userData) => {
    const parsed = userSchema.safeParse(userData);
    if (!parsed.success) {
        const err = new Error('Validation failed');
        err.details = parsed.error.flatten().fieldErrors;
        throw err;
    }

    const email = parsed.data.email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            publicId: true,
            email: true,
            createdAt: true,
        },
    });
};

export const getUser = async (identifier) => {
    return prisma.user.findUnique({
        where: buildUserWhere(identifier),
        select: {
            id: true,
            publicId: true,
            email: true,
            createdAt: true,
            favorites: true, // se quiser trazer favoritos
        },
    });
};

// Buscar usuário para endpoint /auth/me (sem retornar id)
export const getUserByPublicId = async (publicId) => {
    return prisma.user.findUnique({
        where: { publicId },
        select: {
            publicId: true,
            email: true,
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
            email: true,
            createdAt: true,
        },
    });
};

export const updateUser = async (identifier, user) => {
    const validated = validateUser(user, true);
    if (!validated.success) {
        const err = new Error('Validation failed');
        err.details = validated.errors;
        throw err;
    }

    // Dados validados
    const { email, password } = validated.data;

    // Senha com hash se fornecida
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Construir objeto data dinamicamente
    const data = {
        ...(email && { email: email.trim().toLowerCase() }),
        ...(hashedPassword && { password: hashedPassword }),
    };
    
    return prisma.user.update({
        where: buildUserWhere(identifier),
        data,
        select: {
            id: true,
            publicId: true,
            email: true,
            createdAt: true,
        },
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