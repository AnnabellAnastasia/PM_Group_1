import express from 'express';
import controller from '../controllers/likeController';
import { userLoggedIn } from '../middleware/auth';


const likeRoutes = express.Router({mergeParams: true});

// GET /posts/:id/likes - Get all likes on a post
likeRoutes.get('/', userLoggedIn, controller.all);
// POST /posts/:id/likes - Create new like
likeRoutes.post('/', userLoggedIn, controller.create);
// DELETE /posts/:id/likes/:likeID - Delete existing like
likeRoutes.delete('/:likeID', userLoggedIn, controller.delete);

export default likeRoutes;