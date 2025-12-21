import { getAllUsers } from "../../model/userModel.js";

export const getAllUserController = async (req, res) => {
    try {

        const users = await getAllUsers();

        if (users.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Nenhum usuário encontrado',
                data: [],
            })
        }

        return res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {
        // Erro inesperado
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
}