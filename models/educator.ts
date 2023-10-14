import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { User } from './user';

const Schema = mongoose.Schema;
const educatorSchema = new Schema({
  serviceInfo: {
    scheadule: {
      type: [],
      required: false,
      default: [],
    },
    office: {
      type: String,
      required: false,
      default: '',
    },
  },
});

export const Educator = User.discriminator('Educator', educatorSchema);
