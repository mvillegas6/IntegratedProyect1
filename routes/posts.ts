import express from 'express';
import { Request, Response } from 'express';
import { postController } from '../controllers/posts';
const Router = express.Router();

import { storage } from '../cloudinary';
import multer from 'multer';
const upload = multer({ storage });

export const postRouter = Router.get('/', postController.show)
  .get('/new', postController.showNew)
  .get('/update/:id', postController.showUpdate)
  .get('/:id', postController.showMainPostPage)
  .post('/', upload.array('image'), postController.createPost)
  .delete('/:id', postController.deletePost)
  .put('/:id', upload.array('image'), postController.updatePost)
  .put('/like/:id', postController.likePost)
  .put('/dislike/:id', postController.disLikePost);
