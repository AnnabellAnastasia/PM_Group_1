import express from 'express';
import controller from '../controllers/friendRequestController';
import { userLoggedIn } from '../middleware/auth';

const friendRequestRoutes = express.Router({mergeParams: true});

// GET /users/:id/friendRequests - Get all friend requests for a user as recipient
friendRequestRoutes.get('/', userLoggedIn, controller.all);
// POST /users/:id/friendRequests - Send (Create new) friend request
friendRequestRoutes.post('/', userLoggedIn, controller.create);
// GET /users/:id/friendRequests/:friendRequestID - Accept existing friend request and create friendship
friendRequestRoutes.post('/:friendRequestID', userLoggedIn, controller.accept);
// DELETE /users/:id/friendRequests/:friendRequestID - Delete existing friend request
friendRequestRoutes.delete('/:friendRequestID', userLoggedIn, controller.delete);

export default friendRequestRoutes;