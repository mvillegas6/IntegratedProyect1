import express from 'express';
import { groupController } from '../controllers/groups';
const Router = express.Router();

import { storage } from '../cloudinary';
import multer from 'multer';
const upload = multer({ storage });

export const groupRouter = Router.get('/new', groupController.createGroup)
  .post('/', groupController.newGroup)
  .get('/:id/post', groupController.newPost)
  .get('/:id', groupController.showGroup)
  .post('/:id/post', upload.array('image'), groupController.uploadPost)
  .put('/:id/addMember', groupController.addMember)
  .put('/:id/removeMember', groupController.removeMember)
  .delete('/:id', groupController.deleteGroup)
  .put('/:id/img', upload.array('image'), groupController.changeImg);
