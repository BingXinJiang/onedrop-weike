/**
 * Created by jiangsong on 2017/6/2.
 */
import React from 'react';
import OneDrop from '../../../const/onedrop';
import DropAudio from '../../view/DropAudio';

var article = '{"text":[{"title":"","text":["“每日一滴，滴水穿石”，欢迎来到【一滴领导力】，你领导力旅途中的水和氧。"]},{"title":"问题：领导力能翻倍吗？","text":["首先，请你回答一个问题：当你面临挑战的时候，你想到的第一个念头是什么？是“我能做什么”，还是“我能找谁帮忙”？你对这个问题的回答就是你领导力发展的蓝图！"]},{"title":"概念：盖子法则","text":["如果你的回答趋向于“我能做什么”，那你的领导力就潜力无限；如果你趋向于“我能找谁帮忙”，那你的领导力在倍增！这个概念可以用世界级的领导力大师麦克斯韦尔的“盖子法则”来解释。","盖子法则用锅和锅盖的关系来比喻一个人的领导力。“锅里的水总是漫不过盖子，领导力就像一个盖子，它决定了一个人办事的效力。一个人的领导力越低，限制其发挥潜力的盖子所处的位置也就越低；相反，一个人的领导力越高，盖子所处的位置也就越高，他所能发挥的潜力也就越大”（麦克斯韦尔，2015）。"]},{"title":"工具：X=加水；Y=加氧","text":["用一个左右标图来描述，X轴，从1到10，代表“我能做什么”；Y轴，从1到10，代表“我能找谁帮忙”。如果你总是想着“我自己能做什么”，那你就是在X轴线上使力，既是你达到10分，你的效力最多也只能是10%。","但是，当你的第一个念头是“我可以找谁来帮忙”时，你的效力就会倍增！比如你找3个人来帮忙，你的效力就会变为10*3=30，翻了3倍！如果你找8个人来帮忙，你的效力就是10*8=80，翻了8倍！"]},{"title":"应用：用盖子法则倍增领导力","text":["那么，你如何使用盖子法则，使自己的领导力倍增呢？有三个方法：第一是广结友，即参加行业协会，跟踪行业专家等；第二是善结盟，即与其它部门和机构建立盟友关系；第三是催下属，即培养下属钻研新东西，成为员工的催化剂。"]},{"title":"小结：测测自己的盖子有多高？","text":["盖子法则是看你的效力有多大，领导力有多强！评估一下，你的盖子有多高？在X和Y轴上各给自己打几分？"]},{"title":"交手：盖子法则使你想起了哪些案例和问题？","text":["回忆一下，你身边有没有这样的人，能力不一定很强？可是发展的很不错，为什么？请你分享一下，与大家交交手。"]}],"image":[{"part":3,"section":1,"url":"/weixin/images/courses/detail/section_1_1_2_1.jpg"},{"part":3,"section":2,"url":"/weixin/images/courses/detail/section_1_1_2_2.jpg"}]}'

export default class Drop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowConnectEach:false
        }
    }
    render(){
        var myArticle = JSON.parse(article);
        console.log(myArticle);
        const tabStyle = {
            width:OneDrop.JS_ScreenW/4,
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }
        return(
            <div style={{
                position:'fixed',
                width:OneDrop.JS_ScreenW,
                height:OneDrop.JS_ScreenH*2,
                left:'0px',
                top:'0px',
                backgroundColor:'white',
                zIndex:'9999',
                overflowX:'scroll'
            }}>
                <div style={{
                }}>
                    <img style={{
                        width:OneDrop.JS_ScreenW,
                        height:'320px'
                    }} src="../../../../img/weike/test/banner.jpg"/>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        width:'100%',
                        backgroundColor:'white'
                    }}>
                        <div style={{
                            paddingTop:'56px',
                            marginLeft:'24px',
                            marginRight:'24px'
                        }}>
                            <p style={{
                                fontSize:'44px',
                                color:'rgb(0,0,0)'
                            }}>盖子法则：如何是自己的领导力倍增</p>

                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                marginTop:'34px',
                                justifyContent:'space-between'
                            }}>
                                <div style={{
                                    display:'flex',
                                    flexDirection:'row',
                                }}>
                                    <div style={{
                                        width:'80px',
                                        height:'80px',
                                        borderRadius:'40px'
                                    }}>
                                        <img style={{
                                            width:'80px',
                                        }} src="../../../../img/weike/test/test_head.png"/>
                                    </div>
                                    <div style={{
                                        display:'flex',
                                        flexDirection:'column',
                                        marginLeft:'16px'
                                    }}>
                                        <p style={{
                                            fontSize:'28px'
                                        }}>邰宏伟</p>
                                        <p style={{
                                            fontSize:'28px'
                                        }}>云谷慧商学院院长</p>
                                    </div>
                                </div>
                                <p style={{
                                    fontSize:'24px',
                                    color:'rgb(153,153,153)',
                                    marginTop:'40px'
                                }}>2017年6月2日</p>
                            </div>

                            <div style={{
                                marginTop:'54px'
                            }}>
                                <DropAudio audioUrl={'../../audio.mp3'}/>
                            </div>

                            <div style={{
                                marginTop:'72px',
                                marginBottom:'30px'
                            }}>
                                {
                                    myArticle.text.map((chapter, index)=>{
                                        return (
                                            <div key={index}>
                                                <p style={{
                                                    fontSize:'28px',
                                                    marginTop:'30px',
                                                    marginBottom:'15px',
                                                    fontWeight:'bold'
                                                }}>{chapter.title}</p>
                                                {
                                                    chapter.text.map((section,idx)=>{
                                                        return (
                                                            <p style={{
                                                                fontSize:'26px',
                                                                textIndent:'48px'
                                                            }} key={idx}>{section}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>


                        </div>
                    </div>

                    <div style={{
                        backgroundColor:'rgb(235,235,235)',
                        display:'flex',
                        flexDirection:'column',
                        paddingTop:'55px',
                        paddingLeft:'24px',
                        paddingRight:'24px'
                    }}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            width:'100%',
                        }}>
                            <p style={{
                                fontSize:'28px',
                                color:'rgb(102,102,102)'
                            }}>-------------------------精选留言-------------------------</p>
                        </div>

                        <div style={{
                            marginTop:'35px'
                        }}>
                            {
                                ['','',''].map((content,index)=>{
                                    return (
                                        <div style={{
                                            display:'flex',
                                            flexDirection:'row',
                                            marginBottom:'64px'

                                        }}>
                                            <div>
                                                <img style={{
                                                    width:'82px',
                                                    height:'82px',
                                                    borderRadius:'41px'
                                                }} src="../../../../img/weike/test/test_head.png"/>
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                flexDirection:'column',
                                                marginLeft:'18px'
                                            }}>
                                                <p style={{
                                                    fontSize:'28px',
                                                    color:'rgb(102,102,102)'
                                                }}>华灯初放</p>
                                                <p style={{
                                                    fontSize:'20px',
                                                    color:'rgb(102,102,102)'
                                                }}>2017年6月2日 15：12：23</p>
                                                <p style={{
                                                    fontSize:'28px',
                                                    color:'rgb(51,51,51)',
                                                    marginTop:'10px'
                                                }}>我是留言，我是留言，我是留言，我是留言，我是留言，我是留言，我是留言，我是留言，我是留言，我是留言，我是留言，我是留言，</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div style={{
                        backgroundColor:'white',
                        height:'110px',
                        display:'flex',
                        flexDirection:'row',
                        width:'100%',
                        justifyContent:'space-between'
                    }}>
                        <div onClick={()=>{
                            this.props.callback();
                        }} style={{
                            ...tabStyle
                        }}>
                            <img src="../../../../img/weike/onedrop/back.png"/>
                        </div>
                        <div onClick={()=>{
                            this.setState({
                                isShowConnectEach:true
                            })
                        }} style={{
                            ...tabStyle
                        }}>
                            <img src="../../../../img/weike/onedrop/connect.png"/>
                        </div>
                        <div style={{
                            ...tabStyle
                        }}>
                            <img src="../../../../img/weike/onedrop/appreciate_me.png"/>
                        </div>
                        <div style={{
                            ...tabStyle
                        }}>
                            <img src="../../../../img/weike/onedrop/appreciate_me.png"/>
                        </div>
                    </div>
                </div>
                {
                    this.state.isShowConnectEach ?
                        <div style={{
                            position:'absolute',
                            left:'0',
                            top:'0',
                            width:OneDrop.JS_ScreenW,
                            height:OneDrop.JS_ScreenH*2,
                            backgroundColor:'white'
                        }}>
                            <div style={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-between',
                                paddingTop:'20px',
                                paddingLeft:'24px',
                                paddingRight:'24px'
                            }}>
                                <div onClick={()=>{
                                    this.setState({
                                        isShowConnectEach:false
                                    })
                                }} style={{
                                    width:'120px',
                                    height:'70px',
                                    backgroundColor:'rgb(153,153,153)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <p style={{fontSize:'26px',color:'white'}}>取消</p>
                                </div>
                                <div style={{
                                    width:'120px',
                                    height:'70px',
                                    backgroundColor:'rgb(28,166,148)',
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <p style={{fontSize:'26px',color:'white'}}>提交</p>
                                </div>
                            </div>
                            <textarea style={{
                                width:(OneDrop.JS_ScreenW-50) +'px',
                                fontSize:'24px',
                                color:'rgb(153,153,153)',
                                padding:'15px',
                                height:'500px'
                            }}>留言将经过筛选后显示，对所有用户可见</textarea>
                        </div>
                        : null
                }
            </div>
        )
    }
}