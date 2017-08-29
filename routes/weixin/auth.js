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
 * 查询判断，用户是否已经进入相应的班级，
 * 参数 user_id
 * 返回值说明 {
 *              status:1   //0数据库执行错误  1 正常返回
 *              data:0     //0该用户还没有加入班级   1 该用户已加入班级
 *          }
 * */

router.post('/check',function (req,res,next) {
    var user_id = req.body.user_id;

    var query_sql = "select * from class_user where user_id='"+user_id+"'";
    // var insert_sql = "insert into login(user_id,login_date) values('"+user_id+"',Now())";


    var now = Tool.getYearMothDayFromNow(-1);
    var endNow = now + ' 23:59:59';
    var check_sql = "select * from login where user_id='"+user_id+"' and " +
        "login_date between '"+now+"' and '"+endNow+"'";
    
    async.parallel([
        function (callback) {
            var insert_sql = '';
            var isFirst = true;
            var today = Tool.getYearMothDayFromNow(0);
            var endToday = today + ' 23:59:59';
            var check_today_sql = "select * from login where user_id='"+user_id+"' and " +
                "login_date between '"+today+"' and '"+endToday+"'";
            query(check_today_sql,function (qerr,valls,fields) {
                if(qerr){
                    responseDataErr(res);
                }else{
                    if(valls.length>0){
                        isFirst = false;
                    }else{
                        isFirst = true;
                    }
                    insert();
                }
            })

            function insert() {
                query(check_sql, function (qerr,valls,fields) {
                    if(qerr){
                        callback(qerr);
                    }else{
                        if(valls.length<=0){
                            //昨天没有登陆
                            insert_sql = "insert into login(user_id,login_date,last_days) values('"+user_id+"',Now(),1)";
                            query(insert_sql,function (qerr,valls,fields) {
                                if(qerr){
                                    callback(qerr);
                                }else{
                                    if(isFirst){
                                        //登陆成功，插入一条数据，并积分+1
                                        Tool.addRank(user_id,1,0,function () {
                                            callback(null,'ok');
                                        },function () {
                                            callback('数据库执行错误！');
                                        })
                                    }else{
                                        callback(null,'ok');
                                    }
                                }
                            })
                        }else{
                            //昨天已经登陆
                            var yesLogin = valls[0];
                            var last_days = yesLogin.last_days+1;
                            insert_sql = "insert into login(user_id,login_date,last_days) values('"+user_id+"',Now(),"+last_days+")";
                            query(insert_sql,function (qerr,valls,fields) {
                                if(qerr){
                                    callback(qer);
                                }else{
                                    //登陆成功，根据连续天数，增加积分
                                    var addNum = 1;
                                    if(last_days === 7){
                                        addNum = 20;
                                    }
                                    if(last_days === 5){
                                        addNum = 10;
                                    }
                                    if(isFirst){
                                        Tool.addRank(user_id,addNum,0,function () {
                                            callback(null,'ok');
                                        },function () {
                                            callback('数据库执行错误！');
                                        })
                                    }else{
                                        callback(null,'ok');
                                    }
                                }
                            })
                        }
                    }
                })
            }

        },
        function (callback) {
            query(query_sql, function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
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
                    callback(null,response);
                }
            })
        }
    ],function (err,results) {
        if(err){
            responseDataErr(res);
        }else{
            res.json(results[1]);
        }
    })
})

/**
 * 提交用户的邀请信息
 * 参数  user_id 用户ID   class_id 班级ID    access_code 班级进入密码
 * 返回值说明 {
 *              status:0  // 0 数据库执行错误  或者  班级信息验证失败  1  班级用户信息插入成功
 *              data:{
 *                  msg:''  //返回信息说明
 *              }
 *          }
 * */

router.post('/commit',function (req,res,next) {
    var user_id = req.body.user_id;
    var class_id = req.body.class_id;
    var access_code = req.body.access_code;

    if(!user_id){
        responseDataErr(res);
        return;
    }

    // console.log('access_code:',access_code);
    if(access_code === 'YUNGUHUITEST1'){
        console.log('验证密码是测试密码');
        class_id = 999;
        check();
    }else{
        //验证进入班级的人数是否已经到达上限

        var query_class_sql = "select a.count_num,b.class_num,b.class_id,b.access_code from " +
            "(select * from class where class_id="+class_id+")as b left join " +
            "(select count(1)count_num,class_id from class_user where class_id="+class_id+")as a on a.class_id=b.class_id";

        query(query_class_sql,function (qerr,valls,fields) {
            if(qerr){
                responseDataErr(res);
            }else{
                if(valls.length>0){
                    var count_num = valls[0].count_num ? valls[0].count_num : 0;
                    var class_num = valls[0].class_num;
                    if(count_num>=class_num){
                        var response = {
                            status:0,
                            data:{
                                msg:'该班级学员人数已满，请选择新的班级！'
                            }
                        }
                        res.json(response);
                    }else {
                        check();
                    }
                }else {
                    check();
                }
            }
        })
    }

    //验证class_id access_code 是否正确
    function check() {
        var check_sql = "select * from class where class_id="+class_id+" and access_code='"+access_code+"'";
        query(check_sql, function (qerr,valls,fields) {
            if(qerr){
                responseDataErr(res);
            }else{
                if(valls.length>0){
                    //班级信息验证正确，插入用户班级信息
                    var insert_sql = "insert into class_user(class_id,user_id,come_date,class_state) " +
                        "values("+class_id+",'"+user_id+"',Now(),1)";
                    query(insert_sql,function (qerr,valls,fields) {
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
                }else{
                    var response = {
                        status:0,
                        data:{
                            msg:'密码错误，请重新输入！'
                        }
                    }
                    res.json(response);
                }
            }
        })
    }

})

module.exports = router;