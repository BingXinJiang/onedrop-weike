/**
 * Created by jiangsong on 2017/5/12.
 */
import React from 'React';

import Solve from './Solve';
import OneDrop from '../../const/onedrop';

export default class Answer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAnswer:false,
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
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event){
        if(Number(document.body.clientHeight-document.body.scrollTop)<1250){
            if(this.state.isNoMoreQuestion){
                return;
            }
            this.getQuestions(this, this.state.page, this.state.key_id);
        }
    }

    componentDidMount() {
        this.getQuestions(this, 1, 0);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnMount() {
        console.log('answers监听事件被移除了.....');
        window.removeEventListener('scroll', this.handleScroll);
    }
    render(){
        const Question =
        <div>
            {
                this.state.questions.map((content, index)=>{
                    return (
                        <div onClick={()=>{
                            this.setState({
                                question_id:content.question_id,
                                showAnswer:true
                            })
                        }} key={index} style={{
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
                                       fontSize:'28px',
                                       marginTop:'24px'
                                   }}>
                                {content.question_desc}
                            </p>
                            <div style={{
                                       width:'100%',
                                       height:'90px',
                                       marginTop:'36px'
                                   }}>
                                <p onClick={()=>{
                                    this.setState({
                                        question_id:content.question_id,
                                        showAnswer:true
                                    })
                                }} style={{
                                           width:'260px',
                                           height:'60px',
                                           fontSize:'36px',
                                           border:'2px',
                                           borderStyle:'solid',
                                           borderColor:'rgb(0,164,251)',
                                           borderRadius:'40px',
                                           color:'rgb(0,164,251)',
                                           textAlign:'center',
                                           paddingTop:'6px',
                                           marginLeft:'60%'
                                       }}>
                                    我要解答
                                </p>
                            </div>
                        </div>
                    )
                })
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