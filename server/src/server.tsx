import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const uri: string =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/ninerNetworking';

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch(error) {
        console.error(error);
    }
})();

// import user routes
app.use('/users', userRoutes);

// import post routes
app.use('/posts', postRoutes);

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});