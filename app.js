var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var helmet = require('helmet');
var compression = require('compression');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

dotenv.config();

// database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true},(err,result)=>{
  if(err) return console.log("Error Occured========>",err);
  console.log("Database Connected");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(compression());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
