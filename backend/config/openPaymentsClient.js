import { createAuthenticatedClient } from "@interledger/open-payments";
import fs from "fs";

const privateKey = fs.readFileSync("private.key", "utf8");

export const client = await createAuthenticatedClient({
    walletAddressUrl:"https://ilp.interledger-test.dev/ebd",
    privateKey,
    keyId:"bdf6f295-9085-4360-91d3-716fbf36f182",
})

export default client;