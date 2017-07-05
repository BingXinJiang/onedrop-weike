/**
 * Created by jiangsong on 2017/6/2.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
import DropAudio from '../../view/DropAudio';
import async from 'async';

const courseSpeaks = ['有点差','一般','良好','超赞','棒极了'];
const mineSpeaks = ['一级','二级','三级','四级','五级'];

import {TextArea} from 'react-weui'

export default class Drop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowConnectEach:false,
            course:null,
            comments:[],
            isAppreciateCourse:false,
            isAppreciateMine:false,
            isShowAppreciateMine:false,
            appreciate_course_num:0,
            isLoading:false,

            isShowAppreciateBefore:true,//appreciate_status
            courseNum:0,//course_num
            mineNum:0,//mine_num

            chooseCourseNum:0,
            chooseMineNum:0,

            commitBtnStatus:false
        };
        this.chooseHight = (section)=>{
            var htext = section.htext[0];
            var texts = section.text.split(htext);
            return <p style={{
                fontSize:'32px',
                lineHeight:'70px',
                color:'rgb(51,51,51)'
            }}>
                {
                    texts.map((txt,idx)=>{

                        return  <span key={idx}>
                            <span>{txt}</span>
                            {
                                idx === 0 ? <span key={idx} style={{color:'rgb(117,193,241)',fontWeight:'bold'}}>{htext}</span>
                                    : null
                            }
                        </span>

                    })
                }
            </p>

        }
    }

    componentDidMount() {
        document.body.scrollTop=0;
        var self = this;
        async.parallel([
            function (callback) {
                self.setState({
                    isLoading:true
                })
                $.ajax({
                    url:OneDrop.base_url+'/onedrop/every_day',
                    dataType:'json',
                    method:'POST',
                    data:{
                        user_id:REMOTE_WEIXIN_USER_ID,
                        section_id:self.props.sectionId
                    },
                    success:(data)=>{
                        if(data.status===1){
                            callback(null, data.data);
                        }else{
                            callback('请求课程内容失败!');
                        }
                    }
                })
            },
            function (callback) {
                self.setState({
                    isLoading:true
                })
                $.ajax({
                    url:OneDrop.base_ip+'/main/section/get_comment',
                    dataType:'json',
                    method:'POST',
                    data:{
                        section_id:self.props.sectionId
                    },
                    success:(data)=>{
                        if(data.status===1){
                            callback(null, data.data);
                        }else{
                            callback('请求评论内容失败!');
                        }
                    }
                })
            },
            function (callback) {
                self.setState({
                    isLoading:true
                })
                $.ajax({
                    url:OneDrop.base_url+'/appreciate/course',
                    dataType:'json',
                    method:'POST',
                    data:{
                        user_id:REMOTE_WEIXIN_USER_ID,
                        section_id:self.props.sectionId
                    },
                    success:(data)=>{
                        if(data.status===1){
                            callback(null, data.data);
                        }else{
                            callback('请求点赞状态失败!');
                        }
                    }
                })
            }
        ],function (err,results) {
            if(err){
                alert(err);
                self.setState({
                    isLoading:false
                })
            }else{
                var course = results[0];
                var comments = results[1];
                var state = results[2];
                self.setState({
                    course:course,
                    comments:comments,
                    appreciate_course_num:course.appreciate_course_num,
                    isLoading:false,

                    isShowAppreciateBefore:state.appreciate_status ? false : true,
                    courseNum:state.course_num,
                    mineNum:state.mine_num
                })
            }
        })
    }

    render(){
        var self = this;
        var myArticle = null;
        if(this.state.course){
            myArticle = JSON.parse(this.state.course.section_des);
        }
        const appreciate_num_color = this.state.isAppreciateCourse ? 'rgb(220,92,34)' : 'rgb(121,122,123)';
        const tabStyle = {
            width:OneDrop.JS_ScreenW/4,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }
        return(
            <div onTouchStart={(e)=>{
                $('#every_day_drop_comment').blur();
            }} style={{
                position:'absolute',
                width:OneDrop.JS_ScreenW,
                height:OneDrop.JS_ScreenH*2,
                left:'0px',
                top:'0px',
                backgroundColor:'white',
                zIndex:'9999'
            }}>
                <div style={{
                }}>
                    <img style={{
                        width:OneDrop.JS_ScreenW,
                        height:'360px'
                    }} src={this.state.course ? OneDrop.res_ip+this.state.course.section_detail_img : '../../../../img/weike/onedrop/zhanwei.jpg'}/>
                    {
                        this.state.course ?
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                width:'100%',
                                backgroundColor:'white'
                            }}>
                                <div style={{
                                    paddingTop:'89px',
                                    marginLeft:'24px',
                                    marginRight:'24px'
                                }}>
                                    <p style={{
                                        fontSize:'44px',
                                        color:'rgb(0,0,0)'
                                    }}>{this.state.course ? this.state.course.section_name : ''}</p>

                                    <p style={{
                                        fontSize:'26px',color:'rgb(51,51,51)'
                                    }}>#标签：  {this.state.course ? this.state.course.label_des : ''}</p>

                                    <div style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        marginTop:'34px',
                                        justifyContent:'space-between'
                                    }}>
                                        <div style={{
                                            display:'flex',
                                            flexDirection:'row'
                                        }}>
                                            <div style={{
                                                width:'80px',
                                                height:'80px',
                                                borderRadius:'40px',
                                                overflow:'hidden'
                                            }}>
                                                <img style={{
                                                    width:'80px'
                                                }} src={OneDrop.res_ip+this.state.course.teacher_head}/>
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                flexDirection:'column',
                                                marginLeft:'16px'
                                            }}>
                                                <p style={{
                                                    fontSize:'28px'
                                                }}>{this.state.course.teacher_name}</p>
                                                <p style={{
                                                    fontSize:'28px'
                                                }}>{this.state.course.teacher_position}</p>
                                            </div>
                                        </div>
                                        <p style={{
                                            fontSize:'24px',
                                            color:'rgb(153,153,153)',
                                            marginTop:'40px'
                                        }}>{this.state.course.year}年{this.state.course.month}月{this.state.course.day}日</p>
                                    </div>

                                    <div style={{width:(OneDrop.JS_ScreenW-48)+'px',height:'1px',backgroundColor:'rgb(153,153,153)',marginTop:'41px'}}/>

                                    <div style={{
                                        marginTop:'95px'
                                    }}>
                                        <DropAudio sectionName={this.state.course.section_name} sectionId={this.props.sectionId}/>
                                    </div>

                                    <div style={{
                                        marginTop:'92px',
                                        marginBottom:'30px'
                                    }}>
                                        {
                                            myArticle ? myArticle.text.map((chapter, index)=>{
                                                return (
                                                    <div key={index}>
                                                        {
                                                            chapter.title ?
                                                                <p style={{
                                                                    fontSize:'36px',
                                                                    marginTop:'70px',
                                                                    marginBottom:'15px',
                                                                    fontWeight:'bold'
                                                                }}>{chapter.title}</p>
                                                                :
                                                                <p style={{
                                                                    fontSize:'36px',
                                                                    marginTop:'50px',
                                                                    marginBottom:'15px',
                                                                    fontWeight:'bold'
                                                                }}>{chapter.title}</p>
                                                        }
                                                        {
                                                            chapter.text.map((section,idx)=>{
                                                                if(index === 0 && idx === 0){
                                                                    return(
                                                                        <p style={{
                                                                            fontSize:'32px',
                                                                            lineHeight:'70px',
                                                                            color:'rgb(23,172,251)',
                                                                            fontWeight:'bold'
                                                                        }} key={idx}>{section.text}</p>
                                                                    )
                                                                }
                                                                return (
                                                                    <div>
                                                                        {
                                                                            myArticle.image.map((img,indx)=>{
                                                                                if(index==img.part && idx==img.section){
                                                                                    return (
                                                                                        <div key={indx} style={{
                                                                                            display:'flex',
                                                                                            width:'100%',
                                                                                            justifyContent:'center',
                                                                                            alignItems:'center',
                                                                                            marginTop:'28px',
                                                                                            marginBottom:'40px',
                                                                                            backgroundColor:'orange'
                                                                                        }}>
                                                                                            <img style={{
                                                                                                width:'100%',
                                                                                                height:'360px'
                                                                                            }} src={OneDrop.res_ip+img.url}/>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                        {
                                                                            section.htext.length>0 ? this.chooseHight(section) :
                                                                                <p style={{
                                                                                    fontSize:'32px',
                                                                                    lineHeight:'70px',
                                                                                    color:'rgb(51,51,51)'
                                                                                }} key={idx}>{section.text}</p>
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }) : null
                                        }
                                    </div>


                                </div>
                            </div>
                            : null
                    }

                    <div style={{
                        width:'100%'
                    }}>
                        <div style={{width:'100%',height:'30px',backgroundColor:'rgb(222,232,240)'}}/>
                        <div>
                            {
                                this.state.isShowAppreciateBefore ?
                                    <div style={{
                                        width:'100%',display:'flex',flexDirection:'column',backgroundColor:'white',alignItems:'center'
                                    }}>
                                        <p style={{marginTop:'80px',fontSize:'30px',color:'rgb(51,51,51)'}}>本则一滴如何,动动手指,为老师献花!</p>
                                        <div style={{display:'flex',flexDirection:'row',marginTop:'38px'}}>
                                            {
                                                ['','','','',''].map((con,idx)=>{
                                                    if(idx+1>this.state.chooseCourseNum){
                                                        return(
                                                            <img style={{marginLeft:'30px'}} onClick={()=>{
                                                                this.setState({
                                                                    chooseCourseNum:idx+1
                                                                })
                                                            }} key={idx} src="../../../../img/weike/detail/course_num.png"/>
                                                        )
                                                    }else{
                                                        return(
                                                            <img style={{marginLeft:'30px'}} onClick={()=>{
                                                                this.setState({
                                                                    chooseCourseNum:idx+1
                                                                })
                                                            }} key={idx} src="../../../../img/weike/detail/course_num_d.png"/>
                                                        )
                                                    }
                                                })
                                            }
                                            {
                                                this.state.chooseCourseNum !== 0 ?
                                                    <p style={{
                                                        marginLeft:'30px',fontSize:'26px',color:'rgb(51,51,51)'
                                                    }}>{courseSpeaks[this.state.chooseCourseNum-1]}</p> : null
                                            }
                                        </div>
                                        <p style={{marginTop:'62px',fontSize:'30px',color:'rgb(51,51,51)'}}>学完本则一滴,领导力有没有提升呢?</p>
                                        <p style={{fontSize:'30px',color:'rgb(51,51,51)'}}>动动手指,提升领导力!</p>
                                        <div style={{display:'flex',flexDirection:'row',marginTop:'38px'}}>
                                            {
                                                ['','','','',''].map((con,idx)=>{
                                                    if(idx+1>this.state.chooseMineNum){
                                                        return(
                                                            <img style={{marginLeft:'30px'}} onClick={()=>{
                                                                this.setState({
                                                                    chooseMineNum:idx+1
                                                                })
                                                            }} key={idx} src="../../../../img/weike/detail/user_num.png"/>
                                                        )
                                                    }else{
                                                        return(
                                                            <img style={{marginLeft:'30px'}} onClick={()=>{
                                                                this.setState({
                                                                    chooseMineNum:idx+1
                                                                })
                                                            }} key={idx} src="../../../../img/weike/detail/user_num_d.png"/>
                                                        )
                                                    }
                                                })
                                            }
                                            {
                                                this.state.chooseMineNum !== 0 ?
                                                    <p style={{
                                                        marginLeft:'30px',fontSize:'26px',color:'rgb(51,51,51)'
                                                    }}>{mineSpeaks[this.state.chooseMineNum-1]}</p> : null
                                            }
                                        </div>
                                        <div onClick={()=>{
                                            if(this.state.isLoading){
                                                return;
                                            }
                                            this.setState({
                                                isLoading:true
                                            })
                                            $.ajax({
                                                url:OneDrop.base_url+'/appreciate/mycourse',
                                                dataType:'json',
                                                method:'POST',
                                                data:{
                                                    user_id:REMOTE_WEIXIN_USER_ID,
                                                    section_id:this.props.sectionId,
                                                    course_num:this.state.chooseCourseNum,
                                                    mine_num:this.state.chooseMineNum
                                                },
                                                success:(data)=>{
                                                    if(data.status === 1){
                                                        this.setState({
                                                            isShowAppreciateBefore:false,
                                                            courseNum:this.state.courseNum+this.state.chooseCourseNum,
                                                            mineNum:this.state.chooseMineNum,
                                                            isLoading:false
                                                        })
                                                    }else{
                                                       this.setState({
                                                            isLoading:false
                                                        })
                                                    }
                                                }
                                            })
                                        }} style={{
                                            width:'251px',height:'80px',backgroundColor:'rgb(23,172,251)',borderRadius:'10px',
                                            display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'80px',marginTop:'62px'
                                        }}>
                                            <p style={{fontSize:'30px',color:'white'}}>提交</p>
                                        </div>
                                    </div>
                                    :
                                    <div style={{width:'100%',backgroundColor:'white'}}>
                                        <div style={{
                                            width:OneDrop.JS_ScreenW-48+'px',display:'flex',flexDirection:'column',alignItems:'center',
                                            borderColor:'rgb(153,153,153)',borderWidth:'2px',borderStyle:'solid',marginLeft:'24px',marginTop: '40px',
                                            marginBottom:'40px'
                                        }}>
                                            <p style={{marginTop:'40px',fontSize:'30px',color:'rgb(51,51,51)'}}>
                                                本则一滴老师共获得献花<span style={{fontSize:'48px',color:'rgb(238,33,33)',marginLeft:'5px'}}>{this.state.courseNum}</span><span>
                                                <img style={{marginLeft:'5px',marginRight:'5px'}} src="../../../../img/weike/detail/course_num_d.png"/>
                                            </span></p>
                                            <p style={{marginBottom:'40px',marginTop:'24px',fontSize:'30px',color:'rgb(51,51,51)'}}>
                                                学了本则一滴我的领导力得到<span style={{fontSize:'48px',color:'rgb(23,172,251)',marginLeft:'5px'}}>{this.state.mineNum}</span><span>
                                                <img style={{marginLeft:'5px',marginRight:'5px'}} src="../../../../img/weike/detail/user_num_d.png"/>
                                            </span>成长</p>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>

                    <div style={{
                        backgroundColor:'rgb(222,232,240)',
                        display:'flex',
                        flexDirection:'column',
                        paddingTop:'55px',
                        paddingLeft:'24px',
                        paddingRight:'24px'
                    }}>
                        <div style={{
                            display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',
                            width:'100%'
                        }}>
                            <img style={{width:(OneDrop.JS_ScreenW-200)/2}} src="../../../../img/weike/onedrop/fengexian1.png"/>
                            <p style={{
                                fontSize:'28px',color:'rgb(102,102,102)',marginLeft:'10px',marginRight:'10px',
                                width:'200px',textAlign:'center'
                            }}>精选交手录</p>
                            <img style={{width:(OneDrop.JS_ScreenW-250)/2}} src="../../../../img/weike/onedrop/fengexian2.png"/>
                        </div>

                        <div style={{
                            marginTop:'35px',
                            marginBottom:'110px'
                        }}>
                            {
                                this.state.comments.map((content,index)=>{
                                    return (
                                        <div key={index} style={{
                                            display:'flex',
                                            flexDirection:'row',
                                            marginBottom:'64px'

                                        }}>
                                            <div>
                                                <img style={{
                                                    width:'82px',
                                                    height:'82px',
                                                    borderRadius:'41px'
                                                }} src={content.headimgurl}/>
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                flexDirection:'column',
                                                marginLeft:'18px'
                                            }}>
                                                <p style={{
                                                    fontSize:'28px',
                                                    color:'rgb(102,102,102)'
                                                }}>{content.nickname}</p>
                                                <p style={{
                                                    fontSize:'20px',
                                                    color:'rgb(102,102,102)'
                                                }}>{content.year}年{content.month}月{content.day}日 {content.hour}:{content.minute}:{content.second}:</p>
                                                <p style={{
                                                    fontSize:'28px',
                                                    color:'rgb(51,51,51)',
                                                    marginTop:'10px'
                                                }}>{content.comment}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div id="every_day_drop_comment_container" style={{
                            position:'fixed',width:OneDrop.JS_ScreenW+'px',height:'110px',backgroundColor:'white',left:'0',bottom:'0',
                            display:'flex',alignItems:'center',flexDirection:'column'
                        }}>
                        <div style={{width:'100%',height:'1px',backgroundColor:'rgb(134,134,134)'}}/>
                        <div style={{
                            display:'flex',marginTop:'20px',marginLeft:'24px',marginRight:'24px',alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <img onClick={(e)=>{
                                if(this.state.isLoading){
                                    return;
                                }
                                this.props.callback();
                            }} src="../../../img/weike/main/back.png"/>
                        <textarea id="every_day_drop_comment" onChange={(event)=>{
                            if(event.target.value){
                                this.setState({
                                    commitBtnStatus:true
                                })
                            }else{
                                this.setState({
                                    commitBtnStatus:false
                                })
                            }
                        }} placeholder="与大家交交手吧！" contentEditable={true} style={{
                            height:'55px',fontSize:'32px',width:OneDrop.JS_ScreenW*0.62,outline:'none',
                            borderBottomWidth:'2px',borderBottomColor:'rgb(23,172,251)',paddingLeft:'10px',
                            borderStyle:'solid',marginLeft:'16px',marginRight:'16px',borderLeftWidth:'0',borderTopWidth:'0',
                            borderRightWidth:'0',paddingTop:'25px'
                        }}/>

                            <p onClick={()=>{
                            if(this.state.isLoading || !this.state.commitBtnStatus){
                                        return;
                                    }
                                    //提交评论
                                    var comment = $('#every_day_drop_comment').val().trim();
                                    if(comment){
                                        if(this.state.course){
                                            // var section_id = self.state.nowSectionId;
                                            this.setState({
                                                isLoading:true
                                            })
                                            $.ajax({
                                                url:OneDrop.base_ip+'/main/section/comment',
                                                dataType:'json',
                                                method:'POST',
                                                data:{
                                                    user_id:REMOTE_WEIXIN_USER_ID,
                                                    section_id:self.props.sectionId,
                                                    comment:comment
                                                },
                                                success:(data)=>{
                                                    if(data.status===1){
                                                        $('#every_day_drop_comment').val('');
                                                        self.setState({
                                                            isShowConnectEach:false,
                                                            isLoading:false,
                                                            commitBtnStatus:false
                                                        })
                                                    }else{
                                                        alert('交手失败!');
                                                    }
                                                }
                                            })
                                        }
                                    }else{
                                        alert('请先输入内容,再提交!');
                                    }
                        }} style={{
                            display:'flex',justifyContent:'center',alignItems:'center',width:'120px',height:'80px',
                            fontSize:'30px',borderColor:'rgb(235,235,235)',borderRadius:'5px',borderWidth:'2px',
                            backgroundColor:this.state.commitBtnStatus ? 'rgb(23,172,251)':'rgb(235,235,235)',marginLeft:'5px',borderStyle:'solid'
                        }}>
                                交手
                            </p>
                        </div>
                    </div>

                    {/*
                        true ? null :
                            <div style={{
                                position:'fixed',
                                left:'0',
                                bottom:'0',
                                backgroundColor:'white',
                                height:'110px',
                                display:'flex',
                                flexDirection:'row',
                                width:'100%',
                                justifyContent:'space-between'
                            }}>
                                <div onClick={()=>{
                                        if(this.state.isLoading){
                                            return;
                                        }
                                self.props.callback();
                                }} style={{
                                    ...tabStyle
                                }}>
                                    <img src="../../../../img/weike/onedrop/back.png"/>
                                </div>
                                <div onClick={()=>{
                                    if(this.state.isLoading){
                                        return;
                                    }
                                    if(this.state.isShowAppreciateMine){
                                        return;
                                    }
                                    this.setState({
                                        isShowConnectEach:true
                                    })
                                }} style={{
                                    ...tabStyle
                                }}>
                                    <img src="../../../../img/weike/onedrop/connect.png"/>
                                </div>
                                <div onClick={()=>{
                                    if(this.state.isLoading){
                                        return;
                                    }
                                    if(this.state.isAppreciateCourse){return;}
                                    if(this.state.course){
                                        this.setState({
                                            isLoading:true
                                        })
                                    $.ajax({
                                    url:OneDrop.base_url+'/onedrop/appreciate/course',
                                    dataType:'json',
                                    method:'POST',
                                    data:{
                                        user_id:REMOTE_WEIXIN_USER_ID,
                                        section_id:self.props.sectionId
                                    },
                                    success:(data)=>{
                                        if(data.status === 1){
                                            self.setState({
                                                isAppreciateCourse:true,
                                                appreciate_course_num:this.state.appreciate_course_num+1,
                                                isLoading:false
                                            })
                                        }else{
                                            alert('点赞失败!');
                                        }
                                    }
                                })
                            }
                        }} style={{
                            ...tabStyle
                        }}>
                                    <div style={{position:'relative'}}>
                                        <img src={this.state.isAppreciateCourse ? "../../../../img/weike/onedrop/appreciate_course_selected.png":"../../../../img/weike/onedrop/appreciate_course.png"}/>

                                        <p style={{position:'absolute',left:'38px',top:'0px',
                                    fontSize:'28px',color:appreciate_num_color,lineHeight:'30px'
                                    }}>{this.state.appreciate_course_num}</p>

                                    </div>
                                </div>
                                <div onClick={()=>{
                            if(this.state.isLoading){
                                return;
                            }
                            if(this.state.isAppreciateMine){return;}
                            if(this.state.isShowConnectEach){return;}
                            this.setState({
                                isShowAppreciateMine:true,

                            })
                        }} style={{
                            ...tabStyle
                        }}>
                                    <img src={this.state.isAppreciateMine ? "../../../../img/weike/onedrop/appreciate_me_selected.png" : "../../../../img/weike/onedrop/appreciate_me.png"}/>
                                </div>
                            </div>
                    */}
                </div>

                {/*
                    this.state.isShowConnectEach && false ?
                        <div style={{
                            position:'fixed',
                            left:'0',
                            top:'0',
                            width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,
                            backgroundColor:'rgb(235,235,235)'
                        }}>
                            <div style={{paddingLeft:'24px',paddingRight:'24px',marginTop:'56px'}}>
                                <p style={{fontSize:'44px'}}>{this.state.course ? this.state.course.section_name : ''}</p>
                            </div>
                            <textarea id="every_day_drop_comment" style={{
                                width:(OneDrop.JS_ScreenW-100) +'px',
                                fontSize:'24px',
                                color:'rgb(153,153,153)',
                                padding:'15px',
                                height:'400px',
                                marginLeft:'25px',
                                marginRight:'25px',
                                borderWidth:'2px',
                                borderColor:'white',
                                marginTop:'56px'
                            }} placeholder="留言将经过筛选后显示，对所有用户可见"/>
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                marginTop:'38px',
                                paddingLeft:'24px',
                                paddingRight:'24px'
                            }}>
                                <div onClick={()=>{
                                    if(this.state.isLoading){
                                        return;
                                    }
                                    //提交评论
                                    var comment = $('#every_day_drop_comment').val().trim();
                                    if(comment){
                                        if(this.state.course){
                                            // var section_id = self.state.nowSectionId;
                                            this.setState({
                                                isLoading:true
                                            })
                                            $.ajax({
                                                url:OneDrop.base_ip+'/main/section/comment',
                                                dataType:'json',
                                                method:'POST',
                                                data:{
                                                    user_id:REMOTE_WEIXIN_USER_ID,
                                                    section_id:self.props.sectionId,
                                                    comment:comment
                                                },
                                                success:(data)=>{
                                                    if(data.status===1){
                                                        $('#every_day_drop_comment').val('');
                                                        self.setState({
                                                            isShowConnectEach:false,
                                                            isLoading:false
                                                        })
                                                    }else{
                                                        alert('评论失败!');
                                                    }
                                                }
                                            })
                                        }
                                    }else{
                                        alert('请先输入评论,再提交您的评论!');
                                    }
                                }} style={{
                                    width:'100%',
                                    height:'70px',
                                    backgroundColor:'rgb(23,172,251)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:'10px',
                                    marginTop:'38px'
                                }}>
                                    <p style={{fontSize:'30px',color:'white'}}>提交</p>
                                </div>
                                <div onClick={()=>{
                                    if(this.state.isLoading){
                                        return;
                                    }
                                    this.setState({
                                        isShowConnectEach:false
                                    })
                                }} style={{
                                    width:'100%',
                                    height:'70px',
                                    backgroundColor:'rgb(208,207,207)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:'10px',
                                    marginTop: '38px'
                                }}>
                                    <p style={{fontSize:'30px',color:'white'}}>取消</p>
                                </div>
                            </div>

                        </div>
                        : null
                */}
                {/*
                    this.state.isShowAppreciateMine && false ?
                        <div style={{
                            position:'fixed',
                            left:'15%',
                            bottom:'300px',
                            width:'70%',
                            height:'450px',
                            display:'flex',
                            flexDirection:'column',
                            backgroundImage:'url(../../../../img/weike/onedrop/appreciate_me_bg.png)',
                            backgroundSize:'100% 100%'
                        }}>
                            <p style={{fontSize:'28px',color:'white',paddingTop:'15px',paddingLeft:'15px',paddingRight:'15px'}}>学了这个课程,你觉得自己的领导力长高了几米呢?</p>
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                width:'100%',
                                alignItems:'center'
                            }}>
                                {
                                    ['1米','2米','3米','4米','5米'].map((content,index)=>{
                                        return <p key={index} onClick={()=>{
                                            if(this.state.isLoading){
                                                return;
                                            }
                                            var appreciate_value = index+1;
                                            if(this.state.course){

                                            }else{return;}
                                            this.setState({
                                                isLoading:true
                                            })
                                            $.ajax({
                                                url:OneDrop.base_url+'/onedrop/appreciate/mine',
                                                dataType:'json',
                                                method:'POST',
                                                data:{
                                                    user_id:REMOTE_WEIXIN_USER_ID,
                                                    section_id:self.props.sectionId,
                                                    appreciate_value:appreciate_value
                                                },
                                                success:(data)=>{
                                                    if(data.status===1){
                                                        self.setState({
                                                            isShowAppreciateMine:false,
                                                            isAppreciateMine:true,
                                                            isLoading:false
                                                        })
                                                    }
                                                }
                                            })
                                        }} style={{
                                            fontSize:'30px',
                                            lineHeight:'63px',
                                            color:'white'
                                        }} >{content}</p>
                                    })
                                }
                            </div>
                        </div>
                        :
                        null
                */}
                {
                    this.state.isLoading ?
                        <div style={{
                            position:'fixed',top:'0',left:'0',
                            width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,display:'flex',justifyContent:'center',alignItems:'center'
                        }}>
                            <img src="../../../../img/weike/home/loading.gif"/>
                        </div>
                        : null
                }
            </div>
        )
    }
}