import { addRoom } from '../data/room-data';
import { Room } from './Room.js';

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