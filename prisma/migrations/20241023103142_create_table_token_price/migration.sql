-- CreateTable
CREATE TABLE "token_prices" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "price" DECIMAL NOT NULL,
  "block_number" BIGINT NOT NULL,
  "timestamp" TIMESTAMPTZ NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "token_id" UUID NOT NULL,
  CONSTRAINT "token_prices_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE INDEX "token_prices_token_id_timestamp_idx" ON "token_prices"("token_id", "timestamp");
-- AddForeignKey
ALTER TABLE "token_prices"
ADD CONSTRAINT "token_prices_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;