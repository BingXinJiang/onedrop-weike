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
        this.audioTimer = setInterval(()=>{
            var duration = this.refs.section_audio.duration;
            var curTime = this.refs.section_audio.currentTime;
            this.setState({
                duration:parseInt(duration),
                curTime:parseInt(curTime)
            })
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.audioTimer);
    }

    render(){
        var mp3_url = this.props.audioUrl;
        var preUrl = OneDrop.res_ip + mp3_url.split('.mp3')[0];
        mp3_url = preUrl + '.mp3';
        var ogg_url = preUrl + '.ogg';
        var wav_url = preUrl + '.wav';
        return(

                <div style={{
                    display:'flex',
                    width:'100%',
                    justifyContent:'center',
                    marginTop:'54px'
                }}>
                    <audio ref="section_audio" preload="auto">
                        <source src={ogg_url} type="audio/ogg"/>
                        <source src={mp3_url} type="audio/mpeg"/>
                        <source src={wav_url} type="audio/wav"/>
                        您的浏览器不支持audio
                    </audio>
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <p style={{
                            fontSize:'24px',
                            color:'rgb(110,217,33)'
                        }}>{Tool.convertSec(parseInt(Number(this.state.curTime)))}</p>
                        <img onClick={()=>{
                            var audio = this.refs.section_audio;
                            audio.addEventListener("playing", function(){
                                console.log('现在开始播放了呢。。。。。。');
                            });
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
                        }} src={this.state.playing ? "../../../img/weike/onedrop/play.png" : "../../../img/weike/onedrop/pause.png"}/>
                        <p style={{
                            fontSize:'24px',
                            color:'rgb(110,217,33)'
                        }}>{Tool.convertSec(parseInt(Number(this.state.duration ? this.state.duration : 0)))}</p>
                    </div>
                </div>

        )
    }
}

DropAudio.propTypes = {
    audioUrl:React.PropTypes.string
}