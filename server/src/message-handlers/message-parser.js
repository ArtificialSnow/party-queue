import { getRoomById } from '../data/room-data.js';

function parseMessage(roomId, nickname, msg) {
    const room = getRoomById(roomId);
    if (!room) {
        //reply invalid message to client
    }
    console.log(`${nickname}: ${msg} to ${roomId}`);
    var query = msg.split(" ");
    if(query[0] == "addLast"){
        room.addToQueue(query[1]);
        room.message(msg);
        return; 
    }
    if(query[0] == "removeFirst"){
        room.removeFirst();
        room.message(query[0]);
        return; 
    }
   
}

export {
    parseMessage,
}