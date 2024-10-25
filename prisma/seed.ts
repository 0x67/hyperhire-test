import { PrismaClient } from '@prisma/client';

const TOKENS = [
  {
    id: '85799f4d-d432-408e-b3af-4e634d69e2b5',
    address: '0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6',
    name: 'Polygon Ecosystem Token',
    chainId: 1,
    symbol: 'POL',
    decimals: 18,
    created_at: '2024-10-25T04:50:24.698575+00:00',
    updated_at: '2024-10-25T04:50:24.698575+00:00',
  },
  {
    id: 'a61fe536-f07d-4318-b0ed-269ab7ffe156',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    name: 'Wrapped BTC',
    chainId: 1,
    symbol: 'BTC',
    decimals: 8,
    created_at: '2024-10-23T22:41:50.755546+00:00',
    updated_at: '2024-10-23T22:41:50.755546+00:00',
  },
  {
    id: 'dec26d5b-6134-4730-b03e-c84a288bc6f9',
    address: '0x0000000000000000000000000000000000001010',
    name: 'Polygon Token',
    chainId: 137,
    symbol: 'POL',
    decimals: 18,
    created_at: '2024-10-23T22:40:51.04476+00:00',
    updated_at: '2024-10-23T22:40:51.04476+00:00',
  },
  {
    id: 'f6463870-2fd9-4505-8c56-874af9f355d2',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    name: 'Ethereum',
    chainId: 1,
    symbol: 'ETH',
    decimals: 18,
    created_at: '2024-10-23T22:21:43.93028+00:00',
    updated_at: '2024-10-23T22:21:43.93028+00:00',
  },
];

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    TOKENS.map(async (token) => {
      await prisma.token.upsert({
        where: { id: token.id },
        update: token,
        create: token,
      });
    }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
