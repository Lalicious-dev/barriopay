class MerchantsController {
    static async createMerchant(req, res){
        try{
            const {name, description, phone, walletURL} = req.body
            const newMerchant = await prisma.merchants.create({
                data: {
                    name, 
                    description,
                    phone,
                    walletURL
                }
            })
            res.status(201).json(newMerchant)
        } catch (error) {
            console.error(error)
            res.status(500).json({message:'Erro creando merchant', error})
        }
    }

}