/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'react';
import OneDrop from '../../const/onedrop';
import Tool from '../../Tool/Tool';

export default class DropAudio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playing:false,
            duration:0,
            curTime:0,
            leftTime:0
        };
        this.audioTimer = null;
        this.commitLearnStatus = (percent)=>{
            $.ajax({
                url:OneDrop.base_url+'/learn',
                dataType:'json',
                method:'POST',
                data:{
                    user_id:REMOTE_WEIXIN_USER_ID,
                    learn_percent:percent,
                    section_id:this.props.sectionId
                },
                success:(data)=>{
                    if(data.status === 1){

                    }else{

                    }
                }
            })
        }

        // this.mypositionX = 0;
        // this.mytransformX = 0;
        // this.mythisWidth = 0;
    }

    componentDidMount() {
        var self = this;
        // var section = '#che_dan_de_yin_pin'+self.props.sectionId;
        // var audio = $(section)[0];
        var audio = OneDrop.AUDIO;
        this.audioTimer = setInterval(()=>{
            var duration = audio.duration;
            var curTime = audio.currentTime;
            this.setState({
                duration:parseInt(duration),
                curTime:parseInt(curTime),
                leftTime:parseInt(duration-curTime)
            })
            $('#drop_progress').css('width',curTime/duration*300+'px');
        }, 1000)
        audio.addEventListener('ended',()=>{
           self.commitLearnStatus(100);
           self.setState({
               playing:false
           })
       })
    }

    componentWillUnmount(){
        clearInterval(this.audioTimer);
        // var section = '#che_dan_de_yin_pin'+this.props.sectionId;
        // var audio = $(section)[0];
        var audio = OneDrop.AUDIO;
        var duration = audio.duration;
        var curTime = audio.currentTime;
        if(curTime && curTime>0){
            var learn_percent = (curTime/duration).toFixed(2)*100;
            this.commitLearnStatus(learn_percent);
        }
        audio.pause();
        audio.currentTime = 0;
    }

    render(){
        var self = this;
        // var videoShow = document.getElementById("audioPlayControll");
        // var videoShowPositionX1 = $(videoShow).offset().left;
        // var videoShowFa = document.getElementById("audioPlayContainer");
        // var videoShowPositionX1Fa = $(videoShow).offset().left;
        return(

                <div style={{
                    display:'flex',
                    width:'100%',
                    justifyContent:'center',
                    marginTop:'95px'
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        height:'144px',
                        width:(OneDrop.JS_ScreenW-50)+'px',
                        borderColor:'rgb(135,135,135)',
                        borderWidth:'2px',
                        backgroundColor:'rgb(222,232,240)',
                        alignItems:'center',
                        borderStyle:'solid'
                    }}>

                        <img style={{
                               marginLeft:'24px'
                        }} onClick={()=>{

                            // var section = '#che_dan_de_yin_pin'+self.props.sectionId;
                            // var audio = $(section)[0];
                            var audio = OneDrop.AUDIO;

                            if(audio.paused || !this.state.playing){

                                // wx.ready(function() {
                                //   audio.play();
                                //   self.setState({
                                //         playing:true
                                //     })
                                // })

                                audio.play();
                                self.setState({
                                    playing:true
                                })


                            }else{
                                audio.pause();
                                this.setState({
                                    playing:false
                                })
                            }
                        }} src={this.state.playing ? "../../../img/weike/tool/pause.png" : "../../../img/weike/tool/play.png"}/>
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            // justifyContent:'center',
                            marginLeft:'28px'

                        }}>
                            <p style={{
                                fontSize:'33px',
                                color:'rgb(0,0,0)',
                                // marginTop:'25px'
                            }}>{this.props.sectionName}</p>
                            {/*
                            <div style={{
                                display:'flex',flexDirection:'row',alignItems:'center'
                            }}>
                                <p style={{
                                    fontSize:'28px',
                                    color:'rgb(134,135,136)',
                                }}>{Tool.convertSec(parseInt(Number(this.state.duration)))}</p>
                                <div id="audioPlayContainer" style={{
                                    width:'300px',height:'30px',marginLeft:'25px',marginRight:'25px',
                                    display:'flex',flexDirection:'row',alignItems:'center'
                                }}>
                                    <div style={{
                                        width:'200px',height:'5px',backgroundColor:'green'
                                    }}/>
                                    <div id="audioPlayControll" onTouchStart={(e)=>{
                                        e.preventDefault();
                                        if(e.targetTouches.length == 1){
                                            var touch = e.targetTouches[0];
                                            this.mypositionX = touch.pageX;
                                            //确定本次拖动transform的初始值
                                            var transformStr = videoShow.style.transform;
                                            transformStr = transformStr.substring(11);
                                            var index = transformStr.lastIndexOf("p");
                                            transformStr = transformStr.substring(0, index);
                                            this.mytransformX = parseInt(transformStr);
                                            //确定本次拖动的div宽度值
                                            var widthStr = videoShow.style.width;
                                            this.mythisWidth = parseInt(widthStr.substring(0,widthStr.lastIndexOf("p")));
                                        }
                                    }} onTouchMove={(e)=>{
                                        e.preventDefault();
                                        if(e.targetTouches.length == 1){
                                            var touch = e.targetTouches[0];
                                            videoShow.style.transform = 'translateX('+(this.transformX+touch.pageX-this.positionX)+'px)';
                                            $(videoShow).css("width",this.mythisWidth+this.mypositionX-touch.pageX);
                                        }
                                    }} onTouchEnd={(e)=>{
                                        e.preventDefault();
                                        if($(videoShowFa).offset().left>videoShowPositionX1){
                                            videoShow.style.transform = 'translateX('+(videoShowPositionX1)+'px)';
                                            //此时恢复初始状态
                                            $(videoShow).css("width",videoShowWidth);
                                        }
                                        // 最后一个标签的位置,父元素右上角坐标值
                                        var videoItem2 = videoItems[videoItems.length-1];
                                        var videoItemPositionX = $(videoItem2).offset().left+$(videoItem2).width();
                                        if(videoItemPositionX<videoShowPositionX2){
                                            //此时展示最后三个元素,宽度为最大宽度
                                            videoShow.style.transform = 'translateX('+(0-(videoShowWidth/3)*(videoItems.length-3))+'px)';
                                            $(videoShow).css("width",videoShowWidth/3*videoItems.length);
                                        }
                                    }} style={{
                                        width:'30px',height:'30px',borderRadius:'15px',backgroundColor:'orange'
                                    }}/>
                                    <div style={{
                                        width:'70px',height:'5px',backgroundColor:'blue'
                                    }}/>
                                </div>
                                <p style={{
                                    fontSize:'28px',
                                    color:'rgb(134,135,136)',
                                }}>{Tool.convertSec(parseInt(Number(this.state.leftTime)))}</p>
                            </div>
                            */}
                            <div style={{display:'flex',alignItems:'center'}}>
                                <p style={{
                                    fontSize:'28px',marginRight:'15px',
                                    color:'rgb(134,135,136)'
                                }}>{Tool.convertSec(parseInt(Number(this.state.curTime)))}</p>
                                <div style={{
                                    width:'300px',height:'20px',backgroundColor:'rgb(211,211,211)',position:'relative',borderRadius:'10px'
                                }}>
                                    <div id="drop_progress" style={{
                                        position:'absolute',top:'0',left:'0',height:'100%',backgroundColor:'rgb(255,158,21)',
                                        width:'0',borderRadius:'10px'
                                    }}>

                                    </div>
                                </div>
                                <p style={{
                                    fontSize:'28px',marginLeft:'15px',lineHeight:'50px',
                                    color:'rgb(134,135,136)',
                                }}>{Tool.convertSec(parseInt(Number(this.state.duration)))}</p>
                            </div>

                        </div>
                    </div>
                </div>

        )
    }
}

DropAudio.propTypes = {
    audioUrl:React.PropTypes.string
}