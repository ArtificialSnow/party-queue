import { getRoomById } from './room-cache.js';
import { v4 as uuid } from 'uuid';

function randomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function generateRoomId() {
    return randomString(6);
}

export function generateUniqueRoomId() {
    var roomId = generateRoomId();
    while (getRoomById(roomId)) {
        roomId = generateRoomId();
    }

    return roomId;
}

export function generateUserId() {
    return uuid();
}