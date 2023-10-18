import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Group } from '../models/groups';

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let educators: any;
    let keyword;
    const myGroups = await Group.find({ members: { $in: [req.session['currentUser']] } });
    const newGroups = await Group.find({ members: { $not: { $in: [req.session['currentUser']] } } });

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
    res.render('educators/show', { educators, keyword, myGroups, newGroups });
  } catch (err) {
    next(err);
  }
};

const renderEducatorPanel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const educator = await User.findById(req.params.id);
    const posts = await Post.find({
      author: req.params.id,
    });
    const myGroups = await Group.find({ members: { $in: [req.session['currentUser']] } });
    const newGroups = await Group.find({ members: { $not: { $in: [req.session['currentUser']] } } });
    res.render('educators/personalPanel', { posts: posts, educator, myGroups, newGroups });
  } catch (err) {
    next(err);
  }
};

const renderUpdateInfo = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({
      author: req.params.id,
    });
    const myGroups = await Group.find({ members: { $in: [req.session['currentUser']] } });
    const newGroups = await Group.find({ members: { $not: { $in: [req.session['currentUser']] } } });
    res.render('educators/updateInfo', { posts: posts, viewOpt: '', myGroups, newGroups });
  } catch (err) {
    next(err);
  }
};

const updateEducatorPanel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const userInfo = await User.findById(req.params.id);
    if (req.body.description) {
      userInfo.description = req.body.description;
    }
    if (req.body.daterange) {
      userInfo.serviceInfo.scheadule = req.body.daterange;
    }
    if (req.body.office) {
      userInfo.serviceInfo.office = req.body.office;
    }
    await userInfo.save();
    req.session['currentUser'] = userInfo;
    res.redirect(`/personal/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

export const educatorController = {
  show,
  renderEducatorPanel,
  renderUpdateInfo,
  updateEducatorPanel,
};
