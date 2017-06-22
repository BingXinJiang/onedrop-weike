/**
 * Created by jiangsong on 2017/5/10.
 */

import React from 'react';

import Tool from '../../Tool/Tool';
import OneDrop from '../../const/onedrop';

export default class Introduction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false
        }
    }
    render(){
        var self = this;
        return (
            <div style={{
                width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH*2,backgroundImage:'url(../../../../img/weike/home/invite_bg.jpg)',
                backgroundSize:'100% 100%',display:'flex',flexDirection:'column',alignItems:'center'
            }}>
                <div style={{marginTop:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <p style={{
                            fontSize:'30px',color:'white'
                        }}>请输入您的邀请码</p>
                        <input style={{
                            fontSize:'34px',borderWidth:'2px',borderColor:'rgb(87,162,214)',marginTop:'30px',backgroundColor:'rgb(87,162,214)',
                            height:'80px',paddingLeft:'10px',borderStyle:'solid',borderRadius:'5px'
                        }} id="phone_num"/>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:'40px',width:'300px',height:'80px',
                        borderRadius:'40px',backgroundColor:'rgb(9,73,151)',alignItems:'center'
                    }} onClick={()=>{
                        let user_id = REMOTE_WEIXIN_USER_ID;
                        let phoneNum = $('#phone_num').val()+'';
                        self.setState({
                            isLoading:true
                        })
                        $.ajax({
                            url:OneDrop.base_url+'/auth/commit',
                            dataType:'json',
                            method:'POST',
                            data:{
                                user_id:user_id,
                                code:phoneNum
                            },
                            success:function(data) {
                                $('#phone_num').val('');
                                self.setState({
                                    isLoading:false
                                })
                                if(data.status === 1){
                                    //数据更新成功
                                    self.props.callback();
                                }else{
                                    alert(data.data.msg);
                                }
                            }
                        })

                    }}>
                        <p style={{
                            fontSize:'36px',color:'white'
                        }}>开启每日一滴</p>
                    </div>
                </div>
                {
                    this.state.isLoading ?
                        <div style={{
                            position:'fixed',top:'0',left:'0',width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,display:'flex',justifyContent:'center',alignItems:'center'
                        }}>
                            <img src="../../../img/weike/home/loading.gif"/>
                        </div>
                        : null
                }
            </div>
        )
    }
}