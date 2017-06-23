/**
 * Created by jiangsong on 2017/6/23.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
import Tool from '../../../Tool/Tool';

export default class MyStudy extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShow:false
        }
    }

    componentDidMount(){
        const cW = OneDrop.JS_ScreenW-160;
        const cH = OneDrop.JS_ScreenH*2-110-300-160;
        const radius = 160;
        const num = 10;
        let unitArrPoint = Tool.generateRndomPointArr(cW,cH,radius,num);

    }

    componentDidUpdate(){
        // document.body.scrollTop = document.body.scrollTop + 260*2;
    }

    render(){
        return(
            <div>
                <div onClick={()=>{
                    this.setState({
                        isShow:true
                    })
                }} style={{
                    width:OneDrop.JS_ScreenW,height:OneDrop.JS_ScreenH*2-110+'px',backgroundColor:'orange',
                    backgroundImage:'url(../../../../img/weike/mine/tree.jpg)',backgroundSize:'100% 100%',overflow:'hidden'
                }}>
                    <div style={{
                        width:OneDrop.JS_ScreenW-160+'px',height:OneDrop.JS_ScreenH*2-110-300-160+'px',backgroundColor:'red',
                        marginTop:'280px',marginLeft:'80px'
                    }}>

                    </div>
                </div>
            </div>
        )
    }
}