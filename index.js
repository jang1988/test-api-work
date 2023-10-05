const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://test-client-work.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

app.use(cors())

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions++;
  io.emit('activeSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    io.emit('activeSessions', activeSessions);
  });
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
