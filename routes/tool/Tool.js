/**
 * Created by jiangsong on 2017/5/23.
 */
var ENV_PRO = false;
module.exports = {
    Log:function () {
        if(ENV_PRO){

        }else{
            console.log(arguments);
        }
    }
}