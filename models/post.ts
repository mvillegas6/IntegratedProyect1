import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const post = new Schema({
  title: String,
  author: String,
  body: String,
  votes: Number,
  tags: String,
  image: Object,
});


export const Post = mongoose.model('Post', post);
