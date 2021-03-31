import generateUniqueRoomId from './id-service.js';
import addRoom from '../data/room-data';

const Queue = require('collections/deque');
const Map = require('collections/dict');

function createRoom() {
    var roomId = generateUniqueRoomId();

    var redisClient = redis.createClient();
    redisClient.subscribe(`room:${roomId}`);

    addRoom(roomId, {
        roomId: roomId,
        redisClient: redisClient,
        users: new Map(),
        roomCapacity: ROOM_CAPACITY,
        mediaQueue: new Queue()
    });

    return {
        roomId: roomId,
        roomCapacity: ROOM_CAPACITY
    };

}

export default {
    createRoom
}