/**
 * Created by jiangsong on 2017/5/12.
 */
import React from 'React';

import Solve from './Solve';
import Ques from '../question/Question';
import OneDrop from '../../const/onedrop';

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

            isCanCommitQuestion:false
        };
        this.ISBACK = false;
        this.ISTIMER = true;
        this.SCROLLS = [];
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
        // console.log('document.body.scrollTop:',document.body.scrollTop);
        this.SCROLLS.push(document.body.scrollTop);
        if(this.ISTIMER){
            this.ISTIMER = false;
            setTimeout(()=>{
                if(this.SCROLLS.length>3  && this.SCROLLS[this.SCROLLS.length-1]-this.SCROLLS[0]>80){
                    let singal = true;
                    for(let i=1;i<this.SCROLLS.length;i++){
                        if(this.SCROLLS[i]<this.SCROLLS[i-1]){
                            singal = false;
                        }
                    }
                    if(singal){
                        $('#drop_push_question').css('top','-170px');
                        // $('#drop_questions_list').css('marginTop','30px');
                    }
                }
                if(this.SCROLLS.length>2  && this.SCROLLS[0]-this.SCROLLS[this.SCROLLS.length-1]>15){
                    let singal = true;
                    for(let i=1;i<this.SCROLLS.length;i++){
                        if(this.SCROLLS[i]>this.SCROLLS[i-1]){
                            singal = false;
                        }
                    }
                    if(singal){
                        $('#drop_push_question').css('top','0px');
                        // $('#drop_questions_list').css('marginTop','110px');
                    }
                }
                this.ISTIMER = true;
                this.SCROLLS = [];
            },300)
        }
    }

    componentDidMount() {
        if(this.state.isShowByAppreciateRank){
            this.getQuestions(this, 1, -1);
        }else{
            this.getQuestions(this, 1, 0);
        }
        window.addEventListener('scroll', this.handleScroll2);
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
            <div id="drop_push_question" style={{
                position:'fixed',left:'0',top:'0',display:'flex',justifyContent:'space-between',alignItems:'center',
                width:'100%',height:'150px',backgroundColor:'white',paddingTop:'20px'
            }}>
                <textarea id="drop_push_question_in" placeholder="提出你的问题！！！" onChange={(event)=>{
                    if(event.target.value){
                        this.setState({
                            isCanCommitQuestion:true
                        })
                    }
                }} style={{
                    marginLeft:'24px',marginRight:'24px',marginTop:'20px',marginBottom:'15px',height:'70px',
                    borderRadius:'10px',borderStyle:'solid',borderColor:'rgb(153,153,153)',borderWidth:'2px',
                    width:(OneDrop.JS_ScreenW-130)+'px',fontSize:'28px',paddingLeft:'8px',paddingTop:'30px'
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
                                                isLoading:false
                                            })
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
                    width:'110px',height:'70px',backgroundColor:this.state.isCanCommitQuestion ? 'rgb(23,172,251)':'rgb(200,200,200)',color:'rgb(51,51,51)',display:'flex',
                    marginRight:'24px',borderRadius:'10px',justifyContent:'center',alignItems:'center',fontSize:'26px'
                }}>提问</p>
            </div>

            <div style={{width:'100%',height:'76px',display:'flex',
                marginTop:'170px'
            }}>
                {
                    ['最赞问题','最新问题'].map((content,index)=>{
                        return (
                            <div onClick={()=>{
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
                            }} style={{width:'50%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',
                                borderStyle:'solid',borderColor:'rgb(153,153,153)',borderWidth:'1px',backgroundColor:'rgb(240,240,240)'
                            }}>
                                <p style={{fontSize:'26px',color:this.state.isAppreciateQuestionsShow===index ? 'rgb(23,172,251)':'rgb(51,51,51)'}}>{content}</p>
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

                                <p onClick={()=>{
                                    window.removeEventListener('scroll', this.handleScroll2);
                                    this.setState({
                                        question_id:content.question_id,
                                        showAnswer:true,
                                        scrollTopNum:document.body.scrollTop
                                    })
                                }} style={{
                                    fontSize:'30px',marginTop:'24px',marginRight:'24px',marginLeft:'24px'
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
                                            <p style={{fontSize:'28px',color:'rgb(0,0,0)'}}>最赞解答</p>
                                        </div>
                                        <div style={{marginTop:'5px'}}>
                                            {
                                                content.answers.map((cont,idx)=>{
                                                    return (
                                                        <p key={idx} style={{
                                                            fontSize:'26px',color:'rgb(102,102,102)',marginTop:'10px'
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
                                <div style={{width:'100%',height:'76px',display:'flex',justifyContent:'center',alignItems:'center',
                                    borderTopStyle:'solid',borderTopWidth:'1px',borderTopColor:'rgb(153,153,153)',marginTop:'37px'
                                }} onClick={()=>{
                                    window.removeEventListener('scroll', this.handleScroll2);
                                    this.setState({
                                        question_id:content.question_id,
                                        showAnswer:true,
                                        scrollTopNum:document.body.scrollTop
                                    })
                                }}>
                                    <p  style={{fontSize:'28px',color:'rgb(0,0,0)'}}>查看全部解答</p>
                                </div>
                                <div style={{width:OneDrop.JS_ScreenW,height:'1px',backgroundColor:'rgb(153,153,153)'}}/>
                            </div>
                        )
                    })
                }
            </div>
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
                    }} question_id={this.state.question_id}/> : Question
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