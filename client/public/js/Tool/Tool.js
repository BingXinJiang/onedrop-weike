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
    },
    generateRndomPointArr : function (cW,cH,radius,num) {
        // var resultArr = [];
        // var pondArr = [];
        // var newPondArr = [];
        //
        // //找到平面中所有的点，放入一个池子
        // for(var i=0; i<cW; i++){
        //     for(var j=0; j<cH; j++){
        //         var point = {};
        //         point.x = i;
        //         point.y = j;
        //         pondArr.push(point);
        //     }
        // }
        //
        // newPondArr = pondArr;
        //
        // while (resultArr.length<num){
        //     //计算出池子的长度,作为随机的标准
        //     var pondL = newPondArr.length;
        //
        //     //随机找出一个点
        //     var randNum = Math.floor(Math.random()*pondL);
        //     var randPoint = newPondArr[randNum];
        //
        //     //将该数点加入结果池
        //     resultArr.push({x:randPoint.x,y:randPoint.y});
        //
        //     //将池子里所有与该点距离接近的点从池子里去掉
        //     var pondTmp = [];
        //     for(var i=0;i<newPondArr.length;i++){
        //         var point = newPondArr[i];
        //         var distance = (randPoint.x-point.x)*(randPoint.x-point.x) + (randPoint.y-point.y)*(randPoint.y-point.y);
        //         if(distance > radius*radius){
        //             pondTmp.push({x:point.x,y:point.y});
        //         }
        //     }
        //     //将临时数组赋值给新数组
        //     newPondArr = pondTmp;
        // }
        // console.log(resultArr);
        // var correctArr = getCorrectArr(resultArr);
        var correctArr = getCorrectArr([
            { x: 449-80, y: 423 },
            { x: 145-80, y: 604 },
            { x: 644-80, y: 560 },
            { x: 294-80, y: 274 },
            { x: 591-80, y: 136 },
            { x: 108-80, y: 80 },
            { x: 136-80, y: 382 },
            { x: 355-80, y: 80 },
            { x: 443-80, y: 625 },
            { x: 646-80, y: 326 } ]);
        return correctArr;
    },
    getColorArr:function (num) {
        var colorArr = [
            'rgb(31,106,212)',
            'rgb(182,197,120)',
            'rgb(108,204,187)',
            'rgb(40,157,231)',
            'rgb(171,156,30)'
        ];
        var resultArr = [];
        for(var i=0;i<num;i++){
            var randomNum = Math.floor(Math.random()*5);
            resultArr.push(colorArr[randomNum]);
        }
        return colorArr;
    }
}
function getCorrectArr(pointArr) {
    //156*156 30  78
    //114*114 28  57
    //100*100 24  50
    //88*88   20  44
    // 2,3,3,2
    var newArr = [];
    var colorArr = [
        'rgb(31,106,212)',
        'rgb(182,197,120)',
        'rgb(108,204,187)',
        'rgb(40,157,231)',
        'rgb(171,156,30)'
    ];
    for(var i=0;i<pointArr.length;i++){
        var point = {
            x:0,
            y:0,
            color:'',
            width:0,
            wordSize:0
        }
        var color = colorArr[Math.floor(Math.random()*5)];
        var po = pointArr[i];
        if(i===0 || i===1){
            point.x = po.x-78;
            point.y = po.y-78;
            point.width = 156;
            point.wordSize=30;
        }else if(i===2 || i===3 || i===4){
            point.x = po.x-57;
            point.y = po.y-57;
            point.width = 114;
            point.wordSize=28;
        }else if(i===5 || i===6 || i===7){
            point.x = po.x-50;
            point.y = po.y-50;
            point.width = 100;
            point.wordSize=24;
        }else{
            point.x = po.x-44;
            point.y = po.y-44;
            point.width = 88;
            point.wordSize=20;
        }
        point.color = color;
        newArr.push(point);
    }
    return newArr;
}