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

import Onedrop from '../drop/Onedrop';
import Evaluation from '../evalution/Evaluation';
import Question from '../question/Question';
import Course from '../main/index';

var ScreenW = document.body.clientWidth;

class Main extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var tabBtnW = ScreenW/4 + 'px';
        console.log('屏幕宽度:', ScreenW);
        return (
            <div>
                <Route exact path='/weixin/main/' component={Onedrop}/>
                <Route path='/weixin/main/courses' component={Course}/>
                <Route path='/weixin/main/question' component={Question}/>
                <Route path='/weixin/main/evaluation' component={Evaluation}/>

                <ul style={{}}>
                    {
                        [
                            {

                            },
                            {
                                
                            }
                        ]
                    }
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
        )
    }
}

ReactDOM.render(
    <Router>
        <Main/>
    </Router>,
    document.getElementById('main-container')
)