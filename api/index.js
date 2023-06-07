//index.js
const express = require('express');
const cors = require('cors');
const app = express();

const authRouter = require('./auth');
const usersRouter = require('./users');

app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/users', usersRouter);

app.listen(8888, () => {
  console.log('Server started on port 8888');
});

app.listen(8889, () => {
  console.log('Server started on port 8889');
});