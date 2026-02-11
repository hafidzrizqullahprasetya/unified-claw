import { createStoreSchema, updateStoreSchema } from '@/lib/validation';
import { createStoreService } from '@/services/store.service';
import { ValidationError } from '@/lib/errors';
const storeService = createStoreService();
export async function createStore(c) {
    const user = c.get('user');
    const body = await c.req.json();
    try {
        const data = createStoreSchema.parse(body);
        const store = await storeService.createStore(user.userId, data);
        return c.json({ success: true, data: store }, 201);
    }
    catch (error) {
        if (error instanceof (await import('zod')).ZodError) {
            throw new ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
}
export async function getStore(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const store = await storeService.getStore(storeId);
    return c.json({ success: true, data: store });
}
export async function getStoreBySlug(c) {
    const slug = c.req.param('slug');
    const store = await storeService.getStoreBySlug(slug);
    return c.json({ success: true, data: store });
}
export async function getUserStores(c) {
    const user = c.get('user');
    const stores = await storeService.getUserStores(user.userId);
    return c.json({ success: true, data: stores });
}
export async function updateStore(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const body = await c.req.json();
    try {
        const data = updateStoreSchema.parse(body);
        const store = await storeService.updateStore(storeId, user.userId, data);
        return c.json({ success: true, data: store });
    }
    catch (error) {
        if (error instanceof (await import('zod')).ZodError) {
            throw new ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
}
export async function deleteStore(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const store = await storeService.deleteStore(storeId, user.userId);
    return c.json({ success: true, message: 'Store deleted', data: store });
}
//# sourceMappingURL=store.js.map