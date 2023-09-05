import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const dbUrl = process.env.DB_URL

const dbconection = () => {
    mongoose
        .connect(dbUrl!)
        .then(() => {
            console.log('CONNECTED');
        })
        .catch((err) => {
            console.log(err);
        });
};

export = dbconection;
