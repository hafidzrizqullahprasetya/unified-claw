import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    PORT: z.ZodEffects<z.ZodDefault<z.ZodString>, number, string | undefined>;
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRY: z.ZodDefault<z.ZodString>;
    XENDIT_API_KEY: z.ZodOptional<z.ZodString>;
    STRIPE_SECRET_KEY: z.ZodOptional<z.ZodString>;
    QRIS_MERCHANT_ID: z.ZodOptional<z.ZodString>;
    WHATSAPP_API_TOKEN: z.ZodOptional<z.ZodString>;
    TELEGRAM_BOT_TOKEN: z.ZodOptional<z.ZodString>;
    ADMIN_EMAIL: z.ZodString;
    ADMIN_PASSWORD: z.ZodString;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    XENDIT_API_KEY?: string | undefined;
    STRIPE_SECRET_KEY?: string | undefined;
    QRIS_MERCHANT_ID?: string | undefined;
    WHATSAPP_API_TOKEN?: string | undefined;
    TELEGRAM_BOT_TOKEN?: string | undefined;
}, {
    DATABASE_URL: string;
    JWT_SECRET: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    PORT?: string | undefined;
    JWT_EXPIRY?: string | undefined;
    XENDIT_API_KEY?: string | undefined;
    STRIPE_SECRET_KEY?: string | undefined;
    QRIS_MERCHANT_ID?: string | undefined;
    WHATSAPP_API_TOKEN?: string | undefined;
    TELEGRAM_BOT_TOKEN?: string | undefined;
}>;
export type Env = z.infer<typeof envSchema>;
export declare function getEnv(): Env;
export declare function validateEnv(): Env;
export {};
//# sourceMappingURL=env.d.ts.map