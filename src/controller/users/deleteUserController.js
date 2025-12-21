import { deleteUser } from "../../model/userModel.js";

export const deleteUserController = async (req, res) => {
    try {
        const param = req.params.id;

        const identifier = isNaN(param) ? param : parseInt(param);

        await deleteUser(identifier);

        return res.status(200).json({
            success: true,
            message: 'Usuário deletado com sucesso',
        });
    } catch (error) {
        // Captura erro do identificador inválido
        if (error.message === 'Identificador inválido') {
            return res.status(400).json({
                success: false,
                message: 'Identificador inválido',
            });
        }

        // Registro não encontrado
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
        }

        // Erro inesperado
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
}