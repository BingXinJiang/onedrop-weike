/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';
import Drop from './everyday/Drop';
import LeadPage from './everyday/LeadPage';

export default class LastDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isPlaying:false,
            playUrl:'',
            courses:[],
            isShowEverydayDrop:false,
            section_id:0,
            isShowLeadPage:false
        }
    }

    componentDidMount() {
        $.ajax({
            url:OneDrop.base_url+'/onedrop/sections',
            dataType:'json',
            method:'POST',
            data:{
                user_id:REMOTE_WEIXIN_USER_ID,
                page:1
            },
            success:(data)=>{
                if(data.status === 1){
                    var courses = data.data;
                    this.setState({
                        courses:courses
                    })
                }else{
                    alert('数据执行错误!');
                }
            }
        })
    }
    render(){
        return (
            <div>
                {
                    !this.state.isShowEverydayDrop&&!this.state.isShowLeadPage ?
                        <div style={{
                            backgroundColor:'rgb(235,235,235)',
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
                                }} src="../../../img/weike/onedrop/banner.jpg"/>
                            </div>
                            {
                                this.state.courses.map((content,index)=>{
                                    return(
                                        <div key={index} onClick={()=>{
                                this.setState({
                                    isShowEverydayDrop:true,
                                    section_id:content.section_id
                                })
                            }} style={{
                                marginTop:'20px',
                                backgroundColor:'white',
                                width:'100%'
                            }}>
                                            <div style={{
                                                paddingTop:'34px',
                                                paddingBottom:'33px',
                                                marginRight:'24px',
                                                marginLeft:'24px'
                                            }}>
                                                <p style={{
                                                    fontSize:'36px',
                                                    color:'rgb(0,0,0)'
                                                }}>{content.section_id} | {content.section_name}</p>
                                                <img style={{height:'300px',width:'100%',
                                                    marginTop:'24px'
                                                }} src={OneDrop.res_ip+content.section_list_img}/>
                                                <p style={{
                                                    marginTop:'24px',
                                                    fontSize:'26px',
                                                    color:'rgb(102,102,102)'
                                                }}>{content.section_intro}</p>
                                                <p style={{
                                                    marginTop:'24px',
                                                    fontSize:'20px',
                                                    color:'rgb(131,131,131)'
                                                }}>{content.year}年{content.month}月{content.day}日</p>
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
                            this.setState({
                                isShowEverydayDrop:false
                            })
                        }}/>
                        : null
                }
                {
                    this.state.isShowLeadPage ?
                        <LeadPage callback={()=>{
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