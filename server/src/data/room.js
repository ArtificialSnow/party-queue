import { generateUniqueRoomId } from './id-service.js';
import ROOM_CAPACITY from '../constants.js';
const Denque = require('denque');
const _ = require('lodash');

export class Room {
    constructor() {
        this.roomId = generateUniqueRoomId();
        this.roomCapacity = ROOM_CAPACITY;
        this.users = new Map();
        this.mediaQueue = new Denque();

        // Heartbeat for each room
        setInterval(function ping() {
            _.forEach(this.users, function each(userId, user) {
                let ws = user.ws;
                if (ws.isAlive === false) {
                    return ws.terminate();
                }

                ws.isAlive = false;
                ws.ping();
            });
        }, 30000);
    }

    message(data) {
        this.users.forEach(user => {
            user.ws.send(data);
        });
    }

    join(user) {
        this.users.add(user);
    }
}
