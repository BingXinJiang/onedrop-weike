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
            <div style={{display:'flex',flexDirection:'column', alignItems:'center',
                backgroundColor:'rgb(235,235,235)',marginBottom:'40px'
            }}>
                <div style={{fontSize:'24px', paddingLeft:'30px', marginTop:'2px',
                    backgroundColor:'white',height:'220px',width:OneDrop.JS_ScreenW
                }}>
                    <p style={{fontSize:'28px',
                        marginTop:'40px'
                    }}>邀请码：</p>
                    <input style={{
                        fontSize:'34px',borderWidth:'2px',borderColor:'rgb(235,235,235)',marginTop:'30px',
                        height:'60px',paddingLeft:'10px'
                    }} id="phone_num"/>
                </div>
                <div style={{display:'flex', marginTop:'2px',width:OneDrop.JS_ScreenW,height:'400px',
                    justifyContent:'center',alignItems:'center',backgroundColor:'white'
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
                        display:'flex',backgroundColor:'rgb(28,166,248)',width:'240px',height:'80px',
                        borderRadius:'40px',color:'white',justifyContent:'center',alignItems:'center',
                        fontSize:'36px'
                    }}>接受邀请</p>
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