/**
 * Created by jiangsong on 2017/5/10.
 */

import React from 'react';

import Tool from '../../Tool/Tool';
import OneDrop from '../../const/onedrop';

export default class Introduction extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var self = this;
        return (
            <div style={{display:'flex',flexDirection:'column', alignItems:'center',
                backgroundColor:'rgb(235,235,235)',marginBottom:'40px'
            }}>
                <div style={{marginTop:'40px',
                    width:OneDrop.JS_ScreenW,
                    backgroundColor:'white',
                    height:'170px',
                    paddingLeft:'30px'
                }}>
                    <p style={{fontSize:'28px',
                        marginTop:'40px'
                    }}>我是兴业银行员工？</p>
                    <form style={{marginTop:'10px', fontSize:'28px', marginBottom:'40px'}}>
                        <input style={{fontSize:'28px', width:'28px', height:'28px'}}
                               name="is_xingye_member" value="1" type="radio"/>是
                        <input style={{marginLeft:'80px',fontSize:'28px',width:'28px', height:'28px'}}
                               name="is_xingye_member" value="2" type="radio"/>不是
                    </form>
                </div>
                <div style={{fontSize:'24px', paddingLeft:'30px', marginTop:'2px',
                    backgroundColor:'white',
                    height:'220px',
                    width:OneDrop.JS_ScreenW
                }}>
                    <p style={{fontSize:'28px',
                        marginTop:'40px'
                    }}>您的手机号码</p>
                    <input style={{
                        fontSize:'34px',
                        borderWidth:'2px',
                        borderColor:'rgb(235,235,235)',
                        marginTop:'30px',
                        height:'60px'
                    }} id="phone_num"/>
                </div>
                <div style={{display:'flex', marginTop:'2px',
                    width:OneDrop.JS_ScreenW,
                    height:'400px',
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'white'
                }} onClick={()=>{
                    let user_id = REMOTE_WEIXIN_USER_ID;
                    let is_xingye_member = 0;
                    let phone_num = '';
                    if($('input:radio[name="is_xingye_member"]:checked').val() === '1'){
                        is_xingye_member = 1;
                    }
                    if($('input:radio[name="is_xingye_member"]:checked').val() === '2'){
                        is_xingye_member = 0;
                    }
                    let phoneNum = $('#phone_num').val()+'';
                    let isPhoneNum = Tool.isTel(phoneNum);
                    if(isPhoneNum){
                        phone_num = phoneNum;
                        $.ajax({
                            url:OneDrop.base_url+'/onedrop/user_info',
                            dataType:'json',
                            method:'POST',
                            data:{
                                user_id:user_id,
                                is_xingye_member:is_xingye_member,
                                phone_num:phone_num
                            },
                            success:function(data) {
                                console.log('data:', data);
                                if(data.status === 1){
                                    //数据更新成功
                                    self.props.callback();
                                }
                            }
                        })
                    }else{
                        $('#phone_num').val('');
                        alert('手机号码输入有误，请重新输入。。。');
                    }
                }}>
                    <p style={{
                        display:'flex',
                        backgroundColor:'rgb(28,166,248)',
                        width:'240px',
                        height:'80px',
                        borderRadius:'40px',
                        color:'white',
                        justifyContent:'center',
                        alignItems:'center',
                        fontSize:'36px'
                    }}>去学习</p>
                </div>
            </div>
        )
    }
}