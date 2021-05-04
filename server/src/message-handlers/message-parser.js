import { getRoomById } from '../data/room-cache.js';
import { MessageTypes } from '../../../shared/constants.js';
import { sendClientMediaQueue, sendClientUsers, addMedia, nextMedia } from './action-hooks.js';


function parseMessage(ws, roomId, user, msg) {
    const room = getRoomById(roomId);
    if (!room) {
        return;
    }

    const parsedMessage = JSON.parse(msg);
    const messageType = parsedMessage.messageType;
    const payload = parsedMessage.payload;

    switch (messageType) {
        case (MessageTypes.CLIENT_REQUEST_QUEUE):
            sendClientMediaQueue(ws, room, user, payload);
            break;
        case (MessageTypes.CLIENT_REQUEST_USERS):
            sendClientUsers(ws, room, user, payload);
            break;
        case (MessageTypes.CLIENT_REQUEST_ADD_MEDIA):
            if (!payload) {
                break;
            }
            addMedia(ws, room, user, payload);
            break;
        case (MessageTypes.HOST_REQUEST_NEXT_MEDIA):
            nextMedia(ws, room, user, payload);
            break;
        default:
            break;
    }
}

export {
    parseMessage,
}