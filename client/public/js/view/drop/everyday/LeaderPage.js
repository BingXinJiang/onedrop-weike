/**
 * Created by jiangsong on 2017/6/4.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';

export default class LeaderPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{
                position:'fixed',
                width:OneDrop.JS_ScreenW,
                height:OneDrop.JS_ScreenH*2,
                left:'0',
                top:'0',
                zIndex:'99'
            }}>
                <iframe width="100%" height="100%"
                        src="https://mp.weixin.qq.com/s?__biz=MzIwNzczMDA5Mg==&mid=100000018&idx=1&sn=49b572b9a12c57fd19462d86df38907a&chksm=170ca5d1207b2cc717170aa0415d945c949140f3b3237c63aaa31c332d45184a3d0784b29834&mpshare=1&scene=1&srcid=0604Dxc88POz6KtyKS1aUygi&key=f899fac88420dff1e88c68eaa7a7401f354d854208c7ae34c036f1408fa708e79744638e18f3494241c4ca075dd22649b3ad5e1ade27fff37a92758736518325651177dc8a528417b8bfb99ee9dc387e&ascene=0&uin=MTA0OTE3OTc2MA%3D%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.12.5+build(16F73)&version=12020810&nettype=WIFI&fontScale=100&pass_ticket=ShrCNl0ybxrPpEGxXOGAqx4Su8K2uuXB%2F1RcEa9pDSTc12GaGXSvsKh4VSEwrPzg" style={{
                    left:0,
                    top:0,
                    width:'100%',
                    height:'100%',
                    overflowX:'scroll'
                }}>您的浏览器不支持该标签!!!</iframe>
                <div style={{
                    position:'fixed',
                    top:'500px',
                    right:'0'
                }} onClick={()=>{
                    this.props.callback();
                }}>
                    <img src="../../../../img/weike/onedrop/back_home.png"/>
                </div>
            </div>
        )
    }
}