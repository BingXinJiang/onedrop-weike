/**
 * Created by Administrator on 2017/3/29 0029.
 */

require ('weui');
require('react-weui/lib/react-weui.min.css');
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui';
import OneDrop from '../../const/onedrop';
import Introduce from './introduce';
import after_done from '../../const/after_done';
import crypto from 'crypto';
const SHOW_PAGE = ['course_list', 
    'course_introduce',
    'course_learn'
]

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courses: [],
            isMember:false,//需从服务端获取用户的会员信息,
            userId:REMOTE_WEIXIN_USER_ID, //以微信静默授权的方式拿到openid作为userid,
            // userId:'oyMAaxN1hGZuki6cOvwF6OSQ-Ahs',//嵩
            // userId:'oyMAaxD884kfJA1EHMBTX8Y5bm9I',//彩红
            courseId:0,
            show:'course_list'
        }
    }

    componentDidMount() {
        if(REMOTE_WEIXIN_USER_ID === undefined || REMOTE_WEIXIN_USER_ID === null || REMOTE_WEIXIN_USER_ID === '' || REMOTE_WEIXIN_USER_ID === 'undefined'){
            this.setState({
                userId:localStorage.getItem('user_id')
            })
        }else{
            localStorage.setItem('user_id', REMOTE_WEIXIN_USER_ID);
        }
        
        var self = this;
        var after = after_done(2, function (results) {
            self.setState({
                isMember:results.isMember,
                courses:results.courses
            })
        })
        //获取课程信息
        var getCourseUrl = OneDrop.base_ip + '/main/getcourse';
        $.get(getCourseUrl, {}, function (data) {
            var courses = data.data.courses;
            after('courses', courses);
        });
        
        //判断是否是会员
        $.ajax({
            url:OneDrop.base_ip+'/main/user/is_member',
            dataType:'json',
            method:'POST',
            data:{
                user_id:self.state.userId
            },
            success:function(data) {
                if(data.data.is_member === 0){
                    after('isMember', false);
                }else if(data.data.is_member === 1){
                    after('isMember', true);
                } else{
                    alert('数据异常');
                }
            }
        })

        $.ajax({
            url:OneDrop.base_ip + '/main/pay/getsign',
            dataType:'json',
            method:'POST',
            data:{
                location_url:encodeURIComponent(location.href.split('#')[0])
            },
            success:function (data) {
                var payData = data.data;
                wx.config({
                    debug:false,
                    appId:OneDrop.appId,
                    timestamp:payData.timestamp,
                    nonceStr:payData.nonceStr,
                    signature:payData.signature,
                    jsApiList:[
                        'chooseWXPay'
                    ]
                })
            }
        })
    }
    render(){
        var self = this;
        return (
            <div id="container">
                {
                    this.state.show === 'course_list' ?
                        <div style={{
                            height: '100%',
                            background: '#fff'
                        }}>

                            <img src="../../../img/weike/home/home_banner.png" width="100%" height="350px"/>

                            <Cells>
                                {
                                    this.state.courses.map( (item, i) => {
                                        var cell_id = 'course_cell_id_' + i;
                                        return (
                                            <Cell onClick={()=>{
                                                this.setState({
                                                    courseId:item.course_id,
                                                    show:'course_introduce'
                                                })
                                            }} id={cell_id}  href="javascript:;" key={i}>
                                                <CellBody>
                                                    <div style={{float:'left', marginRight:'28px'}}>
                                                        <img src={OneDrop.res_ip+item.background_image} width="300px" height="300px"/>
                                                    </div>
                                                    <div style={{}}>
                                                        <p style={{fontSize:'32px', color:'black', fontWeight:'bold'}}>{item.title}</p>
                                                        <p style={{fontSize:'28px', color: 'black'}}>{item.author}</p>
                                                        <p style={{marginLeft:'28px', fontSize:'28px', color:'rgb(87,87,87)'}}
                                                           >{item.introduction}</p>
                                                        <p style={{float:'right', fontSize:'28px', color:'rgb(255,66,0)', marginRight:'30px'}}>{'￥'+item.price}</p>
                                                    </div>
                                                </CellBody>
                                                <CellFooter/>
                                            </Cell>
                                        )
                                    })
                                }
                            </Cells>
                        </div> : null
                }
                {
                   this.state.show === 'course_introduce' ?
                       <Introduce
                           isMember={this.state.isMember}
                           userId={this.state.userId}
                           courseId={this.state.courseId}
                       /> : null
                }
                {
                    (this.state.isMember || (this.state.show != 'course_list')) ? null :
                        <div style={{marginTop:'30px', textAlign:'center', position: 'absolute', width:'90%', left:'5%'}}>
                            <img onClick={()=>{
                            $.ajax({
                                                url:OneDrop.base_ip+'/main/real/pay_member/',
                                                dataType:'json',
                                                method:'POST',
                                                data:{
                                                    user_id:self.state.userId,
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
                                                                   if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                                                                        alert('购买成功');
                                                                        self.setState({
                                                                            isMember:true
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
                                }} src="../../../img/weike/home/be_member_back.png" style={{width: '100%', height:'80px'}}/>
                            <p style={{position: 'absolute', top: '18px', left:'30%', fontSize:'32px'}}>
                                成为会员(￥980元/年)</p>
                        </div>
                }
            </div>
        )
    }
}

ReactDOM.render(
    <MainPage/>,
    document.getElementById('main-container')
)