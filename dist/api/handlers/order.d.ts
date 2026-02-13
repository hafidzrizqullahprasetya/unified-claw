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
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    };
}, any, "json">>;
export declare function getOrder(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        items: {
            product_id: number;
            product_variant_id: number | null;
            quantity: number;
            id: number;
            created_at: string;
            order_id: number;
            unit_price: string;
            subtotal: string;
        }[];
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function listOrders(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
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
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function cancelOrder(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    message: string;
    data: {
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: string;
        updated_at: string;
        store_id: number;
        metadata: import("hono/utils/types").JSONValue;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
//# sourceMappingURL=order.d.ts.map