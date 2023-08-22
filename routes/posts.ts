import express from 'express';
import { Request, Response } from 'express';
import { postController } from '../controllers/posts';
const Router = express.Router();

export const postRouter = Router.get('/', postController.show)
    .get('/new', postController.showNew)
    .get('/update/:id', postController.showUpdate)
    .get('/:id', postController.showMainPostPage)
    .post('/', postController.createPost)
    .delete('/:id', postController.deletePost)
    .put('/:id', postController.updatePost);
