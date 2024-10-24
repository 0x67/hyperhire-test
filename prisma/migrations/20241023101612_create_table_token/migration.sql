-- CreateTable
CREATE TABLE "tokens" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chain_id" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimals" SMALLINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tokens_symbol_chain_id_idx" ON "tokens"("symbol", "chain_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_address_chain_id_key" ON "tokens"("address", "chain_id");
