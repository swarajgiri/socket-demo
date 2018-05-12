'use strict';

const app     = require('express')(),
    _         = require('lodash'),
    server    = require('http').Server(app),
    client    = require('socket.io-client'),
    source1   = client('http://127.0.0.1:8080'),
    source2   = client('http://127.0.0.1:8081'),
    log       = require('./logger'),
    port      = process.env.PORT,
    recieved  = {};

source1.on('connect', (socket) => {
    log.info('source1 connected');
});

source2.on('connect', (socket) => {
    log.info('source2 connected');
});

source1.on('RANDOM_DATA', handleRandomData);
source2.on('RANDOM_DATA', handleRandomData);

source1.on('disconnect', (socket) => {
    log.info('source1 disconnected');
});

source2.on('disconnect', (socket) => {
    log.info('source2 disconnected');
});

app.get('/api/people/:key', (req, res, next) => {
    const key = _.trim(req.params.key);

    res.json({
        key,
        'age': recieved[key]
    });
});

server.listen(8082, () => {
    log.info('Socket sink listining on 8082');
});

app.listen(port, () => {
    log.info(`API running on ${port}`);
});

function handleRandomData(collection) {
    log.info('Recieved', collection);

    _.forEach(collection, (item) => {
        recieved[item.key] = item.age;
    });
}