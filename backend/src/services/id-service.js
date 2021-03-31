import getRoomById from '../data/room-data.js';
var randomstring = require('randomstring');

function generateRoomId() {
    return randomstring.generate({
        length: 6,
        charset: 'alphabetic',
        capitalization: 'uppercase'
    });
}

function generateUniqueRoomId() {
    var roomId = generateRoomId();
    while (getRoomById(roomId)) {
        roomId = generateRoomId;
    }

    return roomId;
}

export default {
    generateUniqueRoomId
}