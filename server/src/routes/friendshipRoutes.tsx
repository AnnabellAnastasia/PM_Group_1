import express from 'express';
import controller from '../controllers/friendshipController';
import { userLoggedIn } from '../middleware/auth';

const friendshipRoutes = express.Router({mergeParams: true});

// GET /users/:id/friendships - Get all friendships for a user
friendshipRoutes.get('/', userLoggedIn, controller.all);
// POST /users/:id/friendships - Create new friendship
friendshipRoutes.post('/', userLoggedIn, controller.create);
// DELETE /users/:id/friendships/:friendshipID - Delete existing friendship
friendshipRoutes.delete('/:friendshipID', userLoggedIn, controller.delete);

export default friendshipRoutes;