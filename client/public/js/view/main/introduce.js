/**
 * Created by jiangsong on 2017/4/5.
 */
require ('weui');
require('react-weui/lib/react-weui.min.css');
import React from 'react';
import {
    Article,
    CellsTitle,
    Cells,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui';
import OneDrop from '../../const/onedrop';
import Learn from './learn';

import crypto from 'crypto';

export default class Introduction extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            toBuyed:false, //是否已经购买课程
            course:null, //没有学习过课程,显示课程详情
            progress:0,   //学习过课程,记录学习进度
            toLearn:false, //点击我要学习按钮,跳转到学习页面
            chapters:[]
        }
    }

    componentDidMount() {
        var isBuyUrl = OneDrop.base_ip + '/main/is_buy';
        var courseDtailUrl = OneDrop.base_ip + '/main/getcoursedetail';
        var self = this;

        $.ajax({
            url:courseDtailUrl,
            dataType:'json',
            method:'POST',
            data:{
                user_id:self.props.userId,
                course_id:self.props.courseId
            },
            success:function (data) {
                if(data.status === 2) {//已经学习过该课程
                    //课程学习进度
                    var progress = data.data.progress;
                    self.setState({
                        progress: progress
                    })
                }else{ //未学习该课程
                    var course = data.data.course;
                    var chapters = data.data.chapters;
                    self.setState({
                        course:course,
                        chapters:chapters
                    })
                    if(!self.props.isMember){
                        $.ajax({
                            url:isBuyUrl,
                            dataType:'json',
                            method:'POST',
                            data:{
                                user_id:self.props.userId,
                                course_id:self.props.courseId
                            },
                            success:function (data) {
                                var is_buy = data.data.is_buy;
                                if(is_buy === 1){
                                    //已经买过课程了
                                    self.setState({
                                        toBuyed:true
                                    })
                                }else {
                                    //没有购买课程
                                    self.setState({
                                        toBuyed:false
                                    })
                                }
                            }
                        })
                    }else{
                        self.setState({
                            toBuyed:true
                        })
                    }
                }
            }
        })


    }
    render(){
        var title = '';
        var author = '';
        var introduction = '';
        var detail_bg_image = '';
        var self = this;
        if(this.state.course != null && this.state.chapters.length>0){
            var course = this.state.course;
            detail_bg_image = course.detail_bg_image;
            title = course.title;
            author = course.author;
            introduction = course.introduction;
        }
        return (
            <div id="introduce" style={{backgroundColor:'rgb(229,230,231)'}}>
                {
                    (this.state.progress === 0 && !this.state.toLearn) ?
                        <div>
                            <img src={OneDrop.res_ip+detail_bg_image} width="100%" height="400px"/>
                            <div>
                                <div style={{marginTop:'26px'}}>
                                    <img src="../../../img/weike/desc/course_des.png" style={{marginLeft:'60px'}}/>
                                    <div style={{backgroundColor:'white'}}>
                                        <p style={{paddingTop: '18px',paddingBottom:'18px', marginBottom:'18px', fontSize:'2.2em', paddingLeft: '30px', paddingRight:'30px'}}>
                                            {introduction}
                                        </p>
                                    </div>
                                    <img src="../../../img/weike/desc/chapter_des.png" style={{marginLeft:'60px'}}/>

                                    {
                                        this.state.chapters.map(function (chapter, index) {
                                            chapter.sort(function (section1, section2) {
                                                return section1.section_num - section2.section_num;
                                            })
                                            return (
                                                <div key={index} style={{backgroundColor:'white', marginTop:'0px', paddingTop:'18px'}}>
                                                    <CellsTitle style={{backgroundColor:'white', fontSize:'35px', fontWeight:'bold'}}>{'第'+chapter[0].chapter_num+'章: '+chapter[0].chapter_name}</CellsTitle>
                                                    <Cells>
                                                        {
                                                            chapter.map(function (section, index) {
                                                                return(
                                                                    <Cell key={index} href="javascript:;" style={{paddingLeft:'90px', color:'black'}}>
                                                                        <CellBody style={{fontSize:'32px'}}>
                                                                            {'第'+section.section_num+'节: '+section.section_name}
                                                                        </CellBody>
                                                                    </Cell>
                                                                )
                                                            })
                                                        }
                                                    </Cells>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    this.state.toBuyed ?
                                        <div style={{ textAlign:'center', marginBottom:'120px', width: '100%',height:'90px',
                                        backgroundColor:'white',marginTop:'30px',position:'absolute',
                                         alignContent:'center', alignItems:'center'}}>
                                            <img style={{width:'90%', height:'90px'}} src="../../../img/weike/desc/button_bg.png"/>
                                            <p onClick={()=>{
                                                $.ajax({
                                                    url:OneDrop.base_ip + '/main/section/tolearn',
                                                    dataType:'json',
                                                    method:'POST',
                                                    data:{
                                                        user_id:self.props.userId,
                                                        course_id:self.props.courseId
                                                    },
                                                    success:function(data) {
                                                        self.setState({
                                                            toLearn:true
                                                        })
                                                    }
                                                })
                                            }} style={{fontSize:'35px', fontWeight:'bold', position:'absolute', top: '13px', left:'39%'}}>我要学习</p>
                                        </div>
                                        :
                                        <div style={{marginTop:'30px', textAlign:'center', marginBottom:'120px'}}>
                                            <div style={{position:'absolute', width:'30%', left:'10%'}}>
                                                <img style={{position:'absolute', top:'0', left:'0', width:'100%'}} src="../../../img/weike/desc/button_bg.png"/>
                                                <p onClick={()=>{
                                                    $.ajax({
                                                        url:OneDrop.base_ip+'/main/real/pay/',
                                                        dataType:'json',
                                                        method:'POST',
                                                        data:{
                                                            user_id:self.props.userId,
                                                            course_id:self.props.courseId,
                                                            price:10
                                                        },
                                                        success:function(data) {
                                                          function md5 (text) {
                                                                return crypto.createHash('md5').update(text).digest('hex').toUpperCase();
                                                          }
                                                          if(data.status === 1 && data.data.return_code[0] == 'SUCCESS'){

                                                            var timeStamp = parseInt((new Date()).getTime()/1000).toString();
                                                            var nonceStr = 'onedrop' + parseInt(Math.random()*1000000);
                                                            var payStr = "appId="+OneDrop.appId+"&nonceStr="+nonceStr+"&package=prepay_id="+data.data.prepay_id[0]+"&signType=MD5&timeStamp="+timeStamp+"&key=YunGuHuiDavid778Tai18317018605Gu";
                                                            var paySign = md5(payStr);
                                                            var prepay_id = 'prepay_id='+data.data.prepay_id[0];
                                                            var payData = {
                                                                appId:OneDrop.appId,
                                                                timeStamp:timeStamp,
                                                                nonceStr:nonceStr,
                                                                package:prepay_id,
                                                                signType:'MD5',
                                                                paySign:paySign
                                                            }
                                                            var payDataXml = "<xml>" +
                                                             "<appd>"+OneDrop.appId+"</appd>" +
                                                              "<timeStamp>"+timeStamp+"</timeStamp>" +
                                                               "<nonceStr>"+nonceStr+"</nonceStr>" +
                                                                "<package>"+prepay_id+"</package>" +
                                                                 "<signType>MD5</signType>" +
                                                                  "<paySign>"+paySign+"</paySign></xml>";

                                                            function onBridgeReady(){
                                                               WeixinJSBridge.invoke(
                                                                   'getBrandWCPayRequest', payData,
                                                                   function(res){
                                                                        alert(location.href.split('#')[0]);
                                                                        alert(JSON.stringify(res));
                                                                       if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                                                            console.log('支付成功了,哈哈哈哈哈哈');
                                                                            self.setState({
                                                                                toBuyed:true
                                                                            });
                                                                       }
                                                                       if(res.err_msg == "get_brand_wcpay_request:fail" || res.err_msg == "get_brand_wcpay_request:cancel"){
                                                                            alert('支付失败!!');
                                                                       }

                                                                   }
                                                               );
                                                            }
                                                            if (typeof WeixinJSBridge == "undefined"){
                                                               if( document.addEventListener ){
                                                                   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                                               }else if (document.attachEvent){
                                                                   document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                                                   document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                                               }
                                                            }else{
                                                               onBridgeReady();
                                                            }
                                                          }
                                                        }
                                                    })
                                                }} style={{ position: 'absolute', top: '12px', left: '27%', fontSize:'35px', fontWeight:'bold'}}>购买课程</p>
                                            </div>
                                            <div style={{position:'absolute', width:'30%', right:'10%'}}>
                                                <img style={{position:'absolute', top:'0', left:'0', width:'100%'}} src="../../../img/weike/desc/button_bg.png"/>
                                                <p onClick={()=>{
                                                    $.ajax({
                                                        url:OneDrop.base_ip+'/main/real/pay_member/',
                                                        dataType:'json',
                                                        method:'POST',
                                                        data:{
                                                            user_id:self.props.userId,
                                                            price:10
                                                        },
                                                        success:function(data) {
                                                            function md5 (text) {
                                                                    return crypto.createHash('md5').update(text).digest('hex').toUpperCase();
                                                              }
                                                            if(data.status === 1 && data.data.return_code[0] == 'SUCCESS'){

                                                                var timeStamp = parseInt((new Date()).getTime()/1000).toString();
                                                                var nonceStr = 'onedrop' + parseInt(Math.random()*1000000);
                                                                var payStr = "appId="+OneDrop.appId+"&nonceStr="+nonceStr+"&package=prepay_id="+data.data.prepay_id[0]+"&signType=MD5&timeStamp="+timeStamp+"&key=YunGuHuiDavid778Tai18317018605Gu";
                                                                var paySign = md5(payStr);
                                                                var prepay_id = 'prepay_id='+data.data.prepay_id[0];
                                                                var payData = {
                                                                    appId:OneDrop.appId,
                                                                    timeStamp:timeStamp,
                                                                    nonceStr:nonceStr,
                                                                    package:prepay_id,
                                                                    signType:'MD5',
                                                                    paySign:paySign
                                                                }
                                                                var payDataXml = "<xml>" +
                                                                 "<appId>"+OneDrop.appId+"</appId>" +
                                                                  "<timeStamp>"+timeStamp+"</timeStamp>" +
                                                                   "<nonceStr>"+nonceStr+"</nonceStr>" +
                                                                    "<package>"+prepay_id+"</package>" +
                                                                     "<signType>MD5</signType>" +
                                                                      "<paySign>"+paySign+"</paySign></xml>";

                                                                function onBridgeReady(){
                                                                   WeixinJSBridge.invoke(
                                                                       'getBrandWCPayRequest', payData,
                                                                       function(res){
                                                                            alert(location.href.split('#')[0]);
                                                                            alert(JSON.stringify(res));
                                                                           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                                                                alert('购买成功');
                                                                                self.setState({
                                                                                    toBuyed:true
                                                                                });
                                                                           }
                                                                           if(res.err_msg == "get_brand_wcpay_request:fail" || res.err_msg == "get_brand_wcpay_request:cancel"){
                                                                                alert('支付失败!!');
                                                                           }

                                                                       }
                                                                   );
                                                                }
                                                                if (typeof WeixinJSBridge == "undefined"){
                                                                   if( document.addEventListener ){
                                                                       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                                                   }else if (document.attachEvent){
                                                                       document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                                                       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                                                   }
                                                                }else{
                                                                   onBridgeReady();
                                                                }
                                                          }
                                                        }
                                                    })
                                                }} style={{position: 'absolute', top: '12px', left: '27%', fontSize:'35px', fontWeight:'bold'}}>加入会员</p>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                        :
                        <Learn
                            progress={this.state.progress}
                            userId={this.props.userId}
                            courseId={this.props.courseId}
                        />
                }
            </div>
        )
    }
}

Introduction.propTypes = {
    isMember:React.PropTypes.bool.isRequired,//判断是否是会员 0 非会员  1 会员
    userId:React.PropTypes.string.isRequired, //获取用户的userId
    courseId:React.PropTypes.number.isRequired //获取当前所在课程的id
}