import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbconection = () => {
    mongoose
        .connect(process.env.DB_URL!)
        .then(() => {
            console.log('CONNECTED');
        })
        .catch((err) => {
            console.log(err);
        });
};

export = dbconection;
