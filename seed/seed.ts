import dbconection from '../database';
import { Post } from '../models/post';
import { jsonPosts } from './post';
import * as dotenv from 'dotenv';

dotenv.config();
dbconection();

export const seedData = async () => {
    await Post.deleteMany({});
    for (let i = 0; i < jsonPosts.length; i++) {
        const P1 = new Post({
            title: 'Exploring the Outdoors',
            author: process.env.SEED_USER!,
            body: 'Slorem.',
            votes: 25,
            tags: 'travel, nature',
            image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80',
        });
        P1.image = [
            {
                fieldname: 'image',
                originalname: 'wallhaven-6k1dj7.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                path: 'https://res.cloudinary.com/dzemwu9yn/image/upload/v1692554866/Tutorly/lszz5pmbhtojixbsf6gm.jpg',
                size: 1466823,
                filename: 'Tutorly/lszz5pmbhtojixbsf6gm',
            },
            {
                fieldname: 'image',
                originalname: 'wallhaven-7pgy5y.png',
                encoding: '7bit',
                mimetype: 'image/png',
                path: 'https://res.cloudinary.com/dzemwu9yn/image/upload/v1692554872/Tutorly/mlp4xcxaj8pixpitevvd.png',
                size: 10352642,
                filename: 'Tutorly/mlp4xcxaj8pixpitevvd',
            },
        ];
        P1.save();
    }
};
