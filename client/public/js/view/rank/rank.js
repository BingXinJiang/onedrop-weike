/**
 * Created by jiangsong on 2017/6/20.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';

export default class Rank extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{
                width:OneDrop.JS_ScreenW,marginBottom:'130px'
            }}>
                <img style={{
                    width:OneDrop.JS_ScreenW,height:'300px'
                }} src="../../../../img/weike/rank/banner.jpg"/>

                <div style={{
                    height:'140px',paddingLeft:'24px',paddingRight:'24px',backgroundColor:'rgb(241,241,241)',
                    paddingTop:'30px',paddingBottom:'30px',display:'flex',flexDirection:'row',
                    justifyContent:'space-between',alignItems:'center'
                }}>
                    <div style={{
                        display:'flex',flexDirection:'row',alignItems:'center'
                    }}>
                        <div style={{
                            marginLeft:'42px'
                        }}>
                            <img style={{
                                width:'76px',height:'76px'
                            }} src="../../../../img/weike/test/test_head.png"/>
                        </div>
                        <div style={{
                            marginLeft:'22px'
                        }}>
                            <p style={{fontSize:'26px',color:'rgb(0,0,0)'}}>昵称</p>
                            <p style={{fontSize:'26px',color:'rgb(153,153,153)'}}>第12名</p>
                            <p style={{fontSize:'20px',color:'rgb(153,153,153)'}}>领导力能量 200</p>
                        </div>
                    </div>
                    <div style={{
                        display:'flex',flexDirection:'row',alignItems:'center'
                    }}>
                        <div style={{
                            display:'flex',flexDirection:'row',alignItems:'flex-end',
                            marginRight:'40px'
                        }}>
                            <p style={{fontSize:'46px',color:'rgb(23,172,251)',lineHeight:'46px'}}>200</p>
                            <p style={{fontSize:'26px',color:'rgb(23,172,251)',lineHeight:'26px'}}>分</p>
                        </div>
                        <div style={{
                            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'
                        }}>
                            <p style={{fontSize:'26px',color:'rgb(0,0,0)'}}>3</p>
                            <div>
                                <img src="../../../../img/weike/rank/love.png"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    width:'100%',height:'30px',backgroundColor:'rgb(209,209,209)'
                }}/>

                <div>
                    {
                        ['','','','','',''].map((content,index)=>{
                            return(
                                <div key={index} style={{
                                    height:'110px',paddingLeft:'24px',paddingRight:'24px',backgroundColor:index%2===0 ? 'white':'rgb(241,241,241)',
                                    paddingTop:'30px',paddingBottom:'30px',display:'flex',flexDirection:'row',
                                    justifyContent:'space-between',alignItems:'center'
                                }}>
                                    <div style={{
                                        display:'flex',flexDirection:'row',alignItems:'center'
                                    }}>
                                        <p style={{fontSize:'26px',color:'rgb(0,0,0)'}}>{index+1}</p>
                                        <div style={{
                                            marginLeft:'29px'
                                        }}>
                                            <img style={{
                                                width:'76px',height:'76px'
                                            }} src="../../../../img/weike/test/test_head.png"/>
                                        </div>
                                        <div style={{
                                            marginLeft:'22px'
                                        }}>
                                            <p style={{fontSize:'26px',color:'rgb(0,0,0)'}}>昵称</p>
                                            <p style={{fontSize:'20px',color:'rgb(153,153,153)'}}>领导力能量 200</p>
                                        </div>
                                    </div>
                                    <div style={{
                                        display:'flex',flexDirection:'row',alignItems:'center'
                                    }}>
                                        <div style={{
                                            display:'flex',flexDirection:'row',alignItems:'flex-end',
                                            marginRight:'40px'
                                        }}>
                                            <p style={{fontSize:'46px',color:index<=2 ? 'rgb(247,155,10)':'rgb(23,172,251)',lineHeight:'46px'}}>200</p>
                                            <p style={{fontSize:'26px',color:index<=2 ? 'rgb(247,155,10)':'rgb(23,172,251)',lineHeight:'26px'}}>分</p>
                                        </div>
                                        <div style={{
                                            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'
                                        }}>
                                            <p style={{fontSize:'26px',color:'rgb(0,0,0)'}}>3</p>
                                            <div>
                                                <img src="../../../../img/weike/rank/love.png"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}