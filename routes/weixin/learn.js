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
 * 提交个人对某个小节课程的学习情况
 * 参数： user_id
 *       learn_percent 一百以内的两位整数
 *       section_id
 * */
router.post('/',function (req,res,next) {
    var user_id = req.body.user_id;
    var learn_percent = Number(req.body.learn_percent);
    var section_id = Number(req.body.section_id);

    var is_learn = 0;
    if(learn_percent===100){
        is_learn = 1;
    }

    var insert_sql = "insert into schedule_learn(user_id,section_id,is_learn,datetime,learn_percent) " +
        "values('"+user_id+"',"+section_id+","+is_learn+",Now(),"+learn_percent+")";

    query(insert_sql, function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'插入数据成功'
                }
            }
            if(is_learn === 1){
                // Tool.addRank(user_id,10,5,function () {
                //     res.json(response);
                // },function () {
                //     responseDataErr(res);
                // })
                getScore(user_id,section_id,function () {
                    res.json(response);
                },function () {
                    responseDataErr(res);
                })
            }else{
                res.json(response);
            }
        }
    })
})

function getScore(user_id,section_id,success,faillure) {

    var query_sql = "select datetime from schedule_learn where user_id='"+user_id+"' and section_id="+section_id+" and is_learn=1";

    async.waterfall([
        function (callback) {
            Tool.addRank(user_id,1,0,function () {
                callback(null,'ok');
            },function () {
                callback('数据库执行错误');
            })
        },
        function (a,callback) {
            query(query_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls);
                }
            })
        },
        function (valls,callback) {
            if(valls.length===0){
                callback('数据库执行错误');
            }else if(valls.length===1){
                Tool.addRank(user_id,20,10,function () {
                    callback(null,'ok');
                },function () {
                    callback('数据库执行错误');
                })
            }else{
                var first_date = new Date(valls[0].datetime);
                var last_date = new Date(valls[valls.length-1].datetime);

                var days = Tool.getDaysBetweenTwoDate(first_date,last_date);

                var start_date = null;
                var end_date = null;
                var isGo = false;
                var addValue = 0;

                if(days>=42 && days<=49){
                    start_date = Tool.getDateFromSomeDate(first_date,42);
                    end_date = Tool.getDateFromSomeDate(first_date,49);
                    isGo = true;
                    addValue = 15;
                }else if(days>=21 && days<=28){
                    start_date = Tool.getDateFromSomeDate(first_date,21);
                    end_date = Tool.getDateFromSomeDate(first_date,28);
                    isGo = true;
                    addValue = 10;
                }else if(days>=7 && days<=14){
                    start_date = Tool.getDateFromSomeDate(first_date,7);
                    end_date = Tool.getDateFromSomeDate(first_date,14);
                    isGo = true;
                    addValue = 5;
                }else{
                    isGo = false;
                }

                if(isGo){
                    start_date = Tool.dateFormat(start_date);
                    end_date = Tool.dateFormat(end_date);
                    var query_sql = "select * from schedule_learn where user_id='"+user_id+"' and section_id="+section_id+" and is_learn=1 and " +
                        "datetime between '"+start_date+"' and '"+end_date+"'";

                    query(query_sql, function (qerr, valls, fields) {
                        if(qerr){
                            callback(qerr);
                        }else{
                            if(valls.length===1){
                                Tool.addRank(user_id,addValue,addValue,function () {
                                    callback(null,'ok');
                                },function () {
                                    callback('数据库执行错误');
                                })
                            }else{
                                callback(null);
                            }
                        }
                    })
                }
            }
        }
    ],function (err,results) {
        if(err){
            faillure();
        }else{
            success();
        }
    })
}

module.exports = router;