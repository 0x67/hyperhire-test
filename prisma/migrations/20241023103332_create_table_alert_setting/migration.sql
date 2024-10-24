-- CreateTable
CREATE TABLE "alert_settings" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "token_id" UUID NOT NULL,
  "alert_id" UUID NOT NULL,
  "threshold" DECIMAL NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "alert_settings_pkey" PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "alert_settings"
ADD CONSTRAINT "alert_settings_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "alert_settings"
ADD CONSTRAINT "alert_settings_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alerts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;