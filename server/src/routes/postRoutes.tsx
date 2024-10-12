import express from 'express';
import { userLoggedIn } from '../middleware/auth';
import controller from '../controllers/postController';

const postRoutes = express.Router();

// GET /posts - Get all posts
postRoutes.get('/', userLoggedIn, controller.all);
// GET /posts/:id - Get one post from ID param
postRoutes.get('/:id', userLoggedIn, controller.show);
// POST /posts - Create new post
postRoutes.post('/', userLoggedIn, controller.create);
// PUT /posts/:id - Update existing post
postRoutes.put('/:id', userLoggedIn, controller.update);
// DELETE /posts/:id - Delete existing post
postRoutes.delete('/:id', userLoggedIn, controller.delete);

export default postRoutes;