import express from 'express';
import { Request, Response } from 'express';
import { postController } from '../controllers/posts';
const Router = express.Router();

export const postRouter = Router.get('/', postController.show)
  .get('/new', postController.showNew)
  .get('/:title', postController.showBytitle)
  .post('/', postController.createPost);
