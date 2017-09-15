/**
 * Created by jiangsong on 2017/5/24.
 */
import React from 'react';
import APPTool from '../../Tool/Tool';
import OneDrop from '../../const/onedrop';
import {Cell,CellBody,CellFooter} from 'react-weui';
import Style from '../../const/Style';
import Rank from '../rank/rank';
import Tree from '../drop/mine/MyStudy';
import Medal from '../drop/mine/Medal';

class Head extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {

        }
    };
    static defaultProps = {
        imgUrl:'../../../img/weike/tool/head.png',
        nickname:'一滴',
        fraction:0
    };
    static propTypes = {
        imgUrl:React.PropTypes.string,
        nickname:React.PropTypes.string,
        fraction:React.PropTypes.number
    };
    render(){
        return(
            <div style={{
                width:'100%',height:'300px',backgroundImage:'url(../../../img/weike/tool/bg.jpg)',
                backgroundSize:'100%',display:'flex',flexDirection:'column',alignItems:'center'
            }}>
                <img style={{
                    width:'100px',height:'100px',borderRadius:'50px',overflow:'hidden',marginTop:'20px'
                }} src={this.props.imgUrl}/>
                <p style={{
                    marginTop:'20px',fontSize:'28px'
                }}>{this.props.nickname}</p>
                <p style={{
                    marginTop:'20px',fontSize:'28px'
                }}>我的积分：<span>{this.props.fraction}</span></p>
            </div>
        )
    }
}

const POOL = {
    selected:'defaulted',
    defaulted:'defaulted',
    rank:'rank',
    tree:'tree',
    medal:'medal',
    evaluation:'evaluation'
}

class MYCell extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    static defaultProps = {
        name:'',
        text:'文本'
    }
    static propTypes = {
        text:React.PropTypes.string,
        name:React.PropTypes.string,
        callback:React.PropTypes.func
    }
    render(){
        return(
            <div style={{
                borderBottomWidth:'1px',borderBottomColor:Style.lineGray,borderBottomStyle:'solid'
            }} onClick={()=>{
                POOL.selected = this.props.name;
                this.props.callback();
            }}>
                <Cell access>
                    <CellBody style={{fontSize:'28px'}}>
                        {this.props.text}
                    </CellBody>
                    <CellFooter/>
                </Cell>
            </div>
        )
    }
}

class Table extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    static defaultProps = {
        dataSource:[]
    }
    static propTypes = {
        dataSource:React.PropTypes.array,
        callback:React.PropTypes.func
    }
    render(){
        return(
            <div>
                {
                    this.props.dataSource.map((con)=><MYCell name={con.name} text={con.text} callback={this.props.callback}/>)
                }
            </div>
        )
    }
}


export default class Tool extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nickname:'',
            headimgurl:'',
            fraction:0,
            selected:POOL.selected
        }
        this.dataSource = [
            {name:'rank',text:'排行榜'},
            {name:'tree',text:'我的一滴树'},
            {name:'medal',text:'我的勋章'},
            {name:'evaluation',text:'我的测评'},
        ]
        this.goTo = this.goTo.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    goTo(){
        if(POOL.selected === POOL.evaluation){
            POOL.selected = POOL.defaulted;
            return;
        }
        this.setState({
            selected:POOL.selected
        })
    }
    goBack(){
        this.setState({
            selected:POOL.defaulted
        })
    }

    componentDidMount(){
        APPTool.getJSSDKPaySign(location.href.split('#')[0],()=>{

        })
        APPTool.shareToMoments({

        })
        APPTool.shareToFriends({

        })
        var body = JSON.stringify({
            user_id:REMOTE_WEIXIN_USER_ID
        })
        fetch(OneDrop.base_url+'/rank/fraction',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        }).then((res)=>res.json()).then((res)=>{
            if(res.status === 1){
                var user = res.data;
                this.setState({
                    nickname:user.nickname,
                    headimgurl:user.headimgurl,
                    fraction:user.fraction
                })
            }else{
                alert(JSON.stringify(res.data));
            }
        })
    }
    componentWillUnmount(){
        POOL.selected = POOL.defaulted;
    }
    render(){
        return (
            <div>
                {
                    this.state.selected === POOL.rank ?
                        <Rank callback={this.goBack}/> : null
                }
                {
                    this.state.selected === POOL.tree ?
                        <Tree callback={this.goBack}/> : null
                }
                {
                    this.state.selected === POOL.medal ?
                        <Medal callback={this.goBack}/> : null
                }
                {
                    this.state.selected === POOL.defaulted ?
                        <div>
                            <Head nickname={this.state.nickname} fraction={this.state.fraction} imgUrl={this.state.headimgurl}/>
                            <div style={{width:'100%',height:'30px',backgroundColor:Style.bgGray}}/>
                            <Table dataSource={this.dataSource} callback={this.goTo}/>
                        </div>
                        : null
                }
            </div>
        )
    }
}