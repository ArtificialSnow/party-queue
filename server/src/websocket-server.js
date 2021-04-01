import { httpServer } from './server.js';
import { parseMessage } from './message-handlers/message-parser.js';
import { getRoomById } from './data/room-data';
import { joinRoom, leaveRoom } from './data/room-service.js';
import { WEBSOCKET_SERVER_PORT } from '../../shared/constants.js';
import { User } from './data/user.js';

const ws = require('ws');
var Url = require('url-parse');
const queryString = require('query-string');

export const wsServer = new ws.Server({ noServer: true, port: WEBSOCKET_SERVER_PORT });
wsServer.on('connection', function connection(ws, request, client) {
    const { query } = new Url(request.url);
    const queries = queryString.parse(query);
    const roomId = queries.roomId;
    const nickname = queries.nickname || 'Anonymous';
    if (!getRoomById(roomId)) {
        this.close();
    }

    // Add user to room list
    const user = new User(ws);
    joinRoom(roomId, user);

    // Respond to heartbeats
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
        console.log('pong received');
    });

    // Parse incoming messages
    ws.on('message', function incoming(data) {
        parseMessage(roomId, nickname, data);
    });

    ws.on('close', function close() {
        leaveRoom(roomId, user);
        console.log('disconnected');
    });
});

// Let the ws-server handle upgrade requests and respond with a ws-connection
httpServer.on('upgrade', (request, socket, head) => {
    const { query, pathname } = new Url(request.url);
    if (pathname !== '/join') {
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        socket.destroy();
        return;
    }

    const queries = queryString.parse(query);
    const roomId = queries.roomId;
    if (!roomId) {
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        socket.destroy();
        return;
    }

    const room = getRoomById(roomId);
    if (!room) {
        socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
        socket.destroy();
        return;
    }

    if (room.isFull()) {
        socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
        socket.destroy();
        return;
    }

    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
    });
});