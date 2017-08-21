/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';
import Drop from './everyday/Drop';
import LeadPage from './everyday/LeadPage';
import async from 'async';
import Carousel from 'nuka-carousel';
import Tool from '../../Tool/Tool';

export default class LastDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            courses:[],
            isShowEverydayDrop:false,
            section_id:0,
            isShowLeadPage:false,
            scrollTopNum:0,
            page:1,
            isNoMoreCourse:false,
            isLoading:false,

        };
        this.getCourses = this.getCourses.bind(this);
        this.handleScroll1 = this.handleScroll1.bind(this);
    }

    getCourses(self,page){
        if(self.state.isLoading){
            return;
        }
        self.setState({
            isLoading:true
        })
        $.ajax({
            url:OneDrop.base_url+'/onedrop/sections',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID,
                page:page
            },
            success:(data)=>{
                // console.log('course:',data);
                if(data.status === 1){
                    var courses = data.data;
                    if(courses.length>0){
                        self.setState({
                            courses:self.state.courses.concat(courses),
                            page:self.state.page+1,
                            isLoading:false
                        })
                    }else{
                        self.setState({
                            isNoMoreCourse:true,
                            isLoading:false
                        })
                    }
                }else{
                    alert('数据库执行错误');
                }
            }
        })
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
        window.addEventListener('scroll', this.handleScroll1);

    }
    handleScroll1(event){
        if(Number(document.body.clientHeight-document.body.scrollTop)<=1335){
            if(this.state.isNoMoreCourse){
                return;
            }
            this.getCourses(this, this.state.page);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll1);
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
                            <Carousel  autoplay={true} autoplayInterval={3000} slideIndex={0}
                                      slidesToScroll='auto' wrapAround={true}
                            >
                                {
                                    [0,2,3,4].map((content,index)=>{
                                        if(content === 0){
                                            return  <img key={index} onClick={()=>{
                                                if(this.state.isLoading){
                                                    return;
                                                }
                                                window.removeEventListener('scroll', this.handleScroll1);
                                                this.setState({
                                                    isShowLeadPage:true
                                                })
                                            }} style={{
                                                width:OneDrop.JS_ScreenW,
                                                height:'360px'
                                            }} src={"../../../img/weike/home/home_banner.jpg"} />
                                        }
                                        else if(content === 2){
                                            return <img key={index} style={{width:OneDrop.JS_ScreenW,height:'360px'}} src="../../../img/weike/home/banner3.jpg"/>
                                        }
                                        else if(content === 3){
                                            return <img key={index} style={{width:OneDrop.JS_ScreenW,height:'360px'}} src="../../../img/weike/home/banner4.jpg"/>
                                        }
                                        else if(content === 4){
                                            return <img key={index} style={{width:OneDrop.JS_ScreenW,height:'360px'}} src="../../../img/weike/home/banner5.jpg"/>
                                        }
                                    })
                                }
                            </Carousel>

                            {
                                this.state.courses.map((content,index)=>{
                                    return(
                                        <div key={index} onClick={()=>{
                                            if(this.state.isLoading){
                                                return;
                                            }
                                            window.removeEventListener('scroll', this.handleScroll1);
                                            var audio = document.createElement('audio');
                                            audio.preload = 'auto';
                                            audio.src = content.section_voice;
                                            audio.id = 'che_dan_de_yin_pin'+content.section_id;
                                            OneDrop.AUDIO = audio;
                                            this.setState({
                                                isShowEverydayDrop:true,
                                                section_id:content.section_id,
                                                scrollTopNum:document.body.scrollTop
                                            })
                                        }} style={{
                                            marginTop:(index===0 || index===1 || index===2) ? '0' : '30px',
                                            backgroundColor:'white',
                                            width:'100%'
                                        }}>
                                            {
                                                (index===0 || index===1 || index===2) ?
                                                    <div style={{
                                                        display:'flex',alignItems:'center',justifyContent:'center',
                                                        backgroundImage:'url(../../../img/weike/onedrop/day.jpg)',
                                                        width:'100%',height:'80px'
                                                    }}>
                                                        <p style={{fontSize:'30px',color:'rgb(23,172,251)',letterSpacing:'8px'}}>{index===0 ? '今/日/一/滴' : index===1 ? '昨/日/一/滴' : '更/多/一/滴'}</p>
                                                    </div> : null
                                            }
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
                                                    <div style={{
                                                            width:'48px'
                                                        }}>
                                                        <img style={{
                                                            width:'48px',
                                                            height:'48px',
                                                            borderRadius:'24px',
                                                            marginTop:'8px'
                                                        }} src={OneDrop.res_ip+content.teacher_head}/>
                                                    </div>
                                                    <p style={{
                                                        fontSize:'40px',
                                                        color:'rgb(0,0,0)',
                                                        marginLeft:'20px',
                                                        display:'block'
                                                    }}>{Tool.prefixInteger(content.section_id,3)+' : '+content.section_name}</p>
                                                </div>
                                                <p style={{
                                                    marginTop:'28px',
                                                    fontSize:'30px',
                                                    color:'rgb(102,102,102)'
                                                }}>{content.section_intro}</p>
                                                <p style={{
                                                    fontSize:'22px',color:'rgb(131,131,131)',marginTop:'10px'
                                                }}>{content.label_des}</p>

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
                            window.addEventListener('scroll', this.handleScroll1);
                        }}/>
                        : null
                }
                {
                    this.state.isShowLeadPage ?
                        <LeadPage callback={()=>{
                            document.body.scrollTop=0;
                            this.setState({
                                isShowLeadPage:false,
                            });
                            window.addEventListener('scroll', this.handleScroll1);
                        }}/>
                        :
                        null
                }
                {
                    this.state.isLoading ?
                        <div style={{
                            position:'fixed',top:'0',left:'0',
                            width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,display:'flex',justifyContent:'center',alignItems:'center'
                        }}>
                            <img src="../../../img/weike/home/loading.gif"/>
                        </div>
                        : null
                }
            </div>
        )
    }
}