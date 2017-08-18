/**
 * Created by jiangsong on 2017/4/3.
 */

//常用蓝：rgb(23,172,251)
//字体：rgb(51,51,51)
//间隔灰色背景：rgb(209,209,209)
//cell背景灰：rgb(241,241,241)

module.exports = {

    // base_ip:'http://192.168.2.100:3001/weixin',
    // base_url:'http://192.168.2.100:3001',
    // res_ip:'http://192.168.2.100:3001',

    base_ip:'http://192.168.1.37:3002/weixin',
    base_url:'http://192.168.1.37:3002',
    res_ip:'http://192.168.1.37:3002',


    // base_ip:'http://leader.cvwisdom.com/weixin',
    // base_url:'http://leader.cvwisdom.com',
    // res_ip:'http://leader.cvwisdom.com',

    // base_ip:'http://drop.cvwisdom.com/weixin',
    // base_url:'http://drop.cvwisdom.com',
    // res_ip:'http://drop.cvwisdom.com',

    appId:'wxcb05ae4237186327',//旧

    // appId:'wxb2aff2a51a4bdb8e',//新

    JS_ScreenW:document.body.clientWidth,//屏幕宽度
    JS_ScreenH:screen.height,
    JS_WindowH:document.body.clientHeight,
    JS_ScreenH2:document.documentElement.clientHeight,

    SCREEN_RATE:document.body.clientWidth/750.0, //当前手机与使用尺寸之间的比率

    // EVALUATION_URL:'http://uat.tts.i-select.cn/validate.aspx?sid=5073',

    EVALUATION_URL:'http://tts.i-select.cn/validate.aspx?sid=5916',

    AUDIO:null

}