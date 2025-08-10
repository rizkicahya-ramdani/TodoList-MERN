import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected...');
        console.log(`Server running on port ${PORT}`);
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.log('Please make sure MongoDB is running on localhost:27017');
        console.log('Or update MONGO_URI in .env file to point to your MongoDB instance');
        console.log('Server will start but database operations will fail');
    });

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 