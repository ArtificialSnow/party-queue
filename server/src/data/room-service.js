import { Room } from './Room.js';
import { getRoomById } from '../data/room-data.js';
import { addRoom } from '../data/room-data';

export function roomExists(roomId) {
    return Boolean(getRoomById(roomId));
}

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