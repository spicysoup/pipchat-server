if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.use('/api', require('./chat/router'));

// Start the app
const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`API listening on ${port}.`));

const io = require('socket.io')(server);
io.on('connection', socket => {
  io.emit('welcome', {});
});

