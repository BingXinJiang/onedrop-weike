/**
 * Created by jiangsong on 2017/5/14.
 */
import React from 'react';

import OneDrop from '../../const/onedrop';
import async from 'async';

export default class Solve extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question:null,
            answers:[],
            isLoading:true,

            commitBtnStatus:false
        }
    }

    componentDidMount() {
        var self = this;
        async.parallel([
            (callback)=>{
                $.ajax({
                    url:OneDrop.base_url+'/answer/question/detail',
                    dataType:'json',
                    method:'POST',
                    data:{
                        question_id:self.props.question_id
                    },
                    success:function (data) {
                        if(data.status === 1){
                            callback(null, data.data);
                        }else{
                            callback('数据错误1');
                        }
                    }
                })
            },
            (callback)=>{
                $.ajax({
                    url:OneDrop.base_url+'/answer/question/answers',
                    dataType:'json',
                    method:'POST',
                    data:{
                        question_id:self.props.question_id,
                        user_id:REMOTE_WEIXIN_USER_ID
                    },
                    success:function (data) {
                        if(data.status === 1){
                            callback(null, data.data);
                        }else{
                            callback('数据错误2');
                        }
                    }
                })
            }
        ], function (err, results) {
            if(err){
                self.setState({
                    isLoading:false
                })
                alert('数据错误3');
            }else{
                var question = results[0];
                var answers = results[1];
                self.setState({
                    question:question,
                    answers:answers,
                    isLoading:false
                })
            }
        })
    }

    render(){
        var self = this;
        return (
            <div style={{zIndex:'999'}}>
                {
                    this.state.question ?
                        <div style={{
                              paddingLeft:'24px',paddingTop:'30px',paddingRight:'24px',backgroundColor:'white',marginTop:'20px'
                         }}>
                            <div style={{
                             display:'block'
                            }}>
                                <img style={{
                                     width:'90px',height:'90px',borderRadius:'45px',float:'left',marginRight:'16px'
                                }} src={this.state.question.headimgurl}/>
                                <div style={{
                                    display:'block'
                                }}>
                                    <p style={{
                                          color:'rgb(127,127,127)',fontSize:'28px'
                                    }}>{this.state.question.nickname}</p>
                                    <p style={{
                                          color:'rgb(169,169,169)',fontSize:'26px'
                                    }}>{this.state.question.year}-{this.state.question.month}-{this.state.question.day}</p>
                                </div>
                            </div>
                            <p style={{
                                  fontSize:'28px',marginTop:'24px',paddingBottom:'12px'
                             }}>
                                {this.state.question.question_desc}
                            </p>
                        </div>
                        :null
                }

                <div style={{marginTop:'20px',width:OneDrop.JS_ScreenW,backgroundColor:'white'}}>
                    {
                        this.state.answers.map((content, index)=>{
                            return (
                                <div style={{width:OneDrop.JS_ScreenW-48+'px',marginLeft:'24px',marginRight:'24px'}}>
                                    <div key={index} style={{
                                        display:'flex',paddingTop:'30px',width:'100%'
                                    }}>
                                        <div style={{
                                            display:'flex',width:'90px',marginRight:'16px'
                                        }}>
                                            <img style={{
                                                display:'block',width:'90px',height:'90px',borderRadius:'45px'
                                            }} src={content.headimgurl}/>
                                        </div>
                                        <div style={{
                                            display:'flex',flexDirection:'column',width:OneDrop.JS_ScreenW-154+'px'
                                        }}>
                                            <div style={{
                                                display:'flex',justifyContent:'space-between',width:'100%'
                                            }}>
                                                <div style={{
                                                    display:'flex',flexDirection:'column'
                                                }}>
                                                    <p style={{
                                                        color:'rgb(127,127,127)',
                                                        fontSize:'28px',
                                                        float:'left'
                                                    }}>{content.nickname}</p>
                                                    <p style={{
                                                        color:'rgb(169,169,169)',
                                                        fontSize:'26px',
                                                        float:'right'
                                                    }}>{content.year}-{content.month}-{content.day}</p>
                                                </div>
                                                <div onClick={()=>{
                                                    if(this.state.isLoading){
                                                        return;
                                                    }
                                                    this.setState({
                                                        isLoading:true
                                                    })
                                                    //给答案点赞
                                                    $.ajax({
                                                        url:OneDrop.base_url+'/appreciate/answer',
                                                        dataType:'json',
                                                        method:'POST',
                                                        data:{
                                                            user_id:REMOTE_WEIXIN_USER_ID,
                                                            answer_id:content.answer_id
                                                        },
                                                        success:(data)=>{
                                                            if(data.status === 1){
                                                                var newAnswers = this.state.answers;
                                                                if(data.data === 'done'){
                                                                    //点赞成功
                                                                    newAnswers[index].appreciate_status = 1;
                                                                    newAnswers[index].appreciate_count = newAnswers[index].appreciate_count+1;
                                                                }
                                                                if(data.data === 'cancel'){
                                                                    //取消点赞
                                                                    newAnswers[index].appreciate_status = 0;
                                                                    newAnswers[index].appreciate_count = newAnswers[index].appreciate_count-1;
                                                                }
                                                                this.setState({
                                                                    isLoading:false,
                                                                    answers:newAnswers
                                                                })
                                                            }else{
                                                                this.setState({
                                                                    isLoading:false
                                                                });
                                                                alert('点赞失败！');
                                                            }
                                                        }
                                                    })
                                                }} style={{
                                                    display:'flex',alignItems:'flex-start'
                                                }}>
                                                    <img src={content.appreciate_status===0 ? '../../../../img/weike/question/appreciate.png':'../../../../img/weike/question/appreciated.png'}/>
                                                    <p style={{fontSize:'24px',marginLeft:'5px'}}>{content.appreciate_count}</p>
                                                </div>
                                            </div>

                                            <p style={{
                                                fontSize:'28px',marginTop:'24px',clear:'both',paddingBottom:'12px'
                                            }}>
                                                {content.answer_desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    position:'fixed',width:OneDrop.JS_ScreenW,height:'110px',backgroundColor:'white',left:'0',bottom:'0',
                    display:'flex',alignItems:'center',flexDirection:'column'
                }}>
                    <div style={{width:'100%',height:'1px',backgroundColor:'rgb(134,134,134)'}}/>
                    <div style={{
                        display:'flex',marginTop:'20px',marginLeft:'24px',marginRight:'24px',alignItems:'center',
                        justifyContent:'space-between'
                    }}>
                        <img onClick={()=>{
                            this.props.callback();
                        }} src="../../../img/weike/main/back.png"/>
                        <textarea id="question_answer_solve_commit" onChange={(event)=>{
                            if(event.target.value){
                                this.setState({
                                    commitBtnStatus:true
                                })
                            }else{
                                this.setState({
                                    commitBtnStatus:false
                                })
                            }
                        }} contentEditable={true} style={{
                            height:'80px',fontSize:'32px',width:'455px',outline:'none',
                            borderBottomWidth:'2px',borderBottomColor:'rgb(23,172,251)',paddingLeft:'10px',
                            borderStyle:'solid',marginLeft:'16px',marginRight:'16px',borderLeftWidth:'0',borderTopWidth:'0',
                            borderRightWidth:'0'
                        }}/>
                        <p onClick={()=>{
                            if(this.state.isLoading || !this.state.commitBtnStatus){
                                return;
                            }
                            var answer = $('#question_answer_solve_commit').val();
                            if(answer){
                                if(answer===''){
                                    alert('请输入您的答案...');
                                }else{
                                    this.setState({
                                        isLoading:true
                                    })
                                    //提交答案
                                    $.ajax({
                                        url:OneDrop.base_url+'/answer/reply',
                                        dataType:'json',
                                        method:'POST',
                                        data:{
                                            answer_desc:answer,
                                            user_id:REMOTE_WEIXIN_USER_ID,
                                            question_id:self.props.question_id
                                        },
                                        success:function(data) {
                                            if(data.status===1){
                                                $('#question_answer_solve_commit').val('');
                                                $.ajax({
                                                    url:OneDrop.base_url+'/answer/question/answers',
                                                    dataType:'json',
                                                    method:'POST',
                                                    data:{
                                                        question_id:self.props.question_id
                                                    },
                                                    success:function (data) {
                                                        if(data.status === 1){
                                                            self.setState({
                                                                answers:data.data,
                                                                isLoading:false,
                                                                commitBtnStatus:false
                                                            })
                                                        }else{
                                                            self.setState({
                                                                isLoading:false
                                                            })
                                                            alert('数据错误2');
                                                        }
                                                    }
                                                })
                                            }else{
                                                self.setState({
                                                    isLoading:false
                                                })
                                                alert('数据错误!');
                                            }
                                        }
                                    })
                                }
                            }else{
                                alert('请输入您的答案...');
                            }
                        }} style={{
                            display:'flex',justifyContent:'center',alignItems:'center',width:'120px',height:'80px',
                            fontSize:'30px',borderColor:'rgb(235,235,235)',borderRadius:'5px',borderWidth:'2px',
                            backgroundColor:this.state.commitBtnStatus ? 'rgb(23,172,251)':'rgb(235,235,235)',marginLeft:'5px',borderStyle:'solid'
                        }}>
                            提交
                        </p>
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