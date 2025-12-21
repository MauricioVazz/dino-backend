import express from 'express';
import cors from 'cors';

// Importar rotas
import userRouter from './routers/userRouter.js';

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

export default app;