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

export default class Onedrop extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <div>
                    <img src="../../../img/weike/onedrop/banner.png"/>
                </div>
                <div>
                    <CellsTitle>今日课程</CellsTitle>
                    <Cells>
                        <Cell>
                            <div>
                                <img src="../../../img/weike/onedrop/audio_3.png"/>
                            </div>
                            <div>
                                <p>管理者用人的100个细节</p>
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