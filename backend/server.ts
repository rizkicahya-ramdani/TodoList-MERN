import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));

// Rute API
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});