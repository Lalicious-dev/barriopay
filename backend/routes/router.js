import express from 'express';
import {WalletController} from '../controllers/WalletController.js'
const router = express.Router();

router.get('alive', (req,res) => res.send('server alive'));

// Merchants
router.post('/merchant',()  );



//Wallets
router.get('/wallet',


    WalletController.getWallets
)

export default router;