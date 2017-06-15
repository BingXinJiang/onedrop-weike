/**
 * Created by jiangsong on 2017/5/31.
 */
import React from 'React';
import OneDrop from '../../const/onedrop';
import Drop from './everyday/Drop';
import LeadPage from './everyday/LeadPage';
import async from 'async';
import ListDrop from './everyday/ListDrop';

export default class LastDrop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowEverydayDrop:false,
            section_id:0,
            isShowLeadPage:false,
            scrollTopNum:0,
        };

    }



    componentDidMount() {
        $.ajax({
            url:OneDrop.base_ip + '/main/pay/getsign',
            dataType:'json',
            method:'POST',
            data:{
                location_url:encodeURIComponent(location.href.split('#')[0])
            },
            success:function (data) {
                if(data.status === 0){
                    callback('执行错误');
                }
                var payData = data.data;
                wx.config({
                    debug:false,
                    appId:OneDrop.appId,
                    timestamp:payData.timestamp,
                    nonceStr:payData.nonceStr,
                    signature:payData.signature,
                    jsApiList:[
                        'chooseWXPay'
                    ]
                })
            }
        })
    }


    render(){
        return (
            <div>
                {
                    !this.state.isShowLeadPage&&!this.state.isShowEverydayDrop ?
                         <ListDrop callback1={(sectionId)=>{
                             this.setState({
                                 section_id:sectionId,
                                 isShowEverydayDrop:true
                             })
                         }} callback2={()=>{
                             this.setState({
                                 isShowLeadPage:true
                             })
                         }}/>
                        : null
                }
                {
                    this.state.isShowEverydayDrop ?
                        <Drop sectionId={this.state.section_id} callback={()=>{
                            this.setState({
                                isShowEverydayDrop:false
                            })
                        }}/>
                        : null
                }
                {
                    this.state.isShowLeadPage ?
                        <LeadPage callback={()=>{
                            document.body.scrollTop=0;
                            this.setState({
                                isShowLeadPage:false,
                            });
                        }}/>
                        :
                        null
                }
            </div>
        )
    }
}