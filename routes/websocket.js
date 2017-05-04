var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var util = require('util');
// app.use(express.static('./static'));
expressWs.getWss().on('connection', function(ws) {
    console.log('connection open');
});

app.ws('/ws', function(ws, req) {
    util.inspect(ws);
    ws.on('message', function(msg) {
        console.log('_message');
        console.log(msg);
        ws.send('fuck');
    });
    ws.on('open', function(msg) {
        console.log('_open');
        console.log(msg);
        ws.send('open:' + msg);
    });
    ws.on('close', function(msg) {
        console.log('_close');
        console.log(msg);
        ws.send('close:' + msg);
    });
    ws.on('error', function(msg) {
        console.log('_error');
        console.log(msg);
        ws.send('error:' + msg);
    });
});
var aWss = expressWs.getWss('/ws');
var i = 0;
setInterval(function() {
    aWss.clients.forEach(function(client) {
        client.send('hello' + i);
        i++
    });
}, 1000);
app.listen(3001);
