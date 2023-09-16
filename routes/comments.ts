import express from 'express';
import { Request, Response } from 'express';
import { commentController } from '../controllers/comments';
const Router = express.Router();

export const commentRouter = Router.get(
  '/new/:postId',
  commentController.showNew
)
  .post('/new/:postId', commentController.createComment)
  .delete('/:id', commentController.deleteComment);
