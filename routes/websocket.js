var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var util = require('util');
var clientMap = new Object();
var i = 0;
var count = 0;
// expressWs.getWss().on('connection', function(ws) {
//     console.log('connection open');
// });
app.ws('/ws', function(ws, req) {
    util.inspect(ws);
    count++;
    ws.name = ++i;
    clientMap[ws.name] = ws;
    ws.on('message', function(msg) {
        let data = JSON.parse(msg);
        console.log(data);

    });
    ws.on('close', function(msg) {
        console.log('_close,有人离开:', msg);
        delete clientMap[ws.name];
        count--;
    });
    ws.on('error', function(msg) {
        console.log('_error:', msg);
    });
});
// var k = 0;
var aWss = expressWs.getWss('/ws');
setInterval(function() {
    // console.log('aWss.clients:', aWss.clients.name);
    aWss.clients.forEach(function(client) {
        console.log('count:', count);
        let jsonstr = JSON.stringify({
            led1: 0,
            led2: 0,
            led3: 0,
            msg: 'sbsbsbsbsbsbssbsbbsbsb!'
        });
        client.send(jsonstr);
        // client.send('{"name":"oliver","age":18,"gender":"man"}');
        // k++;
    });
}, 1000);
app.listen(3001);
