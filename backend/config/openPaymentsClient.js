import { createAuthenticatedClient } from "@interledger/open-payments";
import fs from "fs";

const privateKey = fs.readFileSync("private.key", "utf8");

export const client = await createAuthenticatedClient({
    walletAddressUrl:"https://ilp.interledger-test.dev/ebd",
    privateKey,
    keyId:`${process.env.KEY_ID}`,
})

export default client;