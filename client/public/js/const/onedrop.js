/**
 * Created by jiangsong on 2017/4/3.
 */

// global.IS_DEV_ENV = true;
global.IS_DEV_ENV = false;

global.DEV_ENV_LINK='http://drop.cvwisdom.com/html/get_weixin_code.html?appid=wxcb05ae4237186327&scope=snsapi_base&state=leader&redirect_uri=http://leader.cvwisdom.com/weixin/main',
// global.PRO_ENV_LINK='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcb05ae4237186327&redirect_uri=http://drop.cvwisdom.com/weixin/main&response_type=code&scope=snsapi_userinfo#wechat_redirect',

global.PRO_ENV_LINK='http://drop.cvwisdom.com/html/get_weixin_code.html?appid=wxcb05ae4237186327&scope=snsapi_base&state=leader&redirect_uri=http://drop.cvwisdom.com/weixin/main',


    module.exports = {

    // base_ip:'http://192.168.2.101:3002/weixin',
    // base_url:'http://192.168.2.101:3002',
    // res_ip:'http://192.168.2.101:3002',

    // base_ip:'http://192.168.1.32:3002/weixin',
    // base_url:'http://192.168.1.32:3002',
    // res_ip:'http://192.168.1.32:3002',


    base_ip:IS_DEV_ENV ? 'http://leader.cvwisdom.com/weixin' : 'http://drop.cvwisdom.com/weixin',
    base_url:IS_DEV_ENV ? 'http://leader.cvwisdom.com' : 'http://drop.cvwisdom.com',
    res_ip:IS_DEV_ENV ? 'http://leader.cvwisdom.com' : 'http://drop.cvwisdom.com',

    appId:'wxcb05ae4237186327',//旧

    // appId:'wxb2aff2a51a4bdb8e',//新

    JS_ScreenW:document.body.clientWidth,//屏幕宽度
    JS_ScreenH:screen.height,
    JS_WindowH:document.body.clientHeight,
    JS_ScreenH2:document.documentElement.clientHeight,

    SCREEN_RATE:document.body.clientWidth/750.0, //当前手机与使用尺寸之间的比率

    // EVALUATION_URL:'http://uat.tts.i-select.cn/validate.aspx?sid=5073',

    EVALUATION_URL:'http://tts.i-select.cn/validate.aspx?sid=5916',

    AUDIO:null,

    //分享到朋友圈
    shareToMomentsTitle:'每日一滴，滴水穿石，你领导力旅途中的水和氧！',
    shareToMomentsLink:IS_DEV_ENV ? DEV_ENV_LINK:PRO_ENV_LINK,
    shareToMomentsImgUrl:IS_DEV_ENV ? 'http://leader.cvwisdom.com'+'/images/imgs/yunguhui.jpg' : 'http://drop.cvwisdom.com'+'/images/imgs/yunguhui.jpg',
    shareToMomentsSuccess:()=>{

    },
    shareToMomentsCancel:()=>{

    },

    //分享给朋友
    shareToFriendsTitle:'每日一滴，滴水穿石，你领导力旅途中的水和氧！',
    shareToFriendsDesc:'我在一滴学到了很有用的领导力知识，快来跟我一起学习吧！',
    shareToFriendsLink:IS_DEV_ENV ? DEV_ENV_LINK:PRO_ENV_LINK,
    shareToFriendsImgUrl:IS_DEV_ENV ? 'http://leader.cvwisdom.com/images/imgs/yunguhui.jpg' : 'http://drop.cvwisdom.com/images/imgs/yunguhui.jpg',
    shareToFriendsType:'link',
    shareToFriendsDataUrl:'',
    shareToFriendsSuccess:()=>{

    },
    shareToFriendsCancel:()=>{

    }

}