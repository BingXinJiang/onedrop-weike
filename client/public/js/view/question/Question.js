/**
 * Created by jiangsong on 2017/5/9.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';

export default class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowAlert:false
        }
    }
    render(){
        var self = this;
        return (
            <div style={{width:'100%',
                backgroundColor:'rgb(235,235,235)'
            }}>
                <div style={{marginTop:'20px',
                    backgroundColor:'white',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    width:'100%',
                    height:'250px'

                }}>
                    {
                        /*
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
                        **/
                    }

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
                    height:'700px'
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
                                                // self.props.callback();
                                                $('#question_ask_commit').val('');
                                                // alert('问题提交成功,请到解答页面查看您提交的问题!')
                                                self.setState({
                                                    isShowAlert:true
                                                })
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
                {
                    this.state.isShowAlert ?
                        <div style={{
                            position:'absolute',
                            left:'15%',
                            top:'40%',
                            width:'70%',
                            height:'200px',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'rgb(235,235,235)',
                            borderRadius:'10px'
                        }}>
                            <p style={{fontSize:'30px',marginLeft:'20px',marginRight:'20px'}}>问题提交成功,请到解答页面查看您提交的问题!</p>
                            <div onClick={()=>{
                                this.setState({
                                    isShowAlert:false
                                })
                            }} style={{width:'80px',height:'60px',display:'flex',justifyContent:'center',
                            alignItems:'center',borderWidth:'2px',borderRadius:'5px',borderStyle:'solid',
                            borderColor:'rgb(149,149,149)',marginTop:'20px'
                            }}>
                                <p style={{fontSize:'28px'}}>确定</p>
                            </div>
                        </div>
                        : null
                }
            </div>
        )
    }
}