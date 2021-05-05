import { generateUniqueRoomId } from '../../services/id-service.js';
import { ROOM_CAPACITY, ROOM_HEARTBEAT_FREQUENCY, QUEUE_CAPACITY } from '../../constants.js';
import { MessageTypes } from '../../../../shared/constants.js';
import { deleteRoom } from '../room-cache.js'; 
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
        if (this.mediaQueue.length > QUEUE_CAPACITY) {
            return;
        }

        this.mediaQueue.push(media);

        const newQueue = this.getQueuedMedia();
        this.messageAllUsers(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_QUEUE_UPDATE,
            payload: newQueue
        }));
    }

    removeFirstMediaFromQueue() {
        this.mediaQueue.shift();

        const newQueue = this.getQueuedMedia();
        this.messageAllUsers(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_QUEUE_UPDATE,
            payload: newQueue
        }));
    }

    addUser(userId, user) {
        if (!userId || !user) {
            return;
        }

        if (this.isFull()) {
            return;
        }

        // Make the first user to join the Host
        if (this.isEmpty()) {
            this.host = user;
        }
        this.users.set(userId, user);

        const userInfo = {
            id: user.id,
            nickname: user.nickname,
            isHost: (user.id === this.host.id)
        };

        user.ws.send(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_USER_IDENTIFICATION,
            payload: userInfo
        }));

        const users = this.getUsers();
        this.messageAllUsers(JSON.stringify({
            messageType: MessageTypes.SERVER_SEND_USERS_UPDATE,
            payload: users
        }));
    }

    removeUser(userId) {
        if (!userId) {
            return;
        }

        if (this.host && userId === this.host.id) {
            deleteRoom(this.roomId);
            return;
        }

        this.users.delete(userId);

        const users = this.getUsers();
        this.messageAllUsers(JSON.stringify({
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
        var userData = [];
        this.users.forEach((value, key, map) => {
            userData.push(
                { 
                    id: value.id,
                    nickname: value.nickname,
                    isHost: (value.id === this.host.id)
                });
        });

        return userData;
    }

    close() {
        clearInterval(this.heartbeat);
        this.users.forEach((user, userId) => {
            user.ws.terminate();
        });
    }
}
