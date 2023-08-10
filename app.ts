import express from 'express';
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { hola: 'hola' });
});

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});
