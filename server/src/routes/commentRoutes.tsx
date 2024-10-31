import express from 'express';
import { userLoggedIn } from '../middleware/auth';
import controller from '../controllers/commentController';
import user from '../models/user';

const commentRoutes =express.Router();

// get all comments from a user
commentRoutes.get('/',userLoggedIn,controller.all);
// Create a comment
commentRoutes.post('/',userLoggedIn,controller.create);
//Select a specific comment
commentRoutes.post('/:id',userLoggedIn,controller.select);

export default commentRoutes;