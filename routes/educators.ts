import express from 'express';
import { educatorController } from '../controllers/educators';
const Router = express.Router();

export const educatorRouter = Router.get('/', educatorController.show).get(
  '/:id',
  educatorController.renderEducatorPanel
);
