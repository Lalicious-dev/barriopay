import {prismaClient} from '../config/prismaClient.js';
import {clientOpenPayments} from '../config/openPaymentsClient.js'
import { isFinalizedGrant } from '@interledger/open-payments';
import crypto from "crypto";

export class PaymentController {
    static async createInitialPayment(req,res) {
        try {

            const {receivingWallet, sendingWallet} = req;
            const amount =(Number(req.body.amount) * Math.pow(10, sendingWallet.assetScale)).toString();

            const merchant = await prismaClient.merchants.findFirst({
                where:{
                    walletURL:receivingWallet.id
                }
            })

            //2. Obtener permiso o concesion para pago entrante
            const incomingPaymentGrant = await clientOpenPayments.grant.request({
              url: receivingWallet.authServer,
            }, {
              access_token: {
                access: [
                  { type: "incoming-payment", 
                    actions: ["create"]
                 }
                ]
              }
            });

            if(!isFinalizedGrant(incomingPaymentGrant)) {
                throw new Error("se espera finalice la concesión");
            }
            

            //3. crear un pago entrante en el receptor
            const incomingPayment = await clientOpenPayments.incomingPayment.create(
                {
                    url: receivingWallet.resourceServer,
                    accessToken: incomingPaymentGrant.access_token.value
                }, 
                {
                    walletAddress: receivingWallet.id,
                    incomingAmount: {
                        assetCode: receivingWallet.assetCode,
                        assetScale: receivingWallet.assetScale,
                        value: amount
                    }
                }
            )

            //4. perdir permiso o concesion a una cotizacion
            const quoteGrant = await clientOpenPayments.grant.request(
                {
                    url: sendingWallet.authServer
                },
                {
                    access_token:{
                        access: [
                            {
                                type:'quote',
                                actions:['create']
                            }
                        ]
                    }
                }
            )

            if(!isFinalizedGrant(quoteGrant)){
                throw new Error("se espara finalice la concesión");
            }

            // 5. crear cotizacion gracias al permiso
            const quote = await clientOpenPayments.quote.create(
                {
                    url: receivingWallet.resourceServer,
                    accessToken: quoteGrant.access_token.value
                },
                {
                    walletAddress: sendingWallet.id,
                    receiver: incomingPayment.id,
                    method: 'ilp'
                }    
            )

            const nonce = crypto.randomUUID();

            //6. pedir permiso para el pago saliente
            const outgoingPaymentGrant = await clientOpenPayments.grant.request(
                {
                    url: sendingWallet.authServer
                },
                {
                    access_token: {
                        access: [
                            {
                                type:'outgoing-payment',
                                actions:['create'],
                                limits: {
                                    debitAmount:quote.debitAmount
                                },
                                identifier: sendingWallet.id
                            }, 
                        ]
                    },
                    interact: {
                        start:['redirect'],
                          finish: {
                           method: 'redirect',
                           uri: `http://localhost:5173/`, // 👈 aquí regresa
                           nonce: nonce
                        }
                    }
                }
            ) 

             const transaction = await prismaClient.transaction.create({
                data: {
                    status: 'pending_approval',
                    receivingWalletId: receivingWallet.id,
                    receivingWalletAuthServer: receivingWallet.authServer,
                    receivingWalletResourceServer: receivingWallet.resourceServer,
                    sendingWalletId: sendingWallet.id,
                    sendingWalletAuthServer: sendingWallet.authServer,
                    sendingWalletResourceServer: sendingWallet.resourceServer,
                    incomingPaymentGrantAccessToken: incomingPaymentGrant.access_token.value,
                    incomingPaymentGrantExpiresIn: incomingPaymentGrant.access_token.expires_in,
                    incomingPaymentId: incomingPayment.id,
                    incomingAmountValue: incomingPayment.incomingAmount.value,
                    incomingAmountAssetCode: incomingPayment.incomingAmount.assetCode,
                    incomingAmountAssetScale: incomingPayment.incomingAmount.assetScale,
                    quoteGrantAccessToken: quoteGrant.access_token.value,
                    quoteId: quote.id,
                    debitAmountValue: quote.debitAmount.value,
                    debitAmountAssetCode: quote.debitAmount.assetCode,
                    debitAmountAssetScale: quote.debitAmount.assetScale,
                    outgoingPaymentGrantContinueUri: outgoingPaymentGrant.continue.uri,
                    outgoingPaymentGrantContinueAccessToken: outgoingPaymentGrant.continue.access_token.value,
                    outgoingPaymentGrantInteractRedirect: outgoingPaymentGrant.interact.redirect,
                    redirectUrl: outgoingPaymentGrant.interact.redirect,
                    nonce: nonce
                }
            });

            return res.json({
                success: true,
                redirectUrl: outgoingPaymentGrant.interact.redirect,
                transactionId: transaction.id
            })
            

        } catch (error) {
            console.log(error);
            res.status(500).json({message: error.message});
        }
    }

    static async completePayment(req,res) {
        try {
            const transaction = req.transaction;
            const interact_ref = req.body.interact_ref;

            const finalizarOutgoingPaymentGrant = await clientOpenPayments.grant.continue({
            url:transaction.outgoingPaymentGrantContinueUri,
            accessToken: transaction.outgoingPaymentGrantContinueAccessToken
        }, {
            interact_ref
        }
    )

    if(!isFinalizedGrant(finalizarOutgoingPaymentGrant)){
        throw new Error(" se espera finalice la concesion");
    }

// 9. Continuar con la cotizacion del pago saliente
        const outgoingPayment = await clientOpenPayments.outgoingPayment.create(
         {
            url: transaction.sendingWalletResourceServer,
            accessToken: finalizarOutgoingPaymentGrant.access_token.value
        },
         {
            walletAddress: transaction.sendingWalletId,
            quoteId: transaction.quoteId
        }
        )

        await prismaClient.transaction.update({
            where: {
                id: transaction.id
            },
            data:{
                status: 'completed',
                outgoingPaymentid: outgoingPayment.id
            }
        })

        res.status(200).json({message: "Transacción Completada"});


            
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error.message })
        }
    }
}
