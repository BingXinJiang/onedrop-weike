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
            width:'75%'
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
                    <p style={{
                        ...wordStyle,
                        height:'60px',
                        width:'75%',
                        borderWidth:'2px',
                        borderColor:'rgb(235,235,235)',
                        color:'rgb(187,187,187)'
                    }}>选择您想要参与的测评</p>
                </div>


                <div style={{
                    ...contannerStyle,
                    height:'90px',
                    width:'100%',
                    backgroundColor:'orange'
                }}>
                    <p style={{
                        ...wordStyle,
                        width:'240px',
                        height:'72px',
                        color:'white',
                        backgroundColor:'rgb(28,166,248)',
                        borderRadius:'45px',
                        textAlign:'center',
                        paddingTop:'18px',
                        fontSize:'35px'
                    }}>申请</p>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <p style={{
                        ...wordStyle
                    }}>查看测评链接</p>
                    <p style={{
                        ...wordStyle
                    }}>查看测评结果</p>
                </div>
            </div>
        )
    }
}