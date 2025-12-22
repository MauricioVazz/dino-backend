import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // 1. Verificar se o token está presente no cabeçalho Authorization
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        // 2. Verificar se o token existe
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido',
            });
        }

        // 3. Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Anexar os dados do usuário decodificados ao objeto req
        req.user = decoded; // melhoria futura

        // 5. Chamar o próximo middleware ou rota
        next();
    } catch (error) {
        // Token inválido ou expirado
        return res.status(401).json({
            success: false,
            message: 'Token inválido ou expirado',
        });
    }    
}