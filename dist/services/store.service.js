import { eq } from 'drizzle-orm';
import { getDb } from '@/db/config';
import { stores } from '@/db/schema';
import { NotFoundError, ForbiddenError, ConflictError } from '@/lib/errors';
export class StoreService {
    async createStore(userId, data) {
        const db = getDb();
        // Generate slug from name
        const slug = this.generateSlug(data.name);
        // Check if slug already exists
        const existing = await db
            .select()
            .from(stores)
            .where(eq(stores.slug, slug));
        if (existing.length) {
            throw new ConflictError('A store with this name already exists');
        }
        const result = await db
            .insert(stores)
            .values({
            user_id: userId,
            name: data.name,
            slug,
            description: data.description,
            city: data.city,
            province: data.province,
            postal_code: data.postal_code,
        })
            .returning();
        return result[0];
    }
    async getStore(storeId) {
        const db = getDb();
        const result = await db
            .select()
            .from(stores)
            .where(eq(stores.id, storeId));
        if (!result.length) {
            throw new NotFoundError('Store', storeId);
        }
        return result[0];
    }
    async getStoreBySlug(slug) {
        const db = getDb();
        const result = await db
            .select()
            .from(stores)
            .where(eq(stores.slug, slug));
        if (!result.length) {
            throw new NotFoundError('Store', slug);
        }
        return result[0];
    }
    async getUserStores(userId) {
        const db = getDb();
        const result = await db
            .select()
            .from(stores)
            .where(eq(stores.user_id, userId));
        return result;
    }
    async updateStore(storeId, userId, data) {
        const db = getDb();
        // Verify ownership
        const store = await this.getStore(storeId);
        if (store.user_id !== userId) {
            throw new ForbiddenError('You do not have permission to update this store');
        }
        const result = await db
            .update(stores)
            .set({
            name: data.name ?? store.name,
            description: data.description ?? store.description,
            city: data.city ?? store.city,
            province: data.province ?? store.province,
            postal_code: data.postal_code ?? store.postal_code,
            updated_at: new Date(),
        })
            .where(eq(stores.id, storeId))
            .returning();
        return result[0];
    }
    async updateStoreLogo(storeId, userId, logoUrl) {
        const db = getDb();
        // Verify ownership
        const store = await this.getStore(storeId);
        if (store.user_id !== userId) {
            throw new ForbiddenError('You do not have permission to update this store');
        }
        const result = await db
            .update(stores)
            .set({
            logo_url: logoUrl,
            updated_at: new Date(),
        })
            .where(eq(stores.id, storeId))
            .returning();
        return result[0];
    }
    async deleteStore(storeId, userId) {
        const db = getDb();
        // Verify ownership
        const store = await this.getStore(storeId);
        if (store.user_id !== userId) {
            throw new ForbiddenError('You do not have permission to delete this store');
        }
        // Soft delete by marking as inactive
        const result = await db
            .update(stores)
            .set({
            is_active: false,
            updated_at: new Date(),
        })
            .where(eq(stores.id, storeId))
            .returning();
        return result[0];
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .replace(/-+/g, '-')
            .trim()
            .slice(0, 100);
    }
}
export function createStoreService() {
    return new StoreService();
}
//# sourceMappingURL=store.service.js.map