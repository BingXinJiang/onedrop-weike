/**
 * Created by jiangsong on 2017/4/28.
 */
import React from 'react';

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
        })
    }

    componentDidUnMount() {
        this.audioTimer = null;
    }

    render(){
        return(
            <div style={{width: '600px', height:'120px', backgroundColor:'white', borderWidth:'2px', borderRadius:'10px', marginLeft:'18%'}}>
                <audio ref="section_audio" src={this.props.audioUrl}>
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
                }} style={{width:'80%', height:'100%', marginLeft:'30px'
                }}>
                    <img style={{float:'left', width:'80px', height:'80px', marginTop:'20px', marginLeft:'10px', marginRight:'30px'}}
                         src="../../../img/weike/detail/voice.png"/>
                    <div style={{marginLeft:'30px'}}>
                        <p style={{fontSize:'35px', marginTop:'20px'}}>{this.props.title}</p>
                        <p style={{fontSize:'35px', marginTop:'10px', float:'left'}}>{this.props.author}</p>
                        <p style={{fontSize:'25px', marginTop:'10px', float:'right'}}>{this.state.curTime+'s/'+this.state.duration+'s'}</p>
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