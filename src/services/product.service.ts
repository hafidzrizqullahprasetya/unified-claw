import { eq } from 'drizzle-orm';
import { getDb } from '@/db/config';
import { products, stores, product_variants } from '@/db/schema';
import { NotFoundError, ForbiddenError } from '@/lib/errors';
import type { CreateProductInput, UpdateProductInput } from '@/lib/validation';

export class ProductService {
  async createProduct(storeId: number, data: CreateProductInput) {
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

  async getProduct(storeId: number, productId: number) {
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

  async listProducts(storeId: number, limit = 50, offset = 0) {
    const db = getDb();

    const result = await db
      .select()
      .from(products)
      .where(eq(products.store_id, storeId))
      .limit(limit)
      .offset(offset);

    return result;
  }

  async updateProduct(storeId: number, productId: number, data: UpdateProductInput) {
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

  async deleteProduct(storeId: number, productId: number) {
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

  async searchProducts(storeId: number, query: string, limit = 50) {
    const db = getDb();

    // Simple search by name or category
    const result = await db
      .select()
      .from(products)
      .where(eq(products.store_id, storeId));

    return result.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(query.toLowerCase()))
    );
  }

  private generateSlug(name: string): string {
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
