import { Post } from '../models/post';
import { Request, Response, NextFunction } from 'express';
import { cloudinary } from '../cloudinary/index';
import { Helpers } from '../util/helpers';
import { Comment } from '../models/comment';

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Helpers.filterByQuery(req, res);
  } catch (err) {
    next(err);
  }
};

const showMainPostPage = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author')
      .populate('votes');
    const isLiked = Helpers.checkUserLike(req, post);
    const comments = await Comment.find({
      postRelated: post,
    })
      .populate('postRelated')
      .populate('author');
    res.render('Posts/main', {
      post: post,
      isLiked: isLiked,
      comments: comments,
    });
  } catch (err) {
    next(err);
  }
};

const showNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('Posts/new');
  } catch (err) {
    next(err);
  }
};

const deletePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post.image) {
      for (let img of post.image) {
        await cloudinary.uploader.destroy(img.filename);
      }
    }
    const comments = await Comment.findOneAndDelete({
      postRelated: req.params.id
    })
    res.redirect('/posts');
  } catch (error) {
    next(error);
  }
};

const showUpdate = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
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
    newPost.image.push(
      ...files.map((f) => {
        const { path, filename, mimetype, originalname } = f;
        return {
          path,
          filename,
          mimetype,
          originalname: originalname.substring(0, originalname.indexOf('.')),
        };
      })
    );
    newPost.image.originalname = newPost.image.originalname;
    Helpers.findFaculty(newPost);
    await newPost.save();
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const likePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  let flag = false;
  try {
    const post = await Post.findById(req.params.id).populate('votes');
    if (req.user) {
      flag = Helpers.checkUserLike(req, post);
      if (!flag) {
        post.votes.push(req.user);
      }
    } else {
      req.flash('error', 'Debes ingresar para dar like');
      res.redirect('/login');
    }
    await post.save();
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const disLikePost = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  let flag = false;
  try {
    const post = await Post.findById(req.params.id).populate('votes');
    if (req.user) {
      flag = Helpers.removeUserLike(req, post);
    } else {
      req.flash('error', 'Debes ingresar para dar like');
      res.redirect('/login')
    }
    await post.save();
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
      degree: string;
      file: File;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
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
  likePost,
  disLikePost,
};
