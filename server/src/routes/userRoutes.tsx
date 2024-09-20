import express from 'express';
import controller from '../controllers/userController';

const userRoutes = express.Router();

// GET /users - Get all users
userRoutes.get('/', controller.all);
// POST /users - Create new user
userRoutes.post('/', controller.create);

export default userRoutes;