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
            // var duration = this.refs.section_audio.duration;
            // var curTime = this.refs.section_audio.currentTime;
            var section = '#che_dan_de_yin_pin'+self.props.sectionId;
            var audio = $(section)[0];
            var duration = audio.duration;
            var curTime = audio.currentTime;
            this.setState({
                duration:parseInt(duration),
                curTime:parseInt(curTime)
            })
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.audioTimer);
        var section = '#che_dan_de_yin_pin'+this.props.sectionId;
        var audio = $(section)[0];
        audio.pause();
        audio.currentTime = 0;
    }

    render(){
        // var mp3_url = this.props.audioUrl;
        // var preUrl = OneDrop.res_ip + mp3_url.split('.mp3')[0];
        // mp3_url = preUrl + '.mp3';
        // var ogg_url = preUrl + '.ogg';
        // var wav_url = preUrl + '.wav';
        var self = this;
        return(

                <div style={{
                    display:'flex',
                    width:'100%',
                    justifyContent:'center',
                    marginTop:'95px'
                }}>
                    {/*
                        <audio ref="section_audio" preload="auto">
                            <source src={ogg_url} type="audio/ogg"/>
                            <source src={mp3_url} type="audio/mpeg"/>
                            <source src={wav_url} type="audio/wav"/>
                            您的浏览器不支持audio
                        </audio>
                        */
                    }
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
                            // var audio = this.refs.section_audio;
                            var section = '#che_dan_de_yin_pin'+self.props.sectionId;
                            var audio = $(section)[0];
                            // audio.addEventListener("playing", function(){
                            //     console.log('现在开始播放了呢。。。。。。');
                            // });
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