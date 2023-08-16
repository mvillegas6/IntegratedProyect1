import { Post } from '../models/post';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.q) {
      const keyword = `${req.query.q}`;
      const posts = (
        await Post.find({
          title: { $regex: '.*' + keyword + '.*' },
        })
      ).reverse();
      res.render('Posts/show', { posts, keyword });
    } else {
      const posts = (await Post.find({})).reverse();
      res.render('Posts/show', { posts, keyword: '' });
    }
  } catch (err) {
    next(err);
  }
};

const showBytitle = async (req: Request<{ title: string }>, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({
      title: /req.params.title/,
    });
    res.render('Posts/show', { posts });
  } catch (err) {
    next(err);
  }
};

const showNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({});
    res.render('Posts/new');
  } catch (err) {
    next(err);
  }
};

const createPost = async (
  req: Request<
    never,
    never,
    { title: string; author: string; body: string; votes: number; tags: string; image: string }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.votes = 0;
    const post = new Post(req.body);
    post.save();
    res.redirect('Posts');
  } catch (err) {
    next(err);
  }
};

export const postController = {
  show,
  showBytitle,
  showNew,
  createPost,
};
