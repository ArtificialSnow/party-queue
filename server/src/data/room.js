import { generateUniqueRoomId } from './id-service.js';
import { ROOM_CAPACITY, ROOM_HEARTBEAT_FREQUENCY } from '../constants.js';
const Denque = require('denque');

export class Room {
    constructor() {
        var self = this;
        this.roomId = generateUniqueRoomId();
        this.roomCapacity = ROOM_CAPACITY;
        this.creationTime = new Date().getTime();
        this.users = new Map();
        this.mediaQueue = new Denque();

        // Start heartbeat for room
        setInterval(() => {
            console.log(`pinging ${self.users.size} users in ${self.roomId}`);
            self.users.forEach((user, userId) => {
                let ws = user.ws;
                if (ws.isAlive === false) {
                    return ws.close();
                }

                ws.isAlive = false;
                ws.ping();
            });
        }, ROOM_HEARTBEAT_FREQUENCY);
    }

    message(data) {
        this.users.forEach(user => {
            user.ws.send(data);
        });
    }

    addToQueue(media) {
        this.mediaQueue.push(media);
    }

    removeFirst() {
        this.mediaQueue.shift();
    }

    addUser(userId, user) {
        this.users.set(userId, user);
        //Send back the queue data. 
        console.log(`added user. ${this.users.size} in ${this.roomId}`);
    }

    removeUser(userId) {
        this.users.delete(userId);
        console.log(`removed user. ${this.users.size} in ${this.roomId}`);
    }

    isFull() {
        return this.users.size >= this.roomCapacity;
    }

    isEmpty() {
        return this.users.size === 0;
    }
}
