import express from 'express';
import path from 'path';
const ws = require('ws');

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Setup body-parser
app.use(express.json());

// Setup our routes.
import routes from './routes';
app.use('/', routes);

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, '../public')));

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {

    // Make all files in that folder public
    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });
}

// Start our http server
const httpServer = app.listen(port, () => console.log(`App server listening on port ${port}!`));

// Add ws-server on top of our HTTP server
const wsServer = new ws.Server({ noServer: true });
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