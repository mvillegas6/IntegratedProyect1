import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const comment = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postRelated: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  body: String,
});

export const Comment = mongoose.model('Comment', comment);
