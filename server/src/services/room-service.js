import { Room } from '../data/data-structures/room.js';
import { getRoomById, addRoom } from '../data/room-cache.js';

export function createRoom() {
    const room = new Room();
    const roomId = room.roomId;
    const roomCapacity = room.ROOM_CAPACITY;

    addRoom(roomId, room);
    
    return {
        roomId: roomId,
        roomCapacity: roomCapacity
    };
}

export function queryRoom(roomId) {
    const room = getRoomById(roomId);
    if (!room) {
        return {
            exists: false,
            isFull: false
        };
    }

    const isFull = room.isFull();
    return {
        exists: true,
        isFull: isFull
    };
}

export function joinRoom(roomId, user) {
    const room = getRoomById(roomId);
    if (!room) {
        return;
    }

    const userId = user.id;
    room.addUser(userId, user);
}

export function leaveRoom(roomId, user) {
    const room = getRoomById(roomId);
    if (!room) {
        return;
    }

    const userId = user.id;
    room.removeUser(userId);
}