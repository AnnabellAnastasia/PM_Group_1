import express from 'express';
import { userLoggedIn } from '../middleware/auth';
import { upload } from '../middleware/fileUpload';
import controller from '../controllers/userController';
import friendshipRoutes from '../routes/friendshipRoutes';
import friendRequestRoutes from '../routes/friendRequestRoutes';
import User from '../models/user';

const userRoutes = express.Router();

// GET /users - Check authentication
userRoutes.get('/', userLoggedIn, controller.auth);


// POST /users - Create new user
userRoutes.post('/', controller.create);
// POST /users/login - Authenticate user login
userRoutes.post('/login', controller.authenticate)
// GET /users/logout - Log user out
userRoutes.get('/logout', userLoggedIn, controller.logout)
// GET /users/profile - Get info from logged in user
userRoutes.get('/profile', userLoggedIn, controller.profile);
// GET /search - look up a user
userRoutes.get('/search', controller.search)
// GET /users/:id - Get info from user id
userRoutes.get('/:id', controller.show);
// PUT /users/:id - Edit user from user id
userRoutes.put('/:id/', userLoggedIn ,controller.update);
// POST /users/:id/image - Upload image from user id
userRoutes.post('/:id/image', userLoggedIn, upload, controller.image);
// GET /users/:id/posts - Get all posts and reposts from user ID param
userRoutes.get('/:id/posts', controller.posts);
// GET /users/:id/suggestions - Fetch suggested connections
userRoutes.get('/:id/suggestions', controller.suggestions);

// Friendship Routes
userRoutes.use("/:id/friendships", friendshipRoutes);
// Friend Request
userRoutes.use("/:id/friendRequests", friendRequestRoutes);

//TEST - get all users in db
userRoutes.get('/everyUserTest', controller.everyUserTest);

export default userRoutes;