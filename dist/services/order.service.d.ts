import type { CreateOrderInput, UpdateOrderStatusInput } from "@/lib/validation";
export declare class OrderService {
    createOrder(storeId: number, customerId: number, data: CreateOrderInput): Promise<{
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
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    }>;
    getOrder(storeId: number, orderId: number): Promise<{
        items: {
            product_id: number;
            product_variant_id: number | null;
            quantity: number;
            id: number;
            created_at: Date;
            order_id: number;
            unit_price: string;
            subtotal: string;
        }[];
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    }>;
    listOrders(storeId: number, customerId?: number, limit?: number, offset?: number): Promise<{
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    }[]>;
    updateOrderStatus(storeId: number, orderId: number, data: UpdateOrderStatusInput): Promise<{
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    }>;
    cancelOrder(storeId: number, orderId: number): Promise<{
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        customer_id: number;
        notes: string | null;
        channel: "web" | "whatsapp" | "telegram" | "mobile" | "api";
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
    }>;
    private generateOrderNumber;
}
export declare function createOrderService(): OrderService;
//# sourceMappingURL=order.service.d.ts.map