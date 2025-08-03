// prisma/seed.cjs
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Seeds the database with initial timezone, locale, and currency data if not already present.
async function main() {

    /*
    // --- Timezones ---
    await prisma.mstTimezone.createMany({
        data: [
            { name: 'JST', offset: '+09:00' },
            { name: 'HST', offset: '-10:00' },
            { name: 'CET', offset: '+01:00' },
            { name: 'EST', offset: '-05:00' },
        ],
        skipDuplicates: true,
    });

    // --- Locales ---
    await prisma.mstLocale.createMany({
        data: [
            { code: 'ja-JP', label: '日本語' },
            { code: 'en-US', label: 'English' },
        ],
        skipDuplicates: true,
    });

    // --- Currencies ---
    await prisma.mstCurrency.createMany({
        data: [
            { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
            { code: 'USD', name: 'US Dollar', symbol: '$' },
            { code: 'EUR', name: 'Euro', symbol: '€' },
            { code: 'GBP', name: 'British Pound', symbol: '£' },
            { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        ],
        skipDuplicates: true,
    });
    */
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });