/**
 * Created by jiangsong on 2017/8/10.
 */

import React from 'react';
import {
    Form,
    FormCell,
    CellBody,
    TextArea,
    Cells,
    Cell,
    CellFooter,
    Button
} from 'react-weui';

export default class SocketTest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clientMessages:[],
            myarray:['1','2','3']
        }
        this.SOCKET = io();
    }
    componentDidMount(){
        var self = this;
        this.SOCKET.emit('user login',{user_id:REMOTE_WEIXIN_USER_ID});
        this.SOCKET.on('new user message',function (data) {

            var newMessages = self.state.clientMessages;
            newMessages.push(data);
            self.setState({
                clientMessages:newMessages
            })
        })
    }
    render(){
        return(
            <div>
                <Cells>
                    {
                        this.state.clientMessages.map((con,idx)=>{
                            return(
                                <Cell key={idx}>
                                    <CellBody>
                                        {con.message}
                                    </CellBody>
                                    <CellFooter>
                                        {con.from_user_id}
                                    </CellFooter>
                                </Cell>
                            )
                        })
                    }
                </Cells>
                <Form>
                    <FormCell>
                        <CellBody>
                            <TextArea id='socket_test_area' placeholder="Enter your comments" rows="3" maxlength="200"/>
                        </CellBody>
                    </FormCell>
                </Form>
                <Button onClick={()=>{
                    var message = $('#socket_test_area').val();
                    if(!message) return;
                    var data = {
                        user_id:REMOTE_WEIXIN_USER_ID,
                        target_user_id:'oyMAaxN1hGZuki6cOvwF6OSQ-Ahs',
                        message:message
                    }
                    this.SOCKET.emit('new user message',data);
                    var newMessages = this.state.clientMessages;
                    newMessages.push({
                        from_user_id:REMOTE_WEIXIN_USER_ID+'_client',
                        message:message
                    })
                    this.setState({
                        clientMessages:newMessages
                    })
                    $('#socket_test_area').val('');
                }}>发送消息</Button>
            </div>
        )
    }
}