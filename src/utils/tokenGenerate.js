import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        {
            sub: user.publicId,
            email: user.email, // temporario
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};