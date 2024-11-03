import express from "express";
import cors from "cors";
import cakeRoutes from './routes/cakeRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/cakes', cakeRoutes);

export default app;