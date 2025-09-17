import express from 'express';
import {WalletController} from '../controllers/WalletController.js'
import { walletsExists, walletsInputs } from '../middleware/wallet.middleware.js';
import { validateErrors } from '../middleware/validateErrors.middleware.js';
const router = express.Router();
const MerchantsController = require("../controllers/MerchantController.js");

router.get('alive', (req,res) => res.send('server alive'));

// Merchants
router.post('/createmerchant', MerchantsController.createMerchant);
router.get('/getMerchant', MerchantsController.getMerchant);



//Wallets
router.get('/wallets',
    walletsInputs,
    validateErrors,
    walletsExists,
    WalletController.getWallets
)

export default router;