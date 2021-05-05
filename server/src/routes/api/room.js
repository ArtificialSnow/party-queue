import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { createRoom, queryRoom } from '../../services/room-service.js';

const router = express.Router();

//Create a room
router.post('/create', async (req, res) => {
    var roomData = createRoom();

    res.status(StatusCodes.CREATED)
        .json(roomData);
})

router.get('/peek', async(req, res) => {
    var roomId = req.query['roomId'];
    if (!roomId) {
        return res.status(StatusCodes.BAD_REQUEST);
    }

    var queryData = queryRoom(roomId);
    res.status(StatusCodes.OK)
        .json(queryData);
})

export default router;