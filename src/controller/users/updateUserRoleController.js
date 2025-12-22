import { updateUser } from '../../model/userModel.js';

export const updateUserRoleController = async (req, res) => {
    try {
        const { role } = req.body;

        if (!role || !['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Role inválido. Use "user" ou "admin"',
            });
        }

        const user = await updateUser(req.params.id, { role });

        return res.status(200).json({
            success: true,
            message: 'Role atualizado com sucesso',
            data: user,
        });
    } catch (error) {
        if (error.message === 'Identificador inválido') {
            return res.status(400).json({
                success: false,
                message: 'Identificador inválido',
            });
        }

        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
        }

        console.error('Erro ao atualizar role:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
};
