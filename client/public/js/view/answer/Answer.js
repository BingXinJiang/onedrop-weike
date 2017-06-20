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
            isLoading:false
        }
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
                    key_id:key_id
                },
                success:function (data) {
                    if(data.status === 1){
                        if(data.data.length<=0){
                            self.setState({
                                isNoMoreQuestion:true
                            })
                        }else{
                            var lastOne = data.data[data.data.length-1];
                            var lastKeyId = lastOne.key_id;
                            self.setState({
                                questions:self.state.questions.concat(data.data),
                                key_id:lastKeyId,
                                page:self.state.page+1,
                                isLoading:false
                            })
                        }
                    }else{
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
            this.getQuestions(this, this.state.page, this.state.key_id);
        }
    }

    componentDidMount() {
        this.getQuestions(this, 1, 0);
        window.addEventListener('scroll', this.handleScroll2);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll2);
    }
    render(){
        const Question =
        <div>
            <div style={{
                width:'100%',height:'100px',backgroundColor:'white',paddingTop:'20px'
            }}>
                <div onClick={()=>{
                    this.setState({
                        showQuestion:true
                    })
                }} style={{
                    marginLeft:'24px',marginRight:'24px',marginTop:'20px',marginBottom:'15px',height:'60px',
                    borderRadius:'10px',borderStyle:'solid',borderColor:'rgb(153,153,153)',borderWidth:'2px',
                    width:(OneDrop.JS_ScreenW-48)+'px',fontSize:'28px',
                    display:'flex',justifyContent:'space-between',alignItems:'center'
                }}>
                    <p style={{fontSize:'28px',color:'rgb(167,167,167)',marginLeft:'15px'}}>提出你的问题！！！</p>
                    <img style={{marginRight:'15px'}} src="../../../../img/weike/question/commit.png"/>
                </div>

            </div>
            {
                this.state.questions.map((content, index)=>{
                    return (
                        <div onClick={()=>{
                            this.setState({
                                question_id:content.question_id,
                                showAnswer:true
                            })
                        }} key={index} style={{
                                    paddingTop:'30px',backgroundColor:'white',marginTop:'20px'
                                }}>
                            <div style={{
                                        display:'block',marginLeft:'24px',marginRight:'24px'
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
                            <p style={{
                                       fontSize:'28px',marginTop:'24px',marginRight:'24px',marginLeft:'24px'
                                   }}>
                                {content.question_desc}
                            </p>
                            <div style={{width:OneDrop.JS_ScreenW,height:'2px',backgroundColor:'rgb(153,153,153)'}}></div>


                            <div style={{
                                display:'flex',flexDirection:'row'
                            }}>
                                <div></div>
                                <div>
                                    <div></div>
                                    <div>
                                        <p><span>大樟树:</span>管理者的能力这节课,让我认识到了
                                        节课,让我认识节课,让我认识节课,让我认识节课,让我认识
                                        节课,让我认识节课,让我认识节课,让我认识节课,让我认识
                                        节课,让我认识节课,让我认识</p>
                                        <p><span>大樟树:</span>管理者的能力这节课,让我认识到了
                                            节课,让我认识节课,让我认识节课,让我认识节课,让我认识
                                            节课,让我认识节课,让我认识节课,让我认识节课,让我认识
                                            节课,让我认识节课,让我认识</p>
                                    </div>
                                </div>
                            </div>


                            <div style={{width:OneDrop.JS_ScreenW,height:'2px',backgroundColor:'rgb(153,153,153)'}}></div>
                            <div style={{
                                       width:'100%',height:'90px',display:'flex',
                                       flexDirection:'row',justifyContent:'center',alignItems:'center'
                                   }}>
                                <div style={{
                                    display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',
                                    width:(OneDrop.JS_ScreenW-60)+'px',height:'78px'
                                }} onClick={()=>{
                                    this.setState({
                                        question_id:content.question_id,
                                        showAnswer:true
                                    })
                                }}>
                                    <img src="../../../../img/weike/question/answer.png"/>
                                    <p style={{fontSize:'24px',color:'rgb(51,51,51)'}}>234</p>
                                </div>
                                <div style={{
                                    width:'2px',height:'46px',backgroundColor:'rgb(153,153,153)'
                                }}></div>
                                <div style={{
                                    display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',
                                    width:(OneDrop.JS_ScreenW-60)+'px',height:'78px'
                                }}>
                                    <img src="../../../../img/weike/question/appreciate.png"/>
                                    <p style={{fontSize:'24px',color:'rgb(51,51,51)'}}>234</p>
                                </div>
                            </div>
                            <div style={{width:OneDrop.JS_ScreenW,height:'2px',backgroundColor:'rgb(153,153,153)'}}></div>
                        </div>
                    )
                })
            }
            {
                this.state.showQuestion ? <Ques callback={()=>{
                    this.setstate({
                        showQuestion:false
                    })
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
                        this.setState({
                            showAnswer:false
                        })
                    }} question_id={this.state.question_id}/> : Question
                }
            </div>
        )
    }
}