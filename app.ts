import express from 'express';
import path from 'path';
const ejsMate = require('ejs-mate');
import dbconection from './database';
import { Request, Response } from 'express';
import { seedData } from './seed/seed';
import { postRouter } from './routes/posts';
import methodOverride from 'method-override';

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

app.use('/posts', postRouter);

app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Application started on port 3000!');
});
