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
export class WhatsAppParser {
    /**
     * Check if message is a menu/catalog request
     * Keywords: menu, catalog, produk, list, apa aja, katalog
     */
    isMenuRequest(text) {
        const menuKeywords = [
            "menu",
            "katalog",
            "catalog",
            "produk",
            "produknya",
            "list",
            "daftar",
            "apa aja",
            "apa aja produk",
            "lihat",
            "tampilkan",
        ];
        const lowerText = text.toLowerCase().trim();
        return menuKeywords.some((keyword) => lowerText.includes(keyword));
    }
    /**
     * Check if message is an order request
     * Patterns: "order [id] qty [qty]", "2x barang", "beli", "pesan [name]"
     */
    isOrderRequest(text) {
        const orderPatterns = [
            /order\s+(\d+)\s+qty\s+(\d+)/i,
            /pesan\s+/i,
            /beli\s+/i,
            /(\d+)x\s+/i,
            /qty\s+(\d+)/i,
            /jumlah\s+(\d+)/i,
            /order\s+/i,
        ];
        return orderPatterns.some((pattern) => pattern.test(text));
    }
    /**
     * Check if message is a payment request
     * Keywords: bayar, transfer, payment, harga, berapa, price
     */
    isPaymentRequest(text) {
        const paymentKeywords = [
            "bayar",
            "transfer",
            "payment",
            "harga",
            "berapa",
            "price",
            "biaya",
            "cost",
        ];
        const lowerText = text.toLowerCase().trim();
        return paymentKeywords.some((keyword) => lowerText.includes(keyword));
    }
    /**
     * Check if message is a status/tracking request
     * Keywords: status, track, sudah, dimana, progress, mana, kapan
     */
    isStatusRequest(text) {
        const statusKeywords = [
            "status",
            "track",
            "tracking",
            "sudah",
            "dimana",
            "mana",
            "progress",
            "kapan",
            "jam",
            "berapa lama",
            "tiba",
            "sampai",
        ];
        const lowerText = text.toLowerCase().trim();
        return statusKeywords.some((keyword) => lowerText.includes(keyword));
    }
    /**
     * Extract order details from message
     * Patterns:
     * - "order 1 qty 2" → { productId: 1, quantity: 2 }
     * - "2x barang-1" → { productId: 1, quantity: 2 }
     * - "order 2 qty 3" → { productId: 2, quantity: 3 }
     */
    extractOrderDetails(text) {
        // Pattern: "order [id] qty [qty]"
        const orderQtyMatch = text.match(/order\s+(\d+)\s+qty\s+(\d+)/i);
        if (orderQtyMatch) {
            return {
                productId: parseInt(orderQtyMatch[1], 10),
                quantity: parseInt(orderQtyMatch[2], 10),
            };
        }
        // Pattern: "[qty]x [id]" or "[qty]x barang-[id]"
        const multiplyMatch = text.match(/(\d+)x\s+(?:barang[- ]?)?(\d+)/i);
        if (multiplyMatch) {
            return {
                quantity: parseInt(multiplyMatch[1], 10),
                productId: parseInt(multiplyMatch[2], 10),
            };
        }
        // Pattern: "order [id]" with separate qty
        const simpleOrderMatch = text.match(/order\s+(\d+)/i);
        if (simpleOrderMatch) {
            const qtyMatch = text.match(/qty\s+(\d+)/i);
            return {
                productId: parseInt(simpleOrderMatch[1], 10),
                quantity: qtyMatch ? parseInt(qtyMatch[1], 10) : 1,
            };
        }
        return null;
    }
    /**
     * Extract order number from message (for status tracking)
     * Patterns: "#123", "order #123", "pesanan 123", "123"
     */
    extractOrderNumber(text) {
        // Pattern: "#[number]"
        const hashMatch = text.match(/#(\d+)/);
        if (hashMatch)
            return hashMatch[1];
        // Pattern: "order [number]" or "pesanan [number]"
        const orderMatch = text.match(/(?:order|pesanan|no|nomor|no\.|#)\s*(?:no\.?\s*)?(\d+)/i);
        if (orderMatch)
            return orderMatch[1];
        // Just a number
        const numMatch = text.match(/^(\d+)$/);
        if (numMatch)
            return numMatch[1];
        return null;
    }
    /**
     * Get intent confidence score (0-1)
     * Helps determine if classification is ambiguous
     */
    getIntentConfidence(text, intent) {
        const lowerText = text.toLowerCase();
        switch (intent) {
            case "menu":
                return this.isMenuRequest(text) ? 0.95 : 0;
            case "order":
                return this.isOrderRequest(text) ? 0.9 : 0;
            case "payment":
                return this.isPaymentRequest(text) ? 0.85 : 0;
            case "status":
                return this.isStatusRequest(text) ? 0.88 : 0;
            default:
                return 0;
        }
    }
    /**
     * Get primary intent from message
     * Returns the highest confidence intent
     */
    getPrimaryIntent(text) {
        const intents = ["menu", "order", "payment", "status"];
        const scores = intents.map((intent) => ({
            intent,
            score: this.getIntentConfidence(text, intent),
        }));
        const highest = scores.reduce((prev, current) => current.score > prev.score ? current : prev);
        return highest.score > 0 ? highest.intent : "support";
    }
}
//# sourceMappingURL=whatsapp-parser.js.map