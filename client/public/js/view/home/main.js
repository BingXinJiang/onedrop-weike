/**
 * Created by jiangsong on 2017/5/9.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';

import Onedrop from '../drop/Onedrop';
import Evaluation from '../evalution/Evaluation';
import Question from '../question/Question';
import Course from '../main/index';

class Main extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>

        </div>
    }
}

ReactDOM.render(
    <Router>
        <Route path='/' component={Main}>
            <Route path='/onedrop' component={Onedrop}/>
            <Route path='/courses' component={Course}/>
            <Route path='/question' component={Question}/>
            <Route path='/evaluation' component={Evaluation}/>
        </Route>
    </Router>,
    document.getElementById('main-container')
)