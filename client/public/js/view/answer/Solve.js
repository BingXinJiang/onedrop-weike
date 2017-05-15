/**
 * Created by jiangsong on 2017/5/14.
 */
import React from 'react';

import OneDrop from '../../const/onedrop';

export default class Solve extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log(OneDrop.JS_ScreenH);
        console.log(OneDrop.JS_WindowH);
    }

    render(){
        return (
            <div>
                <div style={{
                          paddingLeft:'30px',
                          paddingTop:'30px',
                          paddingRight:'30px',
                          backgroundColor:'white',
                          marginTop:'20px'
                     }}>
                    <div style={{
                             display:'block'
                      }}>
                        <img style={{
                                 width:'90px',
                                 height:'90px',
                                 borderRadius:'45px',
                                 float:'left',
                                 marginRight:'16px'
                        }} src="http://wx.qlogo.cn/mmopen/vGr0icmOt61otib1wVxO7KLE0tVZsFI6aXSS8Nw4mia3YnicDq6KQo5D5MfhiclvsicWclYf4aoiayIr2kX5lFGpibZ1fTE9SLMTxHwj/0"/>
                        <div style={{
                               display:'block'
                        }}>
                            <p style={{
                                  color:'rgb(127,127,127)',
                                  fontSize:'28px'
                            }}>大樟树</p>
                            <p style={{
                                  color:'rgb(169,169,169)',
                                  fontSize:'26px'
                            }}>昨天15:30</p>
                        </div>
                    </div>
                    <p style={{
                          fontSize:'28px',
                          marginTop:'24px',
                          paddingBottom:'12px'
                     }}>
                        我是一个完美主义者,在工作中常常要求下属做的工作符合我的要求,
                        常常要改好多遍才行,我觉得很累,下属也觉得很累,该怎么办呢
                        我国第三方会感受到克己奉公,世纪东方供货商的快感,
                        时光隧道供货商的快感和,时代光华速度快感受到
                    </p>
                </div>

                <div style={{marginTop:'20px'}}>
                    <div style={{
                        display:'flex',
                        paddingLeft:'30px',
                        paddingTop:'30px',
                        paddingRight:'30px',
                        backgroundColor:'white',
                        marginTop:'5px'
                    }}>
                        <div style={{
                            display:'block',
                            width:'90px',
                            marginRight:'16px'
                        }}>
                            <img style={{
                                display:'block',
                                width:'90px',
                                height:'90px',
                                borderRadius:'45px'
                            }} src="http://wx.qlogo.cn/mmopen/vGr0icmOt61otib1wVxO7KLE0tVZsFI6aXSS8Nw4mia3YnicDq6KQo5D5MfhiclvsicWclYf4aoiayIr2kX5lFGpibZ1fTE9SLMTxHwj/0"/>
                        </div>
                        <div>
                            <div style={{
                                display:'block'
                            }}>
                                <p style={{
                                    color:'rgb(127,127,127)',
                                    fontSize:'28px',
                                    float:'left'
                                }}>大樟树</p>
                                <p style={{
                                    color:'rgb(169,169,169)',
                                    fontSize:'26px',
                                    float:'right'
                                }}>昨天15:30</p>
                            </div>

                            <p style={{
                                fontSize:'28px',
                                marginTop:'24px',
                                clear:'both',
                                paddingBottom:'12px'
                            }}>
                                我是一个完美主义者,在工作中常常要求下属做的工作符合我的要求,
                                常常要改好多遍才行,我觉得很累,下属也觉得很累,该怎么办呢
                                我国第三方会感受到克己奉公,世纪东方供货商的快感,
                                时光隧道供货商的快感和,时代光华速度快感受到
                            </p>
                        </div>
                    </div>
                    <div style={{
                        display:'flex',
                        paddingLeft:'30px',
                        paddingTop:'30px',
                        paddingRight:'30px',
                        backgroundColor:'white',
                        marginTop:'5px'
                    }}>
                        <div style={{
                            display:'block',
                            width:'90px',
                            marginRight:'16px'
                        }}>
                            <img style={{
                                display:'block',
                                width:'90px',
                                height:'90px',
                                borderRadius:'45px'
                            }} src="http://wx.qlogo.cn/mmopen/vGr0icmOt61otib1wVxO7KLE0tVZsFI6aXSS8Nw4mia3YnicDq6KQo5D5MfhiclvsicWclYf4aoiayIr2kX5lFGpibZ1fTE9SLMTxHwj/0"/>
                        </div>
                        <div>
                            <div style={{
                                display:'block'
                            }}>
                                <p style={{
                                    color:'rgb(127,127,127)',
                                    fontSize:'28px',
                                    float:'left'
                                }}>大樟树</p>
                                <p style={{
                                    color:'rgb(169,169,169)',
                                    fontSize:'26px',
                                    float:'right'
                                }}>昨天15:30</p>
                            </div>

                            <p style={{
                                fontSize:'28px',
                                marginTop:'24px',
                                clear:'both',
                                paddingBottom:'12px'
                            }}>
                                我是一个完美主义者,在工作中常常要求下属做的工作符合我的要求,
                                常常要改好多遍才行,我觉得很累,下属也觉得很累,该怎么办呢
                                我国第三方会感受到克己奉公,世纪东方供货商的快感,
                                时光隧道供货商的快感和,时代光华速度快感受到
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{
                    position:'fixed',
                    width:'100%',
                    height:'70px',
                    backgroundColor:'white',
                    left:'0',
                    top:(OneDrop.JS_ScreenH*2 - 240) + 'px'
                }}>
                    <div style={{
                        display:'flex',
                        marginTop:'5px',
                        paddingLeft:'30px',
                        paddingRight:'30px'
                    }}>
                        <input style={{
                            display:'flex',
                            flex:'1',
                            height:'60px',
                            fontSize:'28px'
                        }}/>
                        <p style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            width:'90px',
                            height:'60px',
                            fontSize:'30px'
                        }}>
                            提交
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}