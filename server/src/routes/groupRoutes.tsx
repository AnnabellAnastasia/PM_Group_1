import express from 'express';
import controller from '../controllers/groupController';
import { userLoggedIn } from '../middleware/auth';
import { isMember } from '../middleware/groupAux';

const groupRoutes = express.Router();

//get all groups 
groupRoutes.get('/', controller.all);

// //get all groups that a member is a part of
// groupRoutes.post('/', userLoggedIn, controller.allWithMembership);

//get a single group page
groupRoutes.get('/:id', controller.show);

// //get membership for a group
// groupRoutes.get('/membership/:id', controller.membership);

//join a group
groupRoutes.post('/join', userLoggedIn, controller.join);

//leave a group 
groupRoutes.post('/leave', userLoggedIn, isMember, controller.leave);

//create a group
groupRoutes.post('/create', userLoggedIn, controller.new);

// //delete a group
// groupRoutes.delete('/:id', userLoggedIn, controller.delete);

// //edit a group
// groupRoutes.get('/edit/:id', userLoggedIn, controller.edit);

// //save edits 
// groupRoutes.put('/:id', userLoggedIn, controller.save);

//add middleware to see if the user is the creator/mod

export default groupRoutes;