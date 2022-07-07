import path from 'path';

export default {
    env: process.env.NODE_ENV || 'development',
    web: {
        port: process.env.PORT || 3000
    },
    logging: {
        level: process.env.LEVEL || 'info'
    },
    line: {
        defaultPreviousHash: '0000000000000000000000000000000000000000000000000000000000000000',
        difficulty: 2,
    },
    csv: {
        filename: "logs.csv",
        path: path.join(path.resolve(), 'data'),
        delimiter: ",",
        headers: ['previousHash', 'message', 'nonce'],
        flush: true,
    }
};