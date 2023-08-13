import mongoose from 'mongoose';

const dbconection = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/Tutorly')
    .then(() => {
      console.log('CONNECTED');
    })
    .catch((err) => {
      console.log(err);
    });
};

export = dbconection;
