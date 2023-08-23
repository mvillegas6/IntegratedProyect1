import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';

const renderRegister = (req:Request, res:Response) => {
    res.render('users/register');
}

const renderLogin = (req:Request, res:Response) => {
    res.render('users/login');
}

const loginUser = (req: Request, res:Response) => {
    res.redirect('/posts');
}

const logOutUser = (req:Request, res:Response, next:NextFunction) => {
    req.logOut(function (e){
        if (e) {
            return next(e)
        }
        res.redirect('/');
    })
}

const postUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {email,password} = req.body;
        const user = new User({email, username: email});
        const registeredUser = await User.register(user,password);
        console.log(user);
        req.logIn(registeredUser, (err) => {
            if (err) {
                return next(err);
            } else {
                res.redirect('/posts');
            }
        })
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
}


export const usersController = {
    renderRegister,
    postUser,
    renderLogin,
    loginUser,
    logOutUser,
}