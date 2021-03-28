import express from 'express';

const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

//Create a room
router.post('/create', async (req, res) => {
    res.status(HTTP_CREATED)
        .header('roomId', `/api/room/123`)
        .json();
})

router.put('/delete', async (req, res) => {
    
})

router.put('/join', async (req, res) => {

})

router.put('/leave', async (req, res) => {
    
})

export default router;
