const socketio = require('socket.io');
const io = socketio();
const redisAdapter = require('socket.io-redis');

const socketApi = {
    io
};

io.adapter(redisAdapter({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
}));

io.on('connection', socket => {
    console.log('A user connected');
});

module.exports = socketApi;