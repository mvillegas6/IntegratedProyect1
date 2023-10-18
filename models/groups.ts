import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  description: String,
  owner: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  members: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  posts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  profilePic: {
    type: Object,
  },
});

export const Group = mongoose.model('Group', groupSchema);
