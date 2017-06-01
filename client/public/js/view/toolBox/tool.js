/**
 * Created by jiangsong on 2017/5/24.
 */
import React from 'react';
import OneDrop from '../../const/onedrop';
import Evaluation from './evalution/Evaluation';
import Plan from './plan/plan';
export default class Tool extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected:'tool' //1.tool 2、evaluation 3、plan
        }
    }
    render(){
        const spanStyle = {
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:OneDrop.JS_ScreenW/3+'px',
            marginBottom:'30px'
        }
        const toolBox =
            <div style={{
                marginTop:'60px',
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap'
            }}>
                <span onClick={()=>{
                    this.setState({
                        selected:'evaluation'
                    })
                }} style={{...spanStyle}}>
                    <img src="../../../img/weike/tool/evaluation.png"/>
                </span>
                {/*<span onClick={()=>{*/}
                    {/*this.setState({*/}
                        {/*selected:'plan'*/}
                    {/*})*/}
                {/*}} style={{...spanStyle}}>*/}
                    {/*<img src="../../../img/weike/tool/punch_card.png"/>*/}
                {/*</span>*/}
            </div>
        return (
            <div>

                {
                    (()=>{
                        switch (this.state.selected){
                            case 'tool':
                                return toolBox;
                            case 'evaluation':
                                return <Evaluation/>;
                            case 'plan':
                                return null;
                            default:
                                return toolBox;
                        }
                    })()
                }
            </div>
        )
    }
}