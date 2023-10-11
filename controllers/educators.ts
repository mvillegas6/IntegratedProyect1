import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let educators: any;
    let keyword;
    if (req.query.q) {
      keyword = `${req.query.q}`;
      educators = (
        await User.find({
          name: { $regex: new RegExp(keyword, 'i') },
          __t: 'Educator',
        })
      ).reverse();
    } else if (req.query.degree) {
      keyword = req.query.degree;
      educators = (
        await User.find({
          degree: req.query.degree,
          __t: 'Educator',
        })
      ).reverse();
    } else {
      educators = (
        await User.find({
          __t: 'Educator',
        })
      ).reverse();
    }
    res.render('educators/show', { educators, keyword });
  } catch (err) {
    next(err);
  }
};

const renderEducatorPanel = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const educator = await User.findById(req.params.id);
    const posts = await Post.find({
      author: req.params.id,
    });
    res.render('educators/personalPanel', { posts: posts, educator });
  } catch (err) {
    next(err);
  }
};

export const educatorController = {
  show,
  renderEducatorPanel,
};
