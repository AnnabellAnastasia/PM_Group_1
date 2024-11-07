import express from 'express';
import controller from '../controllers/repostController';
import { userLoggedIn } from '../middleware/auth';

const repostRoutes = express.Router({mergeParams: true});

repostRoutes.post('/',userLoggedIn,controller.create);