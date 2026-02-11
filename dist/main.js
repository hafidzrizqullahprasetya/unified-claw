import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { eq } from 'drizzle-orm';
import { getEnv, validateEnv } from '@/env';
import { getDb } from '@/db/config';
import { errorMiddleware } from '@/api/middleware/errorHandler';
import { authMiddleware } from '@/api/middleware/auth';
// Validate environment variables on startup
validateEnv();
const app = new Hono();
// Global middleware
app.use('*', logger());
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));
// Error handling middleware
app.use('*', errorMiddleware);
// Health check endpoint (no auth required)
app.get('/health', (c) => {
    const env = getEnv();
    return c.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
        version: '0.1.0',
    });
});
// Auth routes (no auth required)
app.post('/auth/register', async (c) => {
    const { registerSchema } = await import('@/lib/validation');
    const { hashPassword } = await import('@/lib/hashing');
    const { ConflictError, ValidationError } = await import('@/lib/errors');
    const { signToken } = await import('@/lib/jwt');
    try {
        const body = await c.req.json();
        const data = registerSchema.parse(body);
        const db = getDb();
        const { users } = await import('@/db/schema');
        // Check if user already exists
        const existing = await db.select().from(users).where(eq(users.email, data.email));
        if (existing.length > 0) {
            throw new ConflictError('User with this email already exists');
        }
        const passwordHash = await hashPassword(data.password);
        const result = await db
            .insert(users)
            .values({
            email: data.email,
            password_hash: passwordHash,
            full_name: data.full_name,
            phone: data.phone,
            role: 'seller', // Default to seller for new users
        })
            .returning({ id: users.id, email: users.email, role: users.role });
        const user = result[0];
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return c.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            token,
        }, 201);
    }
    catch (error) {
        if (error instanceof (await import('@/lib/errors')).AppError) {
            throw error;
        }
        if (error instanceof (await import('zod')).ZodError) {
            throw new ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
});
app.post('/auth/login', async (c) => {
    const { loginSchema } = await import('@/lib/validation');
    const { comparePassword } = await import('@/lib/hashing');
    const { AuthError, ErrorCode } = await import('@/lib/errors');
    const { signToken } = await import('@/lib/jwt');
    try {
        const body = await c.req.json();
        const data = loginSchema.parse(body);
        const db = getDb();
        const { users } = await import('@/db/schema');
        const result = await db.select().from(users).where(eq(users.email, data.email));
        const user = result[0];
        if (!user) {
            throw new AuthError(ErrorCode.INVALID_CREDENTIALS, 'Invalid email or password');
        }
        const isValidPassword = await comparePassword(data.password, user.password_hash);
        if (!isValidPassword) {
            throw new AuthError(ErrorCode.INVALID_CREDENTIALS, 'Invalid email or password');
        }
        const token = signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        return c.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                full_name: user.full_name,
            },
            token,
        });
    }
    catch (error) {
        if (error instanceof (await import('@/lib/errors')).AppError) {
            throw error;
        }
        if (error instanceof (await import('zod')).ZodError) {
            throw new (await import('@/lib/errors')).ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
});
// Protected routes (require auth)
app.use('/api/*', authMiddleware);
// Placeholder routes
app.get('/api/stores', (c) => {
    return c.json({ message: 'Get stores endpoint - to be implemented' });
});
app.get('/api/products', (c) => {
    return c.json({ message: 'Get products endpoint - to be implemented' });
});
app.get('/api/orders', (c) => {
    return c.json({ message: 'Get orders endpoint - to be implemented' });
});
app.get('/api/customers', (c) => {
    return c.json({ message: 'Get customers endpoint - to be implemented' });
});
// Start server
const env = getEnv();
export default {
    port: env.PORT,
    fetch: app.fetch,
};
console.log(`🚀 Server starting on port ${env.PORT} in ${env.NODE_ENV} environment`);
//# sourceMappingURL=main.js.map