/**
 * Created by jiangsong on 2017/5/24.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
export default class Plan extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const btnStyle = {
            display:'flex',
            marginTop:'10px',
            width:'80px',
            height:'50px',
            backgroundColor:'white',
            borderRadius:'5px',
            color:'#8c8c8c',
            borderColor:'#8c8c8c',
            borderWidth:'3px',
            fontSize:'24px',
            justifyContent:'center',
            alignItems:'center'
        }
        const lineGenerater = (lineHeight)=>{
            return <div style={{
                width:OneDrop.JS_ScreenW+'px',
                height:lineHeight+'px',
                backgroundColor:'rgb(235,235,235)'
            }}/>
        }
        console.log("OneDrop.JS_ScreenW:",OneDrop.JS_ScreenW);
        console.log("OneDrop.JS_ScreenH:", OneDrop.JS_ScreenH);
        console.log("OneDrop.JS_WindowH:", OneDrop.JS_WindowH);
        return(
            <div>

                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    height:'70px',
                    backgroundColor:'rgb(235,235,235)'
                }}>
                    <div style={{
                        ...btnStyle,
                        marginLeft:'30px'
                    }} onClick={()=>{
                        this.props.callback();
                    }}>
                        <p>返回</p>
                    </div>
                    <div style={{
                        ...btnStyle,
                        marginRight:'30px'
                    }} onClick={()=>{

                    }}>
                        <p>脚印</p>
                    </div>
                </div>


                <div>
                    <div style={{
                        display:'flex',
                        height:'100px',
                        alignItems:'center'
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row'
                        }}>
                            <div style={{width:'10px',height:'28px',marginTop:'3px', backgroundColor:'#17acfb'}}/>
                            <p style={{fontSize:'28px', marginLeft:'20px'}}>今日任务</p>
                        </div>
                    </div>
                    {lineGenerater(3)}
                    <div>
                        <div style={{
                            display:'flex',
                            alignItems:'center',
                            height:'80px'
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-between'
                            }}>
                                <div style={{display:'flex',fontSize:'26px',marginLeft:'30px'}}><p>1、管理者的能力</p></div>
                                <div style={{display:'flex',fontSize:'24px', color:'#7fdd1a',marginRight:'30px'}}><p>已学习</p></div>
                            </div>
                        </div>
                        {lineGenerater(2)}
                        <div style={{
                            display:'flex',
                            alignItems:'center',
                            height:'80px'
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-between'
                            }}>
                                <div style={{display:'flex',fontSize:'26px',marginLeft:'30px'}}><p>1、管理者的能力</p></div>
                                <div style={{display:'flex',fontSize:'24px', color:'#7fdd1a',marginRight:'30px'}}><p>已学习</p></div>
                            </div>
                        </div>
                        {lineGenerater(2)}
                        <div style={{
                            display:'flex',
                            alignItems:'center',
                            height:'80px'
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-between'
                            }}>
                                <div style={{display:'flex',fontSize:'26px',marginLeft:'30px'}}><p>1、管理者的能力</p></div>
                                <div style={{display:'flex',fontSize:'24px', color:'#7fdd1a',marginRight:'30px'}}><p>已学习</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {lineGenerater(20)}

                <div>
                    <div style={{
                        display:'flex',
                        height:'100px',
                        alignItems:'center'
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row'
                        }}>
                            <div style={{width:'10px',height:'28px',marginTop:'3px', backgroundColor:'#17acfb'}}/>
                            <p style={{fontSize:'28px', marginLeft:'20px'}}>今日小计划</p>
                        </div>
                    </div>
                    <div>
                        <div style={{
                            display:'flex',
                            height:'90px',
                            flexDirection:'column'
                        }}>
                            <div style={{
                                display:'flex',
                                height:'70px',
                                marginLeft:'30px',
                                marginRight:'30px',
                                borderWidth:'2px',
                                borderColor:'rgb(235,235,235)'
                            }}>
                                <p style={{fontSize:'28px',
                                    width:'70px',
                                    height:'70px'
                                }}>1、重要的事</p>
                                <input style={{
                                    flex:1,
                                }}/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>1、重要的事</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>1、重要的事</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <div>
                        <p>今日寄语</p>
                    </div>
                    <div>
                        <div>
                            <p>输入您的祝福</p>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}