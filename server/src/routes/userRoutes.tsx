import express from 'express';
import { userLoggedIn } from '../middleware/auth';
import controller from '../controllers/userController';
import friendshipRoutes from '../routes/friendshipRoutes';

const userRoutes = express.Router();

// GET /users - Check authentication
userRoutes.get('/', userLoggedIn, controller.auth);
// POST /users - Create new user
userRoutes.post('/', controller.create);
// POST /users/login - Authenticate user login
userRoutes.post('/login', controller.authenticate)
// GET /users/logout - Log user out
userRoutes.get('/logout', userLoggedIn, controller.logout)
// GET /users/profile - Get info from logged in user
userRoutes.get('/profile', userLoggedIn, controller.profile);

// Friendship Routes
userRoutes.use("/:id/friendships", friendshipRoutes);

export default userRoutes;