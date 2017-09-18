/**
 * Created by jiangsong on 2017/9/15.
 */

import React from 'react';
import OneDrop from '../../../const/onedrop';
import Style from '../../../const/Style';
import Back from '../../view/Back';

export default class Medal extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            hasGetName:false,
            username:'哈哈哈',
            medalRank:1
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
    getMyMedal(){
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
                if(medalRank <= 0){
                    alert('先学习每日一滴,坚持听完,才能获得称号哟!');
                }else{
                    this.setState({
                        medalRank:medalRank ? medalRank : 1
                    })
                }
            }else{
                alert('数据错误!');
            }
        })
    }
    componentDidMount(){
        this.getMyMedal();
    }
    render(){
        return(
            <div id="mystudy_xunzhang_share_image_div" style={{width:OneDrop.JS_ScreenW,height:(OneDrop.JS_ScreenH*2-2*64)+'px',
                backgroundColor:'white'
            }}>
                <div style={{position:'relative',width:'100%',height:'100%'
                }}>
                    <img id="mystudy_xunzhang_share_image_img" style={{
                        width:'100%',height:'100%'
                    }} src={"../../../img/weike/medal/medal_"+this.state.medalRank+".jpg"}/>
                    <Back callback={this.props.callback} btnStyle='black' position='80px'/>
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