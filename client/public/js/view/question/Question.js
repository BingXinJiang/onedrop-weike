/**
 * Created by jiangsong on 2017/5/9.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';

export default class Question extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var self = this;
        return (
            <div style={{width:'100%', height:'100%',
                backgroundColor:'rgb(235,235,235)'
            }}>
                <div style={{marginTop:'20px',
                    backgroundColor:'white',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    width:'100%',
                    height:'330px',

                }}>
                   <span style={{height:'60px',
                            width:'85%',
                            marginTop:'10px',
                            textAlign:'right'
                   }} onClick={()=>{
                        this.props.callback();
                   }}>
                       <img style={{
                            width:'60px'
                       }} src="../../../img/weike/question/close.png"/>
                   </span>
                    <img style={{
                        width:'90px',
                        marginTop:'30px'
                    }} src="../../../img/weike/question/question.png"/>
                    <p style={{height:'30px',
                        fontSize:'28px',
                        color:'rgb(177,177,177)',
                        marginTop: '20px'
                    }}>快快提出你的问题</p>
                    <p style={{height:'30px',
                        fontSize:'28px',
                        color:'rgb(177,177,177)'
                    }}>会有大咖帮你解答哦!!!</p>
                </div>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    backgroundColor:'white',
                    marginTop:'0',
                    alignItems:'center',
                    height:'900px'
                }}>
                    <p style={{
                        fontSize:'44px',
                        fontWeight:'bold',
                        marginTop:'32px'
                    }}>问题描述</p>
                    <textarea id="question_ask_commit" placeholder="请输入您要问的内容..."
                              style={{
                              width:OneDrop.JS_ScreenW - 60 + 'px',
                              height:'300px',
                              fontSize:'28px',
                              marginTop:'20px',
                              borderWidth:'1px',
                              borderColor:'rgb(235,235,235)',
                              padding:'12px'
                              }}
                    >
                    </textarea>
                    <div style={{
                        display:'flex',
                        width:'100%',
                        height:'80px',
                        justifyContent:'center',
                        marginTop:'62px'
                    }}>
                        <p onClick={()=>{
                            var question_des = $('#question_ask_commit').val();
                            if(question_des){
                                if(question_des.length>0){
                                    //发起post请求,提交问题
                                    $.ajax({
                                        url:OneDrop.base_url+'/answer/ask',
                                        dataType:'json',
                                        method:'POST',
                                        data:{
                                            user_id:REMOTE_WEIXIN_USER_ID,
                                            question_des:question_des
                                        },
                                        success:function(data) {
                                            if(data.status === 1){
                                                self.props.callback();
                                            }else{
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
                            backgroundColor:'rgb(18,144,249)',
                            fontSize:'34px',
                            color:'white',
                            textAlign:'center',
                            paddingLeft:'60px',
                            paddingRight:'60px',
                            borderRadius:'40px',
                            paddingTop:'15px'
                        }}>提交问题</p>
                    </div>
                </div>
            </div>
        )
    }
}