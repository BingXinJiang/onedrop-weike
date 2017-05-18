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

export default class Onedrop extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return (
            <div style={{backgroundColor:'rgb(235, 235, 235)'}}>
                <div>
                    <img style={{width:OneDrop.JS_ScreenW}} src="../../../img/weike/onedrop/zhanwei.jpg"/>
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
            </div>
        )
    }
}