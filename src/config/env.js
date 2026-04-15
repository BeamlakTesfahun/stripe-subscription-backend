import dotenv from 'dotenv';

dotenv.config();
export const env = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    clientUrl: process.env.CLIENT_URL,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    stripeBasicPriceId: process.env.STRIPE_BASIC_PRICE_ID,
    stripeProPriceId: process.env.STRIPE_PRO_PRICE_ID,
};
