module.exports = (server) => {
  const {printObject} = require('../utils');
  const io = require('socket.io')(server);
  const store = require('./store');

  io.on('connection', socket => {
        console.log('New connection');
        io.emit('welcome', {message: 'Hello', peers: Object.values(store.users)});

        socket.on('chat/message', (data) => {
          printObject(data);

          // A peer registers itself
          if ('self' in data && !('peer' in data)) {
            const {self: id} = data;
            if (id in store.users) {
              store.sockets[id] = socket;
              console.log('New peer registered');
              printObject(store.users);
              io.emit('welcome', {message: 'Hello', peers: Object.values(store.users)});
            }
          }

          const {self, peer, message} = data;
          if (self && peer && message) {
            console.log(`Relaying message to ${peer}`);
            store.sockets[peer].emit('chat/message', data);
          }
        });
      },
  );
};
