var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var dropRouter = require('./dropRoute');

// var index = require('./routes/index');
// var weixin = require('./routes/weixin/index');
// var ceping = require('./routes/weixin/ceping');
// var onedrop = require('./routes/weixin/onedrop');
// var answer = require('./routes/weixin/answer');
// var mydrop = require('./routes/weixin/mydrop');
// var learn = require('./routes/weixin/learn');
// var auth = require('./routes/weixin/auth');
// var rank = require('./routes/weixin/rank');
// var appreciate = require('./routes/weixin/appreciate');
// var nolearn = require('./routes/weixin/news/NoLearnCourse');
// var noanswer = require('./routes/weixin/news/NoReadAnswer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client/view'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

//配置路由
dropRouter(app);

// app.use('/', index);
// app.use('/weixin', weixin);
// app.use('/ceping', ceping);
// app.use('/onedrop', onedrop);
// app.use('/answer', answer);
// app.use('/mydrop',mydrop);
// app.use('/learn',learn);
// app.use('/auth',auth);
// app.use('/rank',rank);
// app.use('/appreciate',appreciate);
// app.use('/news/learn',nolearn);
// app.use('/news/answer',noanswer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
