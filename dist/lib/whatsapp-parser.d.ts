/**
 * WhatsApp Message Parser
 * Classifies incoming messages and extracts intent/data
 *
 * Patterns:
 * - Menu request: "menu", "catalog", "produk", "list", "apa aja produknya"
 * - Order request: "order [id] qty [qty]", "2x barang", "beli", "pesan"
 * - Payment request: "bayar", "transfer", "payment", "berapa harga"
 * - Status request: "status", "track", "sudah", "dimana", "progress"
 * - Customer support: anything else
 */
export interface OrderDetails {
    productId: number;
    quantity: number;
    variantId?: number;
}
export declare class WhatsAppParser {
    /**
     * Check if message is a menu/catalog request
     * Keywords: menu, catalog, produk, list, apa aja, katalog
     */
    isMenuRequest(text: string): boolean;
    /**
     * Check if message is an order request
     * Patterns: "order [id] qty [qty]", "2x barang", "beli", "pesan [name]"
     */
    isOrderRequest(text: string): boolean;
    /**
     * Check if message is a payment request
     * Keywords: bayar, transfer, payment, harga, berapa, price
     */
    isPaymentRequest(text: string): boolean;
    /**
     * Check if message is a status/tracking request
     * Keywords: status, track, sudah, dimana, progress, mana, kapan
     */
    isStatusRequest(text: string): boolean;
    /**
     * Extract order details from message
     * Patterns:
     * - "order 1 qty 2" → { productId: 1, quantity: 2 }
     * - "2x barang-1" → { productId: 1, quantity: 2 }
     * - "order 2 qty 3" → { productId: 2, quantity: 3 }
     */
    extractOrderDetails(text: string): OrderDetails | null;
    /**
     * Extract order number from message (for status tracking)
     * Patterns: "#123", "order #123", "pesanan 123", "123"
     */
    extractOrderNumber(text: string): string | null;
    /**
     * Get intent confidence score (0-1)
     * Helps determine if classification is ambiguous
     */
    getIntentConfidence(text: string, intent: string): number;
    /**
     * Get primary intent from message
     * Returns the highest confidence intent
     */
    getPrimaryIntent(text: string): "menu" | "order" | "payment" | "status" | "support";
}
//# sourceMappingURL=whatsapp-parser.d.ts.map