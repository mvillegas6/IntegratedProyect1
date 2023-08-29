import { Post } from '../models/post';
import { Request, Response, NextFunction } from 'express';
import { Faculties } from '../util/degrees';

async function filterByQuery(req: Request, res: Response) {
    if (req.query.q) {
        const keyword = `${req.query.q}`;
        const posts = (
            await Post.find({
                title: { $regex: '.*' + keyword + '.*' },
            })
        ).reverse();
        res.render('Posts/show', { posts, keyword });
    } else if (req.query.faculty) {
        const posts = (
            await Post.find({
                faculty: req.query.faculty,
            })
        ).reverse();
        res.render('Posts/show', { posts, keyword: '' });
    } else if (req.query.degree) {
        const posts = (
            await Post.find({
                degree: req.query.degree,
            })
        ).reverse();
        res.render('Posts/show', { posts, keyword: '' });
    } else {
        const posts = (await Post.find({})).reverse();
        res.render('Posts/show', { posts, keyword: '' });
    }
}

function findFaculty(post: any) {
    if (Faculties.ingeneers.includes(post.degree)) {
        post.faculty = 'Ingenierias';
    } else if (Faculties.administration.includes(post.degree)) {
        post.faculty = 'Administración';
    } else if (Faculties.law.includes(post.degree)) {
        post.faculty = 'Derecho';
    } else if (Faculties.artsAndHumanities.includes(post.degree)) {
        post.faculty = 'Artes y Humanidades';
    } else if (Faculties.economy.includes(post.degree)) {
        post.faculty = 'Economía';
    } else {
        post.faculty = '';
    }
}

export const Helpers = {
    filterByQuery,
    findFaculty,
};
