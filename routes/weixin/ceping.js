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
var SESSION_ID = 5041; //15FQ+  测验组为5041

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
/**
 * 用来提交测评的
 *      参数：user_id
 *           name
 *           age
 *           gender
 *           email
 *           mobile
 * */
router.post('/', function (req, res, next) {
    var user_id = req.body.user_id;
    var name = req.body.name;
    var age = req.body.age;
    var gender = req.body.gender;
    var email = req.body.email;
    var mobile = req.body.mobile;

    async.waterfall([

    ], function (err, result) {
        
    })

    //从数据库查询，看该用户是否存在于善则系统中
    var query_sql = "select candidate_unique_id  from request where user_id = '"+user_id+"'";
    query(query_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res)
        }else{
            //该用户存在于善则系统中
            if(valls && valls.length>0){

            }else {//该用户不存在于善则系统中

            }
        }
    })

    var data = {
        "SessionId":SESSION_ID,
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
    var base_str = 'cloud-wisdom-uat:FBC659BD-CC1F-424C-A389-4D512632EBCF';
    var base64_str = 'Y2xvdWQtd2lzZG9tLXVhdDpGQkM2NTlCRC1DQzFGLTQyNEMtQTM4OS00RDUxMjYzMkVCQ0Y=';
    var options = {
        hostname:'uat.api.i-select.cn',
        path:'/invitation',
        method:'POST',
        auth:'Authorization: Basic Y2xvdWQtd2lzZG9tLXVhdDpGQkM2NTlCRC1DQzFGLTQyNEMtQTM4OS00RDUxMjYzMkVCQ0Y='
    }
    var request = http.request(options, function (response) {

    })
    request.write(JSON.stringify(data));
    request.on('error', function(e){
        console.log('错误：' + e.message);
    });
    request.end();
})