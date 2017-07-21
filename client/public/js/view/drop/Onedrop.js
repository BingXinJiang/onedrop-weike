/**
 * Created by jiangsong on 2017/5/9.
 */

//未被使用

import React from 'React';
require ('weui');
require('react-weui/lib/react-weui.min.css');
import {
    Article,
    CellsTitle,
    Cells,
    Cell,
    CellBody,
    CellFooter
} from 'react-weui';
import OneDrop from '../../const/onedrop';
import async from 'async';
import LearnDetail from '../main/learn_detail';

export default class Onedrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active:null,
            courses:[],
            showDetail:false,
            course_id:0,
            section_id:0
        }
    }

    componentDidMount(){
        var self = this;
        //调用两个接口: 1、/onedrop/active
        //            2、/onedrop/section  参数:user_id
        async.parallel([
            //请求banner信息,接口1
            (callback)=>{
                $.ajax({
                    url:OneDrop.base_url+'/onedrop/active',
                    dataType:'json',
                    method:'GET',
                    success:function(data) {
                        if(data){
                            if(data.status === 1){
                                callback(null, data.data);
                            }
                        }
                    }
                })
            },
            //请求一滴课程信息,接口2
            (callback)=>{
                $.ajax({
                    url:OneDrop.base_url+'/onedrop/section',
                    dataType:'json',
                    method:'POST',
                    data:{
                        user_id:REMOTE_WEIXIN_USER_ID
                    },
                    success:function(data) {
                        if(data){
                            if(data.status === 1){
                                callback(null, data.data);
                            }
                        }
                    }
                })
            }
        ], (err, results)=>{
            if(err){
                alert('网络错误');
            }else{
                // console.log('results:', results);
                var active = results[0];
                var courses = results[1];
                self.setState({
                    active:active,
                    courses:courses
                })
            }
        })
    }

    render(){
        var bannerSrc = '../../../img/weike/onedrop/zhanwei.jpg';
        if(this.state.active){
            bannerSrc = OneDrop.res_ip + this.state.active.bg_img;
        }
        // console.log(this.state.courses);
        return (
            <div>
                {
                    !this.state.showDetail ?
                        <div style={{backgroundColor:'rgb(235, 235, 235)', paddingBottom:'140px'}}>
                            <div>
                                <img style={{width:OneDrop.JS_ScreenW, height:'400px'}} src={bannerSrc}/>
                            </div>
                            {
                                this.state.courses.map((content, index)=>{
                                    return (
                                        <div key={index} style={{
                                            marginTop:'20px'
                                        }}>
                                            <div style={{
                                                width:OneDrop.JS_ScreenW,
                                                height:'90px',
                                                backgroundColor:'white'
                                            }}>
                                                <div style={{float:'left', marginTop:'30px'}}>
                                                    <div style={{display:'block',
                                                        backgroundColor:'rgb(27,138,229)',
                                                        width:'10px',
                                                        height:'30px',
                                                        float:'left'
                                                    }}/>
                                                    <p style={{float:'left', fontSize:'24px',
                                                        marginLeft:'20px'
                                                    }}>{content[0].calender_time}</p>
                                                </div>
                                            </div>
                                            <Cells style={{
                                                marginTop:'5px'
                                            }}>
                                                {
                                                    content.map((content, index)=>{
                                                        return (
                                                            <Cell key={index}>
                                                                <div style={{
                                                                    marginRight:'30px'
                                                                }}>
                                                                    <img src="../../../img/weike/onedrop/audio_3.png"/>
                                                                </div>
                                                                <div onClick={()=>{
                                                                    this.setState({
                                                                        course_id:content.course_id,
                                                                        section_id:content.section_id,
                                                                        showDetail:true
                                                                    })
                                                                }}>
                                                                    <p style={{
                                                                        fontSize:'32px'
                                                                    }}>{content.section_name}</p>
                                                                    <p style={{
                                                                        fontSize:'22px'
                                                                    }}>{content.course_author}</p>
                                                                    <p style={{
                                                                        fontSize:'24px',
                                                                        height:'100px',
                                                                        overflow:'hidden'
                                                                    }}>
                                                                        {content.section_des}
                                                                    </p>
                                                                </div>
                                                            </Cell>
                                                        )
                                                    })
                                                }
                                            </Cells>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <LearnDetail userId={REMOTE_WEIXIN_USER_ID}
                                     courseId={this.state.course_id}
                                     courseSectionId={this.state.section_id}
                                     callback={()=>{
                                         this.setState({
                                             showDetail:false
                                         })
                                     }}
                        />
                }
            </div>
        )
    }
}