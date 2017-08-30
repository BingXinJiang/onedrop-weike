/**
 * Created by jiangsong on 2017/5/12.
 */
import React from 'React';

import Solve from './Solve';
import Ques from '../question/Question';
import OneDrop from '../../const/onedrop';
import Tool from '../../Tool/Tool';

export default class Answer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAnswer:false,
            showQuestion:false,
            questions:[],
            page:1,
            key_id:0,
            question_id:0,
            isNoMoreQuestion:false,
            isLoading:false,
            scrollTopNum:0,

            isShowByAppreciateRank:true,
            isAppreciateQuestionsShow:0,

            isCanCommitQuestion:false,

            isShowConnectReply:false
        };
        this.ISBACK = false;
        // this.ISTIMER = true;
        // this.SCROLLS = [];
        this.getQuestions = (self, page, key_id)=>{
            if(this.state.isLoading){
                return;
            }
            self.setState({
                isLoading:true
            })
            $.ajax({
                url:OneDrop.base_url+'/answer/questions',
                dataType:'json',
                method:'POST',
                data:{
                    page:page,
                    key_id:key_id,
                    user_id:REMOTE_WEIXIN_USER_ID
                },
                success:function (data) {
                    if(data.status === 1){
                        if(data.data.length<=0){
                            self.setState({
                                isNoMoreQuestion:true,
                                isLoading:false
                            })
                        }else{
                            var lastOne = data.data[data.data.length-1];
                            var lastKeyId = self.state.isShowByAppreciateRank ? -1 : lastOne.key_id;
                            self.setState({
                                questions:self.state.questions.concat(data.data),
                                key_id:lastKeyId,
                                page:self.state.page+1,
                                isLoading:false
                            })
                        }
                    }else{
                        self.setState({
                            isLoading:false
                        })
                        alert('数据错误');
                    }
                }
            })
        }
        this.handleScroll2 = this.handleScroll2.bind(this);
    }

    handleScroll2(event){
        if(Number(document.body.clientHeight-document.body.scrollTop)<=1215){
            if(this.state.isNoMoreQuestion){
                return;
            }
            if(this.state.isShowByAppreciateRank){
                this.getQuestions(this, this.state.page, -1);
            }else{
                this.getQuestions(this, this.state.page, this.state.key_id);
            }
        }
    }

    componentDidMount() {
        if(this.state.isShowByAppreciateRank){
            this.getQuestions(this, 1, -1);
        }else{
            this.getQuestions(this, 1, 0);
        }
        window.addEventListener('scroll', this.handleScroll2);
        // console.log('width:',OneDrop.JS_ScreenW);
        Tool.getJSSDKPaySign(location.href.split('#')[0],()=>{

        })
        Tool.shareToMoments({

        })
        Tool.shareToFriends({

        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll2);
    }

    componentDidUpdate() {
        if(this.ISBACK){
            document.body.scrollTop = this.state.scrollTopNum;
        }
        this.ISBACK = false;
    }
    render(){
        const Question =
        <div style={{backgroundColor:'rgb(229,236,242)'}}>
            <div>
                <div id="drop_push_question" style={{
                    display:'flex',flexDirection:'column',
                    width:'100%',backgroundColor:'rgba(0,0,0,0)',paddingTop:'24px'
                }}>
                    <div style={{
                        display:'flex',marginLeft:'24px',marginRight:'24px'
                    }}>
                        <img src="../../../img/weike/question/up_question.png"/>
                        <p style={{
                            fontSize:'24px',color:'rgb(51,51,51)',lineHeight:'40px',marginLeft:'26px'
                        }}>
                            "学而不思则罔"--领导力的提升需要我们不断在实践中反思，问出真正有深度的问题。有问就有答，所有人帮助所有人才是正确的互联网学习姿势。
                        </p>
                    </div>
                    <textarea id="drop_push_question_in" placeholder="抛出你的问题，召唤大家一起来作答" onChange={(event)=>{
                        if(event.target.value){
                            this.setState({
                                isCanCommitQuestion:true
                            })
                        }else{
                            this.setState({
                                isCanCommitQuestion:false
                            })
                        }
                    }} style={{
                        marginLeft:'24px',marginRight:'24px',marginTop:'20px',marginBottom:'15px',height:'120px',
                        borderRadius:'10px',borderStyle:'solid',borderColor:'rgb(23,172,251)',borderWidth:'1px',
                        width:OneDrop.JS_ScreenW-48-5-5+'px',fontSize:'24px',paddingLeft:'8px',color:'rgb(153,153,153)',paddingTop:'5px'
                    }}>
                    </textarea>
                    <p onClick={()=>{
                        if(this.state.isLoading){
                            return;
                        }
                        if(!this.state.isCanCommitQuestion){
                            return;
                        }
                        var question_des = $('#drop_push_question_in').val();
                        if(question_des){
                            if(question_des.length>0){
                                //发起post请求,提交问题
                                this.setState({
                                    isLoading:true
                                })
                                $.ajax({
                                    url:OneDrop.base_url+'/answer/ask',
                                    dataType:'json',
                                    method:'POST',
                                    data:{
                                        user_id:REMOTE_WEIXIN_USER_ID,
                                        question_des:question_des
                                    },
                                    success:(data)=> {
                                        if(data.status === 1){
                                            $('#drop_push_question_in').val('');
                                            if(!this.state.isShowByAppreciateRank){
                                                this.setState({
                                                    page:1,
                                                    key_id:0,
                                                    questions:[],
                                                    question_id:0,
                                                    isNoMoreQuestion:false,
                                                    scrollTopNum:0,
                                                    isShowByAppreciateRank:false,
                                                    isAppreciateQuestionsShow:1,
                                                    isCanCommitQuestion:false,
                                                    isLoading:false
                                                })
                                                this.getQuestions(this, 1, 0);
                                            }else{
                                                this.setState({
                                                    isCanCommitQuestion:false,
                                                    isLoading:false,
                                                    page:1,
                                                    key_id:0,
                                                    questions:[],
                                                    question_id:0,
                                                    isNoMoreQuestion:false,
                                                    scrollTopNum:0,
                                                    isShowByAppreciateRank:false,
                                                    isAppreciateQuestionsShow:1
                                                })
                                                this.getQuestions(this, 1, 0);
                                            }
                                        }else{
                                            this.setState({
                                                isLoading:false
                                            })
                                            alert('网络错误,请重新提交!!!');
                                        }
                                    }

                                })
                            }else{
                                alert('请先输入您的问题...');
                            }
                        }else{
                            alert('请先输入您的问题...');
                        }
                    }} style={{
                        width:'110px',height:'70px',backgroundColor:this.state.isCanCommitQuestion ? 'rgb(44,156,232)':'white',color:this.state.isCanCommitQuestion ? 'white':'rgb(23,172,251)',display:'flex',
                        marginLeft:OneDrop.JS_ScreenW-110-24+'px',borderRadius:'10px',justifyContent:'center',alignItems:'center',fontSize:'26px',borderStyle:'solid',borderWidth:this.state.isCanCommitQuestion ? '0':'1px',
                        borderColor:'rgb(23,172,251)'
                    }}>提交</p>
                </div>
            </div>

            <div style={{width:OneDrop.JS_ScreenW-48+'px',height:'102px',display:'flex',
                marginTop:'17px',backgroundColor:'white',paddingTop:'36px',paddingLeft:'24px',paddingRight:'24px'
            }}>
                {
                    ['最赞问题','最新问题'].map((content,index)=>{
                        return (
                            <div key={index} onClick={()=>{
                                if(index===0){
                                    this.setState({
                                        page:1,
                                        key_id:0,
                                        questions:[],
                                        question_id:0,
                                        isNoMoreQuestion:false,
                                        scrollTopNum:0,
                                        isShowByAppreciateRank:true,
                                        isAppreciateQuestionsShow:0
                                    })
                                    this.getQuestions(this, 1, -1);
                                }
                                if(index===1){
                                    this.setState({
                                        page:1,
                                        key_id:0,
                                        questions:[],
                                        question_id:0,
                                        isNoMoreQuestion:false,
                                        scrollTopNum:0,
                                        isShowByAppreciateRank:false,
                                        isAppreciateQuestionsShow:1
                                    })
                                    this.getQuestions(this, 1, 0);
                                }
                            }} style={{width:'50%',height:'78px',display:'flex',justifyContent:'center',alignItems:'center',
                                borderStyle:'solid',borderColor:'rgb(73,172,251)',borderWidth:'1px',backgroundColor:this.state.isAppreciateQuestionsShow===index ? 'rgb(44,156,232)':'white',

                            }}>
                                <p style={{fontSize:'26px',color:this.state.isAppreciateQuestionsShow===index ? 'rgb(254,254,254)':'rgb(73,172,251)'}}>{content}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div id="drop_questions_list" style={{backgroundColor:'rgb(229,236,242)',marginTop:'30px'}}>
                {
                    this.state.questions.map((content, index)=>{
                        return (
                            <div  key={index} style={{
                                paddingTop:'30px',backgroundColor:'white',marginTop:'30px'
                            }}>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                    <div style={{
                                        display:'flex',marginLeft:'24px',marginRight:'24px'
                                    }}>
                                        <img style={{
                                            width:'90px',height:'90px',borderRadius:'45px',float:'left',marginRight:'16px'
                                        }} src={content.headimgurl}/>
                                        <div style={{
                                            display:'block'
                                        }}>
                                            <p style={{
                                                color:'rgb(127,127,127)',
                                                fontSize:'28px'
                                            }}>{content.nickname}</p>
                                            <p style={{
                                                color:'rgb(169,169,169)',
                                                fontSize:'26px'
                                            }}>{content.year+'-'+content.month+'-'+content.day}</p>
                                        </div>
                                    </div>
                                    <div onClick={()=>{
                                        //对问题点赞
                                        if(this.state.isLoading){
                                            return;
                                        }
                                        this.setState({
                                            isLoading:true
                                        })
                                        $.ajax({
                                            url:OneDrop.base_url+'/appreciate/question',
                                            dataType:'json',
                                            method:'POST',
                                            data:{
                                                user_id:REMOTE_WEIXIN_USER_ID,
                                                question_id:content.question_id
                                            },
                                            success:(data)=>{
                                                if(data.status === 1){
                                                    var newQuestions = this.state.questions;
                                                    if(data.data === 'done'){
                                                        //点赞成功
                                                        newQuestions[index].appreciate_status = 1;
                                                        newQuestions[index].appreciate_count = newQuestions[index].appreciate_count+1;
                                                    }
                                                    if(data.data === 'cancel'){
                                                        //取消点赞
                                                        newQuestions[index].appreciate_status = 0;
                                                        newQuestions[index].appreciate_count = newQuestions[index].appreciate_count-1;
                                                    }
                                                    this.setState({
                                                        questions:newQuestions,
                                                        isLoading:false
                                                    })
                                                }else{
                                                    this.setState({
                                                        isLoading:false
                                                    })
                                                    alert('点赞失败！');
                                                }
                                            }
                                        })
                                    }} style={{
                                        display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',
                                        width:'100px',height:'100%',marginRight:'24px'
                                    }}>
                                        <img src={content.appreciate_status===0 ? '../../../../img/weike/question/appreciate.png':'../../../../img/weike/question/appreciated.png'}/>
                                        <p style={{fontSize:'28px',color:'rgb(51,51,51)',marginLeft:'5px'}}>{content.appreciate_count}</p>
                                    </div>
                                </div>

                                <div onClick={()=>{
                                    window.removeEventListener('scroll', this.handleScroll2);
                                    this.setState({
                                        question_id:content.question_id,
                                        showAnswer:true,
                                        scrollTopNum:document.body.scrollTop,
                                        isShowConnectReply:false
                                    })
                                }}>
                                    <p  style={{
                                        fontSize:'30px',marginTop:'24px',marginRight:'24px',marginLeft:'24px',wordBreak:'break-all'
                                    }}>
                                        {content.question_desc}
                                    </p>
                                    <div style={{width:OneDrop.JS_ScreenW,height:'1px',backgroundColor:'rgb(153,153,153)',marginTop:'40px'}}/>

                                    <div style={{
                                        display:'flex',flexDirection:'row',marginTop:'40px',marginLeft:'24px',marginRight:'24px',
                                        justifyContent:'space-between'
                                    }}>
                                        <div style={{width:'3px',backgroundColor:'rgb(153,153,153)'}}/>
                                        <div style={{display:'flex',flexDirection:'column',marginLeft:'20px',width:'98%'}}>
                                            <div style={{
                                                display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',
                                                width:'100%'
                                            }}>
                                                <p style={{fontSize:'28px',color:'rgb(0,0,0)'}}>最赞回复</p>
                                            </div>
                                            <div style={{marginTop:'5px'}}>
                                                {
                                                    content.answers.map((cont,idx)=>{
                                                        return (
                                                            <p key={idx} style={{
                                                                fontSize:'26px',color:'rgb(102,102,102)',marginTop:'10px',wordBreak:'break-all'
                                                            }}><span style={{color:'rgb(124,189,233)'}}>{cont.nickname}：</span>{cont.answer_desc}</p>
                                                        )
                                                    })
                                                }
                                                {
                                                    content.answers.length === 0 ?
                                                        <img src="../../../../img/weike/question/noanswer.jpg"/> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width:'100%',height:'76px',display:'flex',justifyContent:'space-between',alignItems:'center',
                                    borderTopStyle:'solid',borderTopWidth:'1px',borderTopColor:'rgb(153,153,153)',marginTop:'37px',
                                }} >
                                    <p onClick={()=>{
                                        window.removeEventListener('scroll', this.handleScroll2);
                                        this.setState({
                                            question_id:content.question_id,
                                            showAnswer:true,
                                            scrollTopNum:document.body.scrollTop,
                                            isShowConnectReply:false
                                        })
                                    }} style={{fontSize:'24px',color:'rgb(73,172,251)',width:'50%',textAlign:'center'}}>查看全部</p>
                                    <div style={{width:'1px',height:'70%',backgroundColor:'rgb(153,153,153)'}}/>
                                    <p onClick={()=>{
                                        window.removeEventListener('scroll', this.handleScroll2);
                                        this.setState({
                                            question_id:content.question_id,
                                            showAnswer:true,
                                            scrollTopNum:document.body.scrollTop,
                                            isShowConnectReply:true
                                        })
                                    }} style={{fontSize:'24px',color:'rgb(73,172,251)',width:'50%',textAlign:'center'}}>我要回复</p>
                                </div>
                                <div style={{width:OneDrop.JS_ScreenW,height:'1px',backgroundColor:'rgb(153,153,153)'}}/>
                            </div>
                        )
                    })
                }
            </div>
            <img onClick={()=>{
                document.body.scrollTop = 0;
            }} style={{
                position:'fixed',right:OneDrop.JS_ScreenW===640 ? '88px':'24px',bottom:'200px'
            }} src="../../../img/weike/question/totop.png"/>
            {
                this.state.showQuestion ? <Ques callback={()=>{
                    window.addEventListener('scroll', this.handleScroll2);
                    this.setState({
                        showQuestion:false,
                        questions:[],
                        page:1,
                        key_id:0,
                        isNoMoreQuestion:false,
                        scrollTopNum:0
                    })
                    this.getQuestions(this, 1, 0);
                }}/> : null
            }
        </div>
        return (
            <div style={{
                display:'flex',
                flexDirection:'column',
                width:'100%',
                height:'100%',
                backgroundColor:'rgb(235,235,235)',
                marginBottom:'120px'
            }}>
                {
                    this.state.showAnswer ? <Solve callback={()=>{
                        this.ISBACK = true;
                        this.setState({
                            showAnswer:false
                        })
                        // document.body.scrollTop = this.state.scrollTopNum;
                        window.addEventListener('scroll', this.handleScroll2);
                    }} isShowConnectReply={this.state.isShowConnectReply} question_id={this.state.question_id}/> : Question
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