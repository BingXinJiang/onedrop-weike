/**
 * Created by jiangsong on 2017/6/23.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
import Tool from '../../../Tool/Tool';
import Loading from '../../view/Loading';
import Drop from '../everyday/Drop';
import Style from '../../../const/Style';

class Medal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hasGetName:false,
            username:'哈哈哈'
        }
        this.pushName = this.pushName.bind(this);
    }
    pushName(){
        var name = $('#mydrop_medal_name').val();
        if(!name){
            alert('请输入姓名!');
            return;
        }
        fetch(OneDrop.base_url+'/mydrop/name',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user_id:REMOTE_WEIXIN_USER_ID,
                user_name:name
            })
        }).then((response)=>{
            return response.json();
        }).then((res)=>{
            // console.log('抓化图片开始！');
            if(this.state.hasGetName){
                html2canvas($('#mystudy_xunzhang_share_image_div'),{
                    allowTaint: true,
                    taintTest: false,
                    onrendered:(canvas)=>{
                        // console.log('转化图片的回调');
                        canvas.id='mycanvas';
                        var dataUrl = canvas.toDataURL();
                        $('#mystudy_xunzhang_share_image_img').attr('src',dataUrl);
                        // wx.ready(()=>{
                        //     console.log('要开始预览图片了');
                        //     wx.previewImage({
                        //         current: dataUrl,
                        //         urls: [dataUrl]
                        //     })
                        // })
                    }
                })
            }
        })
        this.setState({
            hasGetName:true,
            username:name
        })
    }
    render(){
        return(
            <div id="mystudy_xunzhang_share_image_div" style={{position:'absolute',width:OneDrop.JS_ScreenW,height:(OneDrop.JS_ScreenH*2-2*64)+'px',
                            backgroundColor:'white',left:'0',top:'0',zIndex:'998'
                        }}>
                <div style={{position:'relative',width:'100%',height:'100%'
                }}>
                    <img id="mystudy_xunzhang_share_image_img" onClick={this.props.callback} style={{
                                width:'100%',height:'100%'
                            }} src={"../../../img/weike/medal/medal_"+this.props.medalRank+".jpg"}/>
                    <p style={{position:'absolute',width:'100%',height:'60px',fontSize:'40px',
                        display:'flex',justifyContent:'center',alignItems:'center',left:'0',top:'47%',
                        color:'black'
                    }}>{this.state.username}</p>
                    {
                        !this.state.hasGetName ?
                            <div style={{position:'absolute',width:'80%',height:'600px',flexDirection:'column',
                                display:'flex',justifyContent:'center',alignItems:'center',left:'10%',top:'17%',
                                backgroundColor:'white',borderRadius:'10px'
                            }}>
                                <input id="mydrop_medal_name" style={{fontSize:'34px',width:'400px',height: '80px',
                                    borderColor:'gray',borderWidth:'1px',borderStyle:'solid'
                                }} placeholder="输入姓名,获取我的称号!"/>
                                <p style={{color:Style.wordColor,fontSize:'32px',width:'120px',height:'80px',
                                    display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:Style.bgBlue,
                                    marginTop:'30px',borderRadius:'20px'
                                }} onClick={this.pushName}>获取</p>
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default class MyStudy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:false,
            labels:[],

            isShowLabelCourse:false,
            labelCourses:[],
            isLabelLoading:false,
            labelName:'',

            isShowEverydayDrop:false,
            section_id:0,

            isShowPrompt:false,

            medalRank:0,
            isShowMedal:false

        };
        this.labelUnitArrPoint = [];
        this.getLabelCourses = this.getLabelCourses.bind(this);
        this.getMyMedal = this.getMyMedal.bind(this);
    }

    getMyMedal(){
        if(this.state.isLoading || this.state.isLabelLoading){
            return;
        }
        fetch(OneDrop.base_url+'/mydrop/medal',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user_id:REMOTE_WEIXIN_USER_ID
            })
        }).then((response)=>{
            return response.json();
        }).then((res)=>{
            if(res.status === 1){
                var medalRank = res.data;
                // console.log('medalRank:',medalRank);
                if(medalRank <= 0){
                    alert('先学习每日一滴,坚持听完,才能获得称号哟!');
                }else{
                    this.setState({
                        medalRank:medalRank ? medalRank : 1,
                        isShowMedal:true
                    })
                }
            }else{
                alert('数据错误!');
            }
        })
    }

    componentDidMount(){
        const cW = OneDrop.JS_ScreenW-160;
        const cH = OneDrop.JS_ScreenH*2-107-300-160;
        const radius = 160;
        const num = 10;
        this.setState({
            isLoading:true
        })
        this.labelUnitArrPoint = Tool.generateRndomPointArr(cW,cH,radius,num);
        
        $.ajax({
            url:OneDrop.base_url+'/mydrop/labels',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID
            },
            success:(data)=>{
                if(data.status === 1){
                    if(data.data.length<=0){
                        this.setState({
                            labels:data.data,
                            isLoading:false,
                            isShowPrompt:true
                        })
                    }else{
                        this.setState({
                            labels:data.data,
                            isLoading:false
                        })
                    }
                }else{
                    this.setState({
                        isLoading:false
                    })
                    alert('网络错误!');
                }
            }
        })
        //分享配置
        Tool.getJSSDKPaySign(location.href.split('#')[0],()=>{

        })
        Tool.shareToMoments({

        })
        Tool.shareToFriends({

        })
    }

    getLabelCourses(label_id){
        if(this.state.isLoading || this.state.isLabelLoading){
            return;
        }
        this.setState({
            isShowLabelCourse:true,
            isLabelLoading:true
        })
        $.ajax({
            url:OneDrop.base_url+'/mydrop/label/sections',
            dataType:'json',
            method:'POST',
            data:{
                label_id:label_id
            },
            success:(data)=>{
                if(data.status === 1){
                    this.setState({
                        isLabelLoading:false,
                        labelCourses:data.data
                    })
                }else{
                    this.setState({
                        isLabelLoading:false
                    })
                    alert('网络错误');
                }
            }
        })
    }

    render(){
        return(
            <div style={{overflowX:'hidden'}}>
                <div onClick={()=>{
                    this.setState({
                        isShowLabelCourse:false
                    })
                }} style={{
                    width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH2+'px',position:'relative',overflow:'hidden'
                }}>
                    <img style={{
                        width:'100%',height:'91%',position:'absolute',left:'0',top:'0'
                    }} src="../../../../img/weike/mine/tree.jpg"/>
                    <div style={{
                        position:'absolute',right:'30px',top:'30px',display:'flex',justifyContent:'center',alignItems:'center',
                        borderRadius:'10px',borderWidth:'1px',borderColor:'white',borderStyle:'solid',width:'160px',height:'110px',
                        flexDirection:'column',backgroundColor:'rgb(28,102,207)'
                    }} onClick={this.getMyMedal}>
                        <p style={{
                            fontSize: '28px', color:'white'
                        }}>获取我的</p>
                        <p style={{
                            fontSize: '28px', color:'white'
                        }}>一滴称号</p>
                    </div>
                    <div style={{
                        width:OneDrop.JS_ScreenW-160+'px',height:OneDrop.JS_ScreenH*2-100-300-160+'px',overflow:'visible',
                        marginTop:'240px',marginLeft:'80px',position:'relative'
                    }}>
                        {
                            this.state.labels.map((content,index)=>{
                                if(index>=10){
                                    return null;
                                }
                                var point = this.labelUnitArrPoint[index];
                                const conSty = {
                                    position:'absolute',top:point.y+'px',left:point.x+'px',backgroundColor:point.color,
                                    borderRadius:point.width/2+'px',width:point.width+'px',height:point.width+'px',
                                    display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'
                                }
                                const wordSty = {
                                    fontSize:point.wordSize+'px',color:'white'
                                }
                                if(content.label_name.length<=3){
                                    return(
                                        <div key={index} onClick={(e)=>{
                                            e.stopPropagation();
                                            this.getLabelCourses(content.label_id);
                                            this.setState({
                                                labelName:content.label_name
                                            })
                                        }} style={{...conSty}}>
                                            <p style={{...wordSty}}>{content.label_name}</p>
                                        </div>
                                    )
                                }else if(content.label_name.length<=5){
                                    return(
                                        <div key={index} onClick={(e)=>{
                                            e.stopPropagation();
                                            this.getLabelCourses(content.label_id);
                                            this.setState({
                                                labelName:content.label_name
                                            })
                                        }} style={{...conSty}}>
                                            <p style={{...wordSty}}>{content.label_name.substr(0,2)}</p>
                                            <p style={{...wordSty}}>{content.label_name.substr(2,3)}</p>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div key={index} onClick={(e)=>{
                                            e.stopPropagation();
                                            this.getLabelCourses(content.label_id);
                                            this.setState({
                                                labelName:content.label_name
                                            })
                                        }} style={{...conSty}}>
                                            <p style={{...wordSty}}>{content.label_name.substr(0,3)}</p>
                                            <p style={{...wordSty}}>{content.label_name.substr(3,3)}</p>
                                            <p style={{...wordSty}}>{content.label_name.substr(6,3)}</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {
                    this.state.isShowMedal ?
                        <Medal medalRank={this.state.medalRank} callback={()=>{
                            this.setState({
                                isShowMedal:false
                            })
                        }}/>
                        : null
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
                    this.state.isShowLabelCourse ?
                        <div style={{
                            position: 'absolute',left:'24px',bottom:'77px',width:OneDrop.JS_ScreenW-48+'px',
                            height:'700px',backgroundColor:'white',borderTopLeftRadius:'38px',
                            borderTopRightRadius:'38px'
                        }}>
                            <div style={{marginBottom:'30px'}}>
                                <div style={{
                                    width:'100%',height:'120px',display:'flex',alignItems:'center'
                                }}>
                                    <p style={{fontSize:'36px',color:'rgb(23,172,251)',marginLeft:'24px'}}><span style={{color:'rgb(0,0,0)'}}>标签：</span>{this.state.labelName}({this.state.labelCourses.length})</p>
                                </div>
                                <div style={{width:'100%',height:'30px',backgroundColor:'rgb(172,183,194)'}}/>
                                <div style={{overflowX:'scroll',height:'550px'}}>
                                    {
                                        this.state.labelCourses.map((content,index)=>{
                                            return (
                                                <div onClick={()=>{
                                                    if(this.state.isLabelLoading || this.state.isLoading){
                                                        return;
                                                    }
                                                    var audio = document.createElement('audio');
                                                    audio.preload = 'auto';
                                                    audio.src = content.section_voice;
                                                    audio.id = 'che_dan_de_yin_pin'+content.section_id;
                                                    OneDrop.AUDIO = audio;
                                                    this.setState({
                                                        isShowEverydayDrop:true,
                                                        section_id:content.section_id
                                                    })
                                                }} key={index}>
                                                    <div style={{width:'100%',height:'110px',display:'flex',alignItems:'center'}}>
                                                        <p style={{fontSize:'30px',color:'rgb(51,51,51)',marginLeft:'24px'}}>{content.section_name}</p>
                                                    </div>
                                                    <div style={{width:'100%',height:'1px',backgroundColor:'rgb(172,183,194)'}}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                this.state.isLabelLoading ?
                                    <div style={{
                                        position:'fixed',bottom:'107px',left:'24px',width:OneDrop.JS_ScreenW-48+'px',
                                        height:'550px',display:'flex',justifyContent:'center',alignItems:'center'
                                    }}>
                                        <img src="../../../img/weike/home/loading.gif"/>
                                    </div>
                                    : null
                            }
                        </div>
                        : null
                }
                {
                    this.state.isShowPrompt ?
                        <div onClick={()=>{
                            this.setState({
                                isShowPrompt:false
                            })
                        }} style={{
                            position:'absolute',zIndex:'99',left:'0',top:'0',
                            width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH*2,backgroundColor:'rgba(0,0,0,0.6)',
                            display:'flex',justifyContent:'center'
                        }}>
                            <div style={{
                                display:'flex',flexDirection:'column',alignItems:'center',borderRadius:'20px',
                                backgroundColor:'white',width:OneDrop.JS_ScreenW-104+'px',height:'620px',
                                marginTop:'35%'
                            }}>
                                <img style={{width:'100%'}} src="../../../../img/weike/mine/promot.png"/>
                                <p style={{
                                    paddingLeft:'36px',paddingRight:'36px',fontSize:'28px',lineHeight:'44px',color:'rgb(102,102,102)',
                                    marginTop:'27px'
                                }}>
                                    欢迎进入我的一滴，您的个人领导力技能成长树！您的每一次学习足迹都是一次自我的蜕变！点击树上的标签可快速回顾您已经学习过的内容。
                                </p>
                                <p style={{
                                    fontSize:'22px',color:'rgb(102,102,102)',marginTop:'32px'
                                }}>
                                    注意：学习过课程之后标签才会出现在这里哟！
                                </p>
                                <p onClick={()=>{
                                    this.setState({
                                        isShowPrompt:false
                                    })
                                }} style={{
                                    fontSize:'28px',color:'rgb(255,255,255)',width:'322px',height:'70px',borderRadius:'10px',
                                    backgroundColor:'rgb(49,149,215)',display:'flex',justifyContent:'center',alignItems:'center',
                                    marginTop:'22px',marginBottom:'46px'
                                }}>
                                    朕知道了
                                </p>
                            </div>
                        </div>
                        :
                        null
                }
                {
                    this.state.isLoading ?
                        <Loading/>
                        : null
                }
            </div>
        )
    }
}