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
            <div style={{width:'100%',position:'fixed',top:'0',left:'0',height:OneDrop.JS_ScreenH*2,
                backgroundColor:'rgb(235,235,235)'
            }}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    backgroundColor:'white',
                    marginTop:'0',
                    alignItems:'center',
                    height:'700px'
                }}>
                    <textarea id="question_ask_commit" placeholder="请输入您要问的内容..." autofocus='autofocus'
                       style={{
                            width:OneDrop.JS_ScreenW - 60 + 'px',height:'300px',fontSize:'28px',marginTop:'40px',
                            borderWidth:'2px',borderColor:'rgb(235,235,235)',padding:'12px',borderStyle:'solid'
                       }}
                    >
                    </textarea>
                    <div style={{
                        display:'flex',width:'100%',height:'80px',justifyContent:'center',marginTop:'62px',
                        flexDirection:'column'
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
                                                $('#question_ask_commit').val('');
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
                            backgroundColor:'rgb(18,144,249)',fontSize:'34px',color:'white',textAlign:'center',
                            borderRadius:'10px',width:OneDrop.JS_ScreenW-48 + 'px',height:'98px',marginLeft:'24px'
                        }}>提交</p>
                        <p onClick={()=>{
                            self.props.callback();
                        }} style={{
                            backgroundColor:'rgb(200,200,200)',fontSize:'34px',color:'white',textAlign:'center',
                            borderRadius:'10px',width:OneDrop.JS_ScreenW-48 + 'px',height:'98px',marginLeft:'24px',
                            marginTop:'30px'
                        }}>取消</p>
                    </div>
                </div>
            </div>
        )
    }
}