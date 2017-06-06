/**
 * Created by jiangsong on 2017/6/2.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';

export default class MyDrop extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <img style={{
                    width:OneDrop.JS_ScreenW,
                    height:(OneDrop.JS_ScreenH*2-120)+'px'
                }} src="../../../../img/weike/home/mydrop.jpg"/>
            </div>
        )
    }
}