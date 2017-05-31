/**
 * Created by jiangsong on 2017/5/10.
 */
module.exports = {
    isTel:function (tel) {
        var re = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);
        var retu=tel.match(re);
        if(retu){
            return true;
        }else{
            return false;
        }
    },
    getAudio:function (src) {
        return 0;
    },
    isEmail:function (str) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(reg.test(str)){
            return true;
        }else{
            return false;
        }
    },
    convertSec:function (s) {
        var t;
        if(s > -1){
            var hour = Math.floor(s/3600);
            var min = Math.floor(s/60) % 60;
            var sec = s % 60;
            if(hour < 10) {
                // t = '0'+ hour + ":";
                t = '';
            } else {
                // t = hour + ":";
                t = '';
            }

            if(min < 10){t += "0";}
            t += min + ":";
            if(sec < 10){t += "0";}
            t += sec.toFixed(0);
        }
        return t;
    }
}