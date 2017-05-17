/**
 * Created by jiangsong on 2017/5/17.
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
 * 提交问题接口
 * 参数：  user_id
 *        question_des
 * */
router.post('/ask', function (req, res, next) {
    var user_id = req.body.user_id;
    var question_des = req.body.question_des;
    var question_id = (new Date()).valueOf() + '' + parseInt(Math.random()*100000);

    var insert_sql = "insert into question(question_id,question_desc,user_id,up_time) values(" +
        "'"+question_id+"'," +
        "'"+question_des+"'," +
        "'"+user_id+"',Now())";
    console.log('insert_sql:', insert_sql);
    query(insert_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'问题提交成功，请耐心等待解答...'
                }
            }
            res.json(response);
        }
    })
})
/**
 * 问题列表
 * 按时间排序，分页获取问题，每页10条
 * 参数： page 当前获取问题的分页页码数
 *       key_id 记录主键，第一页传0， 当第二页时传第一页获取到的最小主键
 * */
router.post('/questions', function (req, res, next) {
    var page = req.body.page;
    var key_id = req.body.key_id;
    var query_sql = "";
    if(page === 1){
        query_sql = "select * from question order by key_id desc limit 0,10";
    }else{
        query_sql = "select * from question where key_id between "+(key_id-10)+" and " +(key_id-1) +" order by key_id desc";
    }
    query(query_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var data = null;
            if(valls.length<=0){
                data = '没有更多问题了...';
            }else{
                data = valls;
            }
            var response = {
                status:1,
                data:data
            }
            res.json(response);
        }
    })
})
/**
 * 提交答案
 * 参数：answer_desc
 *      user_id
 *      question_id
 * */
router.post('/reply', function (req, res, next) {
    var answer_desc = req.body.answer_desc;
    var user_id = req.body.user_id;
    var question_id = req.body.question_id;

    var answer_id = (new Date()).valueOf() + '' + parseInt(Math.random()*100000);
    var answer_voice = '/weixin/voices/answers/answer_'+answer_id+'.mp3';

    var insert_sql = "insert into answer values(" +
        "'"+ answer_id + "'," +
        "'"+answer_desc+"'," +
        "'"+user_id+"',Now()," +
        "'"+question_id+"'," +
        "'"+answer_voice+"')";
    console.log('insert_sql:',insert_sql);
    query(insert_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'您的答案提交成功！'
                }
            }
            res.json(response);
        }
    })
})
/**
 * 查看问题详情
 * 参数：question_id
 * */
router.post('/question/detail', function (req, res, next) {
    var question_id = req.body.question_id;

    var query_sql = "select * from question where question_id='"+question_id+"'";

    query(query_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            if(valls.length<=0){
                responseDataErr(res);
            }else{
                var response = {
                    status:1,
                    data:valls[0]
                }
                res.json(response);
            }
        }
    })
})
/**
 * 查看某一问题对应的所有答案，按时间倒序排列
 * 参数：question_id
 * */
router.post('/question/answers', function (req, res, next) {
    var question_id = req.body.question_id;

    var query_sql = "select answer_id,answer_desc,user_id,answer_time,answer_voice from answer where question_id = " +
        "'"+question_id+"' left join select nickname,headimgurl from user where user_id='" +
        "(select user_id from answer where question_id='"+question_id+"')'";
    query(query_sql, function (qerr, valls, next) {
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