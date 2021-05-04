import { httpServer } from './server.js';
import { parseMessage } from './message-handlers/message-parser.js';
import { getRoomById } from './data/room-cache';
import { joinRoom, leaveRoom } from './services/room-service.js';
import { BAD_REQUEST_RESPONSE, NOT_FOUND_RESPONSE, FORBIDDEN_RESPONSE } from '../../shared/constants.js';
import { User } from './data/data-structures/user.js';

const ws = require('ws');
var Url = require('url-parse');
const queryString = require('query-string');

export const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', function connection(ws, request, client) {
    const { query } = new Url(request.url);
    const queries = queryString.parse(query);
    const roomId = queries.roomId;
    if (!getRoomById(roomId)) {
        ws.close();
    }

    // Add user to room list
    const user = new User(ws);
    joinRoom(roomId, user);

    // Respond to heartbeats
    ws.isAlive = true;
    ws.on('pong', () => {
        ws.isAlive = true;
    });

    // Parse incoming messages
    ws.on('message', function incoming(data) {
        parseMessage(ws, roomId, user, data);
    });
    
    // When the ws connection is closed
    ws.on('close', function close() {
        leaveRoom(roomId, user);
    });  
});

// Let the ws-server handle upgrade requests and respond with a ws-connection
httpServer.on('upgrade', (request, socket, head) => {
    const { query, pathname } = new Url(request.url);
    if (pathname !== '/join') {
        socket.write(BAD_REQUEST_RESPONSE);
        socket.destroy();
        return;
    }

    const queries = queryString.parse(query);
    const roomId = queries.roomId;
    if (!roomId) {
        socket.write(BAD_REQUEST_RESPONSE);
        socket.destroy();
        return;
    }

    const room = getRoomById(roomId);
    if (!room) {
        socket.write(NOT_FOUND_RESPONSE);
        socket.destroy();
        return;
    }

    if (room.isFull()) {
        socket.write(FORBIDDEN_RESPONSE);
        socket.destroy();
        return;
    }

    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
    });
});