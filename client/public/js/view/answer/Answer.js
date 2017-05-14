/**
 * Created by jiangsong on 2017/5/12.
 */
import React from 'React';

import Solve from './Solve';

export default class Answer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showAnswer:true
        }
    }
    render(){
        const Question =
        <div>
            {
                ['1','2','3'].map((content, index)=>{
                    return (
                        <div key={index} style={{
                                    paddingLeft:'30px',
                                    paddingTop:'30px',
                                    paddingRight:'30px',
                                    backgroundColor:'white',
                                    marginTop:'20px'
                                }}>
                            <div style={{
                                        display:'block'
                                    }}>
                                <img style={{
                                            width:'90px',
                                            height:'90px',
                                            borderRadius:'45px',
                                            float:'left',
                                            marginRight:'16px'
                                        }} src="http://wx.qlogo.cn/mmopen/vGr0icmOt61otib1wVxO7KLE0tVZsFI6aXSS8Nw4mia3YnicDq6KQo5D5MfhiclvsicWclYf4aoiayIr2kX5lFGpibZ1fTE9SLMTxHwj/0"/>
                                <div style={{
                                            display:'block'
                                        }}>
                                    <p style={{
                                                color:'rgb(127,127,127)',
                                                fontSize:'28px'
                                            }}>大樟树</p>
                                    <p style={{
                                                color:'rgb(169,169,169)',
                                                fontSize:'26px'
                                            }}>昨天15:30</p>
                                </div>
                            </div>
                            <p style={{
                                       fontSize:'28px',
                                       marginTop:'24px'
                                   }}>
                                我是一个完美主义者,在工作中常常要求下属做的工作符合我的要求,
                                常常要改好多遍才行,我觉得很累,下属也觉得很累,该怎么办呢
                                我国第三方会感受到克己奉公,世纪东方供货商的快感,
                                时光隧道供货商的快感和,时代光华速度快感受到
                            </p>
                            <div style={{
                                       width:'100%',
                                       height:'90px',
                                       marginTop:'36px'
                                   }}>
                                <p style={{
                                           width:'260px',
                                           height:'60px',
                                           fontSize:'36px',
                                           border:'2px',
                                           borderStyle:'solid',
                                           borderColor:'rgb(0,164,251)',
                                           borderRadius:'40px',
                                           color:'rgb(0,164,251)',
                                           textAlign:'center',
                                           paddingTop:'6px',
                                           marginLeft:'60%'
                                       }}>
                                    我要解答
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        return (
            <div style={{
                display:'flex',
                flexDirection:'column',
                width:'100%',
                height:'100%',
                backgroundColor:'rgb(235,235,235)',
                marginBottom:'120px'
            }}>
                {
                    this.state.showAnswer ? <Solve/> : Question
                }

            </div>
        )
    }
}