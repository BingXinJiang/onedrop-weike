/**
 * Created by jiangsong on 2017/8/15.
 */
var express = require('express');
var router = express.Router();
var query = require('../../../db/DB');
var Error = require('../../tool/Error');
var Tool = require('../../tool/Tool');
var async = require('async');

var Push = require('../../tool/Push');




router.get('/',function (req,res,next) {
    // Push.pushText('oyMAaxN1hGZuki6cOvwF6OSQ-Ahs','这是推送的第一条消息哦！',function (err) {
    //     console.log('err',err);
    //     res.json(err);
    // },function (result) {
    //     res.json({
    //         msg:'成功',
    //         data:result
    //     });
    // })
    Push.pushGraphic('oyMAaxN1hGZuki6cOvwF6OSQ-Ahs','这是推送的第一条消息哦！',function (err) {
        console.log('err',err);
        res.json(err);
    },function (result) {
        res.json({
            msg:'成功',
            data:result
        });
    })
})



/**
 * 获取用户，提出的问题，按照最新提出的回答排序
 * 参数：user_id  page
 * 返回值：{
            status:1,
            data:[
                    {
                        question_id:'XXXXX',
                        question_des:'XXXXXXX',
                        answer_count:20,
                        last_answer_time:'2017----',
                        hasNew:1 // 1 有新答案   0 无新答案
                    }
                ]
            }
 主要逻辑：首先查询当前用户倒数第二次登陆的时间t1，然后查询用户提出的所有问题，按照所有问题被回答的最后一条答案的提出时间t2倒序排列，
            遍历所有问题，如果t1>t2 则显示该问题有了新的答案，该问题的hasNew属性记为1，否则记为0
 * */

router.post('/question',function (req,res,next) {

    var user_id = req.body.user_id;
    var page = req.body.page;

    //查询用户上次登录的时间
    var query_login_sql = "select login_date from login where user_id='"+user_id+"' order by login_date desc limit 1,1";
    //查询用户提出答案的回复
    var query_sql = "select M.question_id,M.question_desc,M.answer_count,M.last_answer_time from " +
        "(select A.question_id,A.question_desc,B.answer_count,B.last_answer_time from " +
        "(select * from question where user_id='"+user_id+"') as A  left join " +
        "(select count(1)answer_count,question_id,max(answer_time)last_answer_time from answer group by question_id)as B " +
        "on A.question_id=B.question_id)as M " +
        "where M.answer_count > 0 " +
        "order by M.last_answer_time desc " +
        "limit "+(page-1)*page+",3";

    async.parallel([
        function (callback) {
            query(query_login_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    if(valls.length<=0){
                        callback(null,'0');
                    }else if(valls.length>1){
                        callback('数据错误！');
                    }else{
                        var last_login_date = valls[0].login_date;
                        callback(null,last_login_date);
                    }
                }
            })
        },
        function (callback) {
            query(query_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls);
                }
            })
        }
    ],function (err,results) {
        if(err){
            Error.responseDataErr(res);
        }else{
            var last_login_date = results[0];
            var questions = results[1];

            var newQuestions = [];
            if(last_login_date === '0'){

            }else{
                var last_date = new Date(last_login_date);
                questions.map(function (question,idx) {
                    var last_time = new Date(question.last_answer_time);
                    var newQuestion = Object.assign({},question);
                    // console.log('-----'+last_time+'-----'+last_date);
                    if(last_time>last_date){
                        newQuestion.hasNew = 1;
                    }else{
                        newQuestion.hasNew = 0;
                    }
                    newQuestions.push(newQuestion);
                })
            }

            var response = {
                status:1,
                data:newQuestions
            }
            res.json(response);
        }
    })

})

/**
 * 获取用户，参与问题，按照最新提出的回答排序
 * 参数：user_id  page
 * 返回值：{
            status:1,
            data:[
                    {
                        question_id:'XXXXX',
                        question_des:'XXXXXXX',
                        answer_count:20,
                        last_answer_time:'2017----',
                        hasNew:1 // 1 有新答案   0 无新答案
                    }
                ]
            }
 主要逻辑：首先查询当前用户倒数第二次登陆的时间t1，然后查询用户参与回答的所有问题，按照所有问题被回答的最后一条答案的提出时间t2倒序排列，
 遍历所有问题，如果t1>t2 则显示该问题有了新的答案，该问题的hasNew属性记为1，否则记为0
 * */

router.post('/answer',function (req,res,next) {
    var user_id = req.body.user_id;
    var page = req.body.page;

    //查询用户上次登录的时间
    var query_login_sql = "select login_date from login where user_id='"+user_id+"' order by login_date desc limit 1,1";
    //查询用户参与回答的最新的回答的问题

    /*

    select A.question_id,C.question_desc,B.last_answer_time,B.answer_count from
    (
    (select question_id from answer where user_id='oyMAaxN1hGZuki6cOvwF6OSQ-Ahs')as A
    left join
    (select question_id,max(answer_time)last_answer_time,count(1)answer_count from answer group by question_id) as B
    on A.question_id = B.question_id
    left join
    (select question_id,question_desc from question)as C
    on A.question_id = C.question_id
    )
    order by B.last_answer_time desc
    limit 0,3
    */

    var query_sql = "select A.question_id,C.question_desc,B.last_answer_time,B.answer_count from " +
        "((select question_id from answer where user_id='"+user_id+"')as A " +
        "left join " +
        "(select question_id,max(answer_time)last_answer_time,count(1)answer_count from answer group by question_id) as B " +
        "on A.question_id = B.question_id " +
        "left join " +
        "(select question_id,question_desc from question)as C " +
        "on A.question_id = C.question_id) " +
        "order by B.last_answer_time desc " +
        "limit "+(page-1)*3+",3";

    // console.log('query_sql:',query_sql);

    async.parallel([
        function (callback) {
            query(query_login_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    if(valls.length === 1){
                        var last_login_date = valls[0].login_date;
                        callback(null,last_login_date);
                    }else{
                        callback(null,'0');
                    }
                }
            })
        },
        function (callback) {
            query(query_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls);
                }
            })
        }
    ],function (err,results) {
        if(err){
            Error.responseDataErr(res);
        }else{
            var last_login_date = results[0];
            var questions = results[1];

            var newQuestions = [];
            if(last_login_date === '0'){

            }else{
                var last_date = new Date(last_login_date);
                questions.map(function (question,idx) {
                    var last_time = new Date(question.last_answer_time);
                    var newQuestion = Object.assign({},question);
                    // console.log('-----'+last_time+'-----'+last_date);
                    if(last_time>last_date){
                        newQuestion.hasNew = 1;
                    }else{
                        newQuestion.hasNew = 0;
                    }
                    newQuestions.push(newQuestion);
                })
            }

            var response = {
                status:1,
                data:newQuestions
            }
            res.json(response);
        }
    })

})


module.exports = router;