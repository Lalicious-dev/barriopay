import { body } from "express-validator"

export const validateMerchantsInputs = async(req, res, next) => {
    await body('name').notEmpty().withMessage('es necesaria la propiedad name').bail().isString().withMessage('Es necesaria esta propiedad name').run(req);

    await body('description').notEmpty().withMessage('es necesaria la propiedad description').bail().isString().withMessage('Es necesaria esta propiedad description').run(req);

    await body('phone').notEmpty().withMessage('es necesaria la propiedad phone').bail().isString().withMessage('Es necesaria esta propiedad phone').run(req);

    await body('walletURL').notEmpty().withMessage('es necesaria la propiedad walletURL').bail().isURL().withMessage('Es necesaria esta propiedad walletURL').run(req);

    next();
}