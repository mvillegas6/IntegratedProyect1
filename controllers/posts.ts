import { Post } from '../models/post';
import { Request, Response, NextFunction } from 'express';
import { cloudinary } from '../cloudinary/index';
import mongoose from 'mongoose';
import { Faculties } from '../util/degrees';

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

const showMainPostPage = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('Posts/main', { post: post });
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

const deletePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    for (let img of post.image) {
      await cloudinary.uploader.destroy(img.filename);
    }
    res.redirect('/posts');
  } catch (error) {
    next(error);
  }
};

const showUpdate = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('Posts/update', { post: post, postId: req.params.id });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (
  req: Request<
    { id: string },
    never,
    {
      title: string;
      author: string;
      body: string;
      votes: number;
      tags: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPost = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const createPost = async (
  req: Request<
    never,
    never,
    {
      title: string;
      author: string;
      body: string;
      votes: number;
      degree: string;
      file: File;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    req.body.votes = 0;
    const post = new Post(req.body);
    post.image = files.map((f) => ({ path: f.path, filename: f.filename }));
    if (Faculties.ingeneers.includes(post.degree)) {
      post.faculty = 'Ingenierias';
    } else if (Faculties.administration.includes(post.degree)) {
      post.faculty = 'Administración';
    } else if (Faculties.law.includes(post.degree)) {
      post.faculty = 'Derecho';
    } else if (Faculties.artsAndHumanities.includes(post.degree)) {
      post.faculty = 'Artes y Humanidades';
    } else if (Faculties.economy.includes(post.degree)) {
      post.faculty = 'Economía';
    }
    await post.save();
    res.redirect('Posts');
  } catch (err) {
    next(err);
  }
};

export const postController = {
  show,
  showMainPostPage,
  showNew,
  createPost,
  deletePost,
  showUpdate,
  updatePost,
};
