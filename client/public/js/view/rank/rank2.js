/**
 * Created by jiangsong on 2017/9/18.
 */

import React from 'React';
import OneDrop from '../../const/onedrop';
import Tool from '../../Tool/Tool';
import Medal from '../drop/mine/Medal';
import Tree from '../drop/mine/MyStudy';

export default class Rank2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            rank:[],
            user:null,

            showMedal:false,
            showTree:false
        }
        this.back = this.back.bind(this);
    }

    back(){
        this.setState({
            showTree:false,
            showMedal:false
        })
    }

    componentDidMount(){
        $.ajax({
            url:OneDrop.base_url+'/rank',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID
            },
            success:(data)=>{
                if(data.status === 1){
                    var rank = data.data.rank;
                    var user = data.data.user;
                    this.setState({
                        rank:rank,
                        user:user,
                        isLoading:false
                    })
                }else{
                    this.setState({
                        isLoading:false
                    })
                    alert('数据错误!');
                }
            }
        })
        Tool.getJSSDKPaySign(location.href.split('#')[0],()=>{

        })
        Tool.shareToMoments({

        })
        Tool.shareToFriends({

        })
    }

    componentDidUpdate(){
        console.log('this.state.showMedal:',this.state.showMedal);
        console.log('this.state.showTree:',this.state.showTree);
    }

    render(){
        return(
            <div style={{
                width:OneDrop.JS_ScreenW
            }}>

                {
                    !this.state.showMedal && !this.state.showTree ?
                        <div style={{marginBottom:'130px'}}>
                            <div style={{
                                width:OneDrop.JS_ScreenW,height:'300px',position:'relative'
                            }}>
                                <img style={{
                                    width:OneDrop.JS_ScreenW,height:'300px'
                                }} src="../../../../img/weike/rank/banner.jpg"/>
                                <div style={{
                                    position:'absolute',width:'100%',height:'80px',display:'flex',flexDirection:'row',
                                    justifyContent:'space-between',alignItems:'center',top:'0',left:'0'
                                }}>
                                    <p style={{fontSize:'28px',color:'white',marginLeft:'30px'}} onClick={()=>{
                                        this.setState({
                                            showMedal:true,
                                            showTree:false
                                        })
                                    }}>获取称号</p>
                                    <p style={{fontSize:'28px',color:'white',marginRight:'30px'}} onClick={()=>{
                                        this.setState({
                                            showTree:true,
                                            showMedal:false
                                        })
                                    }}>我的成长树</p>
                                </div>
                            </div>

                            {
                                this.state.user ?
                                    <div style={{
                                        height:'140px',paddingLeft:'24px',paddingRight:'24px',backgroundColor:'rgb(241,241,241)',
                                        display:'flex',flexDirection:'row',marginTop:'-6px',paddingTop:'30px',paddingBottom:'30px',
                                        justifyContent:'space-between',alignItems:'center'
                                    }}>
                                        <div style={{
                                            display:'flex',flexDirection:'row',alignItems:'center'
                                        }}>
                                            <div style={{
                                                marginLeft:'42px'
                                            }}>
                                                <img style={{
                                                    width:'88px',height:'88px',borderRadius:'44px'
                                                }} src={this.state.user.headimgurl}/>
                                            </div>
                                            <div style={{
                                                marginLeft:'22px'
                                            }}>
                                                <p style={{fontSize:'28px',color:'rgb(0,0,0)'}}>{this.state.user.nickname}</p>
                                                <p style={{fontSize:'28px',color:'rgb(153,153,153)'}}>第{this.state.user.number ? this.state.user.number+1 : 1}名</p>
                                            </div>
                                        </div>
                                        <div style={{
                                            display:'flex',flexDirection:'row',alignItems:'center'
                                        }}>
                                            <div style={{
                                                display:'flex',flexDirection:'row',alignItems:'flex-end',
                                                marginRight:'40px'
                                            }}>
                                                <p style={{fontSize:'48px',color:'rgb(23,172,251)',lineHeight:'46px'}}>{this.state.user.fraction}</p>
                                                <p style={{fontSize:'28px',color:'rgb(23,172,251)',lineHeight:'26px'}}>分</p>
                                            </div>
                                            <div style={{
                                                display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'
                                            }}>
                                                <p style={{fontSize:'26px',color:'rgb(0,0,0)'}}>{this.state.user.appreciate_count ? this.state.user.appreciate_count : 0}</p>
                                                <div>
                                                    <img src="../../../../img/weike/rank/loved.png"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }

                            <div style={{
                                width:'100%',height:'30px',backgroundColor:'rgb(209,209,209)'
                            }}/>

                            <div>
                                {
                                    this.state.rank.map((content,index)=>{
                                        return(
                                            <div key={index} style={{
                                                height:'110px',paddingLeft:'24px',paddingRight:'24px',backgroundColor:index%2===0 ? 'white':'rgb(241,241,241)',
                                                paddingTop:'30px',paddingBottom:'30px',display:'flex',flexDirection:'row',
                                                justifyContent:'space-between',alignItems:'center'
                                            }}>
                                                <div style={{
                                                    display:'flex',flexDirection:'row',alignItems:'center'
                                                }}>
                                                    <p style={{fontSize:'28px',color:'rgb(0,0,0)'}}>{index+1}</p>
                                                    <div style={{
                                                        marginLeft:'29px'
                                                    }}>
                                                        <img style={{
                                                            width:'88px',height:'88px',borderRadius:'44px'
                                                        }} src={content.headimgurl}/>
                                                    </div>
                                                    <div style={{
                                                        marginLeft:'22px'
                                                    }}>
                                                        <p style={{fontSize:'28px',color:'rgb(0,0,0)'}}>{content.nickname}</p>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    display:'flex',flexDirection:'row',alignItems:'center'
                                                }}>
                                                    <div style={{
                                                        display:'flex',flexDirection:'row',alignItems:'flex-end',
                                                        marginRight:'40px'
                                                    }}>
                                                        <p style={{fontSize:'48px',color:index<=2 ? 'rgb(247,155,10)':'rgb(23,172,251)',lineHeight:'46px'}}>{content.fraction}</p>
                                                        <p style={{fontSize:'28px',color:index<=2 ? 'rgb(247,155,10)':'rgb(23,172,251)',lineHeight:'26px'}}>分</p>
                                                    </div>
                                                    <div onClick={()=>{
                                                        if(this.state.isLoading){
                                                            return;
                                                        }
                                                        this.setState({
                                                            isLoading:true
                                                        })
                                                        $.ajax({
                                                            url:OneDrop.base_url+'/appreciate/rank',
                                                            dataType:'json',
                                                            method:'POST',
                                                            data:{
                                                                user_id:REMOTE_WEIXIN_USER_ID,
                                                                appreciate_user_id:content.user_id
                                                            },
                                                            success:(data)=>{
                                                                if(data.status === 1){
                                                                    var newRank = this.state.rank;
                                                                    newRank[index].appreciate_count = newRank[index].appreciate_count ? newRank[index].appreciate_count : 0;
                                                                    newRank[index].appreciate_status = newRank[index].appreciate_status ? newRank[index].appreciate_status : 0;
                                                                    if(data.data === 'done'){
                                                                        newRank[index].appreciate_count = newRank[index].appreciate_count + 1;
                                                                        newRank[index].appreciate_status = 1;
                                                                    }
                                                                    if(data.data === 'cancel'){
                                                                        newRank[index].appreciate_count = newRank[index].appreciate_count - 1;
                                                                        newRank[index].appreciate_status = 0;
                                                                    }
                                                                    this.setState({
                                                                        rank:newRank,
                                                                        isLoading:false
                                                                    })
                                                                }else{
                                                                    this.setState({
                                                                        isLoading:false
                                                                    })
                                                                    alert('点赞失败!')
                                                                }
                                                            }
                                                        })
                                                    }} style={{
                                                        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'
                                                    }}>
                                                        <p style={{fontSize:'26px',color:'rgb(0,0,0)'}}>{content.appreciate_count ? content.appreciate_count : 0}</p>
                                                        <div>
                                                            <img src={content.appreciate_status ? '../../../../img/weike/rank/loved.png':'../../../../img/weike/rank/love.png'}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        : null
                }

                {
                    this.state.showMedal && !this.state.showTree ?
                        <Medal callback={this.back}/> : null
                }

                {
                    this.state.showTree && !this.state.showMedal ?
                        <Tree callback={this.back}/> : null
                }

                {
                    this.state.isLoading ?
                        <div style={{
                            position:'fixed',top:'0',left:'0',
                            width:OneDrop.JS_ScreenW,
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