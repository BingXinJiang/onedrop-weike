/**
 * Created by jiangsong on 2017/8/15.
 */

import React from 'react';
import OneDrop from '../../const/onedrop';
import Drop from '../drop/everyday/Drop';
import Answer from '../answer/Solve';
import Tool from '../../Tool/Tool';
import Style from '../../const/Style';

const wordStyle = {
    color:Style.wordColor,fontSize:Style.wordSize,wordBreak:'break-all'
}

const LINE = <div style={{
                width:'100%',height:'20px',backgroundColor:Style.lineGray,marginTop:'30px'
            }}/>

const btnStyle = {
    ...wordStyle,color:'white',backgroundColor:Style.bgBlue,width:'320px',height:'50px',
    display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'2px'
}

const bottomLine = <div style={{
    width:'100%',backgroundColor:Style.lineGray,height:'1px'
}}/>

const circle =(idx)=> <div style={{width:'60px',height:'60px',backgroundColor:Style.bgGray,borderRadius:'40px',
                    overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'
                }}>
                    <p style={{...wordStyle}}>
                        {idx+1}
                    </p>
                </div>

const CourseLoadingState = [
    '更多未学习一滴',
    '正在加载一滴...',
    '没有更多一滴...'
]

const QuestionLoadingState = [
    '更多我的问题',
    '正在加载问题...',
    '没有更多问题...'
]

const AnswerLoadingState = [
    '更多我参与回答的问题',
    '正在加载问题...',
    '没有更多问题...'
]

/**
 * User 模块
 * */

class User extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            nickname:'',
            headimgurl:'../../../img/weike/home/yunguhui.jpg',
            fraction:0
        }
    }

    componentDidMount(){
        var body = JSON.stringify({
            user_id:REMOTE_WEIXIN_USER_ID
        })
        fetch(OneDrop.base_url+'/rank/fraction',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        }).then((response)=>{
            return response.json();
        }).then((res)=>{
            if(res.status === 1){
                var user = res.data;
                this.setState({
                    nickname:user.nickname,
                    headimgurl:user.headimgurl,
                    fraction:user.fraction
                })
            }else {
                alert('数据请求失败！！');
            }
        })
    }

    render(){
        return (
            <div style={{
                width:'100%',display:'flex',marginTop:'40px'
            }}>
                <div style={{
                    width:'100px',height:'100px',borderRadius:'50px',marginLeft:'30px',marginRight:'20px',
                    overflow:'hidden'
                }}>
                    <img style={{
                        width:'100px',height:'100px'
                    }} src={this.state.headimgurl}/>
                </div>
                <div style={{
                    display:'flex',flexDirection:'column',justifyContent:'center'
                }}>
                    <p style={{...wordStyle}}>{this.state.nickname}</p>
                    <p style={{...wordStyle}}>我的积分：
                        <span style={{color:Style.green}}>{this.state.fraction}分</span>
                    </p>
                </div>
            </div>
        )
    }

}
/**
 * 未学习的课程模块
 * */
class NoLearnCourse extends React.PureComponent{

    constructor(props){
        super(props);
        this.state={
            loadingState:0, // 1正在加载
            courses:[]
        }
        this.page = 1;
        this.getCourse = this.getCourse.bind(this);
    }

    getCourse(){
        if(this.state.loadingState !== 0){
            return;
        }
        this.setState({
            loadingState:1
        })
        var body = JSON.stringify({
            user_id:REMOTE_WEIXIN_USER_ID,
            page:this.page
        })
        fetch(OneDrop.base_url+'/news/learn',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        }).then((response)=>{
            return response.json();
        }).then((res)=>{
            // console.log('未学课程：',res);
            if(res.status === 1){
                var courses = res.data;
                var loadingState = 0;
                if(courses.length<1){
                    loadingState = 2;
                }
                this.setState({
                    courses:this.state.courses.concat(courses),
                    loadingState:loadingState
                })
                this.page = this.page+1;
            }else{
                alert('请求数据失败！！');
                this.setState({
                    loadingState:0
                })
            }
        })
    }

    componentDidMount(){
        this.getCourse();
    }

    render(){
        return (
            <div style={{
                width:'100%'
            }}>
                <div style={{
                    width:'100%',height:'100px',display:'flex',alignItems:'center',justifyContent:'center'
                }}>
                    <span style={{width:'70px',height:'2px',backgroundColor:Style.green}}/>
                    <p style={{...wordStyle,marginLeft:'20px',marginRight:'20px'}}>我的每日一滴</p>
                    <span style={{width:'70px',height:'2px',backgroundColor:Style.green}}/>
                </div>
                {bottomLine}
                <div>
                    {
                        this.state.courses.map((content,idx)=>{
                            return (
                                <div key={idx} style={{
                                    width:'100%',backgroundColor:'white',height:'121px'
                                }}>
                                    <div style={{
                                        display:'flex',marginLeft:'30px',marginRight:'30px',alignItems:'center',
                                        height:'120px'
                                    }} onClick={()=>{
                                        if(this.state.loadingState === 1){
                                            return;
                                        }
                                        var audio = document.createElement('audio');
                                        audio.preload = 'auto';
                                        audio.src = content.section_voice;
                                        audio.id = 'che_dan_de_yin_pin'+content.section_id;
                                        OneDrop.AUDIO = audio;
                                        this.props.callback(content.section_id);
                                    }}>
                                        <div style={{
                                            display:'flex',flex:'1'
                                        }}>
                                            <div style={{width:'60px',height:'60px',backgroundColor:Style.bgGray,borderRadius:'40px',
                                                overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'
                                            }}>
                                                <p style={{...wordStyle}}>
                                                    {idx===0 ? <span style={{...wordStyle,color:'red',fontSize:'22px'}}>最新</span>:idx+1}
                                                </p>
                                            </div>
                                            <p style={{...wordStyle,display:'flex',alignItems:'center',marginLeft:'18px'}}>
                                                {content.section_name}
                                            </p>
                                        </div>
                                        <div style={{
                                            width:'180px',display:'flex',justifyContent:'center',alignItems:'center',
                                            marginLeft:'20px'
                                        }}>
                                            <div style={{
                                                width:'180px',height:'60px',display:'flex',justifyContent:'flex-start',alignItems:'center',
                                                backgroundColor:Style.bgGray,borderRadius:'30px',overflow:'hidden'
                                            }}>
                                                <div style={{width:'58px',height:'58px',display:'flex',justifyContent:'center',alignItems:'center',
                                                    backgroundColor:Style.bgGray,borderRadius:'29px',overflow:'hidden',borderStyle:'solid',
                                                    borderColor:Style.green,borderWidth:'1px'
                                                }}>
                                                    <img style={{
                                                        width:'40px'
                                                    }} src="../../../img/weike/homepage/learn.png"/>
                                                </div>
                                                <p style={{
                                                    ...wordStyle,marginLeft:'20px',fontSize:'24px'
                                                }}>去学习</p>
                                            </div>
                                        </div>
                                    </div>
                                    {bottomLine}
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'
                }} onClick={this.getCourse}>
                    <p style={{...btnStyle}}>
                        {CourseLoadingState[this.state.loadingState]}
                    </p>
                </div>
            </div>
        )
    }
}
/**
 * 我提出的问题有了新的回答模块
 * */
class NoReadQuestion extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            loadingState:0,
            questions:[]
        }
        this.page = 1;
        this.getQuestions = this.getQuestions.bind(this);
    }
    getQuestions(){
        if(this.state.loadingState !== 0){
            return;
        }
        this.setState({
            loadingState:1
        })
        var body = JSON.stringify({
            user_id:REMOTE_WEIXIN_USER_ID,
            page:this.page
        })
        fetch(OneDrop.base_url+'/news/answer/question',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        }).then((response)=>{
            return response.json();
        }).then((res)=>{
            // console.log('我的问题：',res);
            if(res.status === 1){
                var questions = res.data;
                var loadingState = 0;
                if(questions.length<1){
                    loadingState = 2;
                }
                this.setState({
                    questions:this.state.questions.concat(questions),
                    loadingState:loadingState
                })
                this.page = this.page+1;
            }else{
                alert('请求数据失败！！');
                this.setState({
                    loadingState:0
                })
            }
        })
    }
    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div style={{
                width:'100%'
            }}>
                <div style={{
                    width:'100%',height:'100px',display:'flex',alignItems:'center',justifyContent:'center'
                }}>
                    <span style={{width:'70px',height:'2px',backgroundColor:Style.green}}/>
                    <p style={{...wordStyle,marginLeft:'20px',marginRight:'20px'}}>我的问题</p>
                    <span style={{width:'70px',height:'2px',backgroundColor:Style.green}}/>
                </div>
                {bottomLine}
                <div>
                    {
                        this.state.questions.map((content,idx)=>{
                            return (
                                <div key={idx} style={{
                                    width:'100%',height:'171px'
                                }}>
                                    <div style={{
                                        display:'flex',marginLeft:'30px',marginRight:'30px',height:'170px',alignItems:'center'
                                    }} onClick={()=>{
                                        if(this.state.loadingState === 1){
                                            return;
                                        }
                                        this.props.callback(content.question_id);
                                    }}>
                                        <div style={{
                                            display:'flex',flex:'1',alignItems:'center'
                                        }}>
                                            {circle(idx)}
                                            <p style={{
                                                ...wordStyle,marginLeft:'20px',lineHeight:'50px',height:'150px',overflow:'hidden',
                                                display:'flex',wordBreak:'break-all',
                                                textAlign:'left',flex:'1'
                                            }}>{content.question_desc}</p>
                                        </div>
                                        <div style={{
                                            display:'flex',flexDirection:'column',marginLeft:'20px',
                                            width:'120px',justifyContent:'flex-end',alignItems:'center'
                                        }}>
                                            <div style={{
                                                display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',
                                                position:'relative'
                                            }}>
                                                {
                                                    content.hasNew ?
                                                        <span style={{
                                                            width:'16px',height:'16px',backgroundColor:'red',borderRadius:'8px',overflow:'hidden',
                                                            position:'absolute',top:'0',right:'0'
                                                        }}/> : null
                                                }
                                                <img style={{width:'60px'}} src="../../../img/weike/homepage/comment.png"/>
                                            </div>
                                            <p style={{...wordStyle,color:content.hasNew ? 'red':Style.wordColor}}>{content.answer_count}回答</p>
                                        </div>
                                    </div>
                                    {bottomLine}
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'
                }} onClick={this.getQuestions}>
                    <p style={{...btnStyle}}>{QuestionLoadingState[this.state.loadingState]}</p>
                </div>
            </div>
        )
    }
}
/**
 * 我参与回答的问题有了新的回答模块
 * */
class NoReadAnswer extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            loadingState:0,
            questions:[]
        }
        this.page = 1;
        this.getQuestions = this.getQuestions.bind(this);
    }
    getQuestions(){
        if(this.state.loadingState !== 0){
            return;
        }
        this.setState({
            loadingState:1
        })
        var body = JSON.stringify({
            user_id:REMOTE_WEIXIN_USER_ID,
            page:this.page
        })
        fetch(OneDrop.base_url+'/news/answer/answer',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        }).then((response)=>{
            return response.json();
        }).then((res)=>{
            // console.log('我的回答：',res);
            if(res.status === 1){
                var questions = res.data;
                var loadingState = 0;
                if(questions.length<1){
                    loadingState = 2;
                }
                this.setState({
                    questions:this.state.questions.concat(questions),
                    loadingState:loadingState
                })
                this.page = this.page+1;
            }else{
                alert('请求数据失败！！');
                this.setState({
                    loadingState:0
                })
            }
        })
    }
    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div style={{
                width:'100%',marginBottom:'60px'
            }}>
                <div style={{
                    width:'100%',height:'100px',display:'flex',alignItems:'center',justifyContent:'center'
                }}>
                    <span style={{width:'70px',height:'2px',backgroundColor:Style.green}}/>
                    <p style={{...wordStyle,marginLeft:'20px',marginRight:'20px'}}>我参与回答的问题</p>
                    <span style={{width:'70px',height:'2px',backgroundColor:Style.green}}/>
                </div>
                {bottomLine}
                <div>
                    {
                        this.state.questions.map((content,idx)=>{
                            return (
                                <div key={idx} style={{
                                    width:'100%',height:'171px'
                                }}>
                                    <div style={{
                                        display:'flex',marginLeft:'30px',marginRight:'30px',height:'170px',alignItems:'center'
                                    }} onClick={()=>{
                                        if(this.state.loadingState === 1){
                                            return;
                                        }
                                        this.props.callback(content.question_id);
                                    }}>
                                        <div style={{
                                            display:'flex',flex:'1',alignItems:'center'
                                        }}>
                                            {circle(idx)}
                                            <p style={{
                                                ...wordStyle,marginLeft:'20px',lineHeight:'50px',height:'150px',overflow:'hidden',
                                                display:'flex',wordBreak:'break-all',
                                                textAlign:'left',flex:'1'
                                            }}>{content.question_desc}</p>
                                        </div>
                                        <div style={{
                                            display:'flex',flexDirection:'column',marginLeft:'20px',
                                            width:'120px',justifyContent:'flex-end',alignItems:'center'
                                        }}>
                                            <div style={{
                                                display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',
                                                position:'relative'
                                            }}>
                                                {
                                                    content.hasNew ?
                                                        <span style={{
                                                            width:'16px',height:'16px',backgroundColor:'red',borderRadius:'8px',overflow:'hidden',
                                                            position:'absolute',top:'0',right:'0'
                                                        }}/> : null
                                                }
                                                <img style={{width:'60px'}} src="../../../img/weike/homepage/comment.png"/>
                                            </div>
                                            <p style={{...wordStyle,color:content.hasNew ? 'red':Style.wordColor}}>{content.answer_count}回答</p>
                                        </div>
                                    </div>
                                    {bottomLine}
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px',
                }} onClick={this.getQuestions}>
                    <p style={{...btnStyle}}>{AnswerLoadingState[this.state.loadingState]}</p>
                </div>
            </div>
        )
    }
}
/**
 * 跳转到首页
 * */
class GoDrops extends React.PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{
                width:'120px',height:'120px',borderRadius:'60px',overflow:'hidden',backgroundColor:'rgb(23,172,251)',
                display:'flex',justifyContent:'center',alignItems:'center',position:'fixed',top:'70%',right:'0'
            }} onClick={this.props.callback}>
                <p style={{color:'white',fontSize:'28px'}}>首页</p>
            </div>
        )
    }
}
/**
 * 主框架模块
 * */
export default class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            show:0    // 0  默认未学习页，1 Drop一滴学习页  2  答案页面
        }
        this.sectionId = 0;
        this.questionId = '';
        this.back = this.back.bind(this);
        this.goToDrop = this.goToDrop.bind(this);
        this.goToAnswer = this.goToAnswer.bind(this);
    }
    //从问答页或者一滴学习页返回
    back(){
        this.setState({
            show:0
        })
    }
    //跳转到一滴学习页
    goToDrop(sectionId){
        this.sectionId = sectionId;
        this.setState({
            show:1
        })
    }
    //跳转到问答页面
    goToAnswer(questionId){
        this.questionId = questionId;
        this.setState({
            show:2
        })
    }

    componentDidMount(){
        Tool.getJSSDKPaySign(encodeURIComponent(location.href.split('#')[0]),()=>{

        })
        Tool.shareToMoments({

        })
        Tool.shareToFriends({

        })
    }

    render(){
        return (
            <div>
                {
                    this.state.show === 1 ?
                        <Drop sectionId={this.sectionId} callback={this.back}/>
                        :
                        this.state.show === 2 ?
                            <Answer question_id={this.questionId} isAppreciateAnswersShow={1}
                                    isShowConnectReply={false} callback={this.back}/>
                            :
                            <div>
                                <div style={{
                                    width:OneDrop.JS_ScreenW
                                }}>
                                    <div style={{
                                        width:'100%',display:'flex',justifyContent:'center'
                                    }}>
                                        <img style={{
                                            width:'100%',height:'360px'
                                        }} src="../../../img/weike/homepage/top.jpg"/>
                                    </div>
                                </div>
                                <User/>
                                {LINE}
                                <NoLearnCourse callback={this.goToDrop}/>
                                {LINE}
                                <NoReadQuestion callback={this.goToAnswer}/>
                                {LINE}
                                <NoReadAnswer callback={this.goToAnswer}/>
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
                                <GoDrops callback={this.props.callback}/>
                            </div>
                }
            </div>
        )
    }

}