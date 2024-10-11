import express from 'express';
import { withAuth } from '../middleware/auth';
import controller from '../controllers/userController';

const userRoutes = express.Router();

// GET /users - Check authentication
userRoutes.get('/', withAuth, controller.auth);
// POST /users - Create new user
userRoutes.post('/', controller.create);
<<<<<<< HEAD
// Login
//userRoutes.get('/',controller.)
/**
 * Delete a user
 * Update a user
 */

=======
// POST /users/login - Authenticate user login
userRoutes.post('/login', controller.authenticate)
// GET /users/logout - Log user out
userRoutes.get('/logout', controller.logout)
>>>>>>> main

export default userRoutes;