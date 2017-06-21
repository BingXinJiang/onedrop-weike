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
                Tool.addRank(user_id,10,5,function () {
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

module.exports = router;