import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const post = new Schema({
  title: String,
  author: String,
  body: String,
  votes: Number,
  tags: String,
  image: String,
});


export const Post = mongoose.model('Post', post);
