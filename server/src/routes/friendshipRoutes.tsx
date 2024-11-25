import express from 'express';
import controller from '../controllers/likeController';
import { userLoggedIn } from '../middleware/auth';

const friendshipRoutes = express.Router({mergeParams: true});

// GET /posts/:id/friendships - Get all friendships for a user
friendshipRoutes.get('/', userLoggedIn, controller.all);
// POST /posts/:id/friendships - Create new friendship
friendshipRoutes.post('/', userLoggedIn, controller.create);
// DELETE /posts/:id/friendships/:friendshipID - Delete existing friendship
friendshipRoutes.delete('/:friendshipID', userLoggedIn, controller.delete);

export default friendshipRoutes;