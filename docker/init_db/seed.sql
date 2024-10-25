CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO "public"."tokens" (
    "id",
    "address",
    "name",
    "chain_id",
    "symbol",
    "decimals",
    "created_at",
    "updated_at"
  )
VALUES (
    '85799f4d-d432-408e-b3af-4e634d69e2b5',
    '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6',
    'Polygon Ecosystem Token',
    '1',
    'POL',
    '18',
    '2024-10-25 04:50:24.698575+00',
    '2024-10-25 04:50:24.698575+00'
  ),
  (
    'a61fe536-f07d-4318-b0ed-269ab7ffe156',
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    'Wrapped BTC',
    '1',
    'BTC',
    '8',
    '2024-10-23 22:41:50.755546+00',
    '2024-10-23 22:41:50.755546+00'
  ),
  (
    'dec26d5b-6134-4730-b03e-c84a288bc6f9',
    '0x0000000000000000000000000000000000001010',
    'Polygon Token',
    '137',
    'POL',
    '18',
    '2024-10-23 22:40:51.04476+00',
    '2024-10-23 22:40:51.04476+00'
  ),
  (
    'f6463870-2fd9-4505-8c56-874af9f355d2',
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    'Ethereum',
    '1',
    'ETH',
    '18',
    '2024-10-23 22:21:43.93028+00',
    '2024-10-23 22:21:43.93028+00'
  );