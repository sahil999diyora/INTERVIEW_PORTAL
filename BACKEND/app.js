var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./modules/admin/admin.router');
var courseRouter = require('./modules/course/course.router');
var companyRouter = require('./modules/company/company.router');
var studentRouter = require('./modules/student/student.router');
var interviewRouter = require('./modules/interview/interview.router');

var app = express();

const mongoose = require('mongoose');

mongoose.connect(mongoose.connect('mongodb://127.0.0.1:27017/interviewportal'))
  .then(() => console.log('DATABASE CONNECTED SUCESSFULLY ... !!'))
  .catch((err) => console.log(err.message))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);
app.use('/company', companyRouter);
app.use('/student', studentRouter);
app.use('/interview', interviewRouter);


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
