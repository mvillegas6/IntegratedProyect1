import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/comment';
const showNew = (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    res.render('comments/new', { postId: req.params.postId });
  } catch (err) {
    next(err);
  }
};

const createComment = async (
  req: Request<
    { postId: string },
    never,
    {
      body: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = new Comment(req.body);
    comment.author = req.session['currentUser']['_id'];
    comment.postRelated = req.params.postId;
    await comment.save();
    res.redirect(`/posts/${req.params.postId}`);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id).populate(
      'postRelated'
    );
    console.log(comment.postRelated['_id']);
    res.redirect(`/posts/${comment.postRelated['_id']}`);
  } catch (error) {
    next(error);
  }
};

export const commentController = {
  showNew,
  createComment,
  deleteComment,
};
