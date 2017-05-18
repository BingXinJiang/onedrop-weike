/**
 * Created by jiangsong on 2017/5/9.
 */
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

export default class Onedrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active:null,
            courses:[]
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
                console.log('results:', results);
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
        console.log(this.state.courses);
        return (
            <div style={{backgroundColor:'rgb(235, 235, 235)'}}>
                <div>
                    <img style={{width:OneDrop.JS_ScreenW, height:'400px'}} src={bannerSrc}/>
                </div>
                <div>
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
                            <p style={{float:'left', fontSize:'24px', marginLeft:'20px'}}>今日课程</p>
                        </div>
                    </div>
                    <Cells>
                        <Cell>
                            <div>
                                <img src="../../../img/weike/onedrop/audio_3.png"/>
                            </div>
                            <div>
                                <p style={{
                                    fontSize:'35px'
                                }}>管理者用人的100个细节</p>
                                <p>李伟：知名教授</p>
                                <p>
                                    你是一位优秀的管理者吗？你知道怎么与下属相处融洽吗？你知道怎么样
                                    激励员工吗？你是一位优秀的管理者吗？你知道怎么与下属相处融洽吗？你知道
                                    怎样激励员工吗？
                                </p>
                            </div>
                        </Cell>
                    </Cells>
                </div>
                <div>
                    <div style={{
                        width:OneDrop.JS_ScreenW,
                        height:'90px',
                        backgroundColor:'white',
                        marginTop: '20px'
                    }}>
                        <div style={{float:'left', marginTop:'30px'}}>
                            <div style={{display:'block',
                                backgroundColor:'rgb(27,138,229)',
                                width:'10px',
                                height:'30px',
                                float:'left'
                            }}/>
                            <p style={{float:'left', fontSize:'24px', marginLeft:'20px'}}>今日课程</p>
                        </div>
                    </div>
                    <Cells>
                        <Cell>
                            <div>
                                <img src="../../../img/weike/onedrop/audio_3.png"/>
                            </div>
                            <div>
                                <p style={{
                                    fontSize:'35px'
                                }}>管理者用人的100个细节</p>
                                <p>李伟：知名教授</p>
                                <p>
                                    你是一位优秀的管理者吗？你知道怎么与下属相处融洽吗？你知道怎么样
                                    激励员工吗？你是一位优秀的管理者吗？你知道怎么与下属相处融洽吗？你知道
                                    怎样激励员工吗？
                                </p>
                            </div>
                        </Cell>
                    </Cells>
                </div>
            </div>
        )
    }
}