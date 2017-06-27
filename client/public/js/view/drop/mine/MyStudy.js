/**
 * Created by jiangsong on 2017/6/23.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
import Tool from '../../../Tool/Tool';
import Loading from '../../view/Loading';
import Drop from '../everyday/Drop';

export default class MyStudy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            labels:[],

            isShowLabelCourse:false,
            labelCourses:[],
            isLabelLoading:false,
            labelName:'',

            isShowEverydayDrop:false,
            section_id:0
        };
        this.labelUnitArrPoint = [];
        this.getLabelCourses = this.getLabelCourses.bind(this);
    }

    componentWillMount(){
        // var img = document.createElement('img');
        // img.src='../../../../img/weike/mine/tree.jpg';
    }

    componentDidMount(){
        const cW = OneDrop.JS_ScreenW-160;
        const cH = OneDrop.JS_ScreenH*2-107-300-160;
        const radius = 160;
        const num = 10;
        this.setState({
            isLoading:true
        })
        this.labelUnitArrPoint = Tool.generateRndomPointArr(cW,cH,radius,num);
        
        $.ajax({
            url:OneDrop.base_url+'/mydrop/labels',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID
            },
            success:(data)=>{
                if(data.status === 1){
                    this.setState({
                        labels:data.data,
                        isLoading:false
                    })
                }else{
                    this.setState({
                        isLoading:false
                    })
                    alert('网络错误!');
                }
            }
        })
    }

    getLabelCourses(label_id){
        if(this.state.isLoading || this.state.isLabelLoading){
            return;
        }
        this.setState({
            isShowLabelCourse:true,
            isLabelLoading:true
        })
        $.ajax({
            url:OneDrop.base_url+'/mydrop/label/sections',
            dataType:'json',
            method:'POST',
            data:{
                label_id:label_id
            },
            success:(data)=>{
                if(data.status === 1){
                    this.setState({
                        isLabelLoading:false,
                        labelCourses:data.data
                    })
                }else{
                    this.setState({
                        isLabelLoading:false
                    })
                    alert('网络错误');
                }
            }
        })
    }

    componentDidUpdate(){
        // document.body.scrollTop = document.body.scrollTop + 260*2;
    }

    render(){
        return(
            <div style={{overflowX:'hidden'}}>
                <div onClick={()=>{
                    this.setState({
                        isShowLabelCourse:false
                    })
                }} style={{
                    width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH2+'px',position:'relative',overflow:'hidden'
                }}>
                    <img style={{
                        width:'100%',height:'91%',position:'absolute',left:'0',top:'0'
                    }} src="../../../../img/weike/mine/tree.jpg"/>
                    <div style={{
                        width:OneDrop.JS_ScreenW-160+'px',height:OneDrop.JS_ScreenH*2-100-300-160+'px',overflow:'visible',
                        marginTop:'240px',marginLeft:'80px',position:'relative'
                    }}>
                        {
                            this.state.labels.map((content,index)=>{
                                var point = this.labelUnitArrPoint[index];
                                const conSty = {
                                    position:'absolute',top:point.y+'px',left:point.x+'px',backgroundColor:point.color,
                                    borderRadius:point.width/2+'px',width:point.width+'px',height:point.width+'px',
                                    display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'
                                }
                                const wordSty = {
                                    fontSize:point.wordSize+'px',color:'white'
                                }
                                if(content.label_name.length<=3){
                                    return(
                                        <div key={index} onClick={(e)=>{
                                            e.stopPropagation();
                                            this.getLabelCourses(content.label_id);
                                            this.setState({
                                                labelName:content.label_name
                                            })
                                        }} style={{...conSty}}>
                                            <p style={{...wordSty}}>{content.label_name}</p>
                                        </div>
                                    )
                                }else if(content.label_name.length<=5){
                                    return(
                                        <div key={index} onClick={(e)=>{
                                            e.stopPropagation();
                                            this.getLabelCourses(content.label_id);
                                            this.setState({
                                                labelName:content.label_name
                                            })
                                        }} style={{...conSty}}>
                                            <p style={{...wordSty}}>{content.label_name.substr(0,2)}</p>
                                            <p style={{...wordSty}}>{content.label_name.substr(2,3)}</p>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div key={index} onClick={(e)=>{
                                            e.stopPropagation();
                                            this.getLabelCourses(content.label_id);
                                            this.setState({
                                                labelName:content.label_name
                                            })
                                        }} style={{...conSty}}>
                                            <p style={{...wordSty}}>{content.label_name.substr(0,3)}</p>
                                            <p style={{...wordSty}}>{content.label_name.substr(3,3)}</p>
                                            <p style={{...wordSty}}>{content.label_name.substr(6,3)}</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {
                    this.state.isShowEverydayDrop ?
                        <Drop sectionId={this.state.section_id} callback={()=>{
                            this.setState({
                                isShowEverydayDrop:false
                            })
                        }}/>
                        : null
                }
                {
                    this.state.isShowLabelCourse ?
                        <div style={{
                            position: 'absolute',left:'24px',bottom:'77px',width:OneDrop.JS_ScreenW-48+'px',
                            height:'700px',backgroundColor:'rgb(194,209,226)',borderTopLeftRadius:'38px',
                            borderTopRightRadius:'38px'
                        }}>
                            <div style={{marginBottom:'30px'}}>
                                <div style={{
                                    width:'100%',height:'120px',display:'flex',alignItems:'center'
                                }}>
                                    <p style={{fontSize:'36px',color:'rgb(23,172,251)',marginLeft:'24px'}}>{this.state.labelName}({this.state.labelCourses.length})</p>
                                </div>
                                <div style={{width:'100%',height:'30px',backgroundColor:'rgb(172,183,194)'}}/>
                                <div style={{overflowX:'scroll',height:'550px'}}>
                                    {
                                        this.state.labelCourses.map((content,index)=>{
                                            return (
                                                <div onClick={()=>{
                                                    if(this.state.isLabelLoading || this.state.isLoading){
                                                        return;
                                                    }
                                                    var audio = document.createElement('audio');
                                                    audio.preload = 'auto';
                                                    audio.src = content.section_voice;
                                                    audio.id = 'che_dan_de_yin_pin'+content.section_id;
                                                    OneDrop.AUDIO = audio;
                                                    this.setState({
                                                        isShowEverydayDrop:true,
                                                        section_id:content.section_id
                                                    })
                                                }} key={index}>
                                                    <div style={{width:'100%',height:'110px',display:'flex',alignItems:'center'}}>
                                                        <p style={{fontSize:'30px',color:'rgb(51,51,51)',marginLeft:'24px'}}>{content.section_name}</p>
                                                    </div>
                                                    <div style={{width:'100%',height:'1px',backgroundColor:'rgb(172,183,194)'}}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                this.state.isLabelLoading ?
                                    <div style={{
                                        position:'fixed',bottom:'107px',left:'24px',width:OneDrop.JS_ScreenW-48+'px',
                                        height:'550px',display:'flex',justifyContent:'center',alignItems:'center'
                                    }}>
                                        <img src="../../../img/weike/home/loading.gif"/>
                                    </div>
                                    : null
                            }
                        </div>
                        : null
                }
                {
                    this.state.isLoading ?
                        <Loading/>
                        : null
                }
            </div>
        )
    }
}