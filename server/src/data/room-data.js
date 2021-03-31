import { Dict as Map } from "collections/dict";
const rooms = new Map();

function getRoomById(roomId) {
    return rooms.get(roomId);
}

function addRoom(roomId, room) {
    rooms.set(roomId, rooms);
}

function deleteRoom(roomId) {
    rooms.delete(roomId);
}

export default {
    rooms,
    getRoomById,
    addRoom,
    deleteRoom
}