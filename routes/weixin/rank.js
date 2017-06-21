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

    var query_sql = "select a.user_id,a.nickname,a.headimgurl,b.learn_count,c.comment_count,d.question_count,e.answer_count," +
        "f.appreciate_answer_count,g.appreciate_question_count,h.appreciate_course_count,i.appreciate_mine_count," +
        "(b.learn_count*10+f.appreciate_answer_count+g.appreciate_question_count+h.appreciate_course_count+i.appreciate_mine_count)fraction," +
        "(b.learn_count*10+c.comment_count*3+d.question_count+e.answer_count)energy from " +
        "((select * from user)as a " +
        "left join " +
        "(select count(*)learn_count,user_id,is_learn from schedule_learn where is_learn=1 group by user_id)as b on a.user_id=b.user_id " +
        "left join " +
        "(select count(*)comment_count,user_id from comment group by user_id)as c on a.user_id=c.user_id " +
        "left join " +
        "(select count(*)question_count,user_id from question group by user_id)as d on a.user_id=d.user_id " +
        "left join " +
        "(select count(*)answer_count,user_id from answer group by user_id)as e on a.user_id=e.user_id " +
        "left join " +
        "(select count(*)appreciate_answer_count,user_id from appreciate_answer group by user_id)as f on a.user_id=f.user_id " +
        "left join " +
        "(select count(*)appreciate_question_count,user_id from appreciate_question group by user_id)as g on a.user_id=g.user_id " +
        "left join " +
        "(select count(*)appreciate_course_count,user_id from appreciate_course group by user_id)as h on a.user_id=h.user_id " +
        "left join " +
        "(select count(*)appreciate_mine_count,user_id from appreciate_mine group by user_id)as i on a.user_id=i.user_id) " +
        "order by fraction desc limit 30";


    var query_me = "select m.*,@rank:=@rank+1 as pm from (select a.user_id,a.nickname,a.headimgurl," +
        "(b.learn_count*10+f.appreciate_answer_count+g.appreciate_question_count+h.appreciate_course_count+i.appreciate_mine_count)fraction," +
        "(b.learn_count*10+c.comment_count*3+d.question_count+e.answer_count)energy from " +
        "((select * from user)as a " +
        "left join " +
        "(select count(*)learn_count,user_id,is_learn from schedule_learn where is_learn=1 group by user_id)as b on a.user_id=b.user_id " +
        "left join " +
        "(select count(*)comment_count,user_id from comment group by user_id)as c on a.user_id=c.user_id " +
        "left join " +
        "(select count(*)question_count,user_id from question group by user_id)as d on a.user_id=d.user_id " +
        "left join " +
        "(select count(*)answer_count,user_id from answer group by user_id)as e on a.user_id=e.user_id " +
        "left join " +
        "(select count(*)appreciate_answer_count,user_id from appreciate_answer group by user_id)as f on a.user_id=f.user_id " +
        "left join " +
        "(select count(*)appreciate_question_count,user_id from appreciate_question group by user_id)as g on a.user_id=g.user_id " +
        "left join " +
        "(select count(*)appreciate_course_count,user_id from appreciate_course group by user_id)as h on a.user_id=h.user_id " +
        "left join " +
        "(select count(*)appreciate_mine_count,user_id from appreciate_mine group by user_id)as i on a.user_id=i.user_id) " +
        "order by fraction desc)as m where user_id='"+user_id+"'";

    // console.log('query_sql:',query_sql);
    // console.log('query_me',query_me);

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
                    callback(null,valls);
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