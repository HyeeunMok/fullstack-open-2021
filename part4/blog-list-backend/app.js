const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const { errorHandler } = require('./utils/error');

console.log('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  // .then(() => {
  //   console.log('connected to MongoDB');
  // })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use(errorHandler);

module.exports = app;
