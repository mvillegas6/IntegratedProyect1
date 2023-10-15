import express, { NextFunction } from 'express';
import path from 'path';
const ejsMate = require('ejs-mate');
import dbconection from './database';
import { Request, Response } from 'express';
import { seedData } from './seed/seed';
import { postRouter } from './routes/posts';
import { userRouter } from './routes/users';
import methodOverride from 'method-override';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import { commentRouter } from './routes/comments';
import { analyticRouter } from './routes/analitycs';
import { educatorRouter } from './routes/educators';
var MongoDBStore = require('connect-mongo');

const app = express();

dbconection();
// seedData();

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('alo'));

const store = MongoDBStore.create({
  mongoUrl: process.env.DB_URL,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: 'Dirty deeds done dirty cheap!',
  },
});

store.on('error', function (e) {
  console.log('session store error', e);
});

app.use(
  session({
    store,
    name: 'YSC__',
    secret: 'Dirty deeds done dirty cheap',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);
app.use(flash());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session['currentUser'];
  next();
});

app.use('/posts', postRouter);
app.use('/posts/comments', commentRouter);
app.use('/analytics', analyticRouter);
app.use('/educators', educatorRouter);
app.use('', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});
