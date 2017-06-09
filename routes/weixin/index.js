/**
 * Created by Administrator on 2017/3/28 0028.
 */
var express = require('express');
var router = express.Router();

var query = require('../../db/DB');
var Course = require('../../model/course');
var Section = require('../../model/section');

var http = require('https');
var querystring = require('querystring');

var crypto = require('crypto');
var parseString = require('xml2js').parseString;

var async = require('async');

var APPID = 'wxcb05ae4237186327'; //旧
var APPSECRET = '059aead1e040418e4c9cbc1d71675390';

// var APPID = 'wxb2aff2a51a4bdb8e'; //新
// var APPSECRET = 'e691bcd73215de7bdc8dfecd150f9fe2';

/* GET weixin page. */
router.get('/main', function(req, res, next) {

    // 获取code
    var code = req.query.code;
    //获取openid和access_token
    /**
     * 返回值类型:
     *    access_token: 'dZRpywwd-HL_ek_eRd2asqS9NueI8MTAkqhct3WT2f5RKaCWWas3r7Mg3EXiOFev0KJ8hRG0fVSgVCwjmnLkpqLSEqHI3udEim5UMI3THpg',
          expires_in: 7200,
          refresh_token: 'RJYmcQY0BxTQx-_4Ep2tB08LEs7azxdvw1j8eX2ZGes2JOnUzJd1a1T1_0e-APghjAgGmUkck89RiCZD_92ZfjMV7mckprMwdF7baObMkFc',
          openid: 'oyMAaxN1hGZuki6cOvwF6OSQ-Ahs',
          scope: 'snsapi_userinfo'
     * */
    var data = querystring.stringify({
        appid:APPID,
        secret:APPSECRET,
        code:code,
        grant_type:'authorization_code'
    });
    var options = {
        hostname:'api.weixin.qq.com',
        path:'/sns/oauth2/access_token?'+data,
        method:'GET'
    };
    var request = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data',function(chunk){
            var returnData = JSON.parse(chunk);

            /**
             * 获取用户信息
             * openid: 'oyMAaxN1hGZuki6cOvwF6OSQ-Ahs',
               nickname: '嵩',
               sex: 1,
               language: 'zh_CN',
               city: '',
               province: '上海',
               country: '中国',
               headimgurl: 'http://wx.qlogo.cn/mmopen/vGr0icmOt61otib1wVxO7KLE0tVZsFI6aXSS8Nw4mia3YnicDq6KQo5D5MfhiclvsicWclYf4aoiayIr2kX5lFGpibZ1fTE9SLMTxHwj/0',
               privilege: []
             * */
            var access_token = returnData.access_token;
            var openid = returnData.openid;

            var user_data = querystring.stringify({
                access_token:access_token,
                openid:openid,
                lang:'zh_CN'
            });
            var user_options = {
                hostname:'api.weixin.qq.com',
                path:'/sns/userinfo?'+user_data,
                method:'GET'
            };
            var userRequest = http.request(user_options, function (response) {
                response.setEncoding('utf8');
                response.on('data', function(chunk){
                    var userData = JSON.parse(chunk);
                    /**
                     * 判断是否登陆过,如果没有登陆过,将用户信息写入数据库,如果登陆过,根据微信返回内容更新用户信息
                     * */
                    var user_id = userData.openid;
                    var nickname = userData.nickname;
                    var sex = userData.sex;
                    var headimgurl = userData.headimgurl;

                    var query_sql = "select * from user where user_id = '" + user_id + "'";
                    var insert_sql = "insert into user(user_id,is_member,member_datetime,nickname,sex,headimgurl) values('"+user_id+"',0,0,'"+nickname+"',"+sex+",'"+headimgurl+"')";
                    var update_sql = "update user set nickname='"+nickname+"',sex="+sex+",headimgurl='"+headimgurl+"' where user_id='"+user_id+"'";

                    query(query_sql, function (qerr, valls, fields) {
                        if(qerr){
                            // console.log('查询失败userData:'+userData+'----time:'+new Date());
                        }else{
                            if(valls.length>0){//存在该用户数据,更新
                                query(update_sql, function (qerr, valls, fields) {
                                    if(qerr){
                                        // console.log('查询到用户更新失败userData:'+userData+'----time:'+new Date());
                                    }else{

                                    }
                                })
                            }else{//不存在该用户的数据,插入
                                query(insert_sql, function (qerr, valls, fields) {
                                    if(qerr){
                                        // console.log('没有查询到用户插入失败userData:'+userData+'----time:'+new Date());
                                    }else{

                                    }
                                })
                            }
                            res.render('weixin',{user_id:user_id, access_token:access_token});
                        }
                    })
                })
            })
            userRequest.on('error', function(e){
                // console.log('错误：' + e.message);
            });
            userRequest.end();
        });
    })
    request.on('error', function(e){
        // console.log('错误：' + e.message);
    });
    request.end();

    // res.render('weixin',{user_id:'oyMAaxN1hGZuki6cOvwF6OSQ-Ahs'});
});

/**
 * 支付客户端签名
 * 参数: access_token
 *      jsapi_ticket
 * */
router.post('/main/pay/getsign', function (req, res, next) {
    
    var url = req.body.location_url;

    function sha1 (text) {
        return crypto.createHash('sha1').update(text, 'utf8').digest('hex');
    }

    function paySign(jsapi_ticket){
        var timestamp = parseInt(Date.parse(new Date())/1000).toString();
        var nonceStr = 'onedrop' + parseInt(Math.random()*1000000);
        var beforeSignStr = 'jsapi_ticket='+jsapi_ticket+'&noncestr='+nonceStr+'&timestamp='+timestamp+'&url='+url;
        var signature = sha1(beforeSignStr);
        var response = {
            status:1,
            data:{
                timestamp:timestamp,
                nonceStr:nonceStr,
                signature:signature
            }
        }
        res.json(response);
    }

    //从网络获取jsapi_ticket
    function getTicket(isExist) {
        var token_options = {
            hostname:'api.weixin.qq.com',
            path:'/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET,
            method:'GET'
        }
        var token_request = http.request(token_options, function (token_response) {
            token_response.setEncoding('utf8');
            token_response.on('data', function (token_res) {
                var receive_token = JSON.parse(token_res);
                // console.log('receive_token', receive_token);

                var access_token = receive_token.access_token;

                var options = {
                    hostname:'api.weixin.qq.com',
                    path:'/cgi-bin/ticket/getticket?access_token='+access_token+'&type=jsapi',
                    method:'GET'
                }
                var request = http.request(options, function (response) {
                    response.setEncoding('utf8');
                    response.on('data', function (response) {
                        var receiveData = JSON.parse(response);
                        // console.log('receiveData:', receiveData);
                        var jsapi_ticket = receiveData.ticket;
                        // var timestamp = parseInt(Date.parse(new Date())/1000).toString();
                        // var nonceStr = 'onedrop' + parseInt(Math.random()*1000000);
                        // var beforeSignStr = 'jsapi_ticket='+jsapi_ticket+'&noncestr='+nonceStr+'&timestamp='+timestamp+'&url='+url;
                        // var signature = sha1(beforeSignStr);

                        //对获取到的access_token 和  jsapi_ticket  进行存储
                        var querry_sql = "update info_const set datetime=Now(), access_token='"+access_token+"',jsapi_ticket='"+jsapi_ticket+"'";
                        if(!isExist){
                            querry_sql = "insert into info_const(datetime,access_token,jsapi_ticket) values(" +
                                "Now(),'"+access_token+"','"+jsapi_ticket+"')";
                        }
                        // console.log('querry_sql:缓存微信数据',querry_sql);
                        query(querry_sql, function (qerr, valls, fields) {
                            if(qerr){
                                // console.log('qerr:',qerr);
                            }else {
                                paySign(jsapi_ticket);
                            }
                        })

                    })
                })
                request.on('error', function(e){
                    // console.log('错误：' + e.message);
                });
                request.end();
            })
        })
        token_request.on('error', function(e){
            // console.log('错误：' + e.message);
        });
        token_request.end();
    }

    var query_sql = "select * from info_const";
    query(query_sql, function (qerr, valls, fields) {
        if(qerr){
            // getTicket();
            responseDataErr(res);
        }else{
            if(valls.length>0){
                var info = valls[0];
                var left_second = (new Date()).getTime() - (new Date(info.datetime)).getTime();

                if(left_second >= 7000*1000){
                    getTicket(true);
                }else{
                    paySign(info.jsapi_ticket);
                }
            }else{
                getTicket(false);
            }
        }
    })

})

/**
 * 获取全部课程列表
 * */
router.get('/main/getcourse', function (req, res, next) {

    var query_sql = "select * from course order by course_id desc";

    query(query_sql, function(qerr, valls, fields){
        var courses = [];

        valls.map(function(val){
            var course = new Course();
            course.course_id = val.course_id;
            course.title = val.title;
            course.background_image = val.background_image;
            course.price = val.price;
            course.introduction = val.introduction;
            course.author = val.author;
            courses.push(course);
        });
        var respose  = {
            status:1,
            data:{
                courses:courses
            }
        }
        res.json(respose);
    })
    
    
});

/**
 * 判断是否是会员
 * 参数:  user_id
 * 返回值: is_member  0 非会员  1 会员
 * */
router.post('/main/user/is_member', function (req, res, next) {
    var user_id = req.body.user_id;
    // console.log('user_id:', user_id);
    var ismember_sql = "select * from user where user_id = '" + user_id +"'";
    query(ismember_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0,
                data:{
                    msg:'数据库执行失败'
                }
            }
            res.json(response);
        }else{
            if(valls.length<=0){
                var response = {
                    status:0,
                    data:{
                        msg:'数据库异常'
                    }
                }
                res.json(response);
            }else{
                var user = valls[0];
                var is_member = user.is_member;
                var response = {
                    status:1,
                    data:{
                        is_member:is_member
                    }
                }
                res.json(response);
            }
        }
    })
})

/**判断user是否是会员,返回查询结果,如果不存在该用户,将该用户信息插入表
 * 返回字段:status 1:已经存在该用户,返回是否是会员的结果
 *              2:不存在该用户,创建用户,
 * */
router.post('/main/adduser', function (req, res, next) {

    var user_id = req.body.user_id;

    var search_sql = "select * from user where user_id='"+user_id+"'";
    var add_sql = "insert into user values('" +user_id+"',0,0);";

    query(search_sql, function (qeer, valls, fields) {
        if(qeer){
            // console.log(qeer);
        }else {
            if(valls.length>0){
                //已经存在该user_id的用户
                var user = valls[0];
                var is_member = user.is_member;

                var response = {
                    status:1,
                    data:{
                        is_member:is_member
                    }
                }
                res.json(response);
            }else{
                //该user_id的用户不存在,插入数据库创建新用户
                query(add_sql, function (qeer, valls, fields) {
                    if(qeer){

                    }else{
                        // console.log('新用户创建成功!'+user_id);
                        var response = {
                            status:2,
                            data:{}
                        }
                        res.json(response);
                    }
                })
            }
        }
    })
});

/**
 * 非会员用户购买呢课程
 * 参数: user_id   course_id
 * 返回: status  0 失败    1 成功
 * */
router.post('/main/buy_course', function (req, res, next) {
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    // console.log('购买课程,支付成功记录-- user_id:'+user_id+'   course_id:'+course_id+'   time:'+ new Date());
    //获取表中order_id最大的字段
    var get_max_sql = "SELECT * FROM order_course ORDER BY order_id DESC LIMIT 1";
    query(get_max_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0
            }
            res.json(response);
        }else{
            var order_sql = "INSERT INTO order_course VALUES(1,'"+user_id+"',"+course_id+",NOW()";
            if(valls.length<=0){
                //数据库没有订单,则插入订单编号从1开始
            }else{
                var order = valls[0];
                var max = order.order_id;
                var new_max = max + 1;
                order_sql = "INSERT INTO order_course VALUES("+new_max+",'"+user_id+"',"+course_id+",NOW())";
            }
            query(order_sql, function (qerr, valls, fields) {
                if(qerr){
                    var response = {
                        status:0
                    }
                    res.json(response);
                }else{
                    var response = {
                        status:1
                    }
                    res.json(response);
                }
            })
        }
    })
})

/**
 * 判断非会员用户是否购买课程
 * 参数: user_id  course_id
 * 返回值: is_buy : 0 没有购买, 1 已经购买
 * */
router.post('/main/is_buy', function (req, res, next) {
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;

    var is_buy_sql = "select * from order_course where user_id='"+user_id+"' and course_id="+course_id;

    query(is_buy_sql, function (qerr, valls, fields) {
        if(qerr){

        }else{
            if(valls.length>0 && valls[0].buy_done == 1){
                var response = {
                    status:1,
                    data:{
                        is_buy:1
                    }
                }
                res.json(response);
            }else{
                var response = {
                    status:1,
                    data:{
                        is_buy:0
                    }
                }
                res.json(response);
            }
        }
    })

})

/**
 * 获取课程介绍
 * 参数: user_id   course_id
 * status:1  返回课程详情
 * status:2  返回课程的学习记录
 * */
router.post('/main/getcoursedetail', function (req, res, next) {

    var user_id = req.body.user_id;
    var course_id = req.body.course_id;

    //查询课程详情
    var course_sql = "select * from course where course_id =" + course_id;
    //查询课程学习进度
    var schedule_sql = "select * from course_schedule where course_id = " + course_id + " and user_id = '" + user_id+"'" ;
    //查询章节详情
    var section_sql = "select * from course_section where course_id = " + course_id +" order by chapter_num, section_num";
    query(schedule_sql, function (qerr, valls, fields) {
        if(qerr){

        }else{
            var single = false;//说明没有学习过
            if(valls.length<=0){

            }else{
                if(valls[0].course_section_id === 0){

                }else{
                    single = true;
                }
            }

            if(single){
                //已经学习过该课程,显示学习界面
                var schedule = valls[0];
                var progress = schedule.course_section_id;
                
                var response = {
                    status:2,
                    data:{
                        progress:progress
                    }
                }
                res.json(response);
            }else{
                //没有该课程的学习记录
                query(course_sql, function (qerr, valls, fields) {
                    if(qerr){

                    }else{
                        var course = valls[0];
                        query(section_sql, function (qerr, valls, fields) {
                            if(qerr){
                                var response = {
                                    status:0,
                                    data:{
                                        msg:'数据库执行错误'
                                    }
                                }
                                res.json(response);
                            }else{
                                var courseData = [];
                                var single = true;
                                var index = valls[0].chapter_num;
                                while (single){
                                    var chapterData = [];
                                    valls.map(function (section) {
                                        if(section.chapter_num === index){
                                            chapterData.push(section);
                                        }
                                    })
                                    index++;
                                    if(chapterData.length <= 0){
                                        single = false;
                                    }else {
                                        courseData.push(chapterData);
                                    }
                                }

                                var response = {
                                    status:1,
                                    data:{
                                        course:course,
                                        chapters:courseData
                                    }
                                }
                                res.json(response);
                            }
                        })
                    }
                })
            }
        }
    })

});

/**
 * 获取课程的每个章节,并能体现当前的学习进度
 * 接收字段:
 *        course_id
 *        user_id
 * */
router.post('/main/getsection', function(req, res, next){
    
    var course_id = req.body.course_id;
    var user_id = req.body.user_id;
    
    // var section_sql = "select * from course_section where course_id = " + course_id +" order by chapter_num, section_num";
    var course_sql = "select detail_bg_image from course where course_id = " + course_id;

    // var section_sql = "select a.*,b.is_learn from (" +
    //     "(select * from course_section)as a left join " +
    //     "(select user_id,section_id,is_learn from schedule_learn)as b " +
    //     "on a.section_id = b.section_id) " +
    //     "where course_id="+course_id+" and user_id='"+user_id+"' order by chapter_num, section_num";

    var section_sql = "select (Now()>a.open_date)is_open,a.*,b.is_learn from (" +
        "(select * from course_section)as a left join " +
        "(select user_id,section_id,is_learn from schedule_learn where user_id='"+user_id+"')as b " +
        "on a.section_id = b.section_id) " +
        "where a.course_id="+course_id+" order by a.chapter_num, a.section_num";

    // console.log('section_sql:', section_sql);

    query(section_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0,
                data:{
                    msg:'数据库执行错误1'
                }
            }
            res.json(response);
        }else{
            var courseData = [];
            var single = true;
            var index = valls[0].chapter_num;
            while (single){
                var chapterData = [];
                valls.map(function (section) {
                    if(section.chapter_num === index){
                        chapterData.push(section);
                    }
                })
                index++;
                if(chapterData.length <= 0){
                    single = false;
                }else {
                    courseData.push(chapterData);
                }
            }
            
            query(course_sql, function (qerr, valls, fields) {
                if(qerr){
                    var response = {
                        status:0,
                        data:{
                            msg:'数据库执行错误2'
                        }
                    }
                    res.json(response);
                }else{
                    var course_image = '';
                    if(valls.length>0){
                        course_image = valls[0].detail_bg_image;
                    }
                    var response = {
                        status:1,
                        data:{
                            chapters:courseData,
                            course_image:course_image
                        }
                    }
                    res.json(response);
                }
            })


        }
    })
});

/**
 * 获取章节的详细信息
 * 参数: section_id
 * */
router.post('/main/one_section', function (req, res, next) {
    var section_id = req.body.section_id;

    var search_sql = "select * from course_section where section_id = "+section_id;

    query(search_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0,
                data:{
                    msg:'数据库查询失败'
                }
            }
            res.json(response);
        }else{
            var section = valls[0];
            var response = {
                status:1,
                data:{
                    section:section
                }
            }
            res.json(response);
        }
    })
})

/**
 * 成为会员,支付成功后调用接口
 * 参数: user_id
 * */
router.post('/main/bemember', function (req, res, next) {
    var user_id = req.body.user_id;

    var user_sql = "update user set is_member = 1, member_datetime = now() where user_id = '" + user_id+"'";
    // console.log('成为会员:'+user_id+'   '+ new Date());
    query(user_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0
            }
            res.json(response);
        }else{
            var response = {
                status:1
            }
            res.json(response);
        }
    })
});

/**
 * 点击我要学习按钮, 在course_schedule表,增加一条记录
 * 参数: user_id   course_id
 * */
router.post('/main/section/tolearn', function(req, res, next){
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;

    var is_learn_sql = "select * from course_schedule where user_id = '"+user_id+"' and course_id = "+course_id;
    var tolearn_sql = "insert into course_schedule values('"+user_id+"',"+course_id+",0)";

    query(is_learn_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0,
                data:{
                    msg:'判断是否学习过课程,数据库查询失败!'
                }
            }
            res.json(response);
        }else{
            if(valls.length<=0){
                query(tolearn_sql, function (qerr, valls, fields) {
                    if(qerr){
                        var response = {
                            status:0,
                            data:{
                                msg:'插入数据失败'
                            }
                        }
                        res.json(response);
                    }else{
                        var response = {
                            status:1,
                            data:{
                                msg:'数据插入成功!'
                            }
                        }
                        res.json(response);
                    }
                })
            }else{
                var response = {
                    status:1,
                    data:{
                        msg:'已经存在该条数据!!!'
                    }
                }
                res.json(response);
            }
        }
    })

});

/**
 * 点击某一个课程学习, 更新course_schedule 表
 * 参数: user_id  course_id  course_section_id
 * */
router.post('/main/section/learn', function (req, res, next) {
    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    var course_section_id = req.body.course_section_id;

    var search_sql = "select * from course_schedule where user_id='"+user_id+"' and course_id="+course_id;
    var search2_sql = "select * from schedule_learn where user_id='"+user_id+"' and section_id = "+course_section_id;
    var learn_sql = "update course_schedule set course_section_id="+course_section_id+" where user_id='"+user_id+"' and course_id="+course_id;
    var insert_sql = "insert into schedule_learn values('"+user_id+"',"+course_section_id+",1,Now())";

    query(search_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0,
                data:{
                    msg:'查询数据失败!'
                }
            }
        }else{
            if(valls.length<=0){
                var response = {
                    status:1,
                    data:{
                        msg:'没有学习新课程!'
                    }
                }
                res.json(response);
            }else {
                query(learn_sql, function (qerr, valls, fields) {
                    if(qerr){
                        var response = {
                            status:0,
                            data:{
                                msg:'获取数据失败!'
                            }
                        }
                        res.json(response);
                    }else{
                        query(insert_sql, function (qerr, valls, fields) {
                            if(qerr){
                                var response = {
                                    status:0,
                                    data:{
                                        msg:'获取数据失败!'
                                    }
                                }
                                res.json(response);
                            }else {
                                var response = {
                                    status:1,
                                    data:{
                                        msg:'数据更新成功!'
                                    }
                                }
                                res.json(response);
                            }
                        })
                    }
                })
            }
        }
    })
});

/**
 * 提交评论
 * 参数: user_id  section_id  comment
 * */
router.post('/main/section/comment', function (req, res, next) {
    var comment_id = 0;
    var user_id = req.body.user_id;
    var section_id = req.body.section_id;
    var comment = req.body.comment;

    var search_sql = "select * from comment order by comment_id desc limit 1";
    var insert_sql = "";

    query(search_sql, function (qerr, valls, fields) {
        if(qerr){
            var response = {
                status:0,
                data:{
                    msg:'数据库查询失败'
                }
            }
            res.json(response);
        }else{
            if(valls.length>0){
                var new_max = valls[0].comment_id + 1;
                comment_id = new_max;
            }else{
                comment_id = 1;
            }
            insert_sql = "insert into comment(comment_id,user_id,section_id,comment,datetime) values("+comment_id+",'"+user_id+"',"+section_id+",'"+comment+"',now())";
            query(insert_sql, function (qerr, valls, fields) {
                if(qerr){
                    var response = {
                        status:0,
                        data:{
                            msg:'数据插入失败'
                        }
                    }
                    res.json(response);
                }else{
                    var response = {
                        status:1,
                        data:{
                            msg:'数据插入成功!'
                        }
                    }
                    res.json(response);
                }
            })
        }
    })
});

/**
 * 获取小节的所有评论
 * 参数: section_id  89
 * */
router.post('/main/section/get_comment', function (req, res, next) {
    var section_id = req.body.section_id;

    // var search_sql = "select * from comment where section_id = " + section_id + " order by datetime desc";
    // var user_sql= "select nickname,headimgurl from user where user_id = (select user_id from comment where section_id = "+section_id+" order by datetime desc)";
    var union_sql = "select year(comment.datetime)year,month(comment.datetime)month,day(comment.datetime)day,hour(comment.datetime)hour,minute(comment.datetime)minute,second(comment.datetime)second," +
        "comment.comment_id,comment.comment,comment.is_checked, user.nickname, user.headimgurl from comment, user " +
        "where comment.section_id = "+section_id+" and user.user_id = comment.user_id order by comment.datetime desc";
    // console.log('小节评论union_sql:', union_sql);
    function showErr() {
        var response = {
            status:0,
            data:{
                msg:'数据库执行错误'
            }
        }
        res.json(response);
    }
    query(union_sql, function (qerr, valls, fields) {
        if(qerr){
            showErr();
        }else{
            var response = {
                status:1,
                data:valls
            }
            res.json(response);
        }
    })
})

/**
 * 微信支付测试接口
 * 参数: 商品body
 *支付场景:
 *          1、非会员用户购买课程,参数: user_id course_id
 *          2、商品价格,单位为分 price
 * */
//支付接口: https://api.mch.weixin.qq.com/pay/unifiedorder
router.post('/main/real/pay/', function (req, res, next) {

    var user_id = req.body.user_id;
    var course_id = req.body.course_id;
    var price = req.body.price;
    //根据购买情况查询数据库
    var query_sql = "select * from order_course where user_id = '"+user_id+"' and course_id = "+course_id;

    function md5 (text) {
        return crypto.createHash('md5').update(text).digest('hex').toUpperCase();
    }
    //生成随机数
    var nonce_str = 'onedrop' + parseInt(Math.random()*1000000);

    var payFun = function (order_id) {

        var allStr = "appid="+APPID+"&body=云谷慧-课程&device_info=WEB&mch_id=1316080301&nonce_str="+nonce_str+"&notify_url=www.cvwisdom.com/weixin/main/real/pay/back&openid="+user_id+"&out_trade_no="+order_id+"&spbill_create_ip=119.23.24.122&total_fee="+price+"&trade_type=JSAPI&key=YunGuHuiDavid778Tai18317018605Gu"
        var sign  = md5(allStr);
        // console.log('allStr:', allStr);
        // console.log('sign',sign);
        var data = {
            appid:APPID,
            mch_id:'1316080301',
            device_info:'WEB',
            nonce_str:nonce_str,
            sign:sign,
            body:'云谷慧-课程',
            out_trade_no:order_id,//商户订单号:
            total_fee:price,//商品价格,单位为分,不能有小数
            spbill_create_ip:'119.23.24.122',
            notify_url:'www.cvwisdom.com/weixin/main/real/pay/back',
            trade_type:'JSAPI',
            openid:user_id
        };

        var xmlData = "<xml><appid>"+APPID+"</appid>" +
            "<mch_id>1316080301</mch_id>" +
            "<device_info>WEB</device_info>" +
            "<nonce_str>"+nonce_str+"</nonce_str>" +
            "<sign>"+sign+"</sign>" +
            "<body>云谷慧-课程</body>" +
            "<out_trade_no>"+order_id+"</out_trade_no>" +
            "<total_fee>"+price+"</total_fee>" +
            "<spbill_create_ip>119.23.24.122</spbill_create_ip>" +
            "<notify_url>www.cvwisdom.com/weixin/main/real/pay/back</notify_url>" +
            "<trade_type>JSAPI</trade_type>" +
            "<openid>"+user_id+"</openid></xml>"

        // console.log('xmlData:', xmlData);

        var options = {
            hostname:'api.mch.weixin.qq.com',
            path:'/pay/unifiedorder',
            method:'POST'
        };
        var request = http.request(options,function (response) {
            response.setEncoding('utf8');
            response.on('data', function(chunk) {
                // console.log(chunk);
                parseString(chunk, function (err, result) {
                    // console.log('-----------------------------------------');
                    // console.log('result:',result);
                    var receiveData = result.xml;
                    if(receiveData.result_code[0] == 'SUCCESS'){
                        var update_sql = "update order_course set buy_done = 1 where order_id = '" + order_id +"'";
                        query(update_sql, function (qerr, valls, fields) {
                            if(qerr){
                                var response = {
                                    status:0,
                                    data:receiveData
                                }
                                res.json(response);
                            }else{
                                var response = {
                                    status:1,
                                    data:receiveData
                                }
                                res.json(response);
                            }
                        })
                    }else{
                        var response = {
                            status:0,
                            data:receiveData
                        }
                        res.json(response);
                    }
                })

            })
        });
        request.write(xmlData);
        request.on('error', function(e){
            // console.log('错误：' + e.message);
        });
        request.end();
    }

    query(query_sql, function (qerr, valls, fields) {
        // console.log('query:',query_sql);
        if(qerr){
            // console.log('sql err');
            var response = {
                status:0,
                data:{
                    msg:'数据库执行错误'
                }
            }
            res.json(response);
        }else{
            //商品订单号生成规则
            var order_id = new Date().getTime() + '' + parseInt(Math.random()*10000) + '' + parseInt(Math.random()*10000);
            //如果数据库里面已经有该订单信息,则使用原来的订单号,如果没有则生成新的订单号,并在数据库插入一条订单信息
            if(valls.length>0){
                var order = valls[0];
                order_id = order.order_id;
                payFun(order_id);
            }else{
                // console.log('查询不到数据,插入数据');
                var insert_sql = "insert into order_course values('"+order_id+"','"+user_id+"',"+course_id+",Now(),0)";
                query(insert_sql, function (qerr, valls, fields) {
                    if(qerr){
                        var response = {
                            status:0,
                            data:{
                                msg:'数据库执行失败'
                            }
                        }
                        // console.log('数据库插入失败');
                        res.json(response);
                    }else{
                        // console.log('数据库执行成功了,要去支付了。。。');
                        // console.log('orderId:',order_id);
                        payFun(order_id);
                    }
                })
            }
        }
    })
});
/**
 * 微信支付测试接口
 * 参数: 商品body
 *支付场景:
 *          1、非会员用户购买会员,参数: user_id
 *          2、商品价格,单位为分 price
 * */
//支付接口: https://api.mch.weixin.qq.com/pay/unifiedorder
router.post('/main/real/pay_member/', function (req, res, next) {
    var user_id = req.body.user_id;
    var price = req.body.price;
    //根据购买情况查询数据库
    var query_sql = "select * from order_member where user_id = '"+user_id+"'";

    function md5 (text) {
        return crypto.createHash('md5').update(text).digest('hex').toUpperCase();
    }
    //生成随机数
    var nonce_str = 'onedrop' + parseInt(Math.random()*1000000);

    var payFun = function (order_id) {

        var allStr = "appid="+APPID+"&body=云谷慧-会员&device_info=WEB&mch_id=1316080301&nonce_str="+nonce_str+"&notify_url=www.cvwisdom.com/weixin/main/real/pay/member_back&openid="+user_id+"&out_trade_no="+order_id+"&spbill_create_ip=119.23.24.122&total_fee="+price+"&trade_type=JSAPI&key=YunGuHuiDavid778Tai18317018605Gu"
        var sign  = md5(allStr);
        var data = {
            appid:APPID,
            mch_id:'1316080301',
            device_info:'WEB',
            nonce_str:nonce_str,
            sign:sign,
            body:'云谷慧-会员',
            out_trade_no:order_id,//商户订单号:
            total_fee:price,//商品价格,单位为分,不能有小数
            spbill_create_ip:'119.23.24.122',
            notify_url:'www.cvwisdom.com/weixin/main/real/pay/member_back',
            trade_type:'JSAPI',
            openid:user_id
        };

        var xmlData = "<xml><appid>"+APPID+"</appid>" +
            "<mch_id>1316080301</mch_id>" +
            "<device_info>WEB</device_info>" +
            "<nonce_str>"+nonce_str+"</nonce_str>" +
            "<sign>"+sign+"</sign>" +
            "<body>云谷慧-会员</body>" +
            "<out_trade_no>"+order_id+"</out_trade_no>" +
            "<total_fee>"+price+"</total_fee>" +
            "<spbill_create_ip>119.23.24.122</spbill_create_ip>" +
            "<notify_url>www.cvwisdom.com/weixin/main/real/pay/member_back</notify_url>" +
            "<trade_type>JSAPI</trade_type>" +
            "<openid>"+user_id+"</openid></xml>"

        // console.log('xmlData:', xmlData);

        var options = {
            hostname:'api.mch.weixin.qq.com',
            path:'/pay/unifiedorder',
            method:'POST'
        };
        var request = http.request(options,function (response) {
            response.setEncoding('utf8');
            response.on('data', function(chunk) {
                console.log(chunk);
                parseString(chunk, function (err, result) {
                    // console.log('-----------------------------------------');
                    // console.log('result:',result);
                    var receiveData = result.xml;
                    if(receiveData.result_code[0] == 'SUCCESS'){
                        var update_sql = "update order_member O, user U set O.buy_done = 1, U.is_member = 1 where O.order_id = '" + order_id +"' and U.user_id = '"+user_id+"'";
                        query(update_sql, function (qerr, valls, fields) {
                            if(qerr){
                                var response = {
                                    status:0,
                                    data:receiveData
                                }
                                res.json(response);
                            }else{
                                var response = {
                                    status:1,
                                    data:receiveData
                                }
                                res.json(response);
                            }
                        })
                    }else{
                        var response = {
                            status:0,
                            data:receiveData
                        }
                        res.json(response);
                    }

                })

            })
        });
        request.write(xmlData);
        request.on('error', function(e){
            // console.log('错误：' + e.message);
        });
        request.end();
    }

    query(query_sql, function (qerr, valls, fields) {
        // console.log('query:',query_sql);
        if(qerr){
            // console.log('sql err');
            var response = {
                status:0,
                data:{
                    msg:'数据库执行错误'
                }
            }
            res.json(response);
        }else{
            //商品订单号生成规则
            var order_id = new Date().getTime() + '' + parseInt(Math.random()*10000) + '' + parseInt(Math.random()*10000);
            //如果数据库里面已经有该订单信息,则使用原来的订单号,如果没有则生成新的订单号,并在数据库插入一条订单信息
            if(valls.length>0){
                var order = valls[0];
                order_id = order.order_id;
                payFun(order_id);
            }else{
                // console.log('查询不到数据,插入数据');
                var insert_sql = "insert into order_member values('"+order_id+"',Now(),'"+user_id+"',0)";
                query(insert_sql, function (qerr, valls, fields) {
                    if(qerr){
                        var response = {
                            status:0,
                            data:{
                                msg:'数据库执行失败'
                            }
                        }
                        // console.log('数据库插入失败');
                        res.json(response);
                    }else{
                        // console.log('数据库执行成功了,要去支付了。。。');
                        // console.log('orderId:',order_id);
                        payFun(order_id);
                    }
                })
            }
        }
    })
});

/**
 * 支付成功回调
 * 场景: 非会员购买课程
 * */
router.post('/main/real/pay/back', function (req, res, next) {
    // console.log('支付回调返回')
    // console.log('query:',req.query);
    // console.log('body:',req.body);
    var order_id = req.query.order_id;
    var xmlData = '<xml>' +
        '<return_code>SUCCESS</return_code>' +
        '<return_msg>OK</return_msg></xml>';
    res.send(xmlData);

})
/**
 * 支付成功回调
 * 场景: 非会员购买会员
 * */
router.post('/main/real/pay/member_back', function (req, res, next) {
    // console.log('支付回调返回')
    // console.log('query:',req.query);
    // console.log('body:',req.body);
    var order_id = req.query.order_id;
    var xmlData = '<xml>' +
        '<return_code>SUCCESS</return_code>' +
        '<return_msg>OK</return_msg></xml>'
    res.send(xmlData);
})

/**
 * 判断用户的状态，
 *   member_status  1.兴业员工，
 *                  2、非兴业员工
 *                  3、第一次登陆
 * */
router.post('/onedrop/xingye', function (req, res, next) {
    var user_id = req.body.user_id;
    var query_sql = "select is_xingye_member, phone_num from user where user_id = '"+user_id+"'";
    query(query_sql, function (qerr, valls, fields) {
        if(qerr){
            responseDataErr(res);
        }else{
            var member_status = 0;
            var member = valls[0];
            var is_xingye_member = member.is_xingye_member;
            var phone_num = member.phone_num;

            if(is_xingye_member == null || phone_num == null){
                member_status = 3; //第一次登陆，需要判断录入用户信息
            }else if(is_xingye_member === 0){
                member_status = 2; //非兴业员工
            }else if(is_xingye_member === 1){
                member_status = 1; //兴业员工
            }else{
                member_status = 0;
            }

            var response = {
                status:1,
                data:{
                    member_status:member_status
                }
            }

            res.send(response);
        }
    })
})

/**
 * 兴业员工或者非兴业员工录入个人的编号
 *          参数： 1、user_id
 *                2、is_xingye_member //0或者1
 *                3、xingye_num //0或者具体的值(有效的电话号码)，
 *
 * */
router.post('/onedrop/user_info', function (req, res, next) {
    var user_id = req.body.user_id;
    var is_xingye_member = Number(req.body.is_xingye_member);
    var phone_num = req.body.phone_num;
    var is_member = 0;
    if(is_xingye_member == 1){
        is_member = 1;
    }else{
        is_member = 0;
    }
    var my_up_sql = "update user set is_xingye_member = "+is_xingye_member+", phone_num = '"+phone_num+"', is_member="+is_member+" where user_id = '" + user_id + "'";
    // console.log('my_update_sql:', my_up_sql);
    query(my_up_sql, function (qerr, valls, fields) {
        if(qerr){
            // console.log('数据查询失败');
            responseDataErr(res);
        }else{
            var response = {
                status:1,
                data:{
                    msg:'数据更新成功'
                }
            }
            res.send(response);
        }
    })
})


function responseDataErr(res) {
    var response = {
        status:0,
        data:{
            msg:'数据库执行错误'
        }
    }
    res.json(response);
}

module.exports = router;