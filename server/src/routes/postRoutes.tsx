import express from 'express';
import { userLoggedIn, isPostCreator } from '../middleware/auth';
import controller from '../controllers/postController';
import commentRoutes from './commentRoutes'
import likeRoutes from './likeRoutes'
import repostRoutes from '../routes/repostRoutes';
import { isMember } from '../middleware/groupAux';
const postRoutes = express.Router();

// GET /posts - Get all posts
postRoutes.get('/', userLoggedIn, controller.all);
// GET /posts/:id - Get one post from ID param
postRoutes.get('/:id', userLoggedIn, controller.show);
// POST /posts - Create new post
postRoutes.post('/', userLoggedIn, controller.create);
// PUT /posts/:id - Update existing post
postRoutes.put('/:id', userLoggedIn, isPostCreator, controller.update);
// DELETE /posts/:id - Delete existing post
postRoutes.delete('/:id', userLoggedIn, isPostCreator, controller.delete);

// Comment Routes
postRoutes.use("/:id/comments", commentRoutes);
// Like Routes
postRoutes.use("/:id/likes", likeRoutes);
/**Repost routes*/
postRoutes.use("/:id/reposts", repostRoutes);

//create post in a group
postRoutes.post('/group', userLoggedIn, isMember, controller.group);

export default postRoutes;