/**
 * Created by jiangsong on 2017/4/10.
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
import OneAudio from '../view/OneAudio';

export default class Learn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            section: null,
            comment:[],
        }
    }

    componentDidMount(){
        var self = this;
        var section = {};
        var comments = [];
        var single1 = false;
        var single2 = false;
        var getData = function () {
            if(single1 && single2){
                self.setState({
                    section:section,
                    comment:comments
                })
            }
        }
        $.ajax({
            url:OneDrop.base_ip + '/main/one_section',
            dataType:'json',
            method:'POST',
            data:{
                section_id:self.props.courseSectionId
            },
            success:function (data) {
                section = data.data.section;
                single1 = true;
                getData();
            }
        })
        $.ajax({
            url:OneDrop.base_ip + '/main/section/get_comment',
            dataType:'json',
            method:'POST',
            data:{
                section_id:self.props.courseSectionId
            },
            success:function (data) {
                data.data.comments.map(function (comment) {
                    comments.push(comment);
                })
                single2 = true;
                getData();
            }
        })
    }
    render(){
        var section = this.state.section;
        var self = this;
        return(
            <div style={{backgroundColor:'rgb(229,230,231)',
             marginBottom:'90px',
             width:'100%'}} id="learn_detail">
                {
                    section != null ?
                        <div style={{marginBottom:'120px'}}>
                            <h1 style={{paddingTop:'30px', paddingLeft:'30px', fontSize:'40px'}}>{section.section_name}</h1>

                            <div style={{width: '100%', alignItems:'center', alignContent:'center', marginTop:'30px', marginBottom:'50px'}}>
                                <OneAudio audioUrl={section.section_voice}
                                          title={section.section_name}
                                          author={section.course_author}
                                />
                            </div>

                            <p style={{paddingLeft:'30px', paddingRight:'30px', backgroundColor:'white', fontSize:'35px'}}>{section.section_des}</p>
                            <img style={{marginTop:'30px',marginLet:'80px', width:'200px', height:'auto'}} src="../../../img/weike/detail/comment.png"/>
                            <Cells style={{marginTop:'0'}}>
                                {
                                    this.state.comment.map(function (comment, index) {
                                        return (
                                            <Cell key={index} style={{marginTop:'10px', marginBottom:'10px'}}>
                                                <CellBody>
                                                    <div>
                                                        <img style={{width:'90px', height:'90px', borderRadius:'45px', float:'left', marginRight:'18px'}}
                                                             src={comment.headimgurl}/>
                                                        <div style={{float:'right', fontSize:'24px'}}>{comment.datetime}</div>
                                                        <div>
                                                            <p style={{fontSize:'24px'}}>{comment.nickname}</p>
                                                            <p style={{fontSize:'24px'}}>{comment.comment}</p>
                                                        </div>
                                                    </div>
                                                </CellBody>
                                                <CellFooter/>
                                            </Cell>
                                        )
                                    })
                                }
                            </Cells>
                        </div>
                        :
                        null
                }
                <div style={{marginTop:'30px', height:'100px',width:'100%', position:'fixed', bottom:'0px', backgroundColor:'rgb(229,230,231)'}}>
                    <input id="comment_input" style={{width: '76%', height: '80%',
                        borderWidth:'2px', borderColor:'gray', borderRadius:'10px',marginTop:'10px',
                        placeholder:'说点什么吧...', fontSize:'28px', marginLeft:'3%',marginBottom:'5px'
                    }}/>
                    <button onClick={()=>{
                        if(self.state.section == null){

                        }else{
                            //提交评论
                            var comment = $('#comment_input').val();
                            if(comment != undefined && comment != null && comment != ''){
                                $.ajax({
                                    url:OneDrop.base_ip + '/main/section/comment',
                                    dataType:'json',
                                    method:'POST',
                                    data:{
                                        user_id:self.props.userId,
                                        section_id:self.props.courseSectionId,
                                        comment:comment
                                    },
                                    success:function(data) {

                                       $.ajax({
                                            url:OneDrop.base_ip + '/main/section/get_comment',
                                            dataType:'json',
                                            method:'POST',
                                            data:{
                                                section_id:self.props.courseSectionId
                                            },
                                            success:function (data) {
                                                console.log('data:', data);
                                                self.setState({
                                                     comment:data.data.comments
                                                })
                                            }
                                        })
                                       $('#comment_input').val('');
                                       alert('留言成功!');
                                    }
                                })
                            }else{
                                alert('请输入留言!');
                            }
                        }
                    }} style={{marginLeft:'2%', width: '15%', height:'80%',
                        fontSize:'35px', marginTop:'10px', borderWidth:'2px', borderColor:'gray'}}>留言</button>
                </div>
            </div>
        )
    }
}

Learn.propTypes = {
    userId:React.PropTypes.string,
    courseId:React.PropTypes.number,
    courseSectionId:React.PropTypes.number
}