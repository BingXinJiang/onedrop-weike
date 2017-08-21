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
    }

    componentDidMount() {
        var self = this;
        var audio = OneDrop.AUDIO;
        this.audioTimer = setInterval(()=>{
            var duration = audio.duration;
            var curTime = audio.currentTime;
            this.setState({
                duration:parseInt(duration),
                curTime:parseInt(curTime),
                leftTime:parseInt(duration-curTime)
            })
            $('#drop_progress').css('width',curTime/duration*OneDrop.JS_ScreenW*0.42+'px');
        }, 1000)
        audio.addEventListener('ended',()=>{
           // self.commitLearnStatus(100);
           self.setState({
               playing:false
           })
       })
    }

    componentWillUnmount(){
        clearInterval(this.audioTimer);
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

                            var audio = OneDrop.AUDIO;

                            if(audio.paused || !this.state.playing){

                                wx.ready(function() {
                                  audio.play();
                                  self.setState({
                                        playing:true
                                    })
                                })

                                // audio.play();
                                // self.setState({
                                //     playing:true
                                // })


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
                            <div style={{display:'flex',alignItems:'center'}}>
                                <p style={{
                                    fontSize:'28px',marginRight:'15px',
                                    color:'rgb(134,135,136)'
                                }}>{Tool.convertSec(parseInt(Number(this.state.curTime)))}</p>
                                <div style={{
                                    width:OneDrop.JS_ScreenW*0.42,height:'20px',backgroundColor:'rgb(211,211,211)',position:'relative',borderRadius:'10px'
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