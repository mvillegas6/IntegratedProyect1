import express from 'express';
import { Request, Response } from 'express';
import { usersController } from '../controllers/users';
const Router = express.Router();

export const userRouter = Router
    .get('/register', usersController.renderRegister);