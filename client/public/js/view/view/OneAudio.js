/**
 * Created by jiangsong on 2017/4/28.
 */
import React from 'react';
import OneDrop from '../../const/onedrop';

export default class OneAudio extends React.Component{
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
        console.log('计时器结束了！！！');
        clearInterval(this.audioTimer);
    }

    render(){
        var mp3_url = this.props.audioUrl;
        var preUrl = OneDrop.res_ip + mp3_url.split('.mp3')[0];
        var ogg_url = preUrl + '-ogg.ogg';
        var wav_url = preUrl + '-wav.wav';
        
        return(
            <div style={{width: '80%', height:'120px', backgroundColor:'white',
                borderWidth:'2px', borderRadius:'10px', marginLeft:'8.5%'}}>
                <audio ref="section_audio" preload="auto">
                    <source src={ogg_url} type="audio/ogg"/>
                    <source src={wav_url} type="audio/wav"/>
                    <source src={mp3_url} type="audio/mpeg"/>
                    您的浏览器不支持audio
                </audio>
                <div onClick={()=>{
                    var audio = this.refs.section_audio;

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
                }} style={{width:'90%', height:'100%', marginLeft:'30px'
                }}>
                    <img style={{float:'left', width:'80px', height:'80px', marginTop:'20px',
                        marginLeft:'10px', marginRight:'30px'}}
                         src="../../../img/weike/detail/voice.png"/>
                    <div style={{marginLeft:'30px'}}>
                        <p style={{fontSize:'28px', marginTop:'20px',height:'60px',
                            overflow:'hidden'}}>{this.props.title}</p>
                        <p style={{fontSize:'28px', marginTop:'10px', float:'left'}}>{this.props.author}</p>
                        <p style={{fontSize:'22px', marginTop:'10px',
                            float:'right'}}>{this.state.curTime+'s/'+this.state.duration+'s'}</p>
                    </div>
                </div>
            </div>
        )
    }
}

OneAudio.propTypes = {
    audioUrl:React.PropTypes.string,
    title:React.PropTypes.string,
    author:React.PropTypes.string
}