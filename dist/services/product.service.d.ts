import type { CreateProductInput, UpdateProductInput } from '@/lib/validation';
export declare class ProductService {
    createProduct(storeId: number, data: CreateProductInput): Promise<{
        id: number;
        name: string;
        description: string | null;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        is_active: boolean;
        price: string;
        cost_price: string | null;
        sku: string | null;
        category: string | null;
        image_urls: unknown;
    }>;
    getProduct(storeId: number, productId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        is_active: boolean;
        price: string;
        cost_price: string | null;
        sku: string | null;
        category: string | null;
        image_urls: unknown;
    }>;
    listProducts(storeId: number, limit?: number, offset?: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        is_active: boolean;
        price: string;
        cost_price: string | null;
        sku: string | null;
        category: string | null;
        image_urls: unknown;
    }[]>;
    updateProduct(storeId: number, productId: number, data: UpdateProductInput): Promise<{
        id: number;
        name: string;
        description: string | null;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        is_active: boolean;
        price: string;
        cost_price: string | null;
        sku: string | null;
        category: string | null;
        image_urls: unknown;
    }>;
    deleteProduct(storeId: number, productId: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        is_active: boolean;
        price: string;
        cost_price: string | null;
        sku: string | null;
        category: string | null;
        image_urls: unknown;
    }>;
    searchProducts(storeId: number, query: string, limit?: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        slug: string;
        is_active: boolean;
        price: string;
        cost_price: string | null;
        sku: string | null;
        category: string | null;
        image_urls: unknown;
    }[]>;
    private generateSlug;
}
export declare function createProductService(): ProductService;
//# sourceMappingURL=product.service.d.ts.map