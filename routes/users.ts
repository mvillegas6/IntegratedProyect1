import express from 'express';
import { Request, Response } from 'express';
import { usersController } from '../controllers/users';
import passport from 'passport';
import { error } from 'console';
const Router = express.Router();

import { storage } from '../cloudinary';
import multer from 'multer';
const upload = multer({ storage });

export const userRouter = Router.get('/register', usersController.renderRegister)
  .get('/login', usersController.renderLogin)
  .get('/logout', usersController.logOutUser)
  .post(
    '/login',
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' , failureMessage:true}),
    usersController.loginUser
  )
  .post('/register', usersController.postUser)
  .get('/personal/:id', usersController.renderPersonalPanel)
  .get('/personal/:id/edit', usersController.renderUpadtePanel)
  .put('/personal/:id', upload.array('image'), usersController.updateUserPanel);
