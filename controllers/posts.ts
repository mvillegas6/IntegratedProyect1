import { Post } from '../models/post';
import { Request, Response, NextFunction } from 'express';
import { cloudinary } from '../cloudinary/index';
import { Helpers } from '../util/helpers';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Group } from '../models/groups';

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Helpers.filterByQuery(req, res);
  } catch (err) {
    next(err);
  }
};

const showMainPostPage = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id).populate('author').populate('votes');
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

const deletePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post.privacy === 'group') {
      const group = await Group.findOne({ posts: { $in: post } });
      for (let i = 0; i < group.posts.length; i++) {
        if (String(group.posts[i]._id) === String(post._id)) {
          group.posts.splice(i, 1);
          await group.save();
          break;
        }
      }
    }
    if (post.image) {
      for (let img of post.image) {
        await cloudinary.uploader.destroy(img.filename);
      }
    }
    const comments = await Comment.findOneAndDelete({
      postRelated: req.params.id,
    });
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

const likePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  let flag = false;
  try {
    const currUser = await User.findById(req.session['currentUser']['_id']).populate('likes');
    const post = await Post.findById(req.params.id).populate('votes');
    if (req.session['currentUser']) {
      flag = Helpers.checkUserLike(req, post);
      if (!flag) {
        post.votes.push(req.session['currentUser']);
        currUser.likes.push(post);
      }
    } else {
      req.flash('error', 'Debes ingresar para dar like');
      res.redirect('/login');
    }
    await post.save();
    await currUser.save();
    res.redirect(`/posts/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const disLikePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  let flag = false;
  try {
    const currUser = await User.findById(req.session['currentUser']['_id']).populate('likes');
    const post = await Post.findById(req.params.id).populate('votes');
    if (req.session['currentUser']) {
      flag = Helpers.removeUserLike(req, post, currUser);
    } else {
      req.flash('error', 'Debes ingresar para dar like');
      res.redirect('/login');
    }
    await post.save();
    await currUser.save();
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
    post.author = req.session['currentUser']['_id'];
    post.createdAt = new Date();
    post.privacy = 'public';
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
