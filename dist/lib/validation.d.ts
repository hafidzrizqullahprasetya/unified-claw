import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    full_name: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    full_name: string;
    phone?: string | undefined;
}, {
    email: string;
    password: string;
    full_name: string;
    phone?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createStoreSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    province: z.ZodOptional<z.ZodString>;
    postal_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
}>;
export declare const updateStoreSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    province: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
}>;
export declare const createProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string | number, string | number>;
    cost_price: z.ZodEffects<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>, string | number | undefined, string | number | undefined>;
    sku: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    image_urls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    price: string | number;
    description?: string | undefined;
    cost_price?: string | number | undefined;
    sku?: string | undefined;
    category?: string | undefined;
    image_urls?: string[] | undefined;
}, {
    name: string;
    price: string | number;
    description?: string | undefined;
    cost_price?: string | number | undefined;
    sku?: string | undefined;
    category?: string | undefined;
    image_urls?: string[] | undefined;
}>;
export declare const updateProductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    price: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string | number, string | number>>;
    cost_price: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>, string | number | undefined, string | number | undefined>>;
    sku: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image_urls: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    price?: string | number | undefined;
    cost_price?: string | number | undefined;
    sku?: string | undefined;
    category?: string | undefined;
    image_urls?: string[] | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    price?: string | number | undefined;
    cost_price?: string | number | undefined;
    sku?: string | undefined;
    category?: string | undefined;
    image_urls?: string[] | undefined;
}>;
export declare const createCustomerSchema: z.ZodObject<{
    phone: z.ZodString;
    name: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    province: z.ZodOptional<z.ZodString>;
    postal_code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    phone: string;
    email?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
    address?: string | undefined;
}, {
    name: string;
    phone: string;
    email?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
    address?: string | undefined;
}>;
export declare const updateCustomerSchema: z.ZodObject<{
    phone: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    province: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    postal_code: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
    address?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    city?: string | undefined;
    province?: string | undefined;
    postal_code?: string | undefined;
    address?: string | undefined;
}>;
export declare const createOrderSchema: z.ZodObject<{
    customer_id: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        product_variant_id: z.ZodOptional<z.ZodNumber>;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        product_id: number;
        quantity: number;
        product_variant_id?: number | undefined;
    }, {
        product_id: number;
        quantity: number;
        product_variant_id?: number | undefined;
    }>, "many">;
    notes: z.ZodOptional<z.ZodString>;
    channel: z.ZodOptional<z.ZodEnum<["whatsapp", "telegram", "web", "mobile", "api"]>>;
}, "strip", z.ZodTypeAny, {
    customer_id: number;
    items: {
        product_id: number;
        quantity: number;
        product_variant_id?: number | undefined;
    }[];
    notes?: string | undefined;
    channel?: "whatsapp" | "telegram" | "web" | "mobile" | "api" | undefined;
}, {
    customer_id: number;
    items: {
        product_id: number;
        quantity: number;
        product_variant_id?: number | undefined;
    }[];
    notes?: string | undefined;
    channel?: "whatsapp" | "telegram" | "web" | "mobile" | "api" | undefined;
}>;
export declare const updateOrderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    notes?: string | undefined;
}, {
    status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    notes?: string | undefined;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
//# sourceMappingURL=validation.d.ts.map