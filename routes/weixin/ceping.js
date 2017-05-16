/**
 * Created by jiangsong on 2017/5/15.
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

var APPLY_EVALUATION_URL = 'http://uat.api.i-select.cn/invitation';
var APPLY_REPORT_URL = 'http://uat.api.i-select.cn/report';
var HOST_NAME = 'uat.api.i-select.cn';
var SESSION_ID = 5041; //15FQ+  测验组为5041
// var base_str = 'cloud-wisdom-uat:FBC659BD-CC1F-424C-A389-4D512632EBCF';
// var base64_str = 'Y2xvdWQtd2lzZG9tLXVhdDpGQkM2NTlCRC1DQzFGLTQyNEMtQTM4OS00RDUxMjYzMkVCQ0Y=';

// var APPLY_EVALUATION_URL = '';
// var APPLY_REPORT_URL = '';

function responseDataErr(res) {
    var response = {
        status:0,
        data:{
            msg:'数据库执行错误'
        }
    }
    res.json(response);
}

function responseRequestErr(res) {
    var response = {
        status:0,
        data:{
            msg:'请求错误,请先查看测评链接，是否有未完成的测评！'
        }
    }
    res.json(response);
}
/**
 * 用来提交测评的
 *      参数：user_id
 *           name
 *           age
 *           gender
 *           email
 *           mobile
 *           session_id
 * */
router.post('/', function (req, res, next) {
    var user_id = req.body.user_id;
    var name = req.body.name;
    var age = req.body.age;
    var gender = req.body.gender;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var session_id = req.body.session_id;

    async.waterfall([
        //第一步：查询数据库数据，判断是否已经存在于善则系统中
        function(callback){
            var query_sql = "select candidate_unique_id  from request where user_id = '"+user_id+"'";
            query(query_sql, function (qerr, valls, fields) {
                if(qerr){
                    responseDataErr(res)
                }else{
                    //该用户存在于善则系统中
                    if(valls && valls.length>0){
                        var result = valls[0];
                        callback(null, result.candidate_unique_id);
                    }else {//该用户不存在于善则系统中
                        callback(null, '0');
                    }
                }
            })
        },
        //第二步：发起获取测评链接的请求
        function(arg1, callback){
            var postData = null;
            if(arg1 === '0'){
                var data = {
                    "SessionId":session_id,
                    "Candidates":[
                        {
                            "ExternalId":user_id,
                            "Name":name,
                            "Age":age,
                            "Gender":gender,
                            "Email":email,
                            "Mobile":mobile
                        }
                    ]
                }
                postData = data;
            }else{
                var data = {
                    "SessionId":session_id,
                    "Candidates":[
                        {
                            "CandidateUniqueId":arg1
                        }
                    ]
                }
                postData = data;
            }
            var options = {
                hostname:HOST_NAME,
                path:'/invitation',
                method:'POST',
                auth:'Authorization: Basic Y2xvdWQtd2lzZG9tLXVhdDpGQkM2NTlCRC1DQzFGLTQyNEMtQTM4OS00RDUxMjYzMkVCQ0Y='
            }
            var request = http.request(options, function (response) {
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    parseString(chunk, function (err, result) {
                        if(err || result==null || result.ErrorCode != -1){
                            responseRequestErr(res);
                        }else{
                            callback(null,result.RequestUniqueId);
                        }
                    })
                })
            })
            request.write(JSON.stringify(postData));
            request.on('error', function(e){
                console.log('错误：' + e.message);
            });
            request.end();
        },
        //第三步：将获取到的数据存储到数据库，用于后续操作
        function (arg1, callback) {
            var insert_sql = "insert into request(session_id,user_id,name,age,gender,email,mobile,request_unique_id,date_time) " +
                "values(" +
                    session_id+",'"+user_id+"','"+name+"',"+age+",'"+gender+"','"+email+"','"+mobile+"','"+arg1+"',Now()"+
                ")";
            query(insert_sql, function (qerr, valls, fields) {
                if(qerr){
                    responseDataErr(res);
                }else{
                    callback(null, arg1);
                }
            })
        }
    ], function (err, result) {
        if(err){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    request_unique_id:result
                }
            };
            res.json(response);
        }
    })
})
/**
 * 返回测评链接信息
 * 提供给善则系统回调，并传值回来
 * */
router.post('/get_link', function (req, res, next) {
    var linkBody = req.body;
    if(linkBody){
        var request_unique_id = linkBody.RequestUniqueId;
        var errorCode_out = linkBody.ErrorCode;

        var link = linkBody.InvitationLinks[0];

        var externalId = link.ExternalId;
        var candidate_unique_id = link.CandidateUniqueId;
        var respondent_uid = link.RespondentUid;
        var invitation_link = link.InvitationLink;

        var errorCode_in = link.ErrorCode;

        function returnShanZe(status) {
            var response = {
                status:status,
                data:linkBody
            }
            res.json(response);
        }

        if(errorCode_out != -1 || errorCode_in != -1){
            returnShanZe(0);
        }else{
            if(link){
                //将获取到的链接插入数据库
                var update_sql = "update request set " +
                    "candidate_unique_id='"+candidate_unique_id+"'," +
                    "respondent_uid='"+respondent_uid+"'," +
                    "invitation_link='"+invitation_link+"' " +
                    "where user_id='"+externalId+"' and " +
                    "request_unique_id='"+request_unique_id+"'" +
                    "";
                query(update_sql, function (qerr, valls, fields) {
                    if(qerr){
                        responseDataErr(res);
                    }else {
                        returnShanZe(1);
                    }
                })
            }else{
                returnShanZe(0);
            }
        }

    }else {
        responseDataErr(res);
    }
})
/**
 * 用户根据本地保存的 RequestUniqueId和user_id 查看测评链接
 *  参数：request_unique_id
 *       user_id
 * */
router.post('/look_link', function (req, res, next) {
    var user_id = req.body.user_id;
    var request_unique_id = req.body.request_unique_id;
    var check_sql = "select invitation_link from request where " +
        "user_id = '"+user_id+"' and " +
        "request_unique_id = '"+request_unique_id+"'";

    function returnMsg(msg) {
        var response = {
            status:1,
            data:{
                msg:msg
            }
        }
        res.json(response);
    }

    query(check_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            if(valls.length<=0){
                returnMsg('请先申请测评再查看链接。。。');
            }else{
                var link = valls[0];
                if(link.invitation_link == null || link.invitation_link == 'undefined'){
                    returnMsg('测评链接还未生成，请耐心等待，稍后查看。。。');
                }else{
                    returnMsg('测评链接：'+link.invitation_link);
                }
            }
        }
    })
})
/**
 * 在用户完成测评时返回，
 * 提供给善则系统回调
 * */
router.post('/complete', function (req, res, next) {
    var complete = req.body;

    function returnShanZe(status) {
        var response = {
            status:status,
            data:complete
        }
        res.json(response);
    }

    if(complete){
        var respondent_uid = complete.RespondentUid;
        //更新数据库
        var update_sql = "update request set is_complete_evaluation = 1 where " +
            "respondent_uid = '"+respondent_uid+"'";
        query(update_sql, function (qerr, valls, fields) {
            if(qerr){
                responseDataErr(res);
            }else{
                returnShanZe(1);
            }
        })
    }else{
        returnShanZe(0);
    }
})
/**
 * 申请报告链接
 *      参数  user_id
 *           request_unique_id
 *           report_uid 个人扩展报告、或者管理潜能发展报告
 *           norm_id 初中级管理人员、高级管理人员
 *           session_id
 * */
router.post('/report', function (req, res, next) {
    var user_id = req.body.user_id;
    var request_unique_id = req.body.request_unique_id;
    var report_uid = req.body.report_uid;
    var norm_id = req.body.norm_id;
    var session_id = req.body.session_id;

    async.waterfall([
        //首选根据user_id和request_unique_id查询到对应的respondent_uid
        function (callback) {
            var query_sql = "select respondent_uid from request where " +
                "user_id='"+user_id+"' and " +
                "request_unique_id='"+request_unique_id+"'";
            query(query_sql, function (qerr, valls, fields) {
                if(qerr){
                    responseDataErr(res);
                }else{
                    if(valls.length<=0){
                        responseDataErr(res);
                    }else{
                        callback(null, valls[0].respondent_uid);
                    }
                }
            })
        },
        //根据RespondentUid调用善则接口，申请报告
        function (respondent_uid, callback) {
            var postData = {
                "SessionId":session_id,
                "Reports":[
                    {
                        "ReportUid":report_uid,
                        "NormIds":[
                            norm_id
                        ],
                        "RespondentUids":[
                            respondent_uid
                        ]
                    }
                ]
            }
            var options = {
                hostname:HOST_NAME,
                path:'/report',
                method:'POST',
                auth:'Authorization: Basic Y2xvdWQtd2lzZG9tLXVhdDpGQkM2NTlCRC1DQzFGLTQyNEMtQTM4OS00RDUxMjYzMkVCQ0Y='
            }
            var request = http.request(options, function (response) {
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    parseString(chunk, function (err, result) {
                        if(err || result==null || result.ErrorCode != -1){
                            responseRequestErr(res);
                        }else{
                            callback(null,result.RequestUniqueId, respondent_uid);
                        }
                    })
                })
            })
            request.write(JSON.stringify(postData));
            request.on('error', function(e){
                console.log('错误：' + e.message);
            });
            request.end();
        },
        //将相关数据存储到数据库
        function (request_unique_id,respondent_uid, callback) {
            var insert_sql = "insert into report(respontent_uid,request_unique_id,date_time) values(" +
                "'"+respondent_uid+"','"+request_unique_id+"',Now()";
            query(insert_sql, function (qerr, valls, fields) {
                if(qerr){
                    responseDataErr(res);
                }else{
                    callback(null, {
                        respondent_uid:respondent_uid,
                        request_unique_id:request_unique_id
                    });
                }
            })
        }
    ], function (err, result) {
        if(err){
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:result
            }
            res.json(response);
        }
    })
})
/**
 * 返回报告的链接信息，
 * 用于善则系统回调
 * */
router.post('/get_report', function (req, res, next) {
    var report = req.body;

})

module.exports = router;