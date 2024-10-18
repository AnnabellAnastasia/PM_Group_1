import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import messageRoutes from './routes/messageRoutes';
import cookieParser from 'cookie-parser';
import http from 'http';
import {Server} from 'socket.io';

dotenv.config();

const app: Express = express();

var server;
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
        await mongoose.connect("mongodb+srv://gcawley:0gn4UKWU5P0XQwP0@cluster0.sjdexg4.mongodb.net/ninerNetworking?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Connected to the database');
				server = app.listen(PORT, () => {
					console.log(`Server is running on PORT: ${PORT}`);
			});
    } catch(error) {
        console.error(error);
    }
})();

const io = new Server(server, {
    pingTimeout: 100000,
        cors: {
            origin: process.env.FRONTEND_URI,
            credentials: true,
        }
    }
    )
io.on("connection", (socket) => {
    console.log("user connected " , socket.id);
    socket.on("join", (data) => {
        socket.join(data);
    })
    socket.on("message", (data) => {
        console.log(data);
        //implement chat id
        socket.to(data.chatId).emit("receive message", data);
    });
});

// App routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

//api routes
app.use('/api/messages', messageRoutes);

// Default Error Handling
app.use((err: any, req: any, res: any, next: any) => {
	console.log(err.stack);
	if (!err.status) {
		err.status = 500;
		err.message = ("Internal Server Error");
	}
	res.send(err).status(err.status);
})
