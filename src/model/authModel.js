import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import * as z from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Zod schema para autenticação

const authSchema = z.object({
    email: z
        .string({ required_error: 'Email é obrigatório' })
        .email(),
    password: z
        .string({ required_error: 'Senha é obrigatória' })
        .min(6),
});

// Função de validação
export const loginUser = async (credentials) => {
    // 1. Validar dados de entrada
    const parsed = authSchema.safeParse(credentials);
    if (!parsed.success) {
        const err = new Error('Validation failed');
        err.details = parsed.error.flatten().fieldErrors;
        throw err;
    }

    const email = parsed.data.email.trim().toLowerCase();
    const password = parsed.data.password;

    // 2. Buscar usuário pelo email
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            publicId: true,
            email: true,
            password: true,
            createdAt: true,
    },
    });

    // 3. Usuario nao encontrado
    if (!user) {
        const err = new Error('Credenciais inválidas');
        err.code = 'INVALID_CREDENTIALS';
        throw err;
    }

    // 4. Verificar senha com bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        const err = new Error('Credenciais inválidas');
        err.code = 'INVALID_CREDENTIALS';
        throw err;
    }

    // 5. Retornar dados do usuário (sem a senha)
    return {
        publicId: user.publicId,
        email: user.email,
        createdAt: user.createdAt,
    };
}