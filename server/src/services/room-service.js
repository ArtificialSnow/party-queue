import generateUniqueRoomId from './id-service.js';
import addRoom from '../data/room-data';

const Queue = require('collections/deque');
const Map = require('collections/dict');

function createRoom() {
    const roomId = generateUniqueRoomId();
    const redisClient = redis.CreateClient();
    const channel = `room:${roomId}`;
    var room = {
        roomId: roomId,
        roomCapacity: ROOM_CAPACITY,

        channel: channel,
        redisClient: redisClient,
        users: new Map(),

        mediaQueue: new Queue()
    }

    // Heartbeat for each room
    const interval = setInterval(function ping() {
        users.forEach(function each(ws) {
            if (ws.isAlive === false) {
                return ws.terminate();
            }

            ws.isAlive = false;
            ws.ping();
        });
    }, 30000);


    addRoom(roomId, room);
    return {
        roomId: roomId,
        roomCapacity: ROOM_CAPACITY
    };

}

export default {
    createRoom
}