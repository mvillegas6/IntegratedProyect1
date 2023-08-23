import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique:true
    },
    contact:{
        type: String,
        required: false,
    },
    office:{
        type:String,
        required: false,
    }
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model('User',userSchema);