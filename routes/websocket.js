var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var util = require('util');
var clientMap = new Object();
var i = 0;

expressWs.getWss().on('connection', function (ws) {
    console.log('connection open');
});
app.ws('/ws', function (ws, req) {
    util.inspect(ws);
    ws.name=++i;
    clientMap[ws.name]=ws;
    ws.on('message', function (msg) {
        console.log('接收到数据：',msg);
    });
    ws.on('open', function (msg) {
        ws.send('open:', msg);
    });
    ws.on('close', function (msg) {
        console.log('_close,有人离开:', msg);
         delete clientMap[ws.name];
    });
    ws.on('error', function (msg) {
        console.log('_error:', msg);
    });
});
var k=0;
var aWss = expressWs.getWss('/ws');
setInterval(function () {
    // console.log('aWss.clients:',aWss.clients);
    aWss.clients.forEach(function (client) {
        client.send('the '+k+'times send data:'+k);
        k++;
    });
}, 1000);
app.listen(3001);
