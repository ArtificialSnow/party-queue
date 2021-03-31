import { Dict as Map } from "collections/dict";
export const rooms = new Map();
rooms.set('ABCDEF', 'x');

export function getRoomById(roomId) {
    return rooms.get(roomId);
}

export function addRoom(roomId, room) {
    rooms.set(roomId, rooms);
}

export function deleteRoom(roomId) {
    rooms.delete(roomId);
}

export default {
    rooms
}