/**
 * Created by jiangsong on 2017/5/17.
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
 * 获取当天推送的某一小节的具体信息
 * 参数 user_id section_id
 * */
router.post('/every_day', function (req, res, next) {
    var user_id = req.body.user_id;
    var section_id = req.body.section_id;

    //判断该user_id是否是会员,是否可以免费听取课程

    var  query_sql = "select a.section_id,a.section_name,a.author_id,a.section_voice,a.section_des,a.section_detail_img,a.label_des," +
        "year(a.open_date)year,month(a.open_date)month,day(a.open_date)day," +
        "b.teacher_name,b.teacher_position,b.teacher_head,c.appreciate_course_num from " +
        "(select * from course_section where section_id="+section_id+")as a " +
        "left join (select * from teacher)as b " +
        "on a.author_id=b.teacher_id left join " +
        "(select section_id,count(*)appreciate_course_num from appreciate_course where section_id="+section_id+")as c" +
        " on a.section_id=c.section_id";
    // console.log('请求课程内容=========================');
    // console.log('query_sql:', query_sql);
    query(query_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:valls[0]
            }
            res.json(response);
        }
    })

})

/**
 * 往日一滴的内容
 * 参数: user_id  page
 * */
router.post('/sections', function (req, res, next) {
    var user_id = req.body.user_id;
    var page = req.body.page;

    var query_class_open_date = "select open_date from class where class_id=(select class_id from class_user where class_state=1 and user_id='"+user_id+"')";

    //根据班级ID查询项目ID，根据项目ID查询项目所对应的课程ID，推送给用户所有项目所对应的课程

    async.waterfall([
        function (callback) {
            query(query_class_open_date,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    if(valls.length<=0){
                        callback('数据执行错误！');
                    }else{
                        var class_open_date = valls[0].open_date;
                        class_open_date = Tool.dateFormat(class_open_date);
                        callback(null,class_open_date);
                    }
                }
            })
        },
        function (class_open_date,callback) {
            var query_sql = "select a.section_id,a.section_list_img,a.section_intro,a.section_voice,a.section_name,a.label_des," +
                "a.open_date,year(a.open_date)year,month(a.open_date)month,day(a.open_date)day,b.teacher_head,c.appreciate_count," +
                "d.comment_count from" +
                " (select * from course_section where open_date < date_sub((select open_date from course_section order by open_date asc limit 1),interval (select datediff('"+class_open_date+"',Now())-1) day) " +
                "order by open_date desc limit "+(page-1)*7+",7)as a left join " +
                "(select * from teacher)as b on a.author_id=b.teacher_id left join " +
                "(select count(*)appreciate_count,section_id from appreciate_course group by section_id)as c on a.section_id=c.section_id " +
                "left join (select count(*)comment_count,section_id from comment group by section_id)as d " +
                "on a.section_id=d.section_id";
            // console.log('querry_sql:',query_sql);
            query(query_sql, function (qerr, valls, fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls);
                }
            })
        }
    ], function (err,results) {
        if(err){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:results
            }
            res.json(response);
        }
    })

})




module.exports = router;





















/**
 * 获取首页一滴每一天推送的课程
 * 参数：user_id                                               未使用
 * */
/*
 router.post('/section', function (req, res, next) {
 var user_id = req.body.user_id;
 // console.log('user_id:', user_id);

 var query_sql = "select year(open_date)year,month(open_date)month,day(open_date)day," +
 "course_id,section_id,course_author,section_name,section_des,open_date from course_section " +
 "where open_date<Now() and open_date != 0 order by open_date desc ";
 // "group by year,month,day";

 // console.log('query_sql:',query_sql);
 query(query_sql, function (qerr, valls, fields) {
 if(qerr){
 responseDataErr(res);
 }else{
 if(valls.length<=0){
 responseDataErr(res);
 }else{
 var newValls = [];
 valls.map(function (content, index) {
 content.calender_time = content.year +'-'+ content.month +'-'+ content.day;
 newValls.push(content);
 })

 var courses = [];
 var index_time = newValls[0].calender_time;
 var cells = [];
 for(var j=0; j<newValls.length; j++){
 if(newValls[j].calender_time === index_time){
 cells.push(newValls[j]);
 }else{
 courses.push(cells);
 cells = [];
 index_time = newValls[j].calender_time;
 cells.push(newValls[j]);
 }
 if(j === newValls.length-1){
 courses.push(cells);
 }
 }

 var response = {
 status:1,
 data:courses
 }
 res.json(response);
 }
 }
 })
 })  */


/**
 * 获取某一小节的详情信息
 * 参数：section_id                                                 未使用
 * */
/*
 router.post('/section/detail', function (req, res, next) {
 var section_id = req.body.section_id;

 var query_sql = "select * from course_section where section_id = "+section_id;
 query(query_sql, function (qerr, valls, fields) {
 if(qerr){
 responseDataErr(res);
 }else{
 if(valls.length<=0){
 responseDataErr(res);
 }else{
 var response = {
 status:1,
 data:valls[0]
 }
 res.json(response);
 }
 }
 })
 })       */

/**
 * 提交自赞的接口
 * 参数： user_id  section_id  appreciate_value                 未使用
 * */
/*
 router.post('/appreciate/mine', function (req,res,next) {
 var user_id = req.body.user_id;
 var section_id = req.body.section_id;
 var appreciate_value = req.body.appreciate_value;

 //将自赞的数据插入数据库,每个课程,可以给自己多条自赞
 var appreciate_id = (new Date()).getTime() + '' + parseInt(Math.random()*100000);
 var insert_sql = "insert into appreciate_mine(" +
 "appreciate_id,user_id,section_id,appreciate_time,appreciate_value) " +
 "values('"+appreciate_id+"','"+user_id+"',"+section_id+",Now(),"+appreciate_value+")";
 // console.log('提交自赞的接口执行sql:',insert_sql);
 query(insert_sql, function (qerr, valls, fields) {
 if(qerr){
 responseDataErr(res);
 }else{
 var response = {
 status:1,
 data:{
 msg:'success'
 }
 }
 Tool.addRank(user_id,1,0,function () {
 res.json(response);
 },function () {
 responseDataErr(res);
 })
 }
 })
 })        */

/**
 * 提交给课程点赞的接口
 * 参数: user_id section_id                       未使用
 * */
/*
 router.post('/appreciate/course', function (req, res, next) {
 var user_id = req.body.user_id;
 var section_id = req.body.section_id;

 //给课程点赞,同一个用户,重复进入该页面,可以重复点赞
 var appreciate_id = (new Date()).getTime() + '' + parseInt(Math.random()*100000);
 var insert_sql = "insert into appreciate_course(" +
 "appreciate_id,user_id,section_id,appreciate_time) " +
 "values('"+appreciate_id+"','"+user_id+"',"+section_id+",Now())";
 query(insert_sql, function (qerr, valls, fields) {
 if(qerr){
 responseDataErr(res);
 }else{
 var response = {
 status:1,
 data:{
 msg:'success'
 }
 }
 Tool.addRank(user_id,1,0,function () {
 res.json(response);
 },function () {
 responseDataErr(res);
 })
 }
 })
 })          */


/**
 * 获取banner图的链接
 * GET 请求                                                      未使用
 * */
/*
 router.get('/active', function (req, res, next) {
 //查询数据库，找到时间最新的一期active
 //active_type  1：课程  2：三件事  3：测评
 var query_sql = "select * from active order by active_time limit 1";
 query(query_sql, function (qerr, valls, next) {
 if(qerr){
 responseDataErr(res);
 }else{
 if(valls.length<=0){
 responseDataErr(res);
 }else{
 var active = valls[0];
 var response = {
 status:1,
 data:active
 }
 res.json(response);
 }
 }
 })
 })   */