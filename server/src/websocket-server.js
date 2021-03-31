import { httpServer } from './server.js';

const ws = require('ws');
export const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', function connection(ws, request, client) {
    ws.on('message', function message(msg) {
        console.log(`Received message ${msg} from user ${client}`);
    });
});

// Let the ws-server handle upgrade requests and respond with a ws-connection
httpServer.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, ws => {
        wsServer.emit('connection', ws, request);
    });
});