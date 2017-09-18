/**
 * Created by jiangsong on 2017/5/9.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import OneDrop from '../../const/onedrop';

import EveryDrop from '../drop/LastDrop';
import Answer from '../answer/Answer';
import ToolBox from '../toolBox/tool';
import Rank2 from '../rank/rank2';
import Introduction from './Introduction';
import HomePage from './HomePage';

class MainTab extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'everydrop'
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.backInfo){
            this.setState({
                selectedTab:'everydrop'
            })
        }
    }
    render(){
        var tabBtnW = OneDrop.JS_ScreenW/4 + 'px';

        // var oneDrop_src = '../../../img/weike/main/day_drop.png';
        // var oneDrop_selected_src = '../../../img/weike/main/day_drop_selected.png';
        // var course_src = '../../../img/weike/main/my_drop.png';
        // var course_selected_src = '../../../img/weike/main/my_drop_selected.png';

        var course_src = '../../../img/weike/main/day_drop.png';
        var course_selected_src = '../../../img/weike/main/day_drop_selected.png';
        var oneDrop_src = '../../../img/weike/main/my_drop.png';
        var oneDrop_selected_src = '../../../img/weike/main/my_drop_selected.png';

        var answer_src = '../../../img/weike/main/answer.png';
        var answer_selected_src = '../../../img/weike/main/answer_selected.png';

        var tool_src = '../../../img/weike/main/rank.png';
        var tool_selected_src = '../../../img/weike/main/rank_selected.png';
        const linkStyle = {
            width:'100%',height:'100%',display:'flex',justifyContent:'center',marginBottom:'8px'
        }
        return(
            <div>
                <Route exact path='/weixin/main' component={HomePage}/>
                <Route path='/weixin/main/mydrop' component={EveryDrop}/>
                <Route path='/weixin/main/answer' component={Answer}/>
                <Route path='/weixin/main/tool' component={Rank2}/>

                <div style={{position:'fixed', bottom:'0px',backgroundColor:'white'}}>
                    <div style={{width:OneDrop.JS_ScreenW, height:'2px',
                        backgroundColor:'rgb(235,235,235)'
                    }}/>
                    <ul style={{marginTop:'20px', backgroundColor:'white'}}>

                        <li style={{float:'left',width:tabBtnW,
                            textAlign:'center',listStyleType:'none'
                        }} onClick={()=>{
                            this.setState({
                                selectedTab:'mydrop'
                            })
                        }}>
                            <Link style={{
                                ...linkStyle
                            }} to="/weixin/main/mydrop">
                                <img src={this.state.selectedTab === 'mydrop' ? course_selected_src : course_src}/>
                            </Link>
                        </li>

                        <li style={{float:'left',width:tabBtnW,
                            textAlign:'center',listStyleType:'none'
                        }} onClick={()=>{
                            this.setState({
                                selectedTab:'everydrop'
                            })
                        }}>
                            <Link style={{
                                ...linkStyle
                            }} to="/weixin/main">
                                <img src={this.state.selectedTab === 'everydrop' ? oneDrop_selected_src : oneDrop_src}/>
                            </Link>
                        </li>

                        <li style={{float:'right',width:tabBtnW,
                            textAlign:'center',listStyleType:'none'
                        }} onClick={()=>{
                            this.setState({
                                selectedTab:'tool'
                            })
                        }}>
                            <Link style={{
                                ...linkStyle
                            }} to="/weixin/main/tool">
                                <img src={this.state.selectedTab === 'tool' ? tool_selected_src : tool_src}/>
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
                                ...linkStyle
                            }} to="/weixin/main/answer">
                                <img src={this.state.selectedTab === 'answer' ? answer_selected_src : answer_src}/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirst:true,
            isShowHomePage:true, //是否显示提示信息
            backprops:false,
            userId:REMOTE_WEIXIN_USER_ID //以微信静默授权的方式拿到openid作为userid,
            // userId:'oyMAaxN1hGZuki6cOvwF6OSQ-Ahs'//嵩
            // userId:'oyMAaxD884kfJA1EHMBTX8Y5bm9I' //彩红
            // userId:'oyMAaxFzeZSuZrIGONamja9ARKPg' //邰宏伟
            // userId:'oyMAaxNt4u8w5ck5YPstFYhOCkag' //何义情
            // userId:'oyMAaxBIxrgsW21JDmv4XncmoldY' //王婵
            // userId:'oyMAaxJrL7KgJ3D55O4BBWpZwLFI' //丽洁
            // userId:'oyMAaxPQbS9524dbwhwaHxzSSLjY' //Sally
        }
        this.hideIntro = this.hideIntro.bind(this);
        this.hideHomePage = this.hideHomePage.bind(this);
    }

    hideIntro(){
        this.setState({
            isFirst:false
        })
    }
    hideHomePage(){
        this.setState({
            isShowHomePage:false
        })
    }

    componentWillMount() {
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
    }
    componentDidMount(){

        var self = this;
        /**
         * 在这里进行班级验证
         * */
        $.ajax({
            url:OneDrop.base_url+'/auth/check',
            dataType:'json',
            method:'POST',
            data:{
                user_id:this.state.userId
            },
            success:(data)=>{
                if(data.status === 0){
                    alert('用户验证错误！');
                }else{
                    if(data.data === 0){
                        this.setState({
                            isFirst:true
                        })
                    }else{
                        this.setState({
                            isFirst:false
                            // isFirst:true    //test
                        })
                    }
                }
            }
        });

        //监听浏览器的返回
        window.addEventListener('popstate',(e)=>{
            // console.log(this.context.router);
            this.context.router.history.push('/weixin/main');
            this.setState({
                backprops:true
            })
        },false);

    }
    render(){
        return (
            <div>
                {
                    this.state.isFirst ?
                        <Introduction callback={this.hideIntro}/>
                        :
                        <MainTab backInfo={this.state.backprops}/>
                }
            </div>
        )
    }
}

Main.contextTypes = {
    router:React.PropTypes.object
}

ReactDOM.render(
    <Router>
        <Main/>
    </Router>,
    document.getElementById('main-container')
)