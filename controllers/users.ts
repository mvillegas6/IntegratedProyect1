import { User } from '../models/user';
import { Educator } from '../models/educator';
import { Admin } from '../models/admin';
import { Request, Response, NextFunction } from 'express';
import { Faculties } from '../util/degrees';
import { Post } from '../models/post';
import { Group } from '../models/groups';
import { cloudinary } from '../cloudinary/index';
import bcrypt from 'bcrypt';
import { error } from 'console';

const renderRegister = (req: Request, res: Response) => {
  res.render('users/register');
};

const renderLogin = (req: Request, res: Response) => {
  res.render('users/login');
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ email: username });
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      req.session['currentUser'] = user;
      res.redirect('/posts');
    }else{
      req.flash('error', 'Usuario o contraseña incorrectos.');
      res.redirect('/login');
    }
  } catch (error) {
    req.flash('error', 'Algo inesperado a pasado!');
    res.redirect('/login');
  }
};

const logOutUser = (req: Request, res: Response, next: NextFunction) => {
  req.session['currentUser'] = null;
  res.redirect('/');
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, degree, isEducator, isAdmin } = req.body;
    const hash = await bcrypt.hash(password, 12);
    let user;

    if (isEducator) {
      user = new Educator({ email, degree, name: email.slice(0, email.indexOf('@')), password: hash });
    } else if (isAdmin) {
      user = new Admin({ email, degree, name: email.slice(0, email.indexOf('@')), password: hash });
    } else {
      user = new User({ email, degree, name: email.slice(0, email.indexOf('@')), password: hash });
    }

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
    await user.save();
    req.session['currentUser'] = user;
    res.redirect('/posts');
  } catch (e) {
    if (e.code === 11000){
      req.flash('error', 'Este correo ya esta en uso.');
      res.redirect('/register');
    }else{
      req.flash('error', 'Algo paso al registrarte, intenta de nuevo.');
      res.redirect('/register');
    }
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
      if (userInfo.profilePic) {
        await cloudinary.uploader.destroy(userInfo.profilePic[0].filename);
      }
      userInfo.profilePic = newImage;
    }
    await userInfo.save();
    req.session['currentUser'] = userInfo;
    res.redirect(`/personal/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

const renderPersonalPanel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const viewOpt = req.query.view;
    let posts;
    const myGroups = await Group.find({ members: { $in: [req.session['currentUser']] } });
    const newGroups = await Group.find({ members: { $not: { $in: [req.session['currentUser']] } } });
    if (viewOpt === 'Publicaciones guardadas') {
      const u = await User.findById(req.params.id).populate('likes');
      posts = u['likes'];
    } else {
      posts = await Post.find({
        author: req.params.id,
      });
    }
    res.render('users/personalPanel', { posts: posts, viewOpt, myGroups, newGroups });
  } catch (err) {
    next(err);
  }
};
const renderUpadtePanel = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({
      author: req.params.id,
    });
    const myGroups = await Group.find({ members: { $in: [req.session['currentUser']] } });
    const newGroups = await Group.find({ members: { $not: { $in: [req.session['currentUser']] } } });
    res.render('users/update', { posts: posts, viewOpt: '', myGroups, newGroups });
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
