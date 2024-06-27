import express from 'express';
import homeRoute from './routes/home.js';
import rootRoute from './routes/root.js';
import humanRoute from './routes/human.js';


const app = express();
const port = 3000;

// Use routes
app.use('/', homeRoute);
app.use('/root', rootRoute);
app.use('/human', humanRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});