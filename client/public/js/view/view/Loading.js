/**
 * Created by jiangsong on 2017/6/24.
 */
import React from 'react';
import OneDrop from '../../const/onedrop';

export default class Loading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{
                            position:'fixed',top:'0',left:'0',
                            width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,display:'flex',justifyContent:'center',alignItems:'center'
                        }}>
                <img src="../../../img/weike/home/loading.gif"/>
            </div>
        )
    }
}