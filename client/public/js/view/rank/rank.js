/**
 * Created by jiangsong on 2017/6/20.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';


export default class Rank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            rank:[],
            user:null,

            isShowPrompt:false,
            isShowPrompt2:false
        }
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
    }

    render(){
        return(
            <div style={{
                width:OneDrop.JS_ScreenW,marginBottom:'130px'
            }}>
                <div style={{
                    width:OneDrop.JS_ScreenW,height:'300px',position:'relative'
                }}>
                    <img style={{
                        width:OneDrop.JS_ScreenW,height:'300px'
                    }} src="../../../../img/weike/rank/banner.jpg"/>
                    <p onClick={()=>{
                        this.setState({
                            isShowPrompt2:true
                        })
                    }} style={{
                        position:'absolute',top:'30px',right:'24px',fontSize:'30px',color:'white',textDecoration:'underline',
                        paddingBottom:'2px'
                    }}>积分规则</p>
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
                {/*{*/}
                    {/*this.state.isShowPrompt ?*/}
                        {/*<div onClick={()=>{*/}
                            {/*this.setState({*/}
                                {/*isShowPrompt:false*/}
                            {/*})*/}
                        {/*}} onTouchMove={(e)=>{*/}
                            {/*e.preventDefault();*/}
                        {/*}} style={{*/}
                            {/*position:'absolute',zIndex:'99',left:'0',top:'0',*/}
                            {/*width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH*2,backgroundColor:'rgba(0,0,0,0.6)',*/}
                            {/*display:'flex',justifyContent:'center',alignItems:'center'*/}
                        {/*}}>*/}
                            {/*<div style={{*/}
                                {/*display:'flex',flexDirection:'column',alignItems:'center',borderRadius:'20px',*/}
                                {/*backgroundColor:'white',width:OneDrop.JS_ScreenW-104+'px'*/}
                            {/*}}>*/}
                                {/*<img style={{width:'100%'}} src="../../../img/weike/rank/pro.png"/>*/}
                                {/*<p style={{*/}
                                    {/*paddingLeft:'36px',paddingRight:'36px',fontSize:'28px',lineHeight:'44px',color:'rgb(102,102,102)',*/}
                                    {/*marginTop:'53px'*/}
                                {/*}}>*/}
                                    {/*每日完成一则领导力分享微课*/}
                                {/*</p>*/}
                                {/*<p style={{*/}
                                    {/*fontSize:'28px',color:'rgb(102,102,102)',marginTop:'32px',lineHeight:'44px'*/}
                                {/*}}>*/}
                                    {/*可获得10积分*/}
                                {/*</p>*/}
                                {/*<p onClick={()=>{*/}
                                    {/*this.setState({*/}
                                        {/*isShowPrompt:false*/}
                                    {/*})*/}
                                {/*}} style={{*/}
                                    {/*fontSize:'28px',color:'rgb(255,255,255)',width:'322px',height:'70px',borderRadius:'10px',*/}
                                    {/*backgroundColor:'rgb(49,149,215)',display:'flex',justifyContent:'center',alignItems:'center',*/}
                                    {/*marginTop:'52px',marginBottom:'46px'*/}
                                {/*}}>*/}
                                    {/*朕知道了*/}
                                {/*</p>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*:*/}
                        {/*null*/}
                {/*}*/}
                {
                    this.state.isShowPrompt2 ?
                        <div onClick={()=>{
                            this.setState({
                                isShowPrompt2:false
                            })
                        }} onTouchMove={(e)=>{
                            e.preventDefault();
                        }} style={{
                            position:'absolute',zIndex:'99',left:'0',top:'0',
                            width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH*2,backgroundColor:'white'
                        }}>
                            <div style={{
                                display:'flex',width:'100%',justifyContent:'flex-end',marginTop:'30px'
                            }}>
                                <a onClick={()=>{
                                    this.setState({
                                        isShowPrompt2:false
                                    })
                                }} style={{fontSize:'28px',paddingRight:'30px',color:'gray'}}>我知道了</a>
                            </div>
                            <div style={{
                                width:'100%',
                            }}>
                                <div style={{display:'flex',justifyContent:'center',width:'100%'}}>
                                    <p style={{fontSize:'30px'}}>积分/能量值规则说明</p>
                                </div>

                                <div style={{
                                    marginTop:'30px',marginLeft:'30px',marginRight:'30px'
                                }}>
                                    <p style={{fontSize:'24px'}}>Q:什么是积分和能量值？积分和能量值有什么区别？</p>
                                    <p style={{fontSize:'24px'}}>A:积分是学习者参与度、贡献度等行为的量化指标，而能量值是学习者学习技能的量化指标。</p>
                                </div>

                                <div style={{
                                    marginTop:'30px',marginLeft:'30px',marginRight:'30px'
                                }}>
                                    <p style={{fontSize:'24px'}}>Q:怎么才能获得积分？</p>
                                    <p style={{fontSize:'24px',textIndent:'40px'}}>1、每天登陆平台可获得1分，连续5天登陆奖励10积分，连续7天登陆奖励20积分</p>
                                    <p style={{fontSize:'24px',textIndent:'40px'}}>2、完整学习一篇一滴(听完音频)获得1积分，在课程下方留言获得1积分</p>
                                    <p style={{fontSize:'24px',textIndent:'40px'}}>3、提出问题可获得1积分，有用户为该问题点赞，每获得一个赞增加1积分</p>
                                    <p style={{fontSize:'24px',textIndent:'40px'}}>4、对问题提出解答，获得两个积分，该解答每获得一个赞增加2积分</p>

                                </div>

                                <div style={{
                                    marginTop:'30px',marginLeft:'30px',marginRight:'30px'
                                }}>
                                    <p style={{fontSize:'24px'}}>Q:怎么才能提高能量值？</p>
                                    <p style={{fontSize:'24px',textIndent:'40px'}}>1、初次完整学习一篇一滴，获得10能量值，第二周重复学习该篇课程获得20能量值，第四周重复学习该能量值获得30积分，第七周重复学习该篇课程获得50能量值，其他时间重复学习，能量值不增加</p>
                                    <p style={{fontSize:'24px',textIndent:'40px'}}>2、学习课程后发表留言，可得2能量值</p>
                                </div>

                            </div>

                        </div>
                        : null
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