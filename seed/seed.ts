import dbconection from '../database';
import { Post } from '../models/post';
import { jsonPosts } from './post';

dbconection();

export const seedData = async () => {
  await Post.deleteMany({});
  for (let i = 0; i < jsonPosts.length; i++) {
    const P1 = new Post(jsonPosts[i]);
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
