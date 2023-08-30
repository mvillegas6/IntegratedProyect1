import { Post } from '../models/post';
import { Request, Response, NextFunction } from 'express';
import { Faculties } from '../util/degrees';

async function filterByQuery(req: Request, res: Response) {
    let posts: any;
    if (req.query.q) {
        const keyword = `${req.query.q}`;
        posts = (
            await Post.find({
                title: { $regex: '.*' + keyword + '.*' },
            }).populate('author')
        ).reverse();
    } else if (req.query.faculty) {
        posts = (
            await Post.find({
                faculty: req.query.faculty,
            }).populate('author')
        ).reverse();
    } else if (req.query.degree) {
        posts = (
            await Post.find({
                degree: req.query.degree,
            }).populate('author')
        ).reverse();
    } else {
        posts = (await Post.find({}).populate('author')).reverse();
    }
    res.render('Posts/show', { posts, keyword: '' });
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
