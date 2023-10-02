import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { Faculties } from '../util/degrees';
import { Post } from '../models/post';
import { cloudinary } from '../cloudinary/index';

const renderRegister = (req: Request, res: Response) => {
  res.render('users/register');
};

const renderLogin = (req: Request, res: Response) => {
  res.render('users/login');
};

const loginUser = (req: Request, res: Response) => {
  req.flash('success', 'Bienvenido de vuelta!');
  res.redirect('/posts');
};

const logOutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logOut(function (e) {
    if (e) {
      return next(e);
    }
    res.redirect('/');
  });
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, degree } = req.body;
    const user = new User({ email, degree, username: email, name: email.slice(0, email.indexOf('@')) });
    const registeredUser = await User.register(user, password);
    if (Faculties.ingeneers.includes(user.degree)) {
      user.faculty = 'Ingenierias';
    } else if (Faculties.administration.includes(user.degree)) {
      user.faculty = 'Administración';
    } else if (Faculties.law.includes(user.degree)) {
      user.faculty = 'Derecho';
    } else if (Faculties.artsAndHumanities.includes(user.degree)) {
      user.faculty = 'Artes y Humanidades';
    } else if (Faculties.economy.includes(user.degree)) {
      user.faculty = 'Economía';
    }
    req.logIn(registeredUser, (err) => {
      if (err) {
        return next(err);
      } else {
        res.redirect('/posts');
      }
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
};

const updateUserPanel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const userInfo = await User.findById(req.params.id);
    if (req.body.description) {
      userInfo.description = req.body.description;
    } else {
      const files = req.files as Express.Multer.File[];
      const newImage = files.map((f) => {
        const { path, filename, mimetype, originalname } = f;
        return {
          path,
          filename,
          mimetype,
        };
      });
      if(userInfo.profilePic){
        await cloudinary.uploader.destroy(userInfo.profilePic[0].filename);
      }
      userInfo.profilePic = newImage;
    }
    await userInfo.save();
    res.redirect(`/personal/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const renderPersonalPanel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const viewOpt = req.query.view;
    let posts;
    if (viewOpt === 'Publicaciones guardadas'){
      const u = await User.findById(req.params.id).populate('likes');
      posts = u['likes'];
    }else{
      posts = await Post.find({
        author: req.params.id,
      });
    }
    res.render('users/personalPanel', { posts: posts, viewOpt});
  } catch (err) {
    next(err);
  }
};
const renderUpadtePanel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({
      author: req.params.id,
    });
    res.render('users/update', { posts: posts });
  } catch (err) {
    next(err);
  }
};

export const usersController = {
  renderRegister,
  postUser,
  renderLogin,
  loginUser,
  logOutUser,
  renderPersonalPanel,
  updateUserPanel,
  renderUpadtePanel,
};
