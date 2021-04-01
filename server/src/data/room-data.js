import { ROOM_SOFT_EXPIRATION_TIME, ROOM_HARD_EXPIRATION_TIME, ROOM_CACHE_CLEAN_FREQUENCY } from '../constants.js';

// Initialize the cache
const roomCache = new Map();
setInterval(() => {
    console.log(`Cleaning room cache. Cache size:${roomCache.size}`);
    roomCache.forEach((room, roomId) => {
        const currentTime = new Date().getTime();
        const diffTimeInMs = Math.abs(currentTime - room.creationTime);

        if ((diffTimeInMs > ROOM_SOFT_EXPIRATION_TIME && room.isEmpty()) || diffTimeInMs > ROOM_HARD_EXPIRATION_TIME) {
            console.log(`${roomId} cleaned from cache`);
            deleteRoom(roomId);
        }
    });
}, ROOM_CACHE_CLEAN_FREQUENCY);

export function getRoomById(roomId) {
    return roomCache.get(roomId);
}

export function addRoom(roomId, room) {
    if (getRoomById(roomId)) {
        throw new Error('Room already exists');
    }

    roomCache.set(roomId, room);
}

export function deleteRoom(roomId) {
    const room = getRoomById(roomId);
    room.users.forEach((user, userId) => {
        user.ws.terminate();
    });
    
    roomCache.delete(roomId);
}