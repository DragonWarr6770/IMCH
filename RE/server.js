const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // Open global uplink
});

io.on('connection', (socket) => {
    console.log('NODE_CONNECTED:', socket.id);

    socket.on('transmit_burst', (data) => {
        // Broadcast to all active nodes
        io.emit('receive_burst', data);
    });

    socket.on('disconnect', () => console.log('NODE_OFFLINE'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`CORE_LISTENING_ON_PORT_${PORT}`));