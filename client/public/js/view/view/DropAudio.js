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
            curTime:0
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
        var section = '#che_dan_de_yin_pin'+self.props.sectionId;
        var audio = $(section)[0];
        this.audioTimer = setInterval(()=>{
            // var audio = OneDrop.AUDIO;
            var duration = audio.duration;
            var curTime = audio.currentTime;
            this.setState({
                duration:parseInt(duration),
                curTime:parseInt(curTime)
            })
        }, 1000)
        $(section).bind('ended',()=>{
           self.commitLearnStatus(100);
           self.setState({
               playing:false
           })
       })
    }

    componentWillUnmount(){
        clearInterval(this.audioTimer);
        var section = '#che_dan_de_yin_pin'+this.props.sectionId;
        var audio = $(section)[0];
        // var audio = OneDrop.AUDIO;
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

                            var section = '#che_dan_de_yin_pin'+self.props.sectionId;
                            // var audio = ONEDROP_AUDIO[self.props.sectionId-1];
                            var audio = $(section)[0];
                            // var audio = OneDrop.AUDIO;

                            if(audio.paused || audio.ended || !this.state.playing){

                                wx.ready(function() {
                                  audio.play();
                                  self.setState({
                                        playing:true
                                    })
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
                            <p style={{
                                fontSize:'28px',
                                color:'rgb(134,135,136)',
                                // marginTop:'15px'
                            }}>{Tool.convertSec(parseInt(Number(this.state.duration ? this.state.duration : 0)))}</p>
                        </div>
                    </div>
                </div>

        )
    }
}

DropAudio.propTypes = {
    audioUrl:React.PropTypes.string
}