import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import cookieParser from 'cookie-parser';
import repostRoutes from './routes/postRoutes';
import multer from 'multer';

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
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ninerNetworking';
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

// Serve images
app.use('/images', express.static('images'))

// App routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments',commentRoutes);
app.use('/reposts',repostRoutes);
// Multer file too large error handling
app.use((err: any, req: any, res: any, next: any) => {
	if (err.code === 'LIMIT_FILE_SIZE') {
		err.status = 400;
		res.status(err.status).send({error: 'File Too Large'});
	}
	else next(err);
});

// Default Error Handling
app.use((err: any, req: any, res: any, next: any) => {
	console.error(err.stack);
	if (!err.status) {
		err.status = 500;
		err.message = ("Internal Server Error");
	}
	res.status(err.status).send(err);
})
