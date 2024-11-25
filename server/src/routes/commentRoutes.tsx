import express from 'express';
import controller from '../controllers/commentController';
import { userLoggedIn, isCommenter } from '../middleware/auth';

const commentRoutes = express.Router({mergeParams: true});

// GET /posts/:id/comments - Get all comments on a post
commentRoutes.get('/', userLoggedIn, controller.all);
// POST /posts/:id/comments - Create new comment
commentRoutes.post('/', userLoggedIn, controller.create);
// PUT /posts/:id/comments/:commentID - Update existing comment
commentRoutes.put('/:commentID', userLoggedIn, isCommenter, controller.update);
// DELETE /posts/:id/comments/:commentID - Delete existing comment
commentRoutes.delete('/:commentID', userLoggedIn, isCommenter, controller.delete);

export default commentRoutes;