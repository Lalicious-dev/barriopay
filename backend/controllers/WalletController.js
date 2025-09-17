
export class WalletController {
    static getWallets(req,res){
        const {receivingWallet,sendingWallet} = req;
        res.status(200).json({receivingWallet, sendingWallet});;
    }
}