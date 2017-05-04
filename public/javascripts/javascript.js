window.onload = function() {
    var ws = new WebSocket('ws://localhost:3001/ws');
    // var ws = new WebSocket('ws://localhost:3020/');
    // 客户端接收服务端数据时触发
    ws.onmessage = function(e) {
        console.log('_message');
        console.log(e.data);
    };
    // 通信发生错误时触发
    ws.onerror = function(err) {
        console.log('_error');
        console.log(err);
    };
    // 连接建立时触发
    ws.onopen = function() {
        ws.send('_connect,123456465464');
        console.log('_connect,123456465464')
    };
    // 连接关闭时触发
    ws.onclose = function() {
        console.log('_close');
    };
    // ws.on('news', function(data) {
    //     console.log(data);
    //     ws.emit('my other event', { my: 'data' });
    // });
};
