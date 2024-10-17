import express from "express";
import { userLoggedIn } from "../middleware/auth";
import controller from "../controllers/messageController";

const messageRoutes = express.Router();

//GET /messages/:id - get all messages with a given user
messageRoutes.get('/:id', userLoggedIn, controller.details);

//POST /messages - create new message
messageRoutes.post('/', userLoggedIn, controller.create);

messageRoutes.post('/closeMessage', userLoggedIn, controller.close);