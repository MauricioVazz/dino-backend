import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Helper para resolver publicId para userId (número)
const resolveUserId = async (userIdentifier) => {
    const user = await prisma.user.findUnique({
        where: typeof userIdentifier === 'string' && userIdentifier.includes('-') 
            ? { publicId: userIdentifier }
            : { id: userIdentifier },
        select: { id: true }
    });
    if (!user) {
        const err = new Error('Usuário não encontrado');
        err.code = 'P2025';
        throw err;
    }
    return user.id;
};

export const favoriteDinoModel = {

    async findByUserAndDino(userIdentifier, dinoName) {
        const userId = await resolveUserId(userIdentifier);
        return prisma.favoriteDino.findFirst({
            where: {
                userId,
                dinoName
            }
        });
    },

    async create(userIdentifier, dinoName) {
        const userId = await resolveUserId(userIdentifier);
        const exists = await prisma.favoriteDino.findFirst({
            where: { userId, dinoName }
        });

        if (exists) {
            const err = new Error('Dinossauro já favoritado');
            err.code = 'ALREADY_EXISTS';
            throw err;
        }

        return prisma.favoriteDino.create({
            data: {
                userId,
                dinoName
            },
            select: {
                publicId: true,
                dinoName: true,
                createdAt: true
            }
        });
    },

    async findByUser(userIdentifier) {
        const userId = await resolveUserId(userIdentifier);
        return prisma.favoriteDino.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                publicId: true,
                dinoName: true,
                createdAt: true
            }
        });
    },

    async remove(userIdentifier, dinoName) {
        const userId = await resolveUserId(userIdentifier);
        const favorite = await prisma.favoriteDino.findFirst({
            where: { userId, dinoName },
            select: { id: true }
        });

        if (!favorite) {
            const err = new Error('Favorito não encontrado');
            err.code = 'NOT_FOUND';
            throw err;
        }

        return prisma.favoriteDino.delete({
            where: { id: favorite.id },
            select: { id: true }
        });
    }
};
