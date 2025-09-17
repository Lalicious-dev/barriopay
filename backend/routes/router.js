import express from 'express';

const router = express.Router();

router.get('alive', (req,res) => res.send('server alive'));

// Merchants
router.post('/merchant',()  );





export default router;