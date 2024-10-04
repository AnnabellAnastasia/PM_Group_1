import express from 'express';
import controller from '../controllers/userController';

const userRoutes = express.Router();

// GET /users - Get all users
userRoutes.get('/', controller.all);
// POST /users - Create new user
userRoutes.post('/', controller.create);
// Login
//userRoutes.get('/',controller.)
/**
 * Delete a user
 * Update a user
 */


export default userRoutes;