import express from 'express';
import controller from '../controllers/repostController';
import { userLoggedIn, isReposter } from '../middleware/auth';

const repostRoutes = express.Router({mergeParams: true});

// POST /posts/:id/reposts
repostRoutes.post('/', userLoggedIn, controller.create);
// DELETE /posts/:id/reposts/:repostID - Delete existing post
repostRoutes.delete('/:repostID', userLoggedIn, isReposter, controller.delete);

export default repostRoutes;