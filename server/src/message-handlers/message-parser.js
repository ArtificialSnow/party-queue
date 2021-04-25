import { getRoomById } from '../data/room-data.js';

function parseMessage(roomId, nickname, msg) {
    const room = getRoomById(roomId);
    if (!room) {
        //reply invalid message to client
    }
    console.log(`${nickname}: ${msg} to ${roomId}`);
    room.message(`${nickname}: ${msg} to ${roomId}`);
}

export {
    parseMessage,
}