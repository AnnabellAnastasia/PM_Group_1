import express from "express";
import { userLoggedIn } from "../middleware/auth";
import controller from "../controllers/messageController";

const messageRoutes = express.Router();

//GET /messages/:id - get all messages with a given user
messageRoutes.get("/:chatId", userLoggedIn, controller.details);

messageRoutes.post("/closeMessage", userLoggedIn, controller.close);

messageRoutes.get("/", userLoggedIn, controller.all);

messageRoutes.post("/new", userLoggedIn, controller.new);//new chat 

export default messageRoutes;