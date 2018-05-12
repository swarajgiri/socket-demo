'use strict';

const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
    name: 'socket-server',
    streams: [
        {
            stream: process.stdout,
            level: 'debug'
        },
        {
            path : 'app.log',
            level: 'info'
        }
    ],
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res
    }
});
