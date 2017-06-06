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
            isShowAppreciateMine:false,
            appreciate_course_num:0
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
                                idx === 0 ? <span key={idx} style={{color:'rgb(117,193,241)'}}>{htext}</span>
                                    : null
                            }
                        </span>

                    })
                }
            </p>

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
                    comments:comments,
                    appreciate_course_num:course.appreciate_course_num
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
                                                                            color:'rgb(23,172,251)'
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
                                            isAppreciateCourse:true,
                                            appreciate_course_num:this.state.appreciate_course_num+1
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
                </div>

                {
                    this.state.isShowConnectEach ?
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
                                height:'500px',
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
                                    //提交评论
                                    var comment = $('#every_day_drop_comment').val().trim();
                                    if(comment){
                                        if(this.state.course){
                                            // var section_id = self.state.nowSectionId;
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
                                    width:'100%',
                                    height:'70px',
                                    backgroundColor:'rgb(28,166,148)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:'10px',
                                    marginTop:'38px'
                                }}>
                                    <p style={{fontSize:'26px',color:'white'}}>提交</p>
                                </div>
                                <div onClick={()=>{
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
                                    <p style={{fontSize:'26px',color:'white'}}>取消</p>
                                </div>
                            </div>

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
                                        fontSize:'30px',
                                        lineHeight:'63px',
                                        color:'white'
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