import express from 'express';
import controller from '../controllers/postController';

const postRoutes = express.Router();

// GET /posts - Get all posts
postRoutes.get('/', controller.all);
// GET /posts/:id - Get one post from ID param
postRoutes.get('/:id', controller.show);
// POST /posts - Create new post
postRoutes.post('/', controller.create);
// PUT /posts/:id - Update existing post
postRoutes.put('/:id', controller.update);
// DELETE /posts/:id - Delete existing post
postRoutes.delete('/:id', controller.delete);

export default postRoutes;