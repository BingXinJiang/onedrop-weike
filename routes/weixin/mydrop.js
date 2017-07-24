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
var Tool = require('../tool/Tool');

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
 * 获取用户学习过的课程、学习过的课程对应的标签、该标签对应的学习过的课程数
 *      参数: user_id
 * */
router.post('/labels',function (req,res,next) {
    var user_id = req.body.user_id;
    
    var query_sql = "select m.label_learn_count,m.label_id,n.label_name from " +
        "(select count(1)label_learn_count,label_id from " +
        "(select a.section_id,b.label_id from " +
        "(select section_id from schedule_learn where user_id='"+user_id+"' and is_learn=1)as a " +
        "left join " +
        "(select section_id,label_id from course_label)as b on a.section_id=b.section_id)as t group by label_id order by label_learn_count desc) as m " +
        "left join " +
        "(select label_id,label_name from label)as n on m.label_id=n.label_id";
    // console.log('query_sql:',query_sql);
    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else {
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
});
/**
 * 获取某一个label对应的所有课程
 *      参数:label_id
 * */
router.post('/label/sections',function (req,res,next) {
    var label_id = req.body.label_id;

    var query_sql = "select a.section_id,b.section_name,b.section_voice from " +
        "(select section_id from course_label where label_id="+label_id+")as a " +
        "left join " +
        "(select section_id,section_name,section_voice from course_section)as b on a.section_id=b.section_id";
    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})



module.exports = router;


















/**
 * 获取个人信息，我的个人头像，我的领导力值，我的水滴数，我的提问，我的回答，我的留言，我的一滴(完整学习的课程数)
 *
 * 我的领导力值计算标准：细则页面自赞评分加总。
 * 我的水滴值计算标准：完整学习课程数3分，提出问题2分，发布评论1分，回答问题1分，得分加总                未使用
 * */
/*
 router.post('/',function (req,res,next) {
 var user_id= req.body.user_id;

 var query_sql = "select a.headimgurl,b.question_count,c.answer_count,d.comment_count,e.learn_count,f.appreciate_count from " +
 "(select user_id,headimgurl from user where user_id='"+user_id+"')as a left join " +
 "(select user_id,count(*)question_count from question group by user_id)as b on a.user_id=b.user_id left join " +
 "(select user_id,count(*)answer_count from answer group by user_id)as c on c.user_id=a.user_id left join " +
 "(select user_id,count(*)comment_count from comment group by user_id)as d on d.user_id=a.user_id left join " +
 "(select user_id,count(*)learn_count from schedule_learn where is_learn=1 group by user_id)as e on e.user_id=a.user_id left join " +
 "(select user_id,sum(appreciate_value)appreciate_count from appreciate_mine group by user_id)as f on f.user_id=a.user_id";

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
 })  */