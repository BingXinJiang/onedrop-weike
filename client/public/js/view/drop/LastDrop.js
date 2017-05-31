/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';
import async from 'async';

export default class LastDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPlaying:false,
            playUrl:'',
            courses:[{isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'},
                {isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'},
                {isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'},
                {isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'}
            ]
        }
    }
    render(){
        var mp3_url = this.state.playUrl;
        var preUrl = OneDrop.res_ip + mp3_url.split('.mp3')[0];
        var ogg_url = preUrl + '-ogg.ogg';
        var wav_url = preUrl + '-wav.wav';
        return (
            <div style={{
                backgroundColor:'rgb(235,235,235)',
                width:OneDrop.JS_ScreenW
            }}>
                <div>
                    <audio ref="last_drop_section_audio" preload="auto">
                        <source src={ogg_url} type="audio/ogg"/>
                        <source src={wav_url} type="audio/wav"/>
                        <source src={mp3_url} type="audio/mpeg"/>
                        您的浏览器不支持audio
                    </audio>
                </div>
                {
                    this.state.courses.map((content,index)=>{
                        return (
                            <div key={index} style={{
                                display:'flex',
                                width:'100%',
                                height:'208px',
                                backgroundColor:'white',
                            }}>
                                <div style={{
                                    display:'flex',
                                    width:'100%',
                                    backgroundColor:'white',
                                    justifyContent:'space-between',
                                    marginLeft:'24px',
                                    marginRight:'24px',
                                    marginTop:'46px',
                                    marginBottom:'44px',
                                    alignItems:'center'
                                }}>
                                    <div>
                                        <p style={{
                                            fontSize:'32px',
                                            color:'rgb(0,0,0)'
                                        }}>管理者用人的100个细节</p>
                                        <p style={{
                                            fontSize:'24px',
                                            color:'rgb(0,0,0)',
                                        }}>李伟：教授、学者</p>
                                        <p style={{
                                            fontSize:'20px',
                                            color:'rgb(88,88,88)',
                                            marginTop:'5px'
                                        }}>2017年5月26日</p>
                                    </div>
                                    <div onClick={()=>{
                                        // var audio = this.refs.last_drop_audio;
                                        // console.log('audio:',audio);
                                        var newCourses = [];
                                        this.state.courses.map((con, idx)=>{
                                            if(index === idx){
                                                con.isPlaying = !con.isPlaying;
                                            }else {
                                                con.isPlaying = false;
                                            }
                                            newCourses.push(con);
                                        });
                                        this.setState({
                                            courses:newCourses
                                        })
                                    }} style={{
                                        marginRight:'44px'
                                    }}>
                                        <img src={content.isPlaying ? "../../../img/weike/onedrop/topause.png" :
                                            "../../../img/weike/onedrop/toplay.png"}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}