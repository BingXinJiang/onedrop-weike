/**
 * Created by jiangsong on 2017/5/10.
 */

import React from 'react';

import Tool from '../../Tool/Tool';
import OneDrop from '../../const/onedrop';

var ScreenW = document.body.clientWidth;
var ScreenH = document.body.clientHeight;

export default class Introduction extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                <div>
                    <p>我是兴业银行员工？</p>
                    <form>
                        <input id="is_xingye_member" type="radio" value='1'/>是
                        <input id="no_xingye_member" type="radio" value='0'/>不是
                    </form>
                </div>
                <div>
                    手机号码：<input id="phone_num"/>
                </div>
                <div style={{display:'flex', marginTop:'120px'}} onClick={()=>{
                    let user_id = REMOTE_WEIXIN_USER_ID;
                    let is_xingye_member = 0;
                    let phone_num = '';
                    if($("#is_xingye_member").attr('checked')){
                        is_xingye_member = 1;
                    }
                    if($('#no_xingye_member').attr('checked')){
                        is_xingye_member = 0;
                    }
                    console.log('--------');
                    console.log($('#is_xingye_member').attr('checked'));
                    console.log($('#no_xingye_member').attr('checked'));
                    let phoneNum = $('#phone_num').val()+'';
                    let isPhoneNum = Tool.isTel(phoneNum);
                    if(isPhoneNum){
                        phone_num = phoneNum;
                        $.ajax({
                            url:OneDrop.base_ip+'/onedrop/user_info',
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
                    马上学习
                </div>
            </div>
        )
    }
}