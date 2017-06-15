/**
 * Created by jiangsong on 2017/6/15.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
import async from 'async';

export default class ListDrop extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUnMount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event){
        if(Number(document.body.clientHeight-document.body.scrollTop)<1350){
            if(this.state.isNoMoreCourse){
                return;
            }
            this.getCourses(this, this.state.page);
        }
    }

    render(){
        return(
            <div style={{
                backgroundColor:'rgb(229,236,242)',
                width:OneDrop.JS_ScreenW,
                paddingBottom:'110px'
            }}>
                <div onClick={()=>{
                    if(this.state.isLoading){
                        return;
                    }
                    window.removeEventListener('scroll', this.handleScroll);
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
                                if(this.state.isLoading){
                                    return;
                                }
                                window.removeEventListener('scroll', this.handleScroll);
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
                                        fontSize:'22px',color:'rgb(131,131,131)',marginTop:'10px'
                                    }}>{content.label_des}</p>
                                    {
                                        /*
                                         <p style={{
                                         marginTop:'18px',
                                         fontSize:'20px',
                                         color:'rgb(131,131,131)'
                                         }}>{content.year}年{content.month}月{content.day}日</p>
                                         * */
                                    }

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
            </div>
        )
    }
}