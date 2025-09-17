import { body } from "express-validator";
import clientOpenPayments from "../config/openPaymentsClient.js"

export const walletsInputs = async (req, res, next) => {
  await body("receivingWalletURL")
    .notEmpty()
    .withMessage("walletUrl es obligatoria")
    .bail()
    .isString()
    .withMessage("walletUrl no existe")
    .bail()
    .isURL()
    .withMessage("wallet no valida")
    .run(req);
  await body("sendingWalletURL")
    .notEmpty()
    .withMessage("walletUrl es obligatoria")
    .bail()
    .isString()
    .withMessage("walletUrl no existe")
    .bail()
    .isURL()
    .withMessage("wallet no valida")
    .run(req);

  await body("amount")
    .notEmpty()
    .withMessage("La cantidad es necesaria")
    .bail()
    .isString()
    .withMessage("La cantidad debe ser una cadena")
    .bail()
    .custom((value) => {
      const num = Number(value);
      if (isNaN(num)) {
        throw new Error("La cantidad debe ser numérica en la cadena");
      }
      if (num <= 0) {
        throw new Error("La cantidad debe ser mayor que 0");
      }
      return true;
    })
    .run(req);

  next();
};


export const walletsExists = async (req, res, next) => {
  try {
    const { receivingWalletURL, sendingWalletURL } = req.body;

    // Verificar wallet receptora
    let receivingWallet;
    try {
      receivingWallet = await clientOpenPayments.walletAddress.get({
        url: receivingWalletURL,
      });
    } catch (error) {
      return res.status(400).json({
        error: `Wallet receptora no válida o no encontrada: ${receivingWalletURL}`,
      });
    }

    // Verificar wallet emisora
    let sendingWallet;
    try {
      sendingWallet = await clientOpenPayments.walletAddress.get({
        url: sendingWalletURL,
      });
    } catch (error) {
      return res.status(400).json({
        error: `Wallet emisora no válida o no encontrada: ${sendingWalletURL}`,
      });
    }
    req.receivingWallet = receivingWallet;
    req.sendingWallet = sendingWallet;

    next();
  } catch (error) {
    console.error("Error inesperado en walletsExists:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al validar wallets" });
  }
};