/**
 * Created by jiangsong on 2017/6/20.
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

function appreciate(user_id,query_sql,insert_sql,del_sql,res) {
    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            if(valls.length>0){
                //已经点赞过，取消点赞
                query(del_sql,function (qerr,valls,fields) {
                    if(qerr){
                        responseDataErr(res);
                    }else{
                        var response = {
                            status:1,
                            data:'cancel' //返回值 cancel 代表取消点赞成功
                        }
                        res.json(response);
                    }
                })
            }else{
                //未点赞过，点赞
                query(insert_sql,function (qerr,valls,fields) {
                    if(qerr){
                        responseDataErr(res);
                    }else{
                        var response = {
                            status:1,
                            data:'done' //返回值 done 代表点赞成功
                        }
                        Tool.addRank(user_id,0,1,function () {
                            res.json(response);
                        },function () {
                            responseDataErr(res);
                        })
                    }
                })
            }
        }
    })
}
/**
 * 给个人排名点赞
 * 参数：user_id  点赞用户的user_id
 *      appreciate_user_id  被点赞用户的user_id
 * */
router.post('/rank',function (req,res,next) {
    var user_id = req.body.user_id;
    var appreciate_user_id = req.body.appreciate_user_id;

    var query_sql = "select * from appreciate_rank where user_id='"+user_id+"' and " +
        "appreciate_user_id='"+appreciate_user_id+"'";
    var insert_sql = "insert into appreciate_rank(user_id,appreciate_user_id,appreciate_time) " +
        "values('"+user_id+"','"+appreciate_user_id+"',Now())";
    var del_sql = "delete from appreciate_rank where user_id='"+user_id+"' and " +
        "appreciate_user_id='"+appreciate_user_id+"'";

    appreciate(user_id,query_sql,insert_sql,del_sql,res);

})
/**
 * 给问题点赞
 *      参数：user_id
 *           question_id
 * */
router.post('/question',function (req,res,next) {
    var user_id = req.body.user_id;
    var question_id = req.body.question_id;

    var query_sql = "select * from appreciate_question where user_id='"+user_id+"' and question_id='"+question_id+"'";
    var insert_sql = "insert into appreciate_question(user_id,question_id,appreciate_time) " +
        "values('"+user_id+"','"+question_id+"',Now())";
    var del_sql = "delete from appreciate_question where user_id='"+user_id+"' and question_id='"+question_id+"'";

    appreciate(user_id,query_sql,insert_sql,del_sql,res);
})
/**
 * 给答案点赞
 *      参数：user_id
 *           answer_id
 * */
router.post('/answer',function (req,res,next) {
    var user_id = req.body.user_id;
    var answer_id = req.body.answer_id;

    var query_sql = "select * from appreciate_answer where user_id='"+user_id+"' and answer_id='"+answer_id+"'";
    var insert_sql = "insert into appreciate_answer(user_id,answer_id,appreciate_time) " +
        "values('"+user_id+"','"+answer_id+"',Now())";
    var del_sql = "delete from appreciate_answer where user_id='"+user_id+"' and answer_id='"+answer_id+"'";

    appreciate(user_id,query_sql,insert_sql,del_sql,res);
})

module.exports = router;