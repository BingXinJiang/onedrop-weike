/**
 * Created by jiangsong on 2017/5/10.
 */
import OneDrop from '../const/onedrop';
const Rate = OneDrop.SCREEN_RATE;

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
    prefixInteger:function(num,length){
        return ( "0000000000000000" + num ).substr( -length );
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
            { x: 449*Rate-80, y: 423*Rate },
            { x: 145*Rate-80, y: 604*Rate },
            { x: 644*Rate-80, y: 560*Rate },
            { x: 294*Rate-80, y: 274*Rate },
            { x: 591*Rate-80, y: 136*Rate },
            { x: 108*Rate-80, y: 80*Rate },
            { x: 136*Rate-80, y: 382*Rate },
            { x: 355*Rate-80, y: 80*Rate },
            { x: 443*Rate-80, y: 625*Rate },
            { x: 646*Rate-80, y: 326*Rate } ]);
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
    },
    /**
     * 获取使用JSSDK的签名
     * */
    getJSSDKPaySign:function (locationUrl,fail) {
        $.ajax({
            url:OneDrop.base_ip + '/main/pay/getsign',
            dataType:'json',
            method:'POST',
            data:{
                location_url:locationUrl
            },
            success:function (data) {
                if(data.status === 0){
                    fail();
                }
                var payData = data.data;
                wx.config({
                    debug:false,
                    appId:OneDrop.appId,
                    timestamp:payData.timestamp,
                    nonceStr:payData.nonceStr,
                    signature:payData.signature,
                    jsApiList:[
                        'chooseWXPay',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'previewImage'   //图片预览
                    ]
                })
            }
        })
    },
    /**
     * 分享到朋友圈
     * */
    shareToMoments:function(obj){
        wx.ready(()=>{
            wx.onMenuShareTimeline({
                title:obj.title ? obj.title : OneDrop.shareToMomentsTitle,
                link:obj.link ? obj.link : OneDrop.shareToMomentsLink,
                imgUrl:obj.imgUrl ? obj.imgUrl : OneDrop.shareToMomentsImgUrl,
                success:()=>{
                    console.log('分享朋友圈成功！');
                    obj.success ? obj.success() : OneDrop.shareToMomentsSuccess();
                },
                cancel:()=>{
                    console.log('分享朋友圈失败！');
                    obj.cancel ? obj.cancel() : OneDrop.shareToMomentsCancel();
                }
            })
        })
    },
    /**
     * 分享给朋友
     * */
    shareToFriends:function (obj) {
        wx.ready(()=>{
            wx.onMenuShareAppMessage({
                title:obj.title ? obj.title : OneDrop.shareToFriendsTitle,
                desc:obj.desc ? obj.desc : OneDrop.shareToFriendsDesc,
                link:obj.link ? obj.link : OneDrop.shareToFriendsLink,
                imgUrl:obj.imgUrl ? obj.imgUrl : OneDrop.shareToFriendsImgUrl,
                type:obj.type ? obj.type : OneDrop.shareToFriendsType,
                dataUrl:obj.dataUrl ? obj.dataUrl : OneDrop.shareToFriendsDataUrl,
                success:()=>{
                    console.log('分享朋友成功！');
                    obj.success ? obj.success() : OneDrop.shareToFriendsSuccess();
                },
                cancel:()=>{
                    console.log('分享朋友失败！');
                    obj.cancel ? obj.cancel() : OneDrop.shareToFriendsCancel();
                }
            })
        })
    },
    
    /**
     * 将DOM转化为图片
     * */
    // getImgFromHtml:function (target,img) {
    //     html2canvas(target,{
    //
    //     })
    // }
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
