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
            isShowAllContent:false,
            isShowPunchCard:false
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
                console.log(data);
            }
        })
    }
    render(){
        const desStyle = !this.state.isShowAllContent ? {
            height:'160px',
            overflow:'hidden'
        } : {};
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
                            this.setState({
                                isShowPunchCard:true
                            })
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
                            打卡
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
                                }} src="../../../img/weike/test/test_head.png"/>
                            </div>
                            <p style={{
                                marginTop:'16px',
                                color:'rgb(0,0,0)',
                                fontSize:'26px',
                                width:'100%',
                                textAlign:'center'
                            }}>昵称</p>
                            <p style={{
                                marginTop:'16px',
                                color:'rgb(0,0,0)',
                                fontSize:'26px',
                                width:'100%',
                                textAlign:'center'
                            }}>600积分</p>
                            <p style={{
                                marginTop:'16px',
                                color:'rgb(0,0,0)',
                                fontSize:'26px',
                                width:'100%',
                                textAlign:'center'
                            }}>每日一滴，滴水穿石</p>
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
                            }}>管理者用人的100个细节</p>
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
                            }}>李伟：</p>
                            <p style={{
                                fontSize:'28px',
                                color:'rgb(127,127,127)'
                            }}>知名学者、教授</p>
                        </div>
                        <div style={{
                            display:'flex',
                            width:'100%',
                            justifyContent:'center',
                            marginTop:'54px'
                        }}>
                            <DropAudio audioUrl='../../../img/weike/test/盖子法则2.mp3'/>
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
                            }}>你是一位优秀的管理者吗？这是什么到累呢那咖啡咖啡案件发生健康合法的授课风格，
                            案件分别是科技股份登记说课稿。安徽发布独守空房价格爱空间划分公司贷款
                            按空格键不服输的进口国安科技股份的司空见惯开关机耐腐蚀的恐惧感结果你东方时空
                            按揭购房送大家看过安科技股份的时刻安监部给对方安监部给对方就安监部给对方、
                            案件被范德萨啊个百分点、
                            阿波菲斯等级跟不上安静不规范肯定是安监部给对方是安静的奋不顾身的会计估计不到法国
                            啊对价格表的说法科技馆快递费价格狂蜂浪蝶石膏板咖啡馆和人
                            爱干净开发商的顾客还是按客户公司可认购和卡号刚开始
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
                                }}>{!this.state.isShowAllContent ? '收起更多' : '查看更多'}</p>
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
                                                    <p style={{
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