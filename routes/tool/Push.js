/**
 * Created by jiangsong on 2017/8/14.
 */

var query = require('../../db/DB');
var querystring = require('querystring');
var https = require('https');
var crypto = require('crypto');
var parseString = require('xml2js').parseString;
var Tool = require('./Tool');
var async = require('async');
var Error = require('./Error');
var APPConst = require('../const/APPConst');

function getAccessToken(callback) {

    //调用微信API获取access_token
    function getToken() {
        var options = {
            hostname:'api.weixin.qq.com',
            path:'/cgi-bin/token?grant_type=client_credential&appid='+APPConst.APPID+'&secret='+APPConst.APPSECRET,
            method:'GET',
            headers:{
                'Content-Type':'application/json; charset=utf-8'
            }
        }
        var request = https.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (response) {
                var receiveData = JSON.parse(response);
                var access_token = receiveData.access_token;
                console.log('这是请求返回的数据：', receiveData);
                //对获取到的access_token 进行存储
                var querry_sql = "update info_const2 set datetime=Now(), access_token='"+access_token+"'";
                query(querry_sql, function (qerr, valls, fields) {
                    if(qerr){
                        callback(qerr);
                    }else {
                        callback(null,access_token);
                    }
                })

            })
        })
        request.on('error', function(e){
            if(e){
                callback(e);
            }
        });
        request.end();
    }

    //查询数据库
    var query_sql = "select * from info_const2";

    query(query_sql,function (qerr,valls,fields) {
        if(qerr){
            Error.responseDataErr(res);
        }else{
            if(valls.length < 1){
                callback('err');
            }else{
                var info = valls[0];
                var token = info.access_token;
                if(token){
                    var left_second = (new Date()).getTime() - (new Date(info.datetime)).getTime();
                    if(left_second>7000*1000){
                        getToken();
                    }else {
                        callback(null,token);
                    }
                }else{
                    getToken();
                }
            }
        }
    })
}

function push(postData,token,callback) {
    var options = {
        hostname:'api.weixin.qq.com',
        path:'/cgi-bin/message/custom/send?access_token='+token,
        method:'POST',
        headers:{
            'Content-Type':'application/json; charset=utf-8',
            'Content-Length': postData.length
        }
    }
    var request = https.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (response) {
            var receiveData = JSON.parse(response);
            console.log('我接收到推送完的数据了：',receiveData);
            callback(null,receiveData);
        })
    })
    request.on('error', function(e){
        if(e){
            callback(e);
        }
    });
    request.write(postData);
    request.end();
}

module.exports = {

    pushText:function (user_id,content,fail,success) {
        //获取access_token
        async.waterfall([
            function (callback) {
                getAccessToken(function (err,access_token) {
                    if(err){
                        callback(err);
                    }else{
                        callback(null,access_token);
                    }
                })
            },
            function (token,callback) {
                var postData = JSON.stringify({
                                                "touser":user_id,
                                                "msgtype":"text",
                                                "text":
                                                    {
                                                        "content":"This is a push message"
                                                    }
                                            });
                console.log('推送信息的主体：',postData);

                push(postData,token,callback);
                // var options = {
                //     hostname:'api.weixin.qq.com',
                //     path:'/cgi-bin/message/custom/send?access_token='+token,
                //     method:'POST',
                //     headers:{
                //         'Content-Type':'application/json; charset=utf-8',
                //         'Content-Length': postData.length
                //     }
                // }
                // var request = https.request(options, function (response) {
                //     response.setEncoding('utf8');
                //     response.on('data', function (response) {
                //         var receiveData = JSON.parse(response);
                //         console.log('我接收到推送完的数据了：',receiveData);
                //         callback(null,receiveData);
                //     })
                // })
                // request.on('error', function(e){
                //     if(e){
                //         callback(e);
                //     }
                // });
                // request.write(postData);
                // request.end();
            }
        ],function (err,result) {
            if(err){
                fail(err);
            }else {
                success(result);
            }
        })
    },

    pushGraphic:function (user_id,content,fail,success) {
        async.waterfall([
            function (callback) {
                getAccessToken(function (err,access_token) {
                    if(err){
                        callback(err);
                    }else{
                        callback(null,access_token);
                    }
                })
            },
            function (token,callback) {
                var postData = JSON.stringify({
                    "touser":user_id,
                    "msgtype":"news",
                    "news":{
                        "articles": [
                            {
                                "title":"您有一条新的课程需要学习了，哈哈哈",
                                "description":"小组制管理是怎么样的呢？？？",
                                "url":APPConst.APP_ENTER_URL,
                                "picurl":"....."
                            }
                        ]
                    }
                });
                console.log('推送信息的主体：',postData);

                push(postData,token,callback);

            }
        ],function (err,result) {
            if(err){
                fail(err);
            }else {
                success(result);
            }
        })
    }

}