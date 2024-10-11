import express from 'express';
import { withAuth } from '../middleware/auth';
import controller from '../controllers/postController';

const postRoutes = express.Router();

// GET /posts - Get all posts
postRoutes.get('/', withAuth, controller.all);
// GET /posts/:id - Get one post from ID param
postRoutes.get('/:id', withAuth, controller.show);
// POST /posts - Create new post
postRoutes.post('/', withAuth, controller.create);
// PUT /posts/:id - Update existing post
postRoutes.put('/:id', withAuth, controller.update);
// DELETE /posts/:id - Delete existing post
postRoutes.delete('/:id', withAuth, controller.delete);

export default postRoutes;