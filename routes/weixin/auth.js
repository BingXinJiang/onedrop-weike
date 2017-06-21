/**
 * Created by jiangsong on 2017/6/16.
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
 * 查询判断，用户是否是已经注册用户
 * 参数 user_id
 * */

router.post('/check',function (req,res,next) {
    var user_id = req.body.user_id;

    var query_sql = "select * from member_list where user_id='"+user_id+"'";

    query(query_sql, function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var memberStatus = 0;
            if(valls.length>0){
                memberStatus = 1;
            }else{
                memberStatus = 0;
            }
            var response = {
                status:1,
                data:memberStatus
            }
            res.json(response);
        }
    })
})

/**
 * 提交用户的邀请信息
 * 参数  user_id  code
 * */
router.post('/commit',function (req,res,next) {
    var user_id = req.body.user_id;
    var code = req.body.code;

    var query_sql = "select * from member_list where code='"+code+"'";
    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            if(valls.length === 0){
                //该code不存在
                var response = {
                    status:0,
                    data:{
                        msg:'邀请码有误，请重新输入！'
                    }
                }
                res.json(response);
            }else if(valls.length === 1){
                //该code正常存在
                var member = valls[0];
                if(member.user_id){
                    var response = {
                        status:0,
                        data:{
                            msg:'该邀请码已经被使用，请使用新的邀请码！'
                        }
                    }
                    res.json(response);
                }else{
                    //该邀请码有效，且未被使用，更新数据
                    var updata_sql = "update member_list set user_id='"+user_id+"',used=1 where code='"+code+"'";
                    query(updata_sql,function (qerr,valls,fields) {
                        if(qerr){
                            responseDataErr(res);
                        }else{
                            var response = {
                                status:1,
                                data:{
                                    msg:'success'
                                }
                            }
                            res.json(response);
                        }
                    })
                }
            }else{
                responseDataErr(res);
            }
        }
    })
})

module.exports = router;