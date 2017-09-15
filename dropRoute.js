/**
 * Created by jiangsong on 2017/9/15.
 */

var index = require('./routes/index');
var weixin = require('./routes/weixin/index');
var ceping = require('./routes/weixin/ceping');
var onedrop = require('./routes/weixin/onedrop');
var answer = require('./routes/weixin/answer');
var mydrop = require('./routes/weixin/mydrop');
var learn = require('./routes/weixin/learn');
var auth = require('./routes/weixin/auth');
var rank = require('./routes/weixin/rank');
var appreciate = require('./routes/weixin/appreciate');
var nolearn = require('./routes/weixin/news/NoLearnCourse');
var noanswer = require('./routes/weixin/news/NoReadAnswer');

module.exports = function (app) {
    app.use('/', index);
    app.use('/weixin', weixin);
    app.use('/ceping', ceping);
    app.use('/onedrop', onedrop);
    app.use('/answer', answer);
    app.use('/mydrop',mydrop);
    app.use('/learn',learn);
    app.use('/auth',auth);
    app.use('/rank',rank);
    app.use('/appreciate',appreciate);
    app.use('/news/learn',nolearn);
    app.use('/news/answer',noanswer);
}