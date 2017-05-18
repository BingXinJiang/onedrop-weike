/**
 * Created by jiangsong on 2017/5/9.
 */
import React from 'React';

export default class Evaluation extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const wordStyle = {
            fontSize:'30px',
        };
        const contannerStyle = {
            marginTop:'20px',
            height:'60px',
            paddingLeft:'30px',
            paddingRight:'30px'
        };
        const inputStyle = {
            height:'60px',
            fontSize:'30px',
            borderColor:'rgb(235,235,235)',
            borderWidth:'2px',
            width:'75%',
            padding:'5px'
        };
        return (
            <div style={{

            }}>
                <div style={{
                    ...contannerStyle,
                    marginTop:'100px'
                }}>
                    <span style={{
                        ...wordStyle
                    }}>姓名：</span>
                    <input style={{
                        ...inputStyle
                    }}/>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <span style={{
                        ...wordStyle
                    }}>年龄：</span>
                    <input style={{
                        ...inputStyle
                    }}/>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <span style={{
                        ...wordStyle
                    }}>性别：</span>
                    <input name="choose_gender"
                           type="radio"
                           value="0"
                           style={{
                               width:'28px',
                               height:'28px',
                               marginLeft:'50px'
                           }}
                    /><span style={{...wordStyle, marginLeft:'20px'}}>男</span>
                    <input name="choose_gender"
                           type="radio"
                           value="2"
                           style={{
                               width:'28px',
                               height:'28px',
                               marginLeft:'80px'
                           }}
                    /><span style={{...wordStyle, marginLeft:'20px'}}>女</span>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <span style={{
                        ...wordStyle
                    }}>邮箱：</span>
                    <input style={{
                        ...inputStyle
                    }}/>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <span style={{
                        ...wordStyle
                    }}>手机：</span>
                    <input style={{
                        ...inputStyle
                    }}/>
                </div>


                <div style={{
                    ...contannerStyle,
                    display:'flex'
                }}>
                    <span style={{
                        ...wordStyle
                    }}>选择：</span>
                    <input placeholder="选择您想要参与的测评"
                           onFocus={()=>{
                                console.log('这个东东获得了焦点!')
                           }}
                           style={{
                                ...inputStyle
                    }}/>
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginTop:'40px',
                    alignItems:'center'
                }}>
                    <div style={{

                    }}>
                        <p>申请测评</p>
                        <p>查看测评链接</p>
                    </div>
                    <div>
                        <p>申请报告</p>
                        <p>查看报告链接</p>
                    </div>
                </div>
            </div>
        )
    }
}