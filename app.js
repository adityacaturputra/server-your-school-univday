var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors')

// import mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adityacaturputra:sqkAmfiERitQGuCT@cluster0.reduu.mongodb.net/db_your_school_univday?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var indexRouter = require('./routes/index');
// admin routes
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cors
app.use(cors())

// use method-override
app.use(methodOverride('_method'));

// use express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

// use connect-flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2'))); // menambahkan static file untuk sb-admin-2

app.use('/', indexRouter);
// admin routes
app.use('/admin', adminRouter);
// api routes
app.use('/api/v1/university', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
