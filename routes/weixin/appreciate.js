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

function appreciate(user_id,be_user_id,query_sql,insert_sql,del_sql,res,addNum) {
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
                        addNum = -addNum;
                        Tool.addRank(be_user_id,Number(addNum),0,function () {
                            res.json(response);
                        },function () {
                            responseDataErr(res);
                        })
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
                        Tool.addRank(be_user_id,addNum,0,function () {
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

    appreciate(user_id,user_id,query_sql,insert_sql,del_sql,res,0);

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

    //查询被点赞问题的用户ID
    var question_sql = "select user_id from question where question_id='"+question_id+"'";
    query(question_sql,function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var be_user_id = valls[0].user_id;
            appreciate(user_id,be_user_id,query_sql,insert_sql,del_sql,res,1);
        }
    })
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

    //查询被点赞答案的用户ID
    var answer_sql = "select user_id from answer where answer_id='"+answer_id+"'";
    query(answer_sql,function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var be_user_id = valls[0].user_id;
            appreciate(user_id,be_user_id,query_sql,insert_sql,del_sql,res,2);
        }
    })
})

/**
 * 获取某节课程的鲜花总数,和特定用户对该课程的点赞与自我评价状态
 *      参数:课程ID section_id
 *          用户ID user_id
 * */
router.post('/course',function (req,res,next) {
    var section_id = req.body.section_id;
    var user_id = req.body.user_id;

    var query_sql1 = "select sum(appreciate_value)appreciate_course_count from appreciate_course where section_id="+section_id;
    var query_sql2 = "select count(1)appreciate_status from appreciate_mine where section_id="+section_id+" and user_id='"+user_id+"'";
    var query_sql3 = "select appreciate_value from appreciate_mine where section_id="+section_id+" and user_id='"+user_id+"'";

    var course_num = 0;
    var mine_num = 0;
    var appreciate_status = 0;

    query(query_sql1, function (qerr,valls,fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            if(valls.length > 0){
                var co = valls[0];
                if(co.appreciate_course_count){
                    course_num = co.appreciate_course_count;
                }
            }
            query(query_sql2,function (qerr,valls,fields) {
                if(qerr){
                    responseDataErr(res);
                }else{
                    if(valls.length > 0 && valls[0].appreciate_status){
                        appreciate_status = 1;
                        query(query_sql3,function (qerr,valls,fields) {
                            if(qerr){
                                responseDataErr(res);
                            }else{
                                var mine = valls[0];
                                mine_num = mine.appreciate_value;
                                var response = {
                                    status:1,
                                    data:{
                                        course_num : course_num,
                                        mine_num : mine_num,
                                        appreciate_status : appreciate_status
                                    }
                                }
                                res.json(response);
                            }
                        })
                    }else{
                        var response = {
                            status:1,
                            data:{
                                course_num : course_num,
                                mine_num : mine_num,
                                appreciate_status : appreciate_status
                            }
                        }
                        res.json(response);
                    }

                }
            })
        }
    })
})
/**
 * 用户提交给课程的献花数,和对自己的评价数
 *      参数: user_id  //用户ID
 *           section_id  //课程ID
 *           course_num  // 用户给课程的献花数
 *           mine_num    // 用户给自己的自评数
 * */
router.post('/mycourse',function (req,res,next) {
    var user_id = req.body.user_id;
    var section_id = req.body.section_id;
    var course_num = req.body.course_num;
    var mine_num = req.body.mine_num;

    var appreciate_id = (new Date()).valueOf() + '' + parseInt(Math.random()*100000);

    var insert_sql1 = "insert into appreciate_course(appreciate_id,user_id,section_id,appreciate_time,appreciate_value) " +
        "values('"+appreciate_id+"','"+user_id+"',"+section_id+",Now(),"+course_num+")";
    var insert_sql2 = "insert into appreciate_mine(appreciate_id,user_id,section_id,appreciate_time,appreciate_value) " +
        "values('"+appreciate_id+"','"+user_id+"',"+section_id+",Now(),"+mine_num+")";

    async.parallel([
        function (callback) {
            query(insert_sql1,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null);
                }
            })
        },
        function (callback) {
            query(insert_sql2,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null);
                }
            })
        },
        function (callback) {
            // Tool.addRank(user_id,2,0,function () {
            //     callback(null);
            // },function () {
            //     callback('数据库执行错误！');
            // })
            callback(null);
        }
    ],function (err,results) {
        if(err){
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
})

module.exports = router;