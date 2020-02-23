module.exports = (server) => {
  const { printObject } = require('../utils');
  const io = require('socket.io')(server);
  io.on('connection', socket => {
    io.emit('welcome', {message: 'Hello'});

    socket.on('chat/start', (data) => {
      console.log(data);
      socket.emit('chat/invited', {message: data});
    });

    socket.on('chat/message', (data) => {
      printObject(data);
    });
  });
};
