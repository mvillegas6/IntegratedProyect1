import { NextFunction } from "express";
import { Request, Response } from 'express';

export const isLoggedIn = (req:Request,res:Response,next:NextFunction) => {
    if(!req.isAuthenticated()){
        // req.session.returnTo = req.originalUrl; Mantener, funcionalidad mas adelante
        return res.redirect('/login');
    }
    next();
}