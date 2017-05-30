/**
 * Created by jiangsong on 2017/5/25.
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
 * 用户打卡
 * 参数: user_id motto  section_id
 * */
router.post('/punch_card', function (req, res, next) {
    var user_id = req.body.user_id;
    var motto = req.body.motto;
    var section_id = req.body.section_id;

    async.waterfall([
        function (callback) {
            var query_sql = "select datediff(Now(),select open_date from course_section" +
                " where section_id="+section_id+")";
            query(query_sql, function (qerr, valls, fields) {
                if(qerr){
                    responseDataErr(res);
                }else{
                    if(valls.length>0){
                        var datediffNum = Number(valls[0]);
                        if(datediffNum == 0){
                            callback(null, 2);
                        }else if(datediffNum == 1){
                            callback(null, 1);
                        }else{
                            callback(null, 0);
                        }
                    }else{
                        responseDataErr(res);
                    }
                }
            })
        },
        function (fraction,callback) {
            var punch_id = (new Date()).getTime()+ "" + Math.random()*100000;
            var insert_sql = "insert into punch_card(punch_id,user_id,punch_time,motto,punch_fraction,section_id) " +
                "values('"+punch_id+"','"+user_id+"',Now(),'"+motto+"',"+fraction+","+section_id+")";
            query(insert_sql, function (qerr, valls, fields) {
                if(qerr){
                    responseDataErr(res);
                }else{
                    callback(null, 'ok');
                }
            })
        }
    ], function (err, results) {
        if(err){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'打卡成功!'
                }
            }
            res.json(response);
        }
    })
})

module.exports = router;





























