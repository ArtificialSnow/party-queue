import express from 'express';
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
import { createRoom } from '../../data/room-service.js';

const router = express.Router();

//Create a room
router.post('/create', async (req, res) => {
    var roomData = createRoom();

    res.status(StatusCodes.CREATED)
        .json(roomData);
})

export default router;