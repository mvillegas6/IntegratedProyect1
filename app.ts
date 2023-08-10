import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Application works!');
  });

app.listen(3000, () => {
    console.log('Application started on port 3000!');
  });