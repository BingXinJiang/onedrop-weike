/**
 * Created by jiangsong on 2017/8/15.
 */

import React from 'react';
import OneDrop from '../../const/onedrop';

class NoLearnCourse extends React.PureComponent{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                hahha
            </div>
        )
    }
}

export default class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            news:'这里显示news返回'
        }
    }

    render(){
        return (
            <div >
                <div onClick={()=>{
                    this.props.callback();
                }}>
                    刚开始的华工科技地方还看电视个端口发过火上过课的少妇估计好地方还是个肯定是凤凰股份上课回购的空间是否更好
                    案件回访三德科技国会大厦反馈给好地方和高考倒计时刚回到家反馈库随机回购的快捷方式个可是党和国家对方
                    搜集电话个端口发几个
                </div>
                <br/>
                <br/>
                <br/>
                <div onClick={()=>{
                    console.log('------------------');
                    $.ajax({
                        url:OneDrop.base_url+'/news/answer',
                        dataType:'json',
                        method:'GET',
                        success:(data)=>{
                            console.log('====',data);
                            this.setState({
                                news:JSON.stringify(data)
                            })
                        }
                    })
                }}>
                    <p>PUSHPUSHPUSHPUSHPUSHPUSH</p>
                    <p>PUSHPUSHPUSHPUSHPUSHPUSH</p>
                    <p>PUSHPUSHPUSHPUSHPUSHPUSH</p>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    {this.state.news}
                </div>
            </div>
        )
    }

}