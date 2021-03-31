import express from 'express';
import path from 'path';

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
    app.use(express.static(path.join(__dirname, '../../client/build')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
}

// Start our HTTP server
export const httpServer = app.listen(port, () => console.log(`App server listening on port ${port}!`));

// Add ws-server on top of our HTTP server
const rooms = require('./data/room-data.js');
const wsServer = require('./websocket-server.js');
