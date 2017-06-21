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
/**
 * 请求排行榜数据
 *  参数 user_id
 * */
router.post('/',function (req,res,next) {
    var user_id = req.body.user_id;

    var query_sql = "select a.user_id,a.fraction,a.leader_value,b.headimgurl,b.nickname,c.appreciate_count,d.appreciate_status from " +
        "(select user_id,fraction,leader_value from user_value order by fraction desc limit 30)as a left join " +
        "(select * from user)as b on a.user_id=b.user_id left join " +
        "(select count(*)appreciate_count,appreciate_user_id from appreciate_rank group by appreciate_user_id)as c on a.user_id=c.appreciate_user_id " +
        "left join " +
        "(select count(*)appreciate_status,appreciate_user_id from appreciate_rank where user_id='"+user_id+"' group by appreciate_user_id)as d on a.user_id=d.appreciate_user_id";

    var query_me = "select a.number,b.headimgurl,b.nickname,c.appreciate_count,d.fraction,d.leader_value from " +
        "(select count(1)number,'"+user_id+"'as user_id from user_value where fraction>(select fraction from user_value where user_id='"+user_id+"')) as a " +
        "left join " +
        "(select user_id,headimgurl,nickname from user)as b on a.user_id=b.user_id " +
        "left join " +
        "(select count(1)appreciate_count,appreciate_user_id from appreciate_rank group by appreciate_user_id)as c on a.user_id=c.appreciate_user_id " +
        "left join " +
        "(select user_id,fraction,leader_value from user_value)as d on a.user_id=d.user_id";

    async.parallel([
        function (callback) {
            query(query_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls);
                }
            })
        },
        function (callback) {
            query(query_me,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls[0]);
                }
            })
        }
    ],function (err,results) {
        if(err){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    user:results[1],
                    rank:results[0]
                }
            }
            res.json(response);
        }
    })

})

module.exports = router;