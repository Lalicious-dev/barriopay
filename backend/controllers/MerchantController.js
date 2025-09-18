import {prismaClient} from "../config/prismaClient.js";

export class MerchantsController {
    //Creamos un mercader
    static async createMerchant(req, res){
        try{
            const {name, description, phone, walletURL} = req.body;
            const newMerchant = await prismaClient.merchants.create({
                data: {
                    name, 
                    description,
                    phone,
                    walletURL
                }
            });
            res.status(201).json(newMerchant);
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Error al crear merchant', error});
        }
    }

    //Obtenemos el mercader
    static async getMerchant(req, res){
        try {
            const merchants = await prismaClient.merchants.findMany();
            res.status(200).json(merchants);
        }catch (error){
            res.status(500).json({message: 'Error al obtener merchants', error});
        }
    }
}

