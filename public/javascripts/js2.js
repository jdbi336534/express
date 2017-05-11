 var iosocket = null;
 window.onload = function() {
     iosocket = io.connect('http://localhost:3002');
     //链接服务器
     iosocket.on('connect', function() {
         iosocket.send('hello, from client');
         iosocket.emit('login', { userid: '1011xx', username: 'jiangdb' });
     });

     //接受服务端来的信息
     iosocket.on('message', function(msg) {});
     iosocket.on('disconnect', function() {
         console.log('server closed!');
     });
     iosocket.on('login', function(e) {
         console.log('用户登录：', e);
     });

 }
