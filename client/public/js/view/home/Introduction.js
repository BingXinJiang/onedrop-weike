/**
 * Created by jiangsong on 2017/5/10.
 */

import React from 'react';

import Tool from '../../Tool/Tool';
import OneDrop from '../../const/onedrop';

const CLASS = [
    '星蓝项目1班','星蓝项目2班','星蓝项目3班','星蓝项目4班'
]

export default class Introduction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,

            isShowSeclect:false,
            classNow:'',
            classId:0
        }
    }
    render(){
        var self = this;
        return (
            <div style={{
                width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH*2,backgroundImage:'url(../../../../img/weike/home/invite_bg.jpg)',
                backgroundSize:'100% 100%',display:'flex',flexDirection:'column',alignItems:'center'
            }}>
                <div style={{marginTop:'90%',display:'flex',flexDirection:'column',alignItems:'center'}}>

                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:'50px',width:'100%',position:'relative'}}>
                        <p style={{
                            fontSize:'28px',color:'white',display:'flex',justifyContent:'center',alignItems:'center',height:'60px'
                        }}>选择班级：</p>
                        <div onClick={()=>{
                            if(this.state.isShowSeclect){
                                return;
                            }
                            this.setState({
                                isShowSeclect:true
                            })
                        }} style={{
                            fontSize:'34px',borderWidth:'2px',borderColor:'rgb(87,162,214)',backgroundColor:'rgb(87,162,214)',
                            height:'60px',paddingLeft:'10px',borderStyle:'solid',borderRadius:'5px',width:'68%'
                        }} id="select_class">
                            <p style={{
                                fontSize:'28px',display:'flex',alignItems:'center',height:'60px'
                            }}>{this.state.classNow}</p>
                        </div>
                        {
                            this.state.isShowSeclect ?
                                <div style={{
                                    position:'absolute',width:'68%',height:'300px',backgroundColor:'rgb(87,162,214)',left:'29%',top:'65px',
                                    zIndex:'2',borderStyle:'solid',borderRadius:'5px',borderColor:'rgb(87,162,214)'
                                }}>
                                    {
                                        CLASS.map((content,index)=>{
                                            return (
                                                <div key={index} style={{height:'60px',display:'flex',justifyContent:'center',alignItems:'center'
                                                }} onClick={()=>{
                                                    this.setState({
                                                        isShowSeclect:false,
                                                        classNow:content,
                                                        classId:index+1
                                                    })
                                                }}>
                                                    <p style={{fontSize:'28px'}}>{content}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                : null
                        }
                    </div>


                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop:'50px'}}>
                        <p style={{
                            fontSize:'28px',color:'white',display:'flex',justifyContent:'center',alignItems:'center',height:'60px'
                        }}>输入密码：</p>
                        <input style={{
                            fontSize:'34px',borderWidth:'2px',borderColor:'rgb(87,162,214)',backgroundColor:'rgb(87,162,214)',
                            height:'60px',paddingLeft:'10px',borderStyle:'solid',borderRadius:'5px'
                        }} id="phone_num"/>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:'50px',width:'300px',height:'80px',
                        borderRadius:'40px',backgroundColor:'rgb(9,73,151)',alignItems:'center'
                    }} onClick={()=>{
                        let user_id = REMOTE_WEIXIN_USER_ID;
                        let phoneNum = $('#phone_num').val()+'';
                        let class_id = Number(this.state.classId);

                        if(class_id){

                        }else{
                            alert('请选择班级！');
                            return;
                        }

                        self.setState({
                            isLoading:true
                        })
                        $.ajax({
                            url:OneDrop.base_url+'/auth/commit',
                            dataType:'json',
                            method:'POST',
                            data:{
                                user_id:user_id,
                                access_code:phoneNum,
                                class_id:class_id,
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