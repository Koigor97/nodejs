// const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/////////////////////////////////////////////////////
// using third party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// including a middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// creating our own middleware function
app.use((req, res, next) => {
  console.log(`Hello 👋🏾... I am Middleware`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////////////////////////////////////
// resourses router middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// exporting app to the server
module.exports = app;
