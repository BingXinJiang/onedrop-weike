/**
 * Created by jiangsong on 2017/6/4.
 */
import React from 'react';

import OneDrop from '../../../const/onedrop';


let story1 = [
    '父子两人，攀登高山，黄昏时刻，到了山顶。',
    '父亲问儿子，“向前看，你能看多远？”',
    '“现在我能看到百米远；但天亮时，我应该可以看到数里之外！我眼力好，比你看的远吧？” 儿子骄傲的说。',
    '“儿子，我能看到数亿里之外！” 父亲冷静的说。',
    '“什么？不可能！”儿子愣住了。',
    '“抬头，向上看，你能否看到繁星满天？知道吗？离我们最近的星星也在数亿里之外！”父亲语重心长地说，“视角变了，看到的距离也就变了！”'
]

let story2 = [
    '屋檐下，巨大的麻石安详地躺着。雨点一滴一滴落下来，麻石丝毫没有感觉。',
    '一天，两天；一周，两周；一月，两月，不管是屋子的主人，还是过路的行人，都没有发现麻石有任何变化。',
    '时间就这么不知不觉地流逝。不知过了多久，人们发现，原来平平整整的麻石，居然有了斑斑点点，显得有些凹凸不平了。',
    '谁凿出了这些斑斑点点？是顽皮的小孩，是倾盆大雨，还是另有神奇的力量？谁也琢磨不透。直到一天下雨，主人坐在屋里，透过窗户，望着屋顶的雨点，滴滴答答地掉下来，刚好落到麻石的小孔上，一丝不差。',
    '原来是雨滴有规律地凿出了麻石身上的斑斑点点。倾盆大雨看起来吓人，但是其力量没有雨滴强大，更没有雨滴恒久。从数量来看，长时间的雨滴和一场倾盆大雨相当，但其力量却不可同日而语。滴水穿石；雨打风吹过。'
]

let content1 = [
    '改变视角，用不同的角度看问题，而且得来全不费工夫。这就是领导力！你每天都需要的领导力！',
    '要具备这样的领导力，一定很难吧？是的，很难，需要长年累月的磨炼，历尽千难万险；不过也很容易，只需“每日一滴”，功到自然成。'
]

let content2 = [
    '我们长期研究发现，领导力发展和滴水穿石异曲同工。',
    '连续一周甚至更长的领导力课程，其实难以真正提升领导力；暴风骤雨式的领导力提升方法，其实只在当下的场域里对学员有些许作用，而学员一旦离开特定的环境，立刻复原甚至反弹，领导力发展无从谈起。',
    '如果化整为零，每天只关注一点，只改变一个动作，哪怕再微不足道，只要天天坚持，领导力行为浑然天成，而你的领导力水平也就迥然不同了。如同雨水一样，看似一滴，其力无穷。行动改变行为，行为养成习惯，习惯造就全新领导力！',
    '因此，我们创造了“一滴领导力”的概念，借助认知科学、脑神经学、教育技术学、行为大数据、云计算等前沿科学研究与互联网技术手段，打造“一滴领导力”平台。我们相信，每日一滴，水滴石穿；提升领导力，快快来一滴！',
    '“一滴”汇聚了各路专家，他们潜心研究和实践领导力数十年，在各自的领域辛勤耕耘，且述且作，颇有心得，而今联手，志在用“一滴”改变管理者行为，借平台提升国人领导力。'
]
let content3 = [
    '一滴领导力，首先介绍互联网及智能化时代管理界的真实案例和新鲜招数，然后抽丝剥茧、举一反三，提炼领导力新知，最后形成核心细则和行动指南，真正帮助你:'
]
let content4 = [
    '以上主题，每日一滴，如同水和氧，帮助您成长。祝愿您通过“一滴领导力”，滴水穿石，成功完成领导力转型，实现团队与绩效升级！',
    '提升领导力，快快来一滴！'
]

let teacher = [
    {
        name:'陈德智先生',
        des:[
            'DDI认证讲师，PDI360反馈顾问，Hudson大五人格测评解读师，深谙行为模式发展法，并潜心研究德鲁克、麦克斯韦尔、尤里奇等领导力大师的经典，融会贯通。领导力实践方面，他29岁即担任云南少数民族自治县政府副县长，被当地称颂为“清正廉洁，一切从人民的利益出发，是一位人民的父母官”；“领导有方、力戒空谈、是一位好领导”。2005年起返回上海，历任阿尔卡特朗讯、贝卡尔特、辉门中国和阿里巴巴旗下事业部组织与人才发展负责人，负责领导力和人才发展等工作，他还曾任IBM人力资本管理高级咨询顾问，为客户提供领导力发展、人才与能力发展等方面的咨询与服务。'
        ]
    }
    ,
    {
        name:'马成功先生',
        des:[
            '乐视培训发展总经理、原京东大学校长、原万达学院教学部总经理。中国微课联盟专家， ZITPA协会（北京中关村IT专业人士协会）培训委员会成员；担任过中国人力资源开发网专家团成员；《重新定义组织》、《构建学习生态》一书作者。',
            '中国（北京）电商人才促进中心发起人之一；中国企业大学联席会委员；获得《培训》杂志2014年度颁发的“十年贡献奖——最受欢迎演讲嘉宾”荣誉；“颠覆培训”一文刊登在《商业评论》2014年8月封面文章，并获得年度“最佳管理行动奖”；获得CSTD-中国企业大学联盟2014年度“十佳企业大学校长”荣誉；2016年《人力资源》封面人物。'
        ]
    }
]

const wordStyle = {
    fontSize:'32px',
    lineHeight:'70px',
    color:'rgb(51,51,51)'
}

const storyWordStyle = {
    ...wordStyle,
    fontStyle:'italic',
    fontSize:'30px'
}

const sceneStyle = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'134px',
    height:'43px',
    backgroundColor:'rgb(23,172,251)'
}
const sceneWorldStyle = {
    fontSize:'32px',
    color:'white'
}
const storyContainerStyle = {
    display:'flex',
    flexDirection:'row'
}
const storyLineStyle = {
    width:'15px',
    backgroundColor:'rgb(229,236,242)'
}
const storyContentStyle = {
    marginLeft:'35px'
}

const teacherContainerStyle = {
    marginTop:'34px',
    backgroundColor:'rgb(229,236,242)'
}
const teacherStyle = {
    width:'230px',
    height:'50px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundImage:'url(../../../../img/weike/detail/techer_bg.png)',
    backgroundSize:'100% 100%'
}
const teacherWordStyle = {
    fontSize:'32px',
    color:'white'
}


export default class LeadPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        // var article = JSON.parse(content);
        return(
            <div style={{
                display:'flex',
                flexDirection:'column',
                width: OneDrop.JS_ScreenW,
                height:OneDrop.JS_ScreenH*2,
                zIndex:'99',
                backgroundColor:'white',paddingBottom:'130px'
            }}>
                <img style={{width:'100%',height:'360px'}} src='../../../../img/weike/home/lead_banner.jpg'/>

                <div style={{
                    display:'flex',
                    backgroundColor:'white',
                    flexDirection:'column',
                    marginLeft:'24px',
                    marginRight:'24px'
                }}>
                    <h3 style={{
                        fontSize:'44px',
                        marginTop:'30px'
                    }}>一滴领导力</h3>
                    <h2 style={{
                        fontSize:'32px',
                        marginTop:'30px'
                    }}>开篇寄语</h2>



                    <div>
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            marginTop:'30px'
                        }}>
                            <div style={{...sceneStyle}}>
                                <p style={{...sceneWorldStyle}}>场景一</p>
                            </div>
                            <div style={{
                                ...storyContainerStyle,
                                marginTop:'35px'
                            }}>
                                <div style={{
                                    ...storyLineStyle
                                }}/>
                                <div style={{
                                    ...storyContentStyle
                                }}>
                                    {
                                        story1.map((content,index)=>{
                                            return (
                                                <p key={index} style={{...storyWordStyle}}>{content}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>



                    <div>
                        <img style={{width:'100%',height:'380px',marginTop:'28px'}} src='../../../../img/weike/detail/open1.jpg'/>
                    </div>




                    <div style={{
                    }}>
                        {
                            content1.map((content,index)=>{
                                if(index === 0){
                                    return (
                                        <p key={index} style={{...wordStyle,marginTop:'30px',color:'rgb(23,172,251)'}}>{content}</p>
                                    )
                                }
                                return(
                                    <p key={index} style={{...wordStyle,marginTop:'30px'}}>{content}</p>
                                )
                            })
                        }
                    </div>




                    <div>
                        <div style={{
                            marginTop:'30px'
                        }}>
                            <div style={{...sceneStyle}}>
                                <p style={{...sceneWorldStyle}}>场景二</p>
                            </div>
                            <div style={{
                                ...storyContainerStyle,
                                marginTop:'35px'
                            }}>
                                <div style={{
                                    ...storyLineStyle
                                }}/>
                                <div style={{
                                    ...storyContentStyle
                                }}>
                                    {
                                        story2.map((content,index)=>{
                                            return (
                                                <p key={index} style={{...storyWordStyle}}>{content}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>




                    <div>
                        <img style={{width:'100%',height:'380px',marginTop:'28px'}} src='../../../../img/weike/detail/open2.jpg'/>
                    </div>




                    <div style={{
                    }}>
                        {
                            content2.map((content,index)=>{
                                if(index === 0){
                                    return (
                                        <p key={index} style={{...wordStyle,marginTop:'30px',color:'rgb(23,172,251)'}}>{content}</p>
                                    )
                                }
                                return(
                                    <p key={index} style={{...wordStyle,marginTop:'30px'}}>{content}</p>
                                )
                            })
                        }
                    </div>



                    <div style={{
                        marginTop:'30px'
                    }}>
                        <div style={{
                            display:'flex',width:'100%',height:'68px',backgroundColor:'rgb(7,115,172)',
                            justifyContent:'center',alignItems:'center'
                        }}>
                            <p style={{fontSize:'32px',color:'white'}}>这期的一滴领导力由以下专家精心打造。</p>
                        </div>
                    </div>


                    {
                        teacher.map((teacher,index)=>{
                            return(
                                <div key={index} style={{...teacherContainerStyle}}>
                                    <div style={{...teacherStyle,marginTop:'30px'}}>
                                        <p style={{...teacherWordStyle}}>{teacher.name}</p>
                                    </div>
                                    <div style={{
                                        marginTop:'30px'
                                    }}>
                                        {
                                            teacher.des.map((des,idx)=>{
                                                return(
                                                    <p key={idx} style={{
                                                        fontSize:'30px',
                                                        color:'rgb(102,102,102)',
                                                        lineHeight:'70px',
                                                        marginTop:'30px',
                                                        marginBottom:'30px',
                                                        marginLeft:'24px',
                                                        marginRight:'24px'
                                                    }}>{des}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }


                    <h2 style={{fontSize:'34px',fontWeight:'bold',marginTop:'34px'}}>课程框架</h2>



                    <div>
                        {
                            content3.map((content,index)=>{
                                return (
                                    <p key={index} style={{...wordStyle,marginTop:'30px'}}>{content}</p>
                                )
                            })
                        }
                    </div>


                    <div style={{
                    }}>
                        {
                            ['21天升级领导力思维','49天刷新领导力行为','70天重启领导力心智'].map((content,index)=>{
                                return(
                                    <div key={index} style={{display:'flex',width:'300px',
                                        height:'50px',justifyContent:'center',
                                        alignItems:'center',backgroundColor:'rgb(23,172,251)',marginTop:'23px'}}>
                                        <p style={{...wordStyle,color:'white'}}>{content}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <img style={{width:'100%',marginTop:'50px'}} src='../../../../img/weike/detail/table.jpg'/>


                    <div>
                        {
                            content4.map((content,index)=>{
                                return (
                                    <p key={index} style={{...wordStyle,marginTop:'30px'}}>{content}</p>
                                )
                            })
                        }
                    </div>

                    <p style={{marginTop:'30px',marginBottom:'120px'}}>--------------------------------------</p>

                </div>

                {/*<div style={{
                 paddingLeft:'24px',
                 paddingRight:'24px',
                 paddingTop:'56px',
                 paddingBottom:'80px'
                 }}>
                 <p style={{
                 fontSize:'45px',
                 color:'rgb(51,51,51)'
                 }}>领导力:人人都得一滴</p>
                 <div style={{marginTop:'56px'}}>
                 {
                 article.map((content,index)=>{
                 if(index === 6){
                 return(
                 <img key={index} style={{
                 width:'70%',
                 height:'300px',
                 marginTop:'30px',
                 marginLeft:'15%'
                 }} src="../../../../img/weike/main/pageone1.jpeg"/>
                 )
                 }
                 if(index === 22){
                 return(
                 <img key={index} style={{
                 width:'70%',
                 height:'300px',
                 marginTop:'30px',
                 marginLeft:'15%'
                 }} src="../../../../img/weike/main/pageone2.jpeg"/>
                 )
                 }
                 return (
                 <p key={index} style={{
                 fontSize:'30px',
                 lineHeight:'40px',
                 color:'rgb(51,51,51)',
                 marginTop:'30px'
                 }}>{content}</p>
                 )
                 })
                 }
                 </div>
                 </div>*/}

                <img onClick={()=>{
                    this.props.callback();
                }} style={{
                    position:'fixed',
                    top:'800px',
                    right:'24px'
                }} src="../../../../img/weike/home/back_home.png"/>
            </div>
        )
    }
}