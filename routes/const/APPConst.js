/**
 * Created by jiangsong on 2017/8/14.
 */
global.IS_DEV_ENV_SERVER = true;
// global.IS_DEV_ENV_SERVER = false;
module.exports = {
    APPID : 'wxcb05ae4237186327',
    APPSECRET : '059aead1e040418e4c9cbc1d71675390',
    APP_ENTER_URL:IS_DEV_ENV_SERVER ? 'http://drop.cvwisdom.com/html/get_weixin_code.html?appid=wxcb05ae4237186327&scope=snsapi_base&state=leader&redirect_uri=http://leader.cvwisdom.com/weixin/main' : 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcb05ae4237186327&redirect_uri=http://drop.cvwisdom.com/weixin/main&response_type=code&scope=snsapi_userinfo#wechat_redirect'
}