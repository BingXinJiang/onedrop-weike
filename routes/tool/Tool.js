/**
 * Created by jiangsong on 2017/5/23.
 */
var ENV_PRO = false;
var query = require('../../db/DB');
var async = require('async');
module.exports = {
    Log:function () {
        if(ENV_PRO){

        }else{
            console.log(arguments);
        }
    },
    addRank:function (user_id,fraction,leader_value,success,failure) {
        var query_sql = "select * from user_value where user_id='"+user_id+"'";
        var insert_sql = "insert into user_value(user_id) values('"+user_id+"')";
        var update_sql = "update user_value set fraction=fraction+"+fraction+",leader_value=leader_value+"+leader_value+",update_time=Now() where user_id='"+user_id+"'";

        query(query_sql,function (qerr,valls,fields) {
            if(qerr){
                failure(qerr);
            }else{
                if(valls.length>0){
                    query(update_sql,function (qerr,valls,fields) {
                        if(qerr){
                            failure(qerr);
                        }else{
                            success();
                        }
                    })
                }else{
                    query(insert_sql,function (qerr,valls,fields) {
                        if(qerr){
                            failure(qerr);
                        }else{
                            query(update_sql,function (qerr,valls,fields) {
                                if(qerr){
                                    failure(qerr);
                                }else{
                                    success();
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}