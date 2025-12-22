import { getUserByPublicId } from '../model/userModel.js';

export const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || !req.user.sub) {
            return res.status(401).json({
                success: false,
                message: 'Token ausente ou inválido',
            });
        }

        const publicId = req.user.sub;
        const user = await getUserByPublicId(publicId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Apenas administradores podem realizar esta ação',
            });
        }

        next();
    } catch (error) {
        console.error('Erro no middleware de admin:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
};
