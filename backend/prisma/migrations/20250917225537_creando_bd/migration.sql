-- CreateTable
CREATE TABLE "public"."Merchants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "walletURL" TEXT NOT NULL,

    CONSTRAINT "Merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transactions" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "receivingWalletId" TEXT NOT NULL,
    "receivingWalletAuthServer" TEXT NOT NULL,
    "receivingWalletResourceServer" TEXT NOT NULL,
    "sendingWalletId" TEXT NOT NULL,
    "sendingWalletAuthServer" TEXT NOT NULL,
    "sendingWalletResourceServer" TEXT NOT NULL,
    "incomingPaymentGrantAccessToken" TEXT NOT NULL,
    "incomingPaymentGrantExpiresIn" INTEGER,
    "incomingPaymentId" TEXT NOT NULL,
    "incomingAmountValue" TEXT NOT NULL,
    "incomingAmountAssetCode" TEXT NOT NULL,
    "incomingAmountAssetScale" INTEGER NOT NULL,
    "quoteGrantAccessToken" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "debitAmountValue" TEXT NOT NULL,
    "debitAmountAssetCode" TEXT NOT NULL,
    "debitAmountAssetScale" INTEGER NOT NULL,
    "outgoingPaymentGrantContinueUri" TEXT NOT NULL,
    "outgoingPaymentGrantContinueAccessToken" TEXT NOT NULL,
    "outgoingPaymentGrantInteractRedirect" TEXT NOT NULL,
    "outgoingPaymentid" TEXT,
    "redirectUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_walletURL_key" ON "public"."Merchants"("walletURL");
