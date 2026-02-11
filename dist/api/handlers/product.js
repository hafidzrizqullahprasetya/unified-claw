import { createProductSchema, updateProductSchema } from '@/lib/validation';
import { createProductService } from '@/services/product.service';
import { ValidationError } from '@/lib/errors';
const productService = createProductService();
export async function createProduct(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const body = await c.req.json();
    try {
        const data = createProductSchema.parse(body);
        const product = await productService.createProduct(storeId, data);
        return c.json({ success: true, data: product }, 201);
    }
    catch (error) {
        if (error instanceof (await import('zod')).ZodError) {
            throw new ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
}
export async function getProduct(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const productId = parseInt(c.req.param('productId'));
    const product = await productService.getProduct(storeId, productId);
    return c.json({ success: true, data: product });
}
export async function listProducts(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    const products = await productService.listProducts(storeId, limit, offset);
    return c.json({ success: true, data: products, pagination: { limit, offset } });
}
export async function updateProduct(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const productId = parseInt(c.req.param('productId'));
    const body = await c.req.json();
    try {
        const data = updateProductSchema.parse(body);
        const product = await productService.updateProduct(storeId, productId, data);
        return c.json({ success: true, data: product });
    }
    catch (error) {
        if (error instanceof (await import('zod')).ZodError) {
            throw new ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
}
export async function deleteProduct(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const productId = parseInt(c.req.param('productId'));
    const product = await productService.deleteProduct(storeId, productId);
    return c.json({ success: true, message: 'Product deleted', data: product });
}
export async function searchProducts(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const query = c.req.query('q');
    if (!query) {
        throw new ValidationError('Search query required');
    }
    const products = await productService.searchProducts(storeId, query);
    return c.json({ success: true, data: products });
}
//# sourceMappingURL=product.js.map