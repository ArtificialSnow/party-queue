import { MessageActions } from './message-actions.js';

export function validateMessage(message, callback) {
    try {
        validateMessageInternal()
    }
    catch {

    }
}

function validateMessageInternal(message) {
    var roomId = message.roomId;
    if (!roomId) {
        throw 'roomId is required';
    }

    var action = message.action;
    if (!action) {
        throw 'action is required';
    }

    var utcTimeStamp = message.timestamp;
    if (!utcTimeStamp) {
        throw 'timestamp is required';
    }

    switch (action) {
        case MessageActions.STATE_HYDRATION:
            break;
        case MessageActions.USER_JOIN:
            break;
        case MessageActions.USER_LEAVE:
            break;
        case MessageActions.ADD_MEDIA_TO_QUEUE:
            break;
        default:
            throw 'action not recognized';
    }

    var payload = message.payload;
    if (payload) {
        validatePayload(payload);
    }
}

function validatePayload(message, messageAction) {
    var payload = message.payload;
    if (!payload) {
        throw 'payload is required';
    }

    switch (messageAction) {
        case MessageAction.STATE_HYDRATION:
            if(!payload) {
                throw 'payload requires properties: '
            }
            break;
        case MessageActions.ADD_MEDIA_TO_QUEUE:
            if(!payload.mediaName || !payload.artistName || !payload.source) {
                throw 'payload requires properties: mediaName, artistName, source'
            }
            break;
        default:
            throw 'payload not expected';
    }
}