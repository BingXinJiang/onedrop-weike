/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
require ('weui');
require('react-weui/lib/react-weui.min.css');
import {
    Article,
    CellsTitle,
    Cells,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui';
import OneDrop from '../../const/onedrop';
import async from 'async';
import DropAudio from '../view/DropAudio';

export default class TodayDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowAllContent: false,
            isShowPunchCard: false,
            course: null,
            isPanchCard: false,
            user: null,
            nowMotto:'每日一滴，滴水穿石'
        }
    }

    componentDidMount() {
        $.ajax({
            url:OneDrop.base_url + '/onedrop/every_day',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID
            },
            success:(data)=>{
                console.log('today drop:', data);
                if(data.status === 1){
                    this.setState({
                        course:data.data.course,
                        isPanchCard:data.data.isPanchCard,
                        user:data.data.user
                    })
                }else{
                    alert('数据错误！');
                }
            }
        })
    }
    render(){
        const desStyle = !this.state.isShowAllContent ? {
            height:'160px',
            overflow:'hidden'
        } : {};
        let audioUrl = '';
        if(this.state.course){
            audioUrl = this.state.course.section_voice;
        }else{
            audioUrl = '';
        }
        let headimgUrl = this.state.user ? this.state.user.headimgurl :'';
        return (
            <div style={{
                paddingBottom:'100px'
            }}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    width:'100%',
                    height:OneDrop.JS_ScreenH*0.43*2+'px',
                    backgroundImage:'url("../../../img/weike/onedrop/bg.jpg")'
                }}>
                    <div style={{
                        display:'flex',
                        width:'100%',
                        height:'56px',
                        marginTop:'24px',
                        justifyContent:'flex-end'
                    }}>
                        <div onClick={()=>{
                            if(this.state.isPanchCard){

                            }else{
                                this.setState({
                                    isShowPunchCard:true
                                })
                            }
                        }} style={{
                            display:'flex',
                            width:'110px',
                            height:'56px',
                            borderRadius:'28px',
                            backgroundColor:'rgb(110,217,31)',
                            color:'white',
                            fontSize:'28px',
                            justifyContent:'center',
                            alignItems:'center',
                            marginRight:'24px',
                        }}>
                            {this.state.isPanchCard ? '已打卡':'打卡'}
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'flex-start'
                    }}>
                        <div>
                            <div style={{
                                width:'100%',
                                display:'flex',
                                justifyContent:'center'
                            }}>
                                <img style={{
                                    width:'140px',
                                    height:'140px',
                                    borderRadius:'70px'
                                }} src={headimgUrl}/>
                            </div>
                            <p style={{
                                marginTop:'16px',
                                color:'rgb(0,0,0)',
                                fontSize:'26px',
                                width:'100%',
                                textAlign:'center'
                            }}>{this.state.user ? this.state.user.nickname : ''}</p>
                            <p style={{
                                marginTop:'16px',
                                color:'rgb(0,0,0)',
                                fontSize:'26px',
                                width:'100%',
                                textAlign:'center'
                            }}>积分  {this.state.user ? this.state.user.fraction ? this.state.user.fraction : 0 : 0}</p>
                            <p style={{
                                marginTop:'16px',
                                color:'rgb(0,0,0)',
                                fontSize:'26px',
                                width:'100%',
                                textAlign:'center'
                            }}>{this.state.nowMotto}</p>
                        </div>
                    </div>

                </div>

                <div style={{
                    display:'flex',
                    width:'100%',
                    backgroundColor:'rgb(235,235,235)',
                    paddingBottom:'70px'
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        backgroundColor:'white',
                        width:'100%',
                        borderRadius:'61px',
                        marginTop:'-100px',
                        paddingBottom:'68px'
                    }}>
                        <div style={{
                            display:'flex',
                            width:'100%',
                            justifyContent:'center',
                            marginTop:'56px'
                        }}>
                            <p style={{
                                fontSize:'44px',
                                color:'rgb(0,0,0)'
                            }}>{this.state.course ? this.state.course.course_title : ''}</p>
                        </div>
                        <div style={{
                            display:'flex',
                            width:'100%',
                            justifyContent:'center',
                            marginTop:'28px'
                        }}>
                            <p style={{
                                fontSize:'28px',
                                color:'rgb(127,127,127)'
                            }}>{this.state.course ? this.state.course.teacher_name : ''}: </p>
                            <p style={{
                                fontSize:'28px',
                                color:'rgb(127,127,127)'
                            }}>{this.state.course ? this.state.course.teacher_position : ''}</p>
                        </div>
                        <div style={{
                            display:'flex',
                            width:'100%',
                            justifyContent:'center',
                            marginTop:'54px'
                        }}>
                            {
                                this.state.course ? <DropAudio audioUrl={audioUrl}/> : null
                            }
                        </div>
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            marginTop:'68px'
                        }}>
                            <p style={{
                                ...desStyle,
                                width:(OneDrop.JS_ScreenW-48)+'px',
                                fontSize:'26px',
                                lineHeight:'42px',
                                color:'rgb(127,127,127)'
                            }}>
                                {this.state.course ? this.state.course.section_des : ''}
                            </p>
                            <div style={{
                                display:'flex',
                                width:'100%',
                                height:'60px',
                                marginTop:'42px',
                                justifyContent:'center'
                            }}>
                                <p onClick={()=>{
                                    this.setState({
                                        isShowAllContent:!this.state.isShowAllContent
                                    })
                                }} style={{
                                    display:'flex',
                                    width:'194px',
                                    height:'56px',
                                    borderRadius:'28px',
                                    borderColor:'rgb(132,132,132)',
                                    borderWidth:'2px',
                                    borderStyle:'solid',
                                    color:'rgb(127,127,127)',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    fontSize:'26px'
                                }}>{this.state.isShowAllContent ? '收起更多' : '查看更多'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.isShowPunchCard ?
                        <div style={{
                            position:'absolute',
                            left:'0',
                            top:'0',
                            width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,
                            backgroundColor:'rgba(0,0,0,0.5)',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <div style={{
                                display:'flex',
                                width:'100%',
                                flexDirection:'column',
                                alignItems:'center'
                            }}>
                                <div style={{
                                    display:'flex',
                                    width:'560px',
                                    height:'580px',
                                    backgroundImage:'url("../../../img/weike/onedrop/bg_card.png")',
                                    backgroundSize:'100% 100%',
                                    backgroundRepeat:'no-repeat',
                                    flexDirection:'column'
                                }}>
                                    <p style={{
                                        fontSize:'24px',
                                        marginLeft:'34px',
                                        marginTop:'32px'
                                    }}>选择您今天的口号：</p>
                                    <div style={{
                                        display:'flex',
                                        flexDirection:'column',
                                        marginTop:'30px',
                                        alignItems:'center',
                                        height:'70%',
                                        overflow:'auto'
                                    }}>
                                        {
                                            [
                                                '每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石',
                                                '每日一滴，滴水穿石每日一滴，滴水穿石',
                                            ].map((content, index)=>{
                                                return (
                                                    <p onClick={()=>{
                                                        if(this.state.course){
                                                            var section_id = this.state.course.course_id;
                                                            $.ajax({
                                                                url:OneDrop.base_url+'/card/punch_card',
                                                                dataType:'json',
                                                                method:'POST',
                                                                data:{
                                                                    user_id:REMOTE_WEIXIN_USER_ID,
                                                                    motto:content,
                                                                    section_id:section_id
                                                                },
                                                                success:(data)=>{
                                                                    if(data.status === 1){
                                                                        this.setState({
                                                                            isShowPunchCard:false,
                                                                            isPanchCard:true,
                                                                            nowMotto:content
                                                                        })
                                                                    }else{
                                                                        alert('打卡失败');
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }} style={{
                                                        fontSize:'24px',
                                                        lineHeight:'80px',
                                                    }} key={index}>
                                                        {content}
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div onClick={()=>{
                                    this.setState({
                                        isShowPunchCard:false
                                    })
                                }} style={{
                                    marginTop:'23px'
                                }}>
                                    <img src="../../../img/weike/onedrop/close.png"/>
                                </div>
                            </div>
                        </div>
                        : null
                }
            </div>
        )
    }
}