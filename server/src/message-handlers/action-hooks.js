import { MessageTypes } from '../../../shared/constants.js';
import { Media } from '../data/data-structures/media.js';

export function sendClientMediaQueue(ws, room, user, payload) {
    const mediaQueue = room.getQueuedMedia();
    const message = JSON.stringify({
        messageType: MessageTypes.SERVER_SEND_QUEUE_UPDATE,
        payload: mediaQueue
    });

    ws.send(message);
}

export function sendClientUsers(ws, room, user, payload) {
    const users = room.getUsers();
    const message = JSON.stringify({
        messageType: MessageTypes.SERVER_SEND_USERS_UPDATE,
        payload: users
    })

    ws.send(message);
}

export function addMedia(ws, room, user, payload) {
    const mediaName = payload.mediaName;
    const artist = payload.artist;
    const source = payload.source;
    const mediaUrl = payload.mediaUrl;
    if (!mediaUrl) {
        return;
    }

    const media = new Media(mediaName, artist, source, mediaUrl, user.nickname);
    room.addMediaToQueue(media);
}

export function nextMedia(ws, room, user, payload) {
    if (user.id !== room.host.id) {
        return;
    }

    room.removeFirstMediaFromQueue();
}