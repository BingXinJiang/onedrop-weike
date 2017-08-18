/**
 * Created by jiangsong on 2017/8/15.
 */

import React from 'react';
import OneDrop from '../../const/onedrop';
import Drop from '../drop/everyday/Drop';
import Answer from '../answer/Solve';

const wordStyle = {
    color:'rgb(51,51,51)',fontSize:'28px',wordBreak:'break-all'
}

const LINE = <div style={{
                width:'100%',height:'20px',backgroundColor:'rgb(153,153,153)',marginTop:'30px'
            }}/>

const CourseLoadingState = [
    '更多未学习课程',
    '正在加载课程...',
    '没有更多课程...'
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
                    display:'flex',flexDirection:'column',justifyContent:'center',
                    backgroundColor:'orange'
                }}>
                    <p style={{...wordStyle}}>{this.state.nickname}</p>
                    <p style={{...wordStyle}}>我的积分：{this.state.fraction}分</p>
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
            console.log('未学课程：',res);
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
                width:'100%',marginTop:'40px'
            }}>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center'
                }}>
                    <p style={{...wordStyle,marginLeft:'30px'}}>我的每日一滴(未学习)</p>
                </div>
                <div>
                    {
                        this.state.courses.map((content,idx)=>{
                            return (
                                <div key={idx} style={{
                                    display:'flex',marginLeft:'30px',marginRight:'30px',
                                    marginTop:'20px'
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
                                        backgroundColor:'gray',display:'flex',flexDirection:'column',flex:'1'
                                    }}>
                                        <p style={{...wordStyle}}>{content.section_name}</p>
                                        <p style={{...wordStyle}}>{content.section_intro}</p>
                                    </div>
                                    <div style={{
                                        width:'150px',display:'flex',justifyContent:'center',alignItems:'center',
                                        backgroundColor:'orange',marginLeft:'20px'
                                    }}>
                                        <p style={{
                                            ...wordStyle
                                        }}>去学习</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'
                }} onClick={this.getCourse}>
                    <p style={{...wordStyle}}>{CourseLoadingState[this.state.loadingState]}</p>
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
            console.log('我的问题：',res);
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
                width:'100%',marginTop:'40px'
            }}>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center'
                }}>
                    <p style={{...wordStyle,marginLeft:'30px'}}>我的问题</p>
                </div>
                <div>
                    {
                        this.state.questions.map((content,idx)=>{
                            return (
                                <div key={idx} style={{
                                    display:'flex',marginLeft:'30px',marginRight:'30px',
                                    marginTop:'20px'
                                }}>
                                    <div style={{
                                        backgroundColor:'orange',display:'flex',flex:'1'
                                    }}>
                                        <p style={{
                                            ...wordStyle
                                        }}>{content.question_desc}</p>
                                    </div>
                                    <div style={{
                                        backgroundColor:'gray',display:'flex',flexDirection:'column',marginLeft:'20px',
                                        width:'150px',justifyContent:'center',alignItems:'center'
                                    }}>
                                        <p style={{...wordStyle, color:'red',fontSize:'18px'}}>
                                            {content.hasNew === 1 ? '新回答' : ''}
                                        </p>
                                        <p style={{...wordStyle}}>{content.answer_count}</p>
                                        <p style={{...wordStyle}}>个回答</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'
                }} onClick={this.getQuestions}>
                    <p style={{...wordStyle}}>{QuestionLoadingState[this.state.loadingState]}</p>
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
            console.log('我的回答：',res);
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
                width:'100%',marginTop:'40px'
            }}>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center'
                }}>
                    <p style={{...wordStyle,marginLeft:'30px'}}>我参与回答的问题</p>
                </div>
                <div>
                    {
                        this.state.questions.map((content,idx)=>{
                            return (
                                <div key={idx} style={{
                                    display:'flex',marginLeft:'30px',marginRight:'30px',
                                    marginTop:'20px'
                                }}>
                                    <div style={{
                                        backgroundColor:'orange',display:'flex',flex:'1'
                                    }}>
                                        <p style={{
                                            ...wordStyle
                                        }}>{content.question_desc}</p>
                                    </div>
                                    <div style={{
                                        backgroundColor:'gray',display:'flex',flexDirection:'column',marginLeft:'20px',
                                        width:'150px',justifyContent:'center',alignItems:'center'
                                    }}>
                                        <p style={{...wordStyle, color:'red',fontSize:'18px'}}>
                                            {content.hasNew === 1 ? '新回答' : ''}
                                        </p>
                                        <p style={{...wordStyle}}>{content.answer_count}</p>
                                        <p style={{...wordStyle}}>个回答</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    width:'100%',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px',
                }} onClick={this.getQuestions}>
                    <p style={{...wordStyle}}>{AnswerLoadingState[this.state.loadingState]}</p>
                </div>
            </div>
        )
    }
}
/**
 * 主框架模块
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
export default class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            show:0    // 0  默认未学习页，1 Drop一滴学习页  2  答案页面
        }
        this.sectionId = 0;
        this.back = this.back.bind(this);
        this.goToDrop = this.goToDrop.bind(this);
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

    render(){
        return (
            <div>
                {
                    this.state.show === 1 ?
                        <Drop sectionId={this.sectionId} callback={this.back}/>
                        :
                        this.state.show === 2 ?
                            <Answer/>
                            :
                            <div>
                                <div style={{
                                    width:OneDrop.JS_ScreenW
                                }}>
                                    <div style={{
                                        width:'100%',display:'flex',justifyContent:'center',marginTop:'40px'
                                    }}>
                                        <p style={{
                                            color:'rgb(51,51,51)',fontSize:'32px'
                                        }}>每日一滴，滴水穿石</p>
                                    </div>
                                </div>
                                {LINE}
                                <User/>
                                {LINE}
                                <NoLearnCourse callback={this.goToDrop}/>
                                {LINE}
                                <NoReadQuestion/>
                                {LINE}
                                <NoReadAnswer/>
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