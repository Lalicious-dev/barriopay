import express from 'express';

const router = express.Router();

router.get('alive', (req,res) => res.send('server alive'));






export default router;