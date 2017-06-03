/**
 * Created by jiangsong on 2017/6/2.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
import DropAudio from '../../view/DropAudio';
import async from 'async';

export default class Drop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowConnectEach:false,
            course:null,
            comments:[],
            isAppreciateCourse:false,
            isAppreciateMine:false,
            isShowAppreciateMine:false
        }
    }

    componentDidMount() {
        var self = this;
        async.parallel([
            function (callback) {
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
            }
        ],function (err,results) {
            if(err){
                alert(err);
            }else{
                var course = results[0];
                var comments = results[1];
                self.setState({
                    course:course,
                    comments:comments
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

        const tabStyle = {
            width:OneDrop.JS_ScreenW/4,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }
        return(
            <div style={{
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
                        height:'320px'
                    }} src="../../../../img/weike/test/banner.jpg"/>
                    {
                        this.state.course ?
                            <div style={{
                        display:'flex',
                        flexDirection:'column',
                        width:'100%',
                        backgroundColor:'white'
                    }}>
                                <div style={{
                            paddingTop:'56px',
                            marginLeft:'24px',
                            marginRight:'24px'
                        }}>
                                    <p style={{
                                fontSize:'44px',
                                color:'rgb(0,0,0)'
                            }}>{this.state.course ? this.state.course.section_name : ''}</p>

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
                                        borderRadius:'40px'
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

                                    <div style={{
                                marginTop:'54px'
                            }}>
                                        <DropAudio audioUrl={this.state.course.section_voice}/>
                                    </div>

                                    <div style={{
                                marginTop:'72px',
                                marginBottom:'30px'
                            }}>
                                        {
                                            myArticle ? myArticle.text.map((chapter, index)=>{
                                                return (
                                                    <div key={index}>
                                                        <p style={{
                                                    fontSize:'28px',
                                                    marginTop:'30px',
                                                    marginBottom:'15px',
                                                    fontWeight:'bold'
                                                }}>{chapter.title}</p>
                                                        {
                                                            chapter.text.map((section,idx)=>{
                                                                return (
                                                                    <p style={{
                                                                fontSize:'26px',
                                                                textIndent:'48px'
                                                            }} key={idx}>{section}</p>
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
                        backgroundColor:'rgb(235,235,235)',
                        display:'flex',
                        flexDirection:'column',
                        paddingTop:'55px',
                        paddingLeft:'24px',
                        paddingRight:'24px'
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            width:'100%'
                        }}>
                            <p style={{
                                fontSize:'28px',
                                color:'rgb(102,102,102)'
                            }}>---------------------精选交手录---------------------</p>
                        </div>

                        <div style={{
                            marginTop:'35px'
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

                    <div style={{
                        backgroundColor:'white',
                        height:'110px',
                        display:'flex',
                        flexDirection:'row',
                        width:'100%',
                        justifyContent:'space-between'
                    }}>
                        <div onClick={()=>{
                            self.props.callback();
                        }} style={{
                            ...tabStyle
                        }}>
                            <img src="../../../../img/weike/onedrop/back.png"/>
                        </div>
                        <div onClick={()=>{
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
                            if(this.state.isAppreciateCourse){return;}
                            if(this.state.course){
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
                                            isAppreciateCourse:true
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
                            <div>
                                <img src={this.state.isAppreciateCourse ? "../../../../img/weike/onedrop/appreciate_course_selected.png":"../../../../img/weike/onedrop/appreciate_course.png"}/>
                            </div>
                        </div>
                        <div onClick={()=>{
                            if(this.state.isAppreciateMine){return;}
                            if(this.state.isShowConnectEach){return;}
                            this.setState({
                                isShowAppreciateMine:true
                            })
                        }} style={{
                            ...tabStyle
                        }}>
                            <img src={this.state.isAppreciateMine ? "../../../../img/weike/onedrop/appreciate_me_selected.png" : "../../../../img/weike/onedrop/appreciate_me.png"}/>
                        </div>
                    </div>
                </div>
                {
                    this.state.isShowConnectEach ?
                        <div style={{
                            position:'fixed',
                            left:'0',
                            top:'0',
                            width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,
                            backgroundColor:'white'
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-between',
                                paddingTop:'20px',
                                paddingLeft:'24px',
                                paddingRight:'24px'
                            }}>
                                <div onClick={()=>{
                                    this.setState({
                                        isShowConnectEach:false
                                    })
                                }} style={{
                                    width:'120px',
                                    height:'70px',
                                    backgroundColor:'rgb(153,153,153)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:'10px'
                                }}>
                                    <p style={{fontSize:'26px',color:'white'}}>取消</p>
                                </div>
                                <div onClick={()=>{
                                    //提交评论
                                    var comment = $('#every_day_drop_comment').val().trim();
                                    if(comment){
                                        if(this.state.course){
                                            var section_id = self.props.sectionId;
                                            $.ajax({
                                                url:OneDrop.base_ip+'/main/section/comment',
                                                dataType:'json',
                                                method:'POST',
                                                data:{
                                                    user_id:REMOTE_WEIXIN_USER_ID,
                                                    section_id:section_id,
                                                    comment:comment
                                                },
                                                success:(data)=>{
                                                    if(data.status===1){
                                                        $('#every_day_drop_comment').val('');
                                                        self.setState({
                                                            isShowConnectEach:false
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
                                    width:'120px',
                                    height:'70px',
                                    backgroundColor:'rgb(28,166,148)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:'10px'
                                }}>
                                    <p style={{fontSize:'26px',color:'white'}}>提交</p>
                                </div>
                            </div>
                            <textarea id="every_day_drop_comment" style={{
                                width:(OneDrop.JS_ScreenW-100) +'px',
                                fontSize:'24px',
                                color:'rgb(153,153,153)',
                                padding:'15px',
                                height:'500px',
                                marginLeft:'25px',
                                marginRight:'25px',
                                marginTop:'50px',
                                borderWidth:'2px',
                                borderColor:'rgb(235,235,235)'
                            }} placeholder="留言将经过筛选后显示，对所有用户可见"/>
                        </div>
                        : null
                }
                {
                    this.state.isShowAppreciateMine ?
                        <div style={{
                            position:'fixed',
                            left:'15%',
                            bottom:'300px',
                            width:'70%',
                            height:'400px',
                            backgroundColor:'rgb(235,235,235)',
                            display:'flex',
                            flexDirection:'column'
                        }}>
                            <p style={{fontSize:'28px',paddingTop:'15px',paddingLeft:'15px',paddingRight:'15px'}}>学了这个课程,你觉得自己的领导力长高了几米呢?</p>
                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                width:'100%',
                                alignItems:'center'
                            }}>
                                {
                                    ['1米','2米','3米','4米','5米'].map((content,index)=>{
                                        return <p key={index} onClick={()=>{
                                        var appreciate_value = index+1;
                                        if(this.state.course){

                                        }else{return;}
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
                                                        isAppreciateMine:true
                                                    })
                                                }
                                            }
                                        })
                                    }} style={{
                                        marginLeft:'40px',
                                        fontSize:'28px',
                                        lineHeight:'50px'
                                    }} key={index}>{content}</p>
                                    })
                                }
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}