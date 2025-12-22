import { getUserByPublicId } from "../../model/userModel.js";

export const getMeController = async (req, res) => {
    try {
        const publicId = req.user.sub;

        const user = await getUserByPublicId(publicId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado",
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error('Erro ao buscar usuário autenticado:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
};