const socketio = require('socket.io');
const io = socketio();
const redisAdapter = require('socket.io-redis');
const socketAuthorization = require('../middleware/socketAuthorization');
const users = require('../models/users');
const Users = require('./lib/Users');
const Rooms = require('./lib/Rooms');
const Messages = require('./lib/Messages');



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
    Users.upsert(socket.id, socket.request.user);

    Users.list(users => {
        io.emit('onlineList', users);
    });

    socket.on('newMessage', data => {
        const messageData = {
            ...data,
            userId: socket.request.user._id,
            username: socket.request.user.name,
            surname: socket.request.user.surname, 
        };
        Messages.upsert(messageData);
        socket.broadcast.emit('reeiveMessage', messageData);
    });

    Rooms.list(rooms => {
        io.emit('roomList', rooms);
    });

    socket.on('newRoom', roomName => {
        Rooms.upsert(roomName);
        Rooms.list(rooms => {
            console.log(rooms);
            io.emit('roomList', rooms);
        });
    });

   
    socket.on('disconnect', () => {
        Users.remove(socket.request.user._id);

        Users.list(users => {
            io.emit('onlineList', users);
        });
        
    });

    

});

module.exports = socketApi;