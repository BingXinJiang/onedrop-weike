/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';
import Drop from './everyday/Drop';
import LeadPage from './everyday/LeadPage';
import async from 'async';
import ListDrop from './everyday/ListDrop';

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
            isLoading:false
        };
        this.getCourses = this.getCourses.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
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


    render(){
        return (
            <div>
                {
                    !this.state.isShowLeadPage&&!this.state.isShowEverydayDrop&&!this.state.isShowLeadPage ?
                         <ListDrop/>
                        : null
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
                                isShowLeadPage:false,
                            });
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