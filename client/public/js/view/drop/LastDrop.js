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
                console.log('data:',data);
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
        $.ajax({
            url:OneDrop.base_ip + '/main/pay/getsign',
            dataType:'json',
            method:'POST',
            data:{
                location_url:encodeURIComponent(location.href.split('#')[0])
            },
            success:function (data) {
                var payData = data.data;
                wx.config({
                    debug:false,
                    appId:OneDrop.appId,
                    timestamp:payData.timestamp,
                    nonceStr:payData.nonceStr,
                    signature:payData.signature,
                    jsApiList:[
                        'chooseWXPay'
                    ]
                })
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
                                }} src="../../../img/weike/home/home_banner.jpg"/>
                            </div>
                            {
                                this.state.courses.map((content,index)=>{
                                    var mp3_url = 'https://www.mymax.cn/videos/voices/section_1_1_'+content.section_id+'.mp3';
                                    return(
                                        <div key={index} onClick={()=>{
                                            // var audio = document.createElement('audio');
                                            // audio.preload = 'auto';
                                            // audio.src = mp3_url;
                                            // audio.id = 'che_dan_de_yin_pin'+content.section_id;
                                            // OneDrop.AUDIO = audio;
                                            this.setState({
                                                isShowEverydayDrop:true,
                                                section_id:content.section_id,
                                                mp3_url:mp3_url,
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
                                                <div style={{
                                                    display:'flex',
                                                    flexDirection:'row'
                                                }}>
                                                    <img style={{
                                                        width:'48px',
                                                        height:'48px',
                                                        borderRadius:'24px',
                                                        marginTop:'8px'
                                                    }} src={OneDrop.res_ip+content.teacher_head}/>
                                                    <p style={{
                                                        fontSize:'40px',
                                                        color:'rgb(0,0,0)',
                                                        marginLeft:'20px'
                                                    }}>{content.section_name}</p>
                                                </div>
                                                <p style={{
                                                    marginTop:'28px',
                                                    fontSize:'30px',
                                                    color:'rgb(102,102,102)'
                                                }}>{content.section_intro}</p>
                                                <p style={{
                                                    marginTop:'18px',
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