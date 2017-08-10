/**
 * Created by jiangsong on 2017/8/10.
 */


var SOCKET = function (io,socket) {

    //用户登录，将该用户的socket添加到DROP_SOCKETS
    socket.on('user login',function (data) {
        var user_id = data.user_id;
        DROP_SOCKETS[user_id] = socket;
    })

    socket.on('new user message',function (data) {
        var target_user_id = data.target_user_id;
        var newsocket = DROP_SOCKETS[target_user_id];
        if(!newsocket){
            socket.emit('new user message',{
                from_user_id:'系统',
                message:'对方已离线',
            })
        }
        newsocket.emit('new user message',{
            from_user_id:data.user_id,
            message:data.message,
        })
    })

}

module.exports = SOCKET;