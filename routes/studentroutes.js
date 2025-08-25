import {Router} from 'express';
import {login, register} from '../controllers/authcontroller.js';

export const studentauthRouter = Router();
studentauthRouter.post('/login', login);
studentauthRouter.post('/register', register);