/**
 * Created by jiangsong on 2017/8/15.
 */
var express = require('express');
var router = express.Router();
var Error = require('../../tool/Error');
var Tool = require('../../tool/Tool');

router.post('/question',function (req,res,next) {

    var user_id = req.body.user_id;
    var page = req.body.page;

    /*
    查询用户上次登录的时间  last_login_date
    select login_date from login where user_id='oyMAaxN1hGZuki6cOvwF6OSQ-Ahs' order by login_date desc limit 1,1

    (select * from question where user_id='oyMAaxN1hGZuki6cOvwF6OSQ-Ahs') as A

    (select count(1)answer_count,question_id,max(answer_time)last_answer from answer group by question_id)as B on A.question_id=B.question_id


     */

})

module.exports = router;