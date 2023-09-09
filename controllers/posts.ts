import { Post } from '../models/post';
import { Request, Response, NextFunction, Express } from 'express';
import { cloudinary } from '../cloudinary/index';
import { Helpers } from '../util/helpers';

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Helpers.filterByQuery(req, res);
  } catch (err) {
    next(err);
  }
};

const showMainPostPage = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id).populate('author');
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
    const newPost = await Post.findById(req.params.id);
    newPost.title = req.body.title;
    newPost.body = req.body.body;
    newPost.degree = req.body.degree;
    newPost.image.push(...files.map((f) => {
      const { path, filename, mimetype, originalname } = f;
      return {
        path,
        filename,
        mimetype,
        originalname: originalname.substring(0, originalname.indexOf('.')),
      };
    }));
    newPost.image.originalname = newPost.image.originalname
    console.log(newPost.image.originalname)
    Helpers.findFaculty(newPost);
    await newPost.save();
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
      author: object;
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
    post.image = files.map((f) => {
      const { path, filename, mimetype, originalname } = f;
      return {
        path,
        filename,
        mimetype,
        originalname: originalname.substring(0, originalname.indexOf('.')),
      };
    });
    Helpers.findFaculty(post);
    post.author = req.user['_id'];
    await post.save();
    req.flash('success', 'Hola');
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
