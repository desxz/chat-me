const socketio = require('socket.io');
const io = socketio();
const redisAdapter = require('socket.io-redis');
const socketAuthorization = require('../middleware/socketAuthorization');

const socketApi = {
    io
};
io.use(socketAuthorization);

io.adapter(redisAdapter({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
}));

io.on('connection', socket => {
    console.log(socket.request.user.name + ' connected!');
});

module.exports = socketApi;