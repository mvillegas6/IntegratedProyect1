import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { User } from './user';
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    perms: {
        type: Boolean,
        default: true,
    }
});

export const Admin = User.discriminator('Admin', adminSchema);
