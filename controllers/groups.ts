import { Request, Response, NextFunction } from 'express';
import { Group } from '../models/groups';
import { Post } from '../models/post';
import { Helpers } from '../util/helpers';
import { Comment } from '../models/comment';
import { cloudinary } from '../cloudinary/index';

const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('groups/new');
  } catch (err) {
    next(err);
  }
};

const newGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newGroup = new Group(req.body);
    newGroup.members = [req.session['currentUser']];
    newGroup.owner = req.session['currentUser'];
    newGroup.posts = [];
    await newGroup.save();
    const id = newGroup._id;
    res.redirect(`/groups/${id}`);
  } catch (err) {
    next(err);
  }
};

const showGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session['currentUser']) {
      res.redirect('/login');
    } else {
      let followed = false;
      const group = await Group.findById(req.params.id)
        .populate('posts')
        .populate('members')
        .populate('owner');
      for (let member of group.members) {
        if (req.session['currentUser']._id == member._id) {
          followed = true;
          break;
        }
      }
      res.render('groups/show', { group, posts: group.posts, followed });
    }
  } catch (err) {
    next(err);
  }
};

const newPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('groups/newPost', { id: req.params.id });
  } catch (err) {
    next(err);
  }
};

const uploadPost = async (req: Request, res: Response, next: NextFunction) => {
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
    post.privacy = 'group';
    await post.save();

    const group = await Group.findById(req.params.id);

    group.posts.push(post);
    await group.save();
    res.redirect(`/groups/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const addMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session['currentUser'];
    const group = await Group.findById(req.params.id);
    group.members.push(user);
    await group.save();
    res.redirect(`/groups/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const removeMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session['currentUser'];
    const group = await Group.findById(req.params.id).populate('members');
    for (let i = 0; i < group.members.length; i++) {
      if (group.members[i]._id == user._id) {
        group.members.splice(i, 1);
        break;
      }
    }
    await group.save();
    res.redirect(`/groups/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const group = await Group.findByIdAndRemove(req.params.id).populate('posts');
    if (group.posts.length !== 0) {
      for (let post of group.posts) {
        if (post.image) {
          for (let img of post.image) {
            await cloudinary.uploader.destroy(img.filename);
          }
        }
        const comments = await Comment.findOneAndDelete({
          postRelated: req.params.id,
        });
        await Post.findByIdAndRemove(post._id);
      }
    }
    res.redirect('/posts');
  } catch (err) {
    next(err);
  }
};

export const groupController = {
  createGroup,
  newGroup,
  showGroup,
  newPost,
  uploadPost,
  addMember,
  removeMember,
  deleteGroup,
};
