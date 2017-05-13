/**
 * Created by jiangsong on 2017/5/9.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import OneDrop from '../../const/onedrop';

import Onedrop from '../drop/Onedrop';
import Evaluation from '../evalution/Evaluation';
import Question from '../question/Question';
import Course from '../main/index';
import Answer from '../answer/Answer';

import Introduction from './Introduction';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirst:false,
            selectedTab:'onedrop',
            showQuestion:false,
            // userId:REMOTE_WEIXIN_USER_ID, //以微信静默授权的方式拿到openid作为userid,
            userId:'oyMAaxN1hGZuki6cOvwF6OSQ-Ahs'//嵩
            // userId:'oyMAaxD884kfJA1EHMBTX8Y5bm9I',//彩红
        }
    }
    componentDidMount(){
        //第一次进来的时候，询问是否是兴业银行员工，搜集电话号码
        var my_id = this.state.userId;
        REMOTE_WEIXIN_USER_ID = my_id;
        if(my_id === undefined || my_id === null || my_id === '' || my_id === 'undefined'){
            my_id = localStorage.getItem('onedrop_user_id');
            this.setState({
                userId:localStorage.getItem('onedrop_user_id')
            })
            REMOTE_WEIXIN_USER_ID = localStorage.getItem('onedrop_user_id');
        }else{
            localStorage.setItem('onedrop_user_id', my_id);
        }
        var self = this;
        $.ajax({
            url:OneDrop.base_ip+'/onedrop/xingye',
            dataType:'json',
            method:'POST',
            data:{
                user_id:my_id
            },
            success:function(data) {
                if(data.status === 1){
                    console.log('data:', data);
                    if(data.data.member_status === 1){//兴业员工

                    }else if(data.data.member_status === 2){//非兴业员工

                    }else if(data.data.member_status === 3){//第一次登陆
                        self.setState({
                            isFirst:true
                        })
                    }
                }else{
                    alert('数据错误');
                }
            }
        })
    }
    render(){
        var tabBtnW = OneDrop.JS_ScreenW/5 + 'px';
        var oneDrop_src = '../../../img/weike/main/onedrop.png';
        var oneDrop_selected_src = '../../../img/weike/main/onedrop_selected.png';
        var course_src = '../../../img/weike/main/course.png';
        var course_selected_src = '../../../img/weike/main/course_selected.png';
        var answer_src = '../../../img/weike/main/answer.png';
        var answer_selected_src = '../../../img/weike/main/answer_selected.png';
        var ceping_src = '../../../img/weike/main/ceping.png';
        var ceping_selected_src = '../../../img/weike/main/ceping_selected.png';
        console.log(OneDrop.JS_ScreenH);
        console.log(OneDrop.JS_ScreenW);
        console.log(OneDrop.JS_WindowH);
        return (
            <div>
                {
                    this.state.isFirst ?
                        <Introduction callback={()=>{
                            this.setState({
                                isFirst:false
                            })
                        }}/>
                        :
                        <div>
                            <Route exact path='/weixin/main/' component={Onedrop}/>
                            <Route path='/weixin/main/courses' component={Course}/>
                            <Route path='/weixin/main/question' component={Answer}/>
                            <Route path='/weixin/main/evaluation' component={Evaluation}/>

                            <div style={{position:'fixed', bottom:'0px',backgroundColor:'white'}}>
                                <div style={{width:OneDrop.JS_ScreenW, height:'2px',
                                    backgroundColor:'rgb(235,235,235)'
                                }}/>
                                <ul style={{marginTop:'20px', backgroundColor:'white'}}>
                                    <li style={{float:'left',width:tabBtnW,
                                        textAlign:'center',listStyleType:'none'
                                    }} onClick={()=>{
                                        this.setState({
                                            selectedTab:'onedrop'
                                        })
                                    }}>
                                        <Link style={{

                                        }} to="/weixin/main/">
                                            <img src={this.state.selectedTab === 'onedrop' ? oneDrop_selected_src : oneDrop_src}/>
                                        </Link>
                                    </li>
                                    <li style={{float:'left',width:tabBtnW,
                                        textAlign:'center',listStyleType:'none'
                                    }} onClick={()=>{
                                        this.setState({
                                            selectedTab:'course'
                                        })
                                    }}>
                                        <Link style={{

                                        }} to="/weixin/main/courses">
                                            <img src={this.state.selectedTab === 'course' ? course_selected_src : course_src}/>
                                        </Link>
                                    </li>

                                    <li style={{float:'left',width:tabBtnW,
                                        textAlign:'center',listStyleType:'none',
                                        marginTop:'-65px'
                                    }} onClick={()=>{
                                        this.setState({
                                            showQuestion:true
                                        })
                                    }}>
                                        <img style={{
                                            width:tabBtnW,
                                        }} src="../../../img/weike/main/question.png"/>
                                    </li>

                                    <li style={{float:'right',width:tabBtnW,
                                        textAlign:'center',listStyleType:'none'
                                    }} onClick={()=>{
                                        this.setState({
                                            selectedTab:'ceping'
                                        })
                                    }}>
                                        <Link style={{

                                        }} to="/weixin/main/evaluation">
                                            <img src={this.state.selectedTab === 'ceping' ? ceping_selected_src : ceping_src}/>
                                        </Link>
                                    </li>
                                    <li style={{float:'right',width:tabBtnW,
                                        textAlign:'center',listStyleType:'none'
                                    }} onClick={()=>{
                                        this.setState({
                                            selectedTab:'answer'
                                        })
                                    }}>
                                        <Link style={{

                                        }} to="/weixin/main/question">
                                            <img src={this.state.selectedTab === 'answer' ? answer_selected_src : answer_src}/>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {
                                this.state.showQuestion ?
                                    <div style={{position:'fixed', top:'0', left:'0',
                                        width:OneDrop.JS_ScreenW,
                                        height:OneDrop.JS_ScreenH*2,
                                        backgroundColor:'red'
                                    }}>

                                    </div>
                                    :
                                    null
                            }
                        </div>
                }
            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <Main/>
    </Router>,
    document.getElementById('main-container')
)