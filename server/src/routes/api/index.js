import express from 'express';

const router = express.Router();

import room from './room';
router.use('/room', room);

export default router;
