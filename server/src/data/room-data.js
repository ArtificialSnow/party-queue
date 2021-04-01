import ROOM_EXPIRATION_TIME from '../constants.js';

const NodeCache = require('node-cache');
const roomCache = new NodeCache({
    stdTTL: ROOM_EXPIRATION_TIME,
    checkperiod: 600,
    useclones: false,
    deleteOnExpire: true,
    maxKeys: -1
});

export function getRoomById(roomId) {
    return roomCache.get(roomId);
}

export function addRoom(roomId, room) {
    roomCache.set(roomId, room, ROOM_EXPIRATION_TIME);
}

export function deleteRoom(roomId) {
    roomCache.del(roomId);
}