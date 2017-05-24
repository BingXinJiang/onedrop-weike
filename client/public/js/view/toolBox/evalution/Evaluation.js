/**
 * Created by jiangsong on 2017/5/9.
 */
import React from 'React';
require ('weui');
require('react-weui/lib/react-weui.min.css');
import {
    Cell,
    CellBody,
    CellFooter,
    Cells
} from 'react-weui';
import OneDrop from '../../../const/onedrop';
import Tool from '../../../Tool/Tool';

export default class Evaluation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEvalutionType:false,
            evaluationType:0 //1、自我管理测评  2、15FQ+
        }
        //申请测评链接
        this.evaluation = ()=>{
            var user_id = REMOTE_WEIXIN_USER_ID;
            var name = $('#evaluation_name').val();
            var age = Number($('#evaluation_age').val());
            var gender = null;
            if($('input:radio[name="evaluation_choose_gender"]:checked').val()==='1'){
                gender = '男';
            }else if($('input:radio[name="evaluation_choose_gender"]:checked').val()==='2'){
                gender = '女';
            }
            var email = $('#evaluation_email').val();
            var mobile = $('#evaluation_mobile').val();
            var session_id = 5041;
            if(Tool.isEmail(email)){

            }else{
                email = null;
            }
            if(Tool.isTel(mobile)){

            }else{
                mobile = null;
            }
            if(user_id && name && age && gender && email && mobile){
                $.ajax({
                    url:OneDrop.base_url + '/ceping/evaluation',
                    dataType:'json',
                    method:'POST',
                    data:{
                        user_id:user_id,
                        name:name,
                        age:age,
                        gender:gender,
                        email:email,
                        mobile:mobile,
                        session_id:session_id
                    },
                    success:function (data) {
                        if(data.status == 1){
                            var request_unique_id = data.data.request_unique_id;
                            //将该值存储到本地
                            localStorage.setItem('request_unique_id_link', request_unique_id);
                            alert('申请测评成功,稍后可通过点击查看测评链接按钮参加测评');
                            $('#evaluation_name').val('');
                            $('#evaluation_age').val('');
                            $('#evaluation_email').val('');
                            $('#evaluation_mobile').val('');
                            $('input:radio[name="evaluation_choose_gender"]').attr('checked',false);
                            $('#evaluation_choose_type').val('');
                        }else{
                            alert('数据错误!');
                        }
                    }
                })
            }else{
                alert('请输入正确的个人信息!');
            }

        }
        //查看测评链接
        this.evaluationLink = ()=>{
            var user_id = REMOTE_WEIXIN_USER_ID;
            var request_unique_id = localStorage.getItem('request_unique_id_link');
            if(user_id && request_unique_id){
                $.ajax({
                    url:OneDrop.base_url + '/ceping/look_link',
                    dataType:'json',
                    method:'POST',
                    data:{
                        user_id:user_id,
                        request_unique_id:request_unique_id
                    },
                    success:function (data) {
                        if(data.status == 1){
                            alert(data.data.msg);
                        }else {
                            alert('数据错误!');
                        }
                    }
                })
            }else{
                alert('数据错误,请重新申请测评!');
            }
        }
        //申请测评报告
        this.report = ()=>{
            var user_id = REMOTE_WEIXIN_USER_ID;
            var request_unique_id = localStorage.getItem('request_unique_id_link');
            var report_uid = 'E713AA2E-EA03-4F58-BE94-F234DD3DF91A';
            var norm_id = 372;
            var session_id = 5041;
            if(user_id && request_unique_id && report_uid && norm_id && session_id){
                $.ajax({
                    url:OneDrop.base_url + '/ceping/report',
                    dataType:'json',
                    method:'POST',
                    data:{
                        user_id:user_id,
                        request_unique_id:request_unique_id,
                        report_uid:report_uid,
                        norm_id:norm_id,
                        session_id:session_id
                    },
                    success:function (data) {
                        if(data.status == 1){
                            var respondent_uid = data.data.respondent_uid;
                            var request_unique_id = data.data.request_unique_id;
                            localStorage.setItem('respondent_uid_report', respondent_uid);
                            localStorage.setItem('request_unique_id_report', request_unique_id);
                            alert('申请报告成功,请耐心等待,烧糊可通过查看报告按钮查看!');
                        }else{
                            alert('数据错误!');
                        }
                    }
                })
            }else{
                alert('数据错误!');
            }
        }
        //查看测评报告
        this.reportLink = ()=>{
            var respondent_uid = localStorage.getItem('respondent_uid_report');
            var request_unique_id = localStorage.getItem('request_unique_id_report');
            var user_id = REMOTE_WEIXIN_USER_ID;
            if(respondent_uid && request_unique_id && user_id){
                $.ajax({
                    url:OneDrop.base_url + '/ceping/look_report',
                    dataType:'json',
                    method:'POST',
                    data:{
                        respondent_uid:respondent_uid,
                        request_unique_id:request_unique_id,
                        user_id:user_id
                    },
                    success:function (data) {
                        if(data.status == 1){
                            alert(data.data.msg);
                        }else{
                            alert('数据错误!');
                        }
                    }
                })
            }else{
                alert('数据错误!');
            }
        }
    }
    render(){
        const wordStyle = {
            fontSize:'30px'
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
        const btnWordStyle = {
            fontSize:'32px',
            color:'rgb(0,164,251)'
        };
        const btnConyainerStyle = {
            display:'flex',
            flexDirection:'row'
        }
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
                    <input id="evaluation_name" style={{
                        ...inputStyle
                    }}/>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <span style={{
                        ...wordStyle
                    }}>年龄：</span>
                    <input id='evaluation_age' style={{
                        ...inputStyle
                    }}/>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <span style={{
                        ...wordStyle
                    }}>性别：</span>
                    <input name="evaluation_choose_gender"
                           type="radio"
                           value="1"
                           style={{
                               width:'28px',
                               height:'28px',
                               marginLeft:'50px'
                           }}
                    /><span style={{...wordStyle, marginLeft:'20px'}}>男</span>
                    <input name="evaluation_choose_gender"
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
                    <input id="evaluation_email" style={{
                        ...inputStyle
                    }}/>
                </div>


                <div style={{
                    ...contannerStyle
                }}>
                    <span style={{
                        ...wordStyle
                    }}>手机：</span>
                    <input id="evaluation_mobile" style={{
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
                    <input id="evaluation_choose_type" placeholder="选择您想要参与的测评"
                           onFocus={()=>{
                                this.setState({
                                    showEvalutionType:true
                                })
                           }}
                           style={{
                                ...inputStyle
                    }}/>
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginTop:'120px',
                    alignItems:'center'
                }}>
                    <div style={{
                        ...btnConyainerStyle
                    }}>
                        <button onClick={this.evaluation.bind(this)} style={{
                            ...btnWordStyle
                        }}>申请测评</button>
                        <button onClick={this.evaluationLink.bind(this)} style={{
                            ...btnWordStyle,
                            marginLeft:'70px'
                        }}>查看测评链接</button>
                    </div>
                    <div style={{
                        ...btnConyainerStyle,
                        marginTop:'30px'
                    }}>
                        <button onClick={this.report.bind(this)} style={{
                            ...btnWordStyle
                        }}>申请报告</button>
                        <button onClick={this.reportLink.bind(this)} style={{
                            ...btnWordStyle,
                            marginLeft:'70px'
                        }}>查看报告链接</button>
                    </div>
                </div>

                {
                    this.state.showEvalutionType ?
                        <div style={{
                            position:'absolute',
                            top:'300px',
                            left:'90px',
                            width:OneDrop.JS_ScreenW-180 + 'px',
                            height:'700px',
                            backgroundColor:'rgb(235,235,235)',
                            borderRadius:'5px'
                        }}>
                            <div onClick={()=>{
                                this.setState({
                                    showEvalutionType:false
                                })
                            }} style={{
                                display:'block',
                                float:'right',
                                marginRight:'20px',
                                marginTop:'5px'
                            }}>
                                <img style={{width:'40px'}}
                                     src="../../../img/weike/question/close.png"/>
                            </div>
                            <Cells style={{marginTop:'50px'}}>
                                {
                                    ['自我管理测评','15FQ+'].map((content, index)=>{
                                        return (
                                            <Cell key={index} style={{backgroundColor:'rgb(235,235,235)'}}>
                                                <CellBody onClick={()=>{
                                                    $('#evaluation_choose_type').val(content)
                                                    this.setState({
                                                        showEvalutionType:false,
                                                        evaluationType:index+1
                                                    })
                                                }} style={{
                                                    fontSize:'26px'
                                                }}>
                                                    {content}
                                                </CellBody>
                                            </Cell>
                                        )
                                    })
                                }
                            </Cells>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}