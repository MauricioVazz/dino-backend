import { updateUser } from '../../model/userModel.js';

export const uploadAvatarController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Nenhum arquivo foi enviado',
            });
        }

        const avatarUrl = req.file.secure_url;
        const user = await updateUser(req.params.id, { avatarUrl });

        return res.status(200).json({
            success: true,
            message: 'Avatar atualizado com sucesso',
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

        console.error('Erro ao fazer upload do avatar:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao fazer upload do avatar',
        });
    }
};
