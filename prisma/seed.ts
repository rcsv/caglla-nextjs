// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // --- Timezones ---
  await prisma.m_Timezone.createMany({
    data: [
      { name: 'JST', offset: '+09:00' },
      { name: 'HST', offset: '-10:00' },
      { name: 'CET', offset: '+01:00' },
      { name: 'EST', offset: '-05:00' },
    ],
    skipDuplicates: true,
  });

  // --- Locales ---
  await prisma.m_Locale.createMany({
    data: [
      { code: 'ja-JP', label: '日本語' },
      { code: 'en-US', label: 'English' },
    ],
    skipDuplicates: true,
  });

  // --- Currencies ---
  await prisma.m_Currency.createMany({
    data: [
      { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
      { code: 'USD', name: 'US Dollar', symbol: '$' },
      { code: 'EUR', name: 'Euro', symbol: '€' },
      { code: 'GBP', name: 'British Pound', symbol: '£' },
      { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
