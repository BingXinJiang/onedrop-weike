/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';
import Drop from './everyday/Drop';
import LeadPage from './everyday/LeadPage';

export default class LastDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPlaying:false,
            playUrl:'',
            courses:[],
            isShowEverydayDrop:false,
            section_id:0,
            isShowLeadPage:false,
            mp3_url:'',
            ogg_url:'',
            wav_url:''
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
            <div>
                {
                    this.state.isShowEverydayDrop && false ?
                        <audio id="che_dan_de_yin_pin" preload="auto">
                            <source src={this.state.mp3_url} type="audio/mpeg"/>
                            <source src={this.state.ogg_url} type="audio/ogg"/>
                            <source src={this.state.wav_url} type="audio/wav"/>
                            您的浏览器不支持audio
                        </audio>
                        : null
                }
                {
                    !this.state.isShowEverydayDrop&&!this.state.isShowLeadPage ?
                        <div style={{
                            backgroundColor:'rgb(229,236,242)',
                            width:OneDrop.JS_ScreenW,
                            paddingBottom:'110px'
                        }}>
                            <div onClick={()=>{
                                this.setState({
                                    isShowLeadPage:true
                                })
                            }}>
                                <img style={{
                                    width:OneDrop.JS_ScreenW,
                                    height:'360px'
                                }} src="../../../img/weike/onedrop/banner.jpg"/>
                            </div>
                            {
                                this.state.courses.map((content,index)=>{
                                    var mp3_url = content.section_voice;
                                    var preUrl = OneDrop.res_ip + mp3_url.split('.mp3')[0];
                                    mp3_url = preUrl + '.mp3';
                                    // mp3_url = 'http://dev.mymax.cn/affix/temp/music/section_1_1_1.mp3';
                                    var ogg_url = preUrl + '.ogg';
                                    var wav_url = preUrl + '.wav';
                                    return(
                                        <div key={index} onClick={()=>{
                                            this.setState({
                                                isShowEverydayDrop:true,
                                                section_id:content.section_id,
                                                mp3_url:mp3_url,
                                                ogg_url:ogg_url,
                                                wav_url:wav_url
                                            })
                                        }} style={{
                                            marginTop:'30px',
                                            backgroundColor:'white',
                                            width:'100%'
                                        }}>
                                            <div style={{
                                                paddingTop:'48px',
                                                paddingBottom:'28px',
                                                marginRight:'24px',
                                                marginLeft:'24px'
                                            }}>
                                                <p style={{
                                                    fontSize:'48px',
                                                    color:'rgb(0,0,0)'
                                                }}>{content.section_name}</p>
                                                <p style={{
                                                    marginTop:'48px',
                                                    fontSize:'30px',
                                                    color:'rgb(102,102,102)'
                                                }}>{content.section_intro}</p>
                                                <p style={{
                                                    marginTop:'28px',
                                                    fontSize:'20px',
                                                    color:'rgb(131,131,131)'
                                                }}>{content.year}年{content.month}月{content.day}日</p>
                                                <img style={{height:'300px',width:'100%',
                                                    marginTop:'28px'
                                                }} src={OneDrop.res_ip+content.section_list_img}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> : null
                }
                {
                    this.state.isShowEverydayDrop ?
                        <Drop sectionId={this.state.section_id} callback={()=>{
                            this.setState({
                                isShowEverydayDrop:false
                            })
                        }}/>
                        : null
                }
                {
                    this.state.isShowLeadPage ?
                        <LeadPage callback={()=>{
                            this.setState({
                                isShowLeadPage:false
                            })
                        }}/>
                        :
                        null
                }
            </div>
        )
    }
}