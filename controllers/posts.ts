import { Post } from '../models/post';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.q) {
            const keyword = `${req.query.q}`;
            const posts = (
                await Post.find({
                    title: { $regex: '.*' + keyword + '.*' },
                })
            ).reverse();
            res.render('Posts/show', { posts, keyword });
        } else {
            const posts = (await Post.find({})).reverse();
            res.render('Posts/show', { posts, keyword: '' });
        }
    } catch (err) {
        next(err);
    }
};

const showMainPostPage = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('Posts/main', { post: post });
    } catch (err) {
        next(err);
    }
};

const showNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find({});
        res.render('Posts/new');
    } catch (err) {
        next(err);
    }
};

const createPost = async (
    req: Request<
        never,
        never,
        {
            title: string;
            author: string;
            body: string;
            votes: number;
            tags: string;
            image: string;
        }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        req.body.votes = 0;
        const post = new Post(req.body);
        post.save();
        res.redirect('Posts');
    } catch (err) {
        next(err);
    }
};

const deletePost = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await Post.deleteOne({
            _id: req.params.id,
        });
        res.redirect('/posts'); //TODO: Return to the /posts url
    } catch (error) {
        next(error);
    }
};

const showUpdate = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('Posts/update', { post: post, postId: req.params.id });
    } catch (err) {
        next(err);
    }
};

const updatePost = async (
    req: Request<
        { id: string },
        never,
        {
            title: string;
            author: string;
            body: string;
            votes: number;
            tags: string;
            image: string;
        }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const newPost = await Post.updateOne({ _id: req.params.id }, req.body);
        res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
        next(err);
    }
};

export const postController = {
    show,
    showMainPostPage,
    showNew,
    createPost,
    deletePost,
    showUpdate,
    updatePost,
};
