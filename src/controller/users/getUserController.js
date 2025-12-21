import { getUser } from "../../model/userModel.js";

export const getUserController = async (req, res) => {
    try {
        const param = req.params.id;
        const identifier = isNaN(param) ? param : parseInt(param);

        const user = await getUser(identifier);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        // Captura erro do identificador inválido
        if (error.message === 'Identificador inválido') {
            return res.status(400).json({
                success: false,
                message: 'Identificador inválido',
            });
        }
        
        // Erro inesperado
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
        });
    }
}