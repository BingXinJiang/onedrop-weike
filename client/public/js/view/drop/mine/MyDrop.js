/**
 * Created by jiangsong on 2017/6/2.
 */


//未被使用

import React from 'react';
import OneDrop from '../../../const/onedrop';

export default class MyDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:null
        }
    }

    componentDidMount(){
        $.ajax({
            url:OneDrop.base_url+'/mydrop',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID
            },
            success:(data)=>{
                if(data.status === 1){
                    this.setState({
                        user:data.data
                    })
                }else{
                    alert('数据更新失败！');
                }
            }
        })
    }

    render(){
        var answer_count = 0;
        var comment_count = 0;
        var learn_count = 0;
        var question_count = 0;
        var headimgurl = '';
        var appreciate_count = 0;
        if(this.state.user){
            var user = this.state.user;
            answer_count = user.answer_count ? Number(user.answer_count) : 0;
            comment_count = user.comment_count ? Number(user.comment_count) : 0;
            learn_count = user.learn_count ? Number(user.learn_count) : 0;
            question_count = user.question_count ? Number(user.question_count) : 0;
            appreciate_count = user.appreciate_count ? Number(user.appreciate_count) : 0;
            headimgurl = user.headimgurl;
        }
        var mydropNum = learn_count*3+question_count*2+comment_count+answer_count;
        var leaderValue = appreciate_count;
        const containerStyle = {
            position:'absolute',
            display:'flex',flexDirection:'column',alignItems:'center',
            backgroundImage:'url(../../../../img/weike/home/drop.png)',width:'87px',height:'151px',
            backgroundSize:'100% 100%'
        }
        const pStyle = {
            fontSize:'20px',
            color:'rgb(51,51,51)',
            lineHeight:'25px'
        }
        return(
            <div>
                <div style={{
                    width:OneDrop.JS_ScreenW,
                    height:(OneDrop.JS_ScreenH*2-114)+'px',
                    backgroundImage:'url(../../../../img/weike/home/mydrop.jpg)',
                    backgroundSize:'100% 100%'
                }}>
                    <div style={{
                        display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'24px',paddingTop:'72px'
                    }}>
                        <img style={{width:'98px',height:'98px',borderRadius:'49px'}} src={headimgurl}/>
                        <div style={{
                            display:'flex',flexDirection:'column',marginLeft:'24px',justifyContent:'center'
                        }}>
                            <p style={{fontSize:'30px',color:'rgb(51,51,51)',lineHeight:'49px'}}>我的领导力值：{leaderValue}</p>
                            <p style={{fontSize:'30px',color:'rgb(51,51,51)',lineHeight:'49px'}}>我的水滴值：{mydropNum}</p>
                        </div>
                    </div>
                    <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',marginTop:'280px'}}>
                        <div style={{
                            position:'relative',backgroundImage:'url(../../../../img/weike/home/tree.png)',
                            backgroundSize:'100% 100%',width:'513px',height:'539px'
                        }}>
                            <div style={{...containerStyle,left:'7px',top:'260px'}}>
                                <p style={{...pStyle,marginTop:'60px'}}>我的</p>
                                <p style={{...pStyle}}>一滴</p>
                                <p style={{...pStyle}}>{learn_count}</p>
                            </div>
                            <div style={{...containerStyle,left:'112px',top:'80px'}}>
                                <p style={{...pStyle,marginTop:'60px'}}>我的</p>
                                <p style={{...pStyle}}>提问</p>
                                <p style={{...pStyle}}>{question_count}</p>
                            </div>
                            <div style={{...containerStyle,right:'125px',top:'18px'}}>
                                <p style={{...pStyle,marginTop:'60px'}}>我的</p>
                                <p style={{...pStyle}}>回答</p>
                                <p style={{...pStyle}}>{answer_count}</p>
                            </div>
                            <div style={{...containerStyle,right:'3px',top:'191px'}}>
                                <p style={{...pStyle,marginTop:'60px'}}>我的</p>
                                <p style={{...pStyle}}>留言</p>
                                <p style={{...pStyle}}>{comment_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}