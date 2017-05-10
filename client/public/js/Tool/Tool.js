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
    }
}