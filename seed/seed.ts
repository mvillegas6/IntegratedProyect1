import dbconection from '../database';
import { Post } from '../models/post';
import { jsonPosts } from './post';

dbconection();

export const seedData = async () => {
  await Post.deleteMany({});
  for (let i = 0; i < jsonPosts.length; i++) {
    const P1 = new Post(jsonPosts[i]);
    P1.save();
  }
};
