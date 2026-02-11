import { eq } from 'drizzle-orm';
import { getDb } from '@/db/config';
import { products, stores } from '@/db/schema';
import { NotFoundError, ForbiddenError } from '@/lib/errors';
export class ProductService {
    async createProduct(storeId, data) {
        const db = getDb();
        // Verify store exists
        const store = await db.select().from(stores).where(eq(stores.id, storeId));
        if (!store.length) {
            throw new NotFoundError('Store', storeId);
        }
        // Generate slug from name
        const slug = this.generateSlug(data.name);
        const result = await db
            .insert(products)
            .values({
            store_id: storeId,
            name: data.name,
            slug,
            description: data.description,
            price: String(data.price),
            cost_price: data.cost_price ? String(data.cost_price) : undefined,
            sku: data.sku,
            category: data.category,
            image_urls: data.image_urls || [],
        })
            .returning();
        return result[0];
    }
    async getProduct(storeId, productId) {
        const db = getDb();
        const result = await db
            .select()
            .from(products)
            .where(eq(products.id, productId));
        if (!result.length) {
            throw new NotFoundError('Product', productId);
        }
        const product = result[0];
        if (product.store_id !== storeId) {
            throw new ForbiddenError('You do not have access to this product');
        }
        return product;
    }
    async listProducts(storeId, limit = 50, offset = 0) {
        const db = getDb();
        const result = await db
            .select()
            .from(products)
            .where(eq(products.store_id, storeId))
            .limit(limit)
            .offset(offset);
        return result;
    }
    async updateProduct(storeId, productId, data) {
        const db = getDb();
        // Verify product exists and belongs to store
        const product = await this.getProduct(storeId, productId);
        const result = await db
            .update(products)
            .set({
            name: data.name ?? product.name,
            description: data.description ?? product.description,
            price: data.price ? String(data.price) : product.price,
            cost_price: data.cost_price ? String(data.cost_price) : product.cost_price,
            sku: data.sku ?? product.sku,
            category: data.category ?? product.category,
            image_urls: data.image_urls ?? product.image_urls,
            updated_at: new Date(),
        })
            .where(eq(products.id, productId))
            .returning();
        return result[0];
    }
    async deleteProduct(storeId, productId) {
        const db = getDb();
        // Verify product exists and belongs to store
        await this.getProduct(storeId, productId);
        // Soft delete by marking as inactive
        const result = await db
            .update(products)
            .set({
            is_active: false,
            updated_at: new Date(),
        })
            .where(eq(products.id, productId))
            .returning();
        return result[0];
    }
    async searchProducts(storeId, query, limit = 50) {
        const db = getDb();
        // Simple search by name or category
        const result = await db
            .select()
            .from(products)
            .where(eq(products.store_id, storeId));
        return result.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(query.toLowerCase())));
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
export function createProductService() {
    return new ProductService();
}
//# sourceMappingURL=product.service.js.map