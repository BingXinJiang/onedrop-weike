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
    // console.log('insert_sql:', insert_sql);
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
            Tool.addRank(user_id,1,0,function () {
                res.json(response);
            },function () {
                responseDataErr(res);
            })
        }
    })
})
/**
 * 问题列表
 * 按时间排序，分页获取问题，每页10条
 * 参数： page 当前获取问题的分页页码数
 *       key_id 记录主键，第一页传0， 当第二页时传第一页获取到的最小主键
 *       user_id
 * */
router.post('/questions', function (req, res, next) {
    var page = Number(req.body.page);
    var key_id = Number(req.body.key_id);
    var user_id = req.body.user_id;
    var query_sql = "";
    if(page === 1){
        query_sql = "select a.question_id,year(a.up_time)year,month(a.up_time)month,day(a.up_time)day,a.*,b.nickname,b.headimgurl," +
            "c.answer_count,d.appreciate_count,e.appreciate_status from " +
            "(select * from question order by key_id desc limit 0,10)a left join " +
            "(select * from user)b on a.user_id=b.user_id left join " +
            "(select count(*)answer_count,question_id from answer group by question_id)as c on a.question_id=c.question_id left join " +
            "(select count(*)appreciate_count,question_id from appreciate_question group by question_id)as d on a.question_id=d.question_id " +
            "left join " +
            "(select count(*)appreciate_status,question_id from appreciate_question where user_id='"+user_id+"' group by question_id)as e on a.question_id=e.question_id";
    }else{
        query_sql = "select a.question_id,year(a.up_time)year,month(a.up_time)month,day(a.up_time)day,a.*,b.nickname,b.headimgurl," +
            "c.answer_count,d.appreciate_count,e.appreciate_status from " +
            "(select * from question where key_id between "+(key_id-10)+" and " +(key_id-1) +" order by key_id desc)a " +
            "left join (select * from user)b on a.user_id=b.user_id left join " +
            "(select count(*)answer_count,question_id from answer group by question_id)as c on a.question_id=c.question_id left join " +
            "(select count(*)appreciate_count,question_id from appreciate_question group by question_id)as d on a.question_id=d.question_id " +
            "left join " +
            "(select count(*)appreciate_status,question_id from appreciate_question where user_id='"+user_id+"' group by question_id)as e on a.question_id=e.question_id";
    }
    // console.log(query_sql);
    query(query_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var data = null;
            if(valls.length<=0){
                data = [];
            }else{
                data = valls;
            }
            var questions = [];
            var funArr = valls.map(function (content) {
                content.answer_count = content.answer_count ? content.answer_count : 0;
                content.appreciate_count = content.appreciate_count ? content.appreciate_count : 0;
                content.appreciate_status = content.appreciate_status ? content.appreciate_status : 0;
                questions.push(content);
                return function (callback) {
                    var question_id = content.question_id;
                    var query_question_sql = "select a.answer_id,a.answer_desc,b.nickname,c.appreciate_count from " +
                        "((select answer_id,answer_desc,user_id,question_id from answer where question_id='"+question_id+"')as a " +
                        "left join " +
                        "(select user_id,nickname from user)as b on a.user_id=b.user_id " +
                        "left join " +
                        "(select answer_id,count(*)appreciate_count from appreciate_answer group by answer_id)as c on a.answer_id=c.answer_id) " +
                        "order by c.appreciate_count desc limit 2";
                    // console.log('query_question_sql:',query_question_sql);
                    query(query_question_sql,function (qerr,valls,fields) {
                        if(qerr){
                            callback(qerr);
                        }else{
                            callback(null,valls);
                        }
                    })
                }
            })
            async.parallel(funArr,function (err,results) {
                if(err){
                    responseDataErr(res);
                }else{
                    results.map(function (answers,idx) {
                        questions[idx].answers = answers;
                    })
                    var response = {
                        status:1,
                        data:questions
                    }
                    res.json(response);
                }
            })
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
    // console.log('insert_sql:',insert_sql);
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
            Tool.addRank(user_id,1,0,function () {
                res.json(response);
            },function () {
                responseDataErr(res);
            })
        }
    })
})
/**
 * 查看问题详情
 * 参数：question_id
 * */
router.post('/question/detail', function (req, res, next) {
    var question_id = req.body.question_id;

    var query_sql = "select year(a.up_time)year,month(a.up_time)month,day(a.up_time)day,a.question_id,a.question_desc,a.user_id,a.up_time,b.nickname,b.headimgurl from " +
            "(select * from question where question_id='"+question_id+"')a left join " +
        "(select * from user)b on a.user_id=b.user_id";

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
 * 参数：question_id  149500987801845931  149500987801845931
 *      user_id
 * */

router.post('/question/answers', function (req, res, next) {
    var question_id = req.body.question_id;
    var user_id = req.body.user_id;

    var query_sql = "select year(a.answer_time)year,month(a.answer_time)month,day(a.answer_time)day,a.answer_id," +
        "a.answer_desc,b.nickname,b.headimgurl,c.appreciate_status,d.appreciate_count from " +
        "((select * from answer where question_id='"+question_id+"')as a " +
        "left join " +
        "(select user_id,headimgurl,nickname from user)as b on a.user_id=b.user_id " +
        "left join " +
        "(select count(*)appreciate_status,answer_id,user_id from appreciate_answer where user_id='"+user_id+"')as c on a.answer_id=c.answer_id " +
        "left join " +
        "(select count(*)appreciate_count,answer_id from appreciate_answer)as d on a.answer_id=d.answer_id) " +
        "order by d.appreciate_count desc";
    // console.log('query_sql:', query_sql);
    query(query_sql, function (qerr, valls, next) {
        if(qerr){
            responseDataErr(res);
        }else{
            var answers = [];
            valls.map(function (content) {
                content.appreciate_status = content.appreciate_status ? content.appreciate_status : 0;
                content.appreciate_count = content.appreciate_count ? content.appreciate_count : 0;
                answers.push(content);
            })
            var response = {
                status:1,
                data:answers
            }
            res.json(response);
        }
    })
})

module.exports = router;