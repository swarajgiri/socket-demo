'use strict';

const app  = require('express')(),
    server = require('http').Server(app),
    io     = require('socket.io')(server),
    port   = process.env.PORT,
    _      = require('lodash');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    const interval = setInterval(() => {
        socket.broadcast.emit('RANDOM_DATA', generateRandomData());
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(interval);
    });
});

server.listen(port);

function generateRandomData() {
    return _.map([
        'AAAA',
        'BBBB',
        'CCCC',
        'DDDD',
    ], (key) => {
        return {
            key,
            'age': _.random(0, 100)
        };
    });
}
