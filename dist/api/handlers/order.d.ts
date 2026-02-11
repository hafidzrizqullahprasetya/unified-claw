import { Context } from 'hono';
export declare function createOrder(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        items: {
            product_id: number;
            product_variant_id: number | undefined;
            quantity: number;
            unit_price: string;
            subtotal: string;
        }[];
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    };
}, any, "json">>;
export declare function getOrder(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        items: {
            id: number;
            created_at: string;
            product_id: number;
            product_variant_id: number | null;
            quantity: number;
            order_id: number;
            unit_price: string;
            subtotal: string;
        }[];
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function listOrders(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    }[];
    pagination: {
        limit: number;
        offset: number;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function updateOrderStatus(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function cancelOrder(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    message: string;
    data: {
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
//# sourceMappingURL=order.d.ts.map