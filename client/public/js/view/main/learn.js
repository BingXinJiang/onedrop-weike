/**
 * Created by jiangsong on 2017/4/7.
 */
require ('weui');
require('react-weui/lib/react-weui.min.css');
import React from 'react';
import {
    Cells,
    CellsTitle,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
} from 'react-weui';
import OneDrop from '../../const/onedrop';
import LearnDetail from './learn_detail';

export default class Learn extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            courseData:[],
            toLearnDetail:false,  //控制跳转到学习详情页面
            selectSection:0,
            course_image:''
        }
        // this.learned_chapter = 0;
        // this.learned_section = 0;
    }

    componentDidMount() {
        var learn_url = OneDrop.base_ip + '/main/getsection';
        var self = this;
        var courseData = [];
        $.ajax({
            url:learn_url,
            dataType:'json',
            method:'POST',
            data:{
                course_id:self.props.courseId,
                user_id:REMOTE_WEIXIN_USER_ID
            },
            success:function(data){
                var chapters = data.data.chapters;
                var course_image = data.data.course_image;
                // var learned_chapter = 0;
                // var learned_section = 0;
                // chapters.map(function (chapter) {
                //     chapter.map(function (section) {
                //         if(section.section_id == self.props.progress){
                //             learned_chapter = section.chapter_num;
                //             learned_section = section.section_num;
                //             self.learned_chapter = learned_chapter;
                //             self.learned_section = learned_section;
                //         }
                //     })
                // })
                chapters.map(function (chapter) {
                    // chapter.map(function (section) {
                    //     if(section.chapter_num > learned_chapter){
                    //         section.isLearned = false;
                    //     }else if(section.chapter_num < learned_chapter){
                    //         section.isLearned = true;
                    //     }else {
                    //         if(section.section_num>learned_section){
                    //             section.isLearned = false;
                    //         }else{
                    //             section.isLearned = true;
                    //         }
                    //     }
                    // })
                    chapter.sort(function (section1, section2) {
                        return section1.section_num - section2.section_num;
                    });
                    var newChapter = {
                        title:chapter[0].chapter_name,
                        num:chapter[0].chapter_num,
                        data:chapter
                    }
                    courseData.push(newChapter);
                })
                self.setState({
                    courseData:courseData,
                    course_image:course_image
                })
            }
        })
    }
    render(){
        var self = this;
        return(
            <div style={{marginBottom:'90px'}}>
                {
                    this.state.toLearnDetail ?
                        <LearnDetail
                            userId={this.props.userId}
                            courseId={this.props.courseId}
                            courseSectionId={this.state.selectSection}
                            callback={()=>{
                                this.setState({
                                    toLearnDetail:false
                                })
                            }}
                        />
                        :
                        <div id="learn">
                            <img style={{width:'100%'}} src={OneDrop.res_ip+this.state.course_image}/>
                            {
                                this.state.courseData.map(function (chapter, index) {
                                    return (
                                        <div key={index}>
                                            <CellsTitle style={{fontSize:'35px', fontWeight:'bold'}}>{'第'+chapter.num+'章   '+chapter.title}</CellsTitle>
                                            <Cells>
                                                {
                                                    chapter.data.map(function (section, index) {

                                                        return (
                                                            <Cell style={{height:'100px'}} onClick={()=>{
                                                                if(section.is_open == 0){
                                                                    alert('课程制作中，请耐心等待...');
                                                                }else{
                                                                    if(section.is_learned == 1){
                                                                        self.setState({
                                                                            toLearnDetail:true,
                                                                            selectSection:section.section_id
                                                                        })
                                                                    }else{
                                                                        $.ajax({
                                                                            url:OneDrop.base_ip + '/main/section/learn',
                                                                            dataType:'json',
                                                                            method:'POST',
                                                                            data:{
                                                                                user_id:self.props.userId,
                                                                                course_id:self.props.courseId,
                                                                                course_section_id:section.section_id
                                                                            },
                                                                            success:function(data) {
                                                                                if(data.status === 1){
                                                                                    self.setState({
                                                                                        toLearnDetail:true,
                                                                                        selectSection:section.section_id
                                                                                    })
                                                                                }
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                
                                                            }} key={index} href="javascript:;" access>
                                                                <CellBody style={{fontSize:'32px'}}>
                                                                    {'第'+section.section_num+'节:  '+section.section_name}
                                                                </CellBody>
                                                                <CellFooter style={{fontSize:'32px'}}>
                                                                    {section.is_learned==1 ? '已学习' : '去学习'}
                                                                </CellFooter>
                                                            </Cell>
                                                        )
                                                    })
                                                }
                                            </Cells>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        )
    }
}
Learn.propTypes = {
    progress:React.PropTypes.number,
    userId:React.PropTypes.string,
    courseId:React.PropTypes.number
}