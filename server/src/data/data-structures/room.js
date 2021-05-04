import { generateUniqueRoomId } from '../../services/id-service.js';
import { ROOM_CAPACITY, ROOM_HEARTBEAT_FREQUENCY } from '../../constants.js';
import { MessageTypes } from '../../../../shared/constants.js';
const Denque = require('denque');

export class Room {
    constructor() {
        var self = this;
        this.roomId = generateUniqueRoomId();
        this.roomCapacity = ROOM_CAPACITY;
        this.creationTime = new Date().getTime();
        this.users = new Map();
        this.mediaQueue = new Denque();

        this.host = null;

        // Start heartbeat for room
        this.heartbeat = setInterval(() => {
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

    messageAllUsers(data) {
        this.users.forEach(user => {
            user.ws.send(data);
        });
    }

    addMediaToQueue(media) {
        if (this.mediaQueue.length > 50) {
            return;
        }

        this.mediaQueue.push(media);

        const newQueue = this.getQueuedMedia();
        room.messageAllUsers(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_QUEUE_UPDATE,
            payload: newQueue
        }));
    }

    removeFirstMediaFromQueue() {
        this.mediaQueue.shift();

        const newQueue = this.getQueuedMedia();
        room.messageAllUsers(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_QUEUE_UPDATE,
            payload: newQueue
        }));
    }

    addUser(userId, user) {
        if (this.isFull) {
            return;
        }

        // Make the first user to join the Host
        if (this.isEmpty()) {
            this.host = user;
        }

        this.users.set(userId, user);

        const users = this.getUsers();
        room.messageAllUsers(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_USERS_UPDATE,
            payload: users
        }));
    }

    removeUser(userId) {
        if (userId === this.host?.userId) {
            this.close();
            return;
        }

        this.users.delete(userId);

        const users = this.getUsers();
        room.messageAllUsers(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_USERS_UPDATE,
            payload: users
        }));
    }

    isFull() {
        return this.users.size >= this.roomCapacity;
    }

    isEmpty() {
        return this.users.size === 0;
    }

    getQueuedMedia() {
        var media = [];
        for (let i = 0; i < this.mediaQueue.length; i++) {
            media.push(this.mediaQueue.peekAt(i));
        }

        return media;
    }

    getUsers() {
        var users = [];
        this.users.foreach((value, key, map) => {
            users.push({ value });
        });

        return users;
    }

    close() {
        clearInterval(this.heartbeat);
        this.users.forEach((user, userId) => {
            user.ws.terminate();
        });
    }
}
