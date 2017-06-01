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
            courses_test:[{isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'},
                {isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'},
                {isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'},
                {isPlaying:false,section_voice:'../../../img/weike/test/盖子法则2.mp3'}
            ],
            courses:[]
        }
    }

    componentDidMount() {
        $.ajax({
            url:OneDrop.base_url+'/onedrop/sections',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID,
                page:1
            },
            success:(data)=>{
                if(data.status === 1){
                    console.log('last drop:', data);
                    var courses = data.data;
                    this.setState({
                        courses:courses
                    })
                }else{
                    alert('数据执行错误!');
                }
            }
        })
    }
    render(){
        return (
            <div style={{
                backgroundColor:'rgb(235,235,235)',
                width:OneDrop.JS_ScreenW
            }}>
                <div>

                </div>
                {
                    this.state.courses.map((content,index)=>{
                        var mp3_url = content.section_voice;
                        var preUrl = OneDrop.res_ip + mp3_url.split('.mp3')[0];
                        mp3_url = preUrl + '.mp3';
                        var ogg_url = preUrl + '.ogg';
                        var wav_url = preUrl + '.wav';
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
                                        }}>{content.course_title}</p>
                                        <p style={{
                                            fontSize:'24px',
                                            color:'rgb(0,0,0)',
                                        }}>{content.teacher_name}：{content.teacher_position}</p>
                                        <p style={{
                                            fontSize:'20px',
                                            color:'rgb(88,88,88)',
                                            marginTop:'5px'
                                        }}>{content.year+'年'+content.month+'月'+content.day+'日'}</p>
                                    </div>
                                    <audio id={"onedrop_last_drop_audio_"+index} preload="auto">
                                        <source src={ogg_url} type="audio/ogg"/>
                                        <source src={wav_url} type="audio/wav"/>
                                        <source src={mp3_url} type="audio/mpeg"/>
                                        您的浏览器不支持audio
                                    </audio>
                                    <div onClick={()=>{
                                        var newCourses = [];
                                        this.state.courses.map((con, idx)=>{
                                            if(con.isPlaying === true && index !== idx){
                                                $('#onedrop_last_drop_audio_'+idx)[0].load();
                                            }
                                            if(index === idx){
                                                if(con.isPlaying){
                                                    $('#onedrop_last_drop_audio_'+idx)[0].pause();
                                                    con.isPlaying = false;
                                                }else{
                                                    $('#onedrop_last_drop_audio_'+idx)[0].play();
                                                    con.isPlaying = true;
                                                }
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