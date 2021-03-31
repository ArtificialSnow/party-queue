import { httpServer } from './server.js';
import { parseMessage } from './message-handlers/message-parser.js';
import { getRoomById } from './data/room-data';

const ws = require('ws');
var Url = require('url-parse');
const queryString = require('query-string');

export const wsServer = new ws.Server({ noServer: true, port: 8080 });
wsServer.on('connection', function connection(ws, request, client) {
    const { query } = new Url(request.url);
    const queries = queryString.parse(query);
    const roomId = queries.roomId;
    const nickname = queries.nickname || 'Anonymous';

    ws.on('open', function open(msg) {
        //add user to room user list
    });

    ws.on('message', function message(msg) {
        parseMessage(roomId, nickname, msg);
    });

    ws.on('error', function error(msg) {
        //resend message
    });

    ws.on('close', function close(msg) {
        //remove user from room user list
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

    const roomIsFull = false;
    if (roomIsFull) {
        socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
        socket.destroy();
        return;
    }

    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
    });
});