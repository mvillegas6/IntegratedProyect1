import express from 'express';
import { Request, Response } from 'express';
import { postController } from '../controllers/posts';
const Router = express.Router();

import { storage } from '../cloudinary';
import multer from 'multer';
const upload = multer({ storage });

export const postRouter = Router.get('/', postController.show)
  .get('/new', postController.showNew)
  .get('/:title', postController.showBytitle)
  .post('/', upload.array('image'), postController.createPost);
//borrar
// .post('/', upload.array('image'), (req: Request, res: Response) => {
//   console.log(req.body, req.files);
//   res.send('it worked');
// });
