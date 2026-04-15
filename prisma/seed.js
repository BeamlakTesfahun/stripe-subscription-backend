import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Starting seed...');

    await prisma.plan.upsert({
        where: { name: 'Basic' },
        update: {},
        create: {
            name: 'Basic',
            stripePriceId: 'price_basic_placeholder',
            amount: 1000,
            currency: 'usd',
            interval: 'month',
        },
    });

    await prisma.plan.upsert({
        where: { name: 'Pro' },
        update: {},
        create: {
            name: 'Pro',
            stripePriceId: 'price_pro_placeholder',
            amount: 2000,
            currency: 'usd',
            interval: 'month',
        },
    });

    console.log('Plans seeded successfully.');
}

main()
    .catch((error) => {
        console.error('Seed failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
