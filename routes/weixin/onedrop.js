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
 * 获取banner图的链接
 * GET 请求
 * */
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
})
/**
 * 获取首页一滴每天推送的课程
 * 参数：user_id
 * */
router.post('/section', function (req, res, next) {
    var user_id = req.body.user_id;
    console.log('user_id:', user_id);
    // var query_sql = "select course_id,section_id,course_author,section_name,section_des,open_date from course_section where open_date<Now() " +
    //     "and open_date != 0";

    // var query_sql = "select year(open_date)year,month(open_date)month,day(open_date)day," +
    //     "course_id,section_id,course_author,section_name,section_des,open_date from course_section " +
    //     "where open_date<Now() and open_date != 0 " +
    //     "group by year,month,day";

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
})

/**
 * 获取某一小节的详情信息
 * 参数：section_id
 * */
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
})

module.exports = router;