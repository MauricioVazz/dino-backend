import { getUserByPublicId, getUser } from '../model/userModel.js';

export const ownerOrAdminMiddleware = async (req, res, next) => {
    try {
        if (!req.user?.sub) {
            return res.status(401).json({
                success: false,
                message: 'Token ausente ou inválido',
            });
        }

        // Usuário autenticado
        const requesterPublicId = req.user.sub;
        const requester = await getUserByPublicId(requesterPublicId);

        if (!requester) {
            return res.status(401).json({
                success: false,
                message: 'Usuário autenticado não encontrado',
            });
        }

        // Identificador vindo da rota (id OU publicId)
        const identifier = req.params.publicId || req.params.id;

        if (!identifier) {
            return res.status(400).json({
                success: false,
                message: 'Identificador do usuário alvo ausente',
            });
        }

        // Resolve o usuário alvo (id ou publicId)
        const targetUser = await getUser(identifier);

        if (!targetUser) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
        }

        // Regra de autorização
        const isOwner = targetUser.publicId === requester.publicId;
        const isAdmin = requester.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Apenas o dono ou administrador pode realizar esta ação',
            });
        }

        // Disponibiliza usuário resolvido
        req.targetUser = targetUser;

        next();
    } catch (error) {
        console.error('Erro no ownerOrAdminMiddleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
};
