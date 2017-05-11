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

import Introduction from './Introduction';

var ScreenW = document.body.clientWidth;

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {

            isFirst:false,

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
        var tabBtnW = ScreenW/4 + 'px';
        console.log('屏幕宽度:', ScreenW);
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
                            <Route path='/weixin/main/question' component={Question}/>
                            <Route path='/weixin/main/evaluation' component={Evaluation}/>

                            <ul style={{}}>
                                <li style={{float:'left',width:tabBtnW,
                                    textAlign:'center',listStyleType:'none'
                                }}>
                                    <Link style={{backgroundColor:'red'

                                    }} to="/weixin/main/">一滴</Link>
                                </li>
                                <li style={{float:'left',width:tabBtnW,
                                    textAlign:'center',listStyleType:'none'
                                }}>
                                    <Link style={{

                                    }} to="/weixin/main/courses">课程</Link>
                                </li>
                                <li style={{float:'left',width:tabBtnW,
                                    textAlign:'center',listStyleType:'none'
                                }}>
                                    <Link style={{

                                    }} to="/weixin/main/question">问答</Link>
                                </li>
                                <li style={{float:'left',width:tabBtnW,
                                    textAlign:'center',listStyleType:'none'
                                }}>
                                    <Link style={{

                                    }} to="/weixin/main/evaluation">测评</Link>
                                </li>
                            </ul>
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