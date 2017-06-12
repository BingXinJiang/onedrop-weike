/**
 * Created by jiangsong on 2017/6/12.
 */
var express = require('express');
var router = express.Router();

var query = require('../../db/DB');

var http = require('http');
var https = require('https');
var querystring = require('querystring');

var crypto = require('crypto');
var parseString = require('xml2js').parseString;

var async = require('async');

function responseDataErr(res) {
    var response = {
        status:0,
        data:{
            msg:'数据库执行错误'
        }
    }
    res.json(response);
}

/**
 * 获取个人信息，我的个人头像，我的领导力值，我的水滴数，我的提问，我的回答，我的留言，我的一滴(完整学习的课程数)
 *
 * 我的领导力值计算标准：细则页面自赞评分加总。
 * 我的水滴值计算标准：完整学习课程数3分，提出问题2分，发布评论1分，回答问题1分，得分加总
 * */
router.post('/',function (req,res,next) {
    var user_id= req.body.user_id;

     var query_sql = "select a.headimgur,b.question_count,c.answer_count,d.comment_count,e.learn_count from " +
         "(select user_id,headimgurl from user where user_id='"+user_id+"')as a left join " +
         "(select count(*)question_count from question group by user_id)as b on a.user_id=b.user_id left join " +
         "(select count(*)answer_count from answer group by user_id)as c on c.user_id=a.user_id left join " +
         "(select count(*)comment_count from comment group by user_id)as d on d.user_id=a.user_id left join " +
         "(select count(*)learn_count from schedule_learn where is_learn=1 group by user_id)as e on e.user_id=a.user_id";

     query(query_sql, function (qerr, valls, fields) {
         if(qerr){
             responseDataErr(res);
         }else{
             if(valls.length<=0){
                 responseDataErr(res);
             }else{
                 var user = valls[0];
                 var response = {
                     status:1,
                     data:user
                 }
                 res.json(response);
             }
         }
     })
})

module.exports = router;