import express from 'express';
import { Request, Response } from 'express';
import { usersController } from '../controllers/users';
import passport from 'passport';
import { error } from 'console';
const Router = express.Router();

export const userRouter = Router
    .get('/register', usersController.renderRegister)
    .get('/login', usersController.renderLogin)
    .get('/logout', usersController.logOutUser)
    .post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersController.loginUser)
    .post('/register', usersController.postUser)