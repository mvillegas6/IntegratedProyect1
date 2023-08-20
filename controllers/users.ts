import { User } from '../models/user';
import { Request, Response, NextFunction } from 'express';

const renderRegister = (req:Request, res:Response) => {
    return res.render('users/register');
}


export const usersController = {
    renderRegister,
}