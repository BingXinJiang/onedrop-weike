/**
 * Created by jiangsong on 2017/8/15.
 */

import React from 'react';

class NoLearnCourse extends React.PureComponent{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                hahha
            </div>
        )
    }
}

export default class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div onClick={()=>{
                this.props.callback();
            }}>
                hahha
            </div>
        )
    }

}