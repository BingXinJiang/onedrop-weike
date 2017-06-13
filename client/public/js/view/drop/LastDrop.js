/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';
import Drop from './everyday/Drop';
import LeadPage from './everyday/LeadPage';
import async from 'async';

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
            scrollTopNum:0,
            page:1,
            isNoMoreCourse:false
        };
        this.getCourses = (self,page)=>{
            $.ajax({
                url:OneDrop.base_url+'/onedrop/sections',
                dataType:'json',
                method:'POST',
                data:{
                    user_id:REMOTE_WEIXIN_USER_ID,
                    page:page
                },
                success:(data)=>{
                    if(data.status === 1){
                        var courses = data.data;
                        if(courses.length>0){
                            self.setState({
                                courses:self.state.courses.concat(courses),
                                page:self.state.page+1
                            })
                        }else{
                            self.setState({
                                isNoMoreCourse:true
                            })
                        }
                    }else{
                        alert('数据库执行错误');
                    }
                }
            })
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        var self =  this;
        async.parallel([
            function (callback) {
                self.getCourses(self,1);
            },
            function (callback) {
                $.ajax({
                    url:OneDrop.base_ip + '/main/pay/getsign',
                    dataType:'json',
                    method:'POST',
                    data:{
                        location_url:encodeURIComponent(location.href.split('#')[0])
                    },
                    success:function (data) {
                        if(data.status === 0){
                            callback('执行错误');
                        }
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
        ], function (err,results) {
            if(err){
                alert(err);
            }
        })
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll(event){
        if(Number(document.body.clientHeight-document.body.scrollTop)<1350){
            if(this.state.isNoMoreCourse){
                return;
            }
            this.getCourses(this, this.state.page);
        }
    }
    componentDidUnMount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render(){
        return (
            <div>
                {
                    !this.state.isShowLeadPage&&!this.state.isShowEverydayDrop&&!this.state.isShowLeadPage ?
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
                                    // var audio = document.createElement('audio');
                                    // audio.preload = 'auto';
                                    // audio.src = content.section_voice;
                                    // audio.id = 'che_dan_de_yin_pin'+content.section_id;
                                    return(
                                        <div key={index} onClick={()=>{
                                            var audio = document.createElement('audio');
                                            audio.preload = 'auto';
                                            audio.src = content.section_voice;
                                            audio.id = 'che_dan_de_yin_pin'+content.section_id;
                                            this.setState({
                                                isShowEverydayDrop:true,
                                                section_id:content.section_id,
                                                scrollTopNum:document.body.scrollTop
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
                                                <div style={{position:'relative'}}>
                                                    <img style={{height:'300px',width:'100%',
                                                        marginTop:'28px'
                                                    }} src={OneDrop.res_ip+content.section_list_img}/>
                                                    <div style={{position:'absolute',
                                                        display:'flex',flexDirection:'row',bottom:'25px',right:'40px'
                                                    }}>
                                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                                            <img src="../../../img/weike/onedrop/appreciate_num.png"/>
                                                            <p style={{color:'white',fontSize:'26px',marginLeft:'10px'}}>{content.appreciate_count ? content.appreciate_count : 0}</p>
                                                        </div>
                                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginLeft:'20px'}}>
                                                            <img src="../../../img/weike/onedrop/comment_num.png"/>
                                                            <p style={{color:'white',fontSize:'26px',marginLeft:'10px'}}>{content.comment_count ? content.comment_count : 0}</p>
                                                        </div>
                                                    </div>
                                                </div>
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
                            document.body.scrollTop=this.state.scrollTopNum;
                            this.setState({
                                isShowEverydayDrop:false
                            })
                        }}/>
                        : null
                }
                {
                    this.state.isShowLeadPage ?
                        <LeadPage callback={()=>{
                            document.body.scrollTop=0;
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