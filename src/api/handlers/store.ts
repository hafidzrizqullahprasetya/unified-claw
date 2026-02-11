import { Context } from 'hono';
import { createStoreSchema, updateStoreSchema } from '@/lib/validation';
import { createStoreService } from '@/services/store.service';
import { ValidationError } from '@/lib/errors';

const storeService = createStoreService();

export async function createStore(c: Context) {
  const user = c.get('user');
  const body = await c.req.json();

  try {
    const data = createStoreSchema.parse(body);
    const store = await storeService.createStore(user.userId, data);
    return c.json({ success: true, data: store }, 201 as any);
  } catch (error) {
    if (error instanceof (await import('zod')).ZodError) {
      throw new ValidationError('Validation failed', { errors: error.errors });
    }
    throw error;
  }
}

export async function getStore(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));

  const store = await storeService.getStore(storeId);
  return c.json({ success: true, data: store });
}

export async function getStoreBySlug(c: Context) {
  const slug = c.req.param('slug');

  const store = await storeService.getStoreBySlug(slug);
  return c.json({ success: true, data: store });
}

export async function getUserStores(c: Context) {
  const user = c.get('user');

  const stores = await storeService.getUserStores(user.userId);
  return c.json({ success: true, data: stores });
}

export async function updateStore(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));
  const body = await c.req.json();

  try {
    const data = updateStoreSchema.parse(body);
    const store = await storeService.updateStore(storeId, user.userId, data);
    return c.json({ success: true, data: store });
  } catch (error) {
    if (error instanceof (await import('zod')).ZodError) {
      throw new ValidationError('Validation failed', { errors: error.errors });
    }
    throw error;
  }
}

export async function deleteStore(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));

  const store = await storeService.deleteStore(storeId, user.userId);
  return c.json({ success: true, message: 'Store deleted', data: store });
}
