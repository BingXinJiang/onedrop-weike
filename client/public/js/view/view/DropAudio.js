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
    }

    componentDidMount() {
        var self = this;
        this.audioTimer = setInterval(()=>{
            var audio = OneDrop.AUDIO;
            var duration = audio.duration;
            var curTime = audio.currentTime;
            console.log('-------');
            if(curTime){
                console.log('可以播放了，哈哈哈哈');
            }
            this.setState({
                duration:parseInt(duration),
                curTime:parseInt(curTime)
            })
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.audioTimer);
        var audio = OneDrop.AUDIO;
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
                            console.log('点击开始播放。。。');
                            var audio = OneDrop.AUDIO;
                            if(audio.paused || audio.ended || !this.state.playing){
                                audio.play();
                                this.setState({
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