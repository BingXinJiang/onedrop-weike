/**
 * Created by jiangsong on 2017/9/15.
 */

import React from 'react';

export default class Back extends React.Component{
    constructor(props){
        super(props);
    }
    static defaultProps = {
        btnStyle:'white',
        position:'30px'
    }
    static propTypes = {
        callback:React.PropTypes.func,
        btnStyle:React.PropTypes.string,
        position:React.PropTypes.string
    }
    render(){
        return(
            <div style={{
                position:'absolute',top:this.props.position,left:this.props.position,
                width:'60px', height:'60px',borderRadius:'30px',overflow:'hidden'
            }} onClick={this.props.callback}>
                <img style={{width:'60px',height:'60px'}}
                     src={this.props.btnStyle === 'black' ? "../../../img/weike/tool/back_black.png" : "../../../img/weike/tool/back.png"}/>
            </div>
        )
    }
}