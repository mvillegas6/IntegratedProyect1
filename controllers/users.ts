import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { Faculties } from '../util/degrees';

const renderRegister = (req: Request, res: Response) => {
  res.render('users/register');
};

const renderLogin = (req: Request, res: Response) => {
  res.render('users/login');
};

const loginUser = (req: Request, res: Response) => {
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
  } catch (error) {
    console.log(error);
    res.redirect('/register');
  }
};

export const usersController = {
  renderRegister,
  postUser,
  renderLogin,
  loginUser,
  logOutUser,
};
