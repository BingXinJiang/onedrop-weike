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
            answers:[]
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
                            alert('数据错误1');
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
                        question_id:self.props.question_id
                    },
                    success:function (data) {
                        if(data.status === 1){
                            callback(null, data.data);
                        }else{
                            alert('数据错误2');
                        }
                    }
                })
            }
        ], function (err, results) {
            if(err){
                alert('数据错误3');
            }else{
                console.log('results:', results);
                var question = results[0];
                var answers = results[1];
                self.setState({
                    question:question,
                    answers:answers
                })
            }
        })
    }

    render(){
        var self = this;
        return (
            <div>
                {
                    this.state.question ?
                        <div style={{
                              paddingLeft:'30px',
                              paddingTop:'30px',
                              paddingRight:'30px',
                              backgroundColor:'white',
                              marginTop:'20px'
                         }}>
                            <div style={{
                             display:'block'
                            }}>
                                <img style={{
                                     width:'90px',
                                     height:'90px',
                                     borderRadius:'45px',
                                     float:'left',
                                     marginRight:'16px'
                                }} src={this.state.question.headimgurl}/>
                                <div style={{
                                    display:'block'
                                }}>
                                    <p style={{
                                          color:'rgb(127,127,127)',
                                          fontSize:'28px'
                                    }}>{this.state.question.nickname}</p>
                                    <p style={{
                                          color:'rgb(169,169,169)',
                                          fontSize:'26px'
                                    }}>{this.state.question.up_time}</p>
                                </div>
                            </div>
                            <p style={{
                                  fontSize:'28px',
                                  marginTop:'24px',
                                  paddingBottom:'12px'
                             }}>
                                {this.state.question.question_desc}
                            </p>
                        </div>
                        :null
                }

                <div style={{marginTop:'20px'}}>
                    {
                        this.state.answers.map((content, index)=>{
                            return (
                                <div key={index} style={{
                                    display:'flex',
                                    paddingLeft:'30px',
                                    paddingTop:'30px',
                                    paddingRight:'30px',
                                    backgroundColor:'white',
                                    marginTop:'5px'
                                }}>
                                    <div style={{
                                        display:'block',
                                        width:'90px',
                                        marginRight:'16px'
                                    }}>
                                        <img style={{
                                            display:'block',
                                            width:'90px',
                                            height:'90px',
                                            borderRadius:'45px'
                                        }} src={content.headimgurl}/>
                                    </div>
                                    <div>
                                        <div style={{
                                            display:'block'
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
                                            }}>{content.answer_time}</p>
                                        </div>

                                        <p style={{
                                            fontSize:'28px',
                                            marginTop:'24px',
                                            clear:'both',
                                            paddingBottom:'12px'
                                        }}>
                                            {content.answer_desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{
                    position:'fixed',
                    width:'100%',
                    height:'70px',
                    backgroundColor:'white',
                    left:'0',
                    bottom:'140px'
                }}>
                    <div style={{
                        display:'flex',
                        marginTop:'5px',
                        paddingLeft:'30px',
                        paddingRight:'30px'
                    }}>
                        <p onClick={()=>{
                            this.props.callback();
                        }} style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            width:'80px',
                            height:'60px',
                            fontSize:'30px',
                            borderColor:'rgb(235,235,235)',
                            borderRadius:'5px',
                            borderWidth:'2px'
                        }}>
                            返回
                        </p>
                        <input id="question_answer_solve_commit" style={{
                            display:'flex',
                            flex:'1',
                            height:'60px',
                            fontSize:'28px',
                            borderRadius:'5px',
                            borderWidth:'2px',
                            borderColor:'rgb(235,235,235)',
                            padding:'5px'
                        }}/>
                        <p onClick={()=>{
                            var answer = $('#question_answer_solve_commit').val();
                            if(answer){
                                if(answer===''){
                                    alert('请输入您的答案...');
                                }else{
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
                                                                answers:data.data
                                                            })
                                                        }else{
                                                            alert('数据错误2');
                                                        }
                                                    }
                                                })
                                            }else{
                                                alert('数据错误!');
                                            }
                                        }
                                    })
                                }
                            }else{
                                alert('请输入您的答案...');
                            }
                        }} style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            width:'80px',
                            height:'60px',
                            fontSize:'30px',
                            borderColor:'rgb(235,235,235)',
                            borderRadius:'5px',
                            borderWidth:'2px'
                        }}>
                            提交
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}