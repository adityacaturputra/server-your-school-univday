const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

// import mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const indexRouter = require('./routes/index');
// admin routes
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cors
app.use(cors());

// use method-override
app.use(methodOverride('_method'));

// use express-session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
);

// use connect-flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/sb-admin-2',
  express.static(
    path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2'),
  ),
); // menambahkan static file untuk sb-admin-2

app.use('/', indexRouter);
// admin routes
app.use('/admin', adminRouter);
// api routes
app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
