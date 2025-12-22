import express from 'express';
import cors from 'cors';

// Importar rotas
import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: "ok",
        service: "Dino API"
    })
})

// Rotas
app.use('/users', userRouter);
app.use('/auth', authRouter)

export default app;