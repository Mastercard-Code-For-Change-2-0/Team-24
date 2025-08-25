import {Router} from 'express';
import {login} from '../controllers/authcontroller.js';

export const studentauthRouter = Router();
studentauthRouter.post('/login', login);