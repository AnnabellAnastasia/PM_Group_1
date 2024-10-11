import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const uri: string =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/ninerNetworking';
const PORT: string | number = process.env.PORT || 8080;

(async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
				app.listen(PORT, () => {
					console.log(`Server is running on PORT: ${PORT}`);
			});
    } catch(error) {
        console.error(error);
    }
})();

// App routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Default Error Handling
app.use((err: any, req: any, res: any, next: any) => {
	console.log(err.stack);
	if (!err.status) {
		err.status = 500;
		err.message = ("Internal Server Error");
	}
	res.send(err).status(err.status);
})
