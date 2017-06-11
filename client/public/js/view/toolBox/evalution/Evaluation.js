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

/**
 * evaluation_status
 *      0 : 无任何操作状态,初始化状态
 *      1 : 申请测评链接成功,可点击查看测评链接
 *      2 : 已点击测评链接: 提示,若您已经完成测评,可通过点击申请报告,向系统申请您的测评报告
 *      3 : 申请报告成功,可点击查看报告链接
 *      4 : 已点击报告链接
 * */

export default class Evaluation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEvalutionType:false,
            evaluationType:0, //1、自我管理测评  2、15FQ+
            isShowLink:false,
            link:'',
            whatLink:false, //false 测评链接  true 测评报告链接
            isLoading:false,
            loadingMsg:'',
            guideMsg:'',
            evaluationStatus:0
        }
        //申请测评链接
        this.evaluation = ()=>{
            var self = this;
            if(this.state.isLoading){
                return;
            }
            this.setState({
                isLoading:true,
                loadingMsg:'正在申请测评测评链接,请耐心等待...'
            })
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
            if(name){

            }else{
                alert('请输入您的姓名!');
                return;
            }
            if(age){

            }else{
                alert('请输入您的年龄!');
                return;
            }
            if(gender){

            }else{
                alert('请选择您的性别!');
                return;
            }
            if(email){

            }else{
                alert('请输入正确的电子邮件!');
                return;
            }
            if(mobile){

            }else{
                alert('请输入正确的手机号!');
                return;
            }
            if(user_id && name && age && gender && email && mobile){

                // alert(user_id+'='+name+'='+age+'='+gender+'='+email+'='+mobile);

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
                        self.setState({
                            isLoading:false
                        })
                        if(data.status == 1){
                            var request_unique_id = data.data.request_unique_id;
                            //将该值存储到本地
                            localStorage.setItem('request_unique_id_link', request_unique_id);
                            localStorage.setItem('evaluation_status', 1);
                            self.setState({
                                guideMsg:'您已成功申请测评链接,可通过查看测评链接,参与测评!',
                                evaluationStatus:1
                            });
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
        this.evaluationLink = (self)=>{
            if(this.state.isLoading){
                return;
            }
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
                            self.setState({
                                isShowLink:true,
                                link:data.data.msg,
                                whatLink:false
                            })
                        }else {
                            alert('数据错误!');
                        }
                    }
                })
            }else{
                alert(user_id);
                alert('数据错误,请重新申请测评!');
            }
        }
        //申请测评报告
        this.report = ()=>{
            if(this.state.isLoading){
                return;
            }
            this.setState({
                isLoading:true,
                loadingMsg:'正在帮您申请测评报告,请耐心等待...'
            })
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
                        self.setState({
                            isLoading:false
                        })
                        if(data.status == 1){
                            var respondent_uid = data.data.respondent_uid;
                            var request_unique_id = data.data.request_unique_id;
                            localStorage.setItem('respondent_uid_report', respondent_uid);
                            localStorage.setItem('request_unique_id_report', request_unique_id);
                            localStorage.setItem('evaluation_status', 3);
                            self.setState({
                                guideMsg:'您已成功申请报告,可通过点击查看报告链接查看测评报告!',
                                evaluationStatus:3
                            })
                            alert('申请报告成功,请耐心等待,稍后可通过查看报告按钮查看!');
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
        this.reportLink = (self)=>{
            if(this.state.isLoading){
                return;
            }
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
                            self.setState({
                                isShowLink:true,
                                link:data.data.msg,
                                whatLink:true
                            })
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

    componentDidMount() {
        var evaluationStatus = localStorage.getItem('evaluation_status');
        console.log('evalutionStatus:',evaluationStatus);
        if(evaluationStatus){
            var num = Number(evaluationStatus);
            var msg = '';
            if(num === 0){
                msg = '';
            }else if(num === 1){
                msg = '您已成功申请测评链接,可通过查看测评链接,参与测评!';
            }else if(num === 2){
                msg = '如果您已完成测评,可以点击申请报告按钮申请报告!';
            }else if(num === 3){
                msg = '您已成功申请报告,可通过点击查看报告链接查看测评报告!';
            }else {
                msg = '';
            }
            this.setState({
                guideMsg:msg,
                evaluationStatus:num
            })
        }else{
            localStorage.setItem('evaluation_status', 0);
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
                    display:'flex',justifyContent:'center',width:'100%',marginTop:'40px'
                }}>
                    <p style={{fontSize:'28px',marginLeft:'30px',marginRight:'30px'}}>{this.state.guideMsg}</p>
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    marginTop:'80px',
                    alignItems:'center'
                }}>
                    <div style={{
                        ...btnConyainerStyle
                    }}>
                        <button onClick={this.evaluation.bind(this)} style={{
                            ...btnWordStyle
                        }}>申请测评</button>
                        <button onClick={()=>{
                            this.evaluationLink(this);
                        }} style={{
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
                        <button onClick={()=>{
                            this.reportLink(this);
                        }} style={{
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
                {
                    this.state.isShowLink ?
                        <div style={{
                            position:'absolute',
                            left:'30px',
                            width:(OneDrop.JS_ScreenW - 120)+'px',
                            top:'500px',
                            height:'300px',
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            borderRadius:'10px',
                            backgroundColor:'rgb(235,235,235)',
                            borderWidth:'2px',
                            borderColor:'gray',
                            borderStyle:'solid'
                        }}>
                            <p style={{
                                fontSize:'32px',
                                marginTop:'10px'
                            }}>点击链接,{!this.state.whatLink ? '参与测评':'查看报告'}:</p>
                            <a onClick={()=>{
                                if(this.state.whatLink){
                                    localStorage.setItem('evaluation_status', 4);
                                    self.setState({
                                        guideMsg:'',
                                        evaluationStatus:4
                                    });
                                    return;
                                }
                                localStorage.setItem('evaluation_status', 2);
                                self.setState({
                                    guideMsg:'如果您已完成测评,可以点击申请报告按钮申请报告!',
                                    evaluationStatus:2
                                })
                            }} style={{
                                fontSize:'32px',
                                marginTop:'20px',
                                marginLeft:'20px',
                                marginRight:'20px'
                            }} href={this.state.link}>{this.state.link}</a>
                            <p style={{fontSize:'34px',marginTop:'20px'}} onClick={()=>{
                                this.setState({
                                    isShowLink:false,
                                    link:''
                                })
                            }}>确定</p>
                        </div> : null
                }
                {
                    this.state.isLoading ?
                        <div style={{
                            position:'absolute',
                            width:'400px',
                            height:'300px',
                            top:'50%',
                            left:(OneDrop.JS_ScreenW-400)/2 + 'px',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'white',
                            borderRadius:'20px',
                            borderWidth:'2px',
                            borderColor:'rgb(235,235,235)',
                            borderStyle:'solid'
                        }}>
                            <div>
                                <p style={{fontSize:'26px'}}>{this.state.loadingMsg}</p>
                            </div>
                            <img style={{width:'140px',height:'140px',marginTop:'20px'}} src="../../../../img/weike/home/loading.gif"/>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}