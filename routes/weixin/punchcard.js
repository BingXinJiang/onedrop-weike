/**
 * Created by jiangsong on 2017/5/25.
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

/**
 * 获取每天用户所在团队打卡最早的三个用户
 * 参数：user_id
 * */
router.post('/three/bird', function (req, res, next) {
    var user_id = req.body.user_id;
    
})

/**
 * 获取个人积分情况，排名情况，所在团队积分情况，所在团队的排名情况
 * */

/**
 * 获取当天推荐的座右铭的情况
 * */

/**
 * 用户打卡
 * */

/**
 * 获取用户排行榜
 * */

/**
 * 获取团队排行榜
 * */

/**
 * 按时间倒序获取所有人的打卡状态
 * */

/**
 * 获取往日一滴内容
 * */

/**
 * 获取我自己的打卡历程
 * */

/**
 *
 * */































