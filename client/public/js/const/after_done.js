/**
 * Created by jiangsong on 2017/4/13.
 */
module.exports = function (times, callback) {
    var count = 0, results = {};
    return function (key, value) {
        results[key] = value;
        count++;
        if(count === times){
            callback(results);
        }
    }
}