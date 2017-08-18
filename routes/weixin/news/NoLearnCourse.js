/**
 * Created by jiangsong on 2017/8/15.
 */
var express = require('express');
var router = express.Router();
var query = require('../../../db/DB');
var async = require('async');
var Error = require('../../tool/Error');
var Tool = require('../../tool/Tool');

/**
 * 获取未学习的课程                      -------------文档2.0
 * */

router.post('/',function (req,res,next) {

    var user_id = req.body.user_id;
    var page = req.body.page;

    //首先查询该user_id所在班级的开班时间
    var query_class_open_date = "select open_date from class where class_id=(select class_id from class_user where class_state=1 and user_id='"+user_id+"')";

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
            var query_sql = "select A.section_id,A.section_name,A.section_intro,A.open_date,A.section_voice from " +
                " (select * from course_section where open_date < date_sub((select open_date from course_section" +
                " order by open_date asc limit 1),interval (select datediff('"+class_open_date+"',Now())-1) day))as A " +
                "where A.section_id not in " +
                "(select distinct B.section_id from " +
                "(select * from schedule_learn where user_id='"+user_id+"' and is_learn=1)as B) " +
                "order by A.open_date desc limit "+(page-1)*3+",3";
            // console.log('query_sql====',query_sql);
            query(query_sql,function (qerr,valls,fields) {
                if(qerr){
                    callback(qerr);
                }else{
                    callback(null,valls);
                }
            })
        }
    ], function (err,results) {
        if(err){
            Error.responseDataErr(res);
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


























