export interface IncomingMessage {
    from: string;
    text: string;
    messageId: string;
    timestamp: number;
    type: "text" | "image" | "file";
}
export interface WhatsAppWebhookPayload {
    object: string;
    entry: Array<{
        id: string;
        changes: Array<{
            value: {
                messaging_product: string;
                messages?: Array<{
                    from: string;
                    id: string;
                    timestamp: string;
                    type: string;
                    text?: {
                        body: string;
                    };
                    image?: {
                        id: string;
                        mime_type: string;
                    };
                    file?: {
                        id: string;
                        mime_type: string;
                    };
                }>;
                contacts?: Array<{
                    profile: {
                        name: string;
                    };
                    wa_id: string;
                }>;
                metadata?: {
                    display_phone_number: string;
                    phone_number_id: string;
                };
            };
            field: string;
        }>;
    }>;
}
export declare class WhatsAppService {
    /**
     * Verify webhook signature from Meta
     * Prevents replay attacks and ensures request authenticity
     */
    verifyWebhookSignature(signature: string, body: string): boolean;
    /**
     * Parse incoming WhatsApp message from Meta webhook
     */
    parseIncomingMessage(payload: WhatsAppWebhookPayload): IncomingMessage | null;
    /**
     * Save incoming or outgoing message to database
     */
    saveMessage(storeId: number, customerId: number, message: string, direction: "inbound" | "outbound", messageType?: "text" | "image" | "file", metadata?: Record<string, any>): Promise<void>;
    /**
     * Send message via Meta API
     * Sends text message to customer phone number
     */
    sendMessage(phoneNumber: string, text: string): Promise<string>;
    /**
     * Get or create customer by phone number
     */
    getOrCreateCustomer(storeId: number, phoneNumber: string, contactName?: string): Promise<{
        metadata: unknown;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    /**
     * Get store products for menu display
     */
    getStoreProducts(storeId: number): Promise<{
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
    /**
     * Format product menu as WhatsApp message
     */
    formatProductMenu(productsList: Array<{
        id: number;
        name: string;
        description?: string | null;
        price: string;
    }>): string;
    /**
     * Format order confirmation message
     */
    formatOrderConfirmation(order: any, items: any[], paymentLink?: string): string;
    /**
     * Format order status message
     */
    formatOrderStatus(order: any): string;
    /**
     * Format payment confirmation message
     */
    formatPaymentConfirmation(order: any): string;
    /**
     * Send notification when order status changes
     * Maps order status to customer and sends formatted message
     */
    notifyOrderStatusChange(customerId: number, storeId: number, order: any, newStatus: string): Promise<void>;
    /**
     * Send payment confirmed notification
     */
    notifyPaymentConfirmed(customerId: number, storeId: number, order: any): Promise<void>;
    /**
     * Send order shipped notification
     */
    notifyOrderShipped(customerId: number, storeId: number, order: any, trackingNumber?: string): Promise<void>;
    /**
     * Send order delivered notification
     */
    notifyOrderDelivered(customerId: number, storeId: number, order: any): Promise<void>;
    /**
     * Create order from WhatsApp message
     * Integrates with OrderService for order creation
     */
    createOrderFromMessage(storeId: number, customerId: number, productId: number, quantity: number): Promise<{
        items: {
            product_id: number;
            product_variant_id: number | undefined;
            quantity: number;
            unit_price: string;
            subtotal: string;
        }[];
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        metadata: unknown;
        id: number;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    }>;
    /**
     * Get order by order number
     */
    getOrderByNumber(storeId: number, orderNumber: string): Promise<{
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        metadata: unknown;
        id: number;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    } | null>;
    /**
     * Get order items for an order
     */
    getOrderItems(orderId: number): Promise<{
        id: number;
        created_at: Date;
        product_id: number;
        product_variant_id: number | null;
        quantity: number;
        order_id: number;
        unit_price: string;
        subtotal: string;
    }[]>;
    /**
     * Get products info for order items
     */
    getOrderWithProducts(storeId: number, orderId: number): Promise<{
        items: {
            product_name: string;
            id: number;
            created_at: Date;
            product_id: number;
            product_variant_id: number | null;
            quantity: number;
            order_id: number;
            unit_price: string;
            subtotal: string;
        }[];
        status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
        metadata: unknown;
        id: number;
        store_id: number;
        created_at: Date;
        updated_at: Date;
        customer_id: number;
        order_number: string;
        total_amount: string;
        tax_amount: string | null;
        shipping_amount: string | null;
        discount_amount: string | null;
        notes: string | null;
        channel: "whatsapp" | "telegram" | "web" | "mobile" | "api";
    } | null>;
}
export declare const whatsAppService: WhatsAppService;
//# sourceMappingURL=whatsapp.service.d.ts.map