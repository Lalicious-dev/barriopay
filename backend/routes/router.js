import express from 'express';
import {WalletController} from '../controllers/WalletController.js'
import { walletExists, walletInput, walletsExists, walletsInputs } from '../middleware/wallet.middleware.js';
import { validateErrors } from '../middleware/validateErrors.middleware.js';
import { PaymentController } from '../controllers/PaymentController.js';
import { transactionExists, validateTransactionInput } from '../middleware/transaction.middleware.js';
import { validateMerchantsInputs } from '../middleware/merchant.middleware.js';
import { MerchantsController } from '../controllers/MerchantController.js';
const router = express.Router();


router.get('/alive', (req,res) => res.send('server alive'));

// Merchants
router.post('/createmerchant',
    validateMerchantsInputs,
    validateErrors,
    MerchantsController.createMerchant
);
router.get('/getmerchant', 
    MerchantsController.getMerchant
);


//Wallets
router.get('/wallets',
    walletsInputs,
    validateErrors,
    walletsExists,
    WalletController.getWallets
)

//Payments
router.post('/incoming-payment', 
    walletInput,
    validateErrors,
    walletsExists,
    PaymentController.createInitialPayment
)

router.post('/complete-payment',
    validateTransactionInput,
    validateErrors,
    transactionExists,
    PaymentController.completePayment
)

export default router;