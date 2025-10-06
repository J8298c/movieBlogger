import express from 'express';
import { userLogin, userSignup } from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/signup', userSignup)


authRouter.post('/login', userLogin)