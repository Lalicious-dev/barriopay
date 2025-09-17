import { body } from "express-validator"
import { prismaClient } from "../config/prismaClient.js";


export const validateTransactionInput = async(req,res,next) => {
    
    await body('transactionId').notEmpty().withMessage('es necesario la propiedad transactionId').bail().isString().withMessage('es necesario la propiedad transactionId').run(req);

    next();
}


export const transactionExists = async (req,res,next) => {
    
    const transaction = await prismaClient.transaction.findFirst({
        where: {
            id: req.body.transactionId
        }
    })
    
    if(!transaction){
        res.status(404).json({message: "transacción no encotrada"});
        return
    }

    req.transaction = transaction;

    next();

}