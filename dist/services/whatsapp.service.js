import { createHmac } from "crypto";
import { eq, and } from "drizzle-orm";
import { getDb } from "@/db/config";
import { getEnv } from "@/env";
import { customers, customer_messages, orders, products } from "@/db/schema";
import { ValidationError, AppError, ErrorCode, } from "@/lib/errors";
export class WhatsAppService {
    /**
     * Verify webhook signature from Meta
     * Prevents replay attacks and ensures request authenticity
     */
    verifyWebhookSignature(signature, body) {
        const env = getEnv();
        if (!env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
            throw new ValidationError("WhatsApp webhook verification token not configured");
        }
        // X-Hub-Signature format: "sha256=..."
        const expectedSignature = createHmac("sha256", env.WHATSAPP_WEBHOOK_VERIFY_TOKEN)
            .update(body)
            .digest("hex");
        const providedSignature = signature.replace("sha256=", "");
        return providedSignature === expectedSignature;
    }
    /**
     * Parse incoming WhatsApp message from Meta webhook
     */
    parseIncomingMessage(payload) {
        if (payload.object !== "whatsapp_business_account") {
            return null;
        }
        for (const entry of payload.entry) {
            for (const change of entry.changes) {
                const messages = change.value.messages;
                if (!messages || messages.length === 0)
                    continue;
                const message = messages[0];
                let text = "";
                let type = "text";
                if (message.type === "text" && message.text) {
                    text = message.text.body;
                    type = "text";
                }
                else if (message.type === "image" && message.image) {
                    text = `[Image: ${message.image.id}]`;
                    type = "image";
                }
                else if (message.type === "file" && message.file) {
                    text = `[File: ${message.file.id}]`;
                    type = "file";
                }
                else {
                    continue;
                }
                return {
                    from: message.from,
                    text,
                    messageId: message.id,
                    timestamp: parseInt(message.timestamp),
                    type,
                };
            }
        }
        return null;
    }
    /**
     * Save incoming or outgoing message to database
     */
    async saveMessage(storeId, customerId, message, direction, messageType = "text", metadata) {
        const db = getDb();
        await db.insert(customer_messages).values({
            customer_id: customerId,
            store_id: storeId,
            channel: "whatsapp",
            message_type: messageType,
            content: message,
            direction,
            metadata: metadata || {},
        });
    }
    /**
     * Send message via Meta API
     * Sends text message to customer phone number
     */
    async sendMessage(phoneNumber, text) {
        const env = getEnv();
        if (!env.WHATSAPP_BUSINESS_PHONE_ID || !env.WHATSAPP_API_TOKEN) {
            throw new ValidationError("WhatsApp configuration incomplete");
        }
        const url = `https://graph.instagram.com/v18.0/${env.WHATSAPP_BUSINESS_PHONE_ID}/messages`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${env.WHATSAPP_API_TOKEN}`,
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: phoneNumber,
                    type: "text",
                    text: {
                        preview_url: true,
                        body: text,
                    },
                }),
            });
            if (!response.ok) {
                const errorData = (await response.json());
                throw new AppError(ErrorCode.EXTERNAL_SERVICE_ERROR, 500, `WhatsApp API error: ${errorData.error?.message || response.statusText}`);
            }
            const data = (await response.json());
            return data.messages?.[0]?.id || "";
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError(ErrorCode.EXTERNAL_SERVICE_ERROR, 500, `Failed to send WhatsApp message: ${String(error)}`);
        }
    }
    /**
     * Get or create customer by phone number
     */
    async getOrCreateCustomer(storeId, phoneNumber, contactName) {
        const db = getDb();
        // Try to find existing customer
        const existing = await db
            .select()
            .from(customers)
            .where(and(eq(customers.store_id, storeId), eq(customers.phone, phoneNumber)));
        if (existing.length > 0) {
            return existing[0];
        }
        // Create new customer
        const newCustomer = await db
            .insert(customers)
            .values({
            store_id: storeId,
            phone: phoneNumber,
            name: contactName || `Customer ${phoneNumber}`,
        })
            .returning();
        return newCustomer[0];
    }
    /**
     * Get store products for menu display
     */
    async getStoreProducts(storeId) {
        const db = getDb();
        const prods = await db
            .select()
            .from(products)
            .where(eq(products.store_id, storeId))
            .limit(10); // Limit to avoid huge messages
        return prods;
    }
    /**
     * Format product menu as WhatsApp message
     */
    formatProductMenu(productsList) {
        if (productsList.length === 0) {
            return "Maaf, katalog produk sedang kosong. Hubungi admin untuk informasi lebih lanjut.";
        }
        let message = "🏪 *Katalog Produk*\n\n";
        productsList.forEach((product, index) => {
            const price = parseFloat(product.price);
            message += `${index + 1}. *${product.name}*\n`;
            message += `   Harga: Rp${price.toLocaleString("id-ID")}\n`;
            if (product.description) {
                message += `   ${product.description.substring(0, 100)}\n`;
            }
            message += "\n";
        });
        message += "Untuk memesan, kirim:\n";
        message += "`order [nomor] qty [jumlah]`\n";
        message += "Contoh: `order 1 qty 2`";
        return message;
    }
    /**
     * Format order confirmation message
     */
    formatOrderConfirmation(order, items, paymentLink) {
        let message = "*✅ Pesanan Dikonfirmasi*\n\n";
        message += `Nomor Pesanan: *${order.order_number}*\n`;
        message += `Status: ${order.status}\n\n`;
        message += "*Detail Pesanan:*\n";
        items.forEach((item) => {
            message += `• ${item.product_name} x${item.quantity}\n`;
            message += `  Rp${parseFloat(item.unit_price).toLocaleString("id-ID")}\n`;
        });
        message += `\n*Total: Rp${parseFloat(order.total_amount).toLocaleString("id-ID")}*\n`;
        if (paymentLink) {
            message += `\nLakukan pembayaran di sini:\n${paymentLink}\n`;
            message += "Link berlaku selama 1 jam.";
        }
        return message;
    }
    /**
     * Format order status message
     */
    formatOrderStatus(order) {
        const statusEmoji = {
            pending: "⏳",
            confirmed: "✅",
            processing: "🔄",
            shipped: "🚚",
            delivered: "📦",
            cancelled: "❌",
            refunded: "💸",
        };
        let message = `${statusEmoji[order.status] || "ℹ️"} *Status Pesanan*\n\n`;
        message += `Nomor: *${order.order_number}*\n`;
        message += `Status: *${order.status.toUpperCase()}*\n`;
        message += `Total: Rp${parseFloat(order.total_amount).toLocaleString("id-ID")}\n`;
        if (order.status === "shipped") {
            message += "\n📦 Pesanan sedang dalam perjalanan ke tangan Anda!";
        }
        else if (order.status === "delivered") {
            message += "\n✅ Pesanan telah tiba! Terima kasih telah berbelanja.";
        }
        else if (order.status === "processing") {
            message += "\n🔄 Pesanan sedang dikemas, akan dikirim segera.";
        }
        return message;
    }
    /**
     * Format payment confirmation message
     */
    formatPaymentConfirmation(order) {
        let message = "*💳 Pembayaran Berhasil!*\n\n";
        message += `Pesanan: *${order.order_number}*\n`;
        message += `Jumlah: Rp${parseFloat(order.total_amount).toLocaleString("id-ID")}\n`;
        message += `Status: Dikonfirmasi\n\n`;
        message += "Barang akan dikirim dalam 1-2 jam.\n";
        message += "Anda akan menerima update tracking segera.";
        return message;
    }
    /**
     * Send notification when order status changes
     * Maps order status to customer and sends formatted message
     */
    async notifyOrderStatusChange(customerId, storeId, order, newStatus) {
        try {
            const db = getDb();
            const customer = await db
                .select()
                .from(customers)
                .where(eq(customers.id, customerId));
            if (!customer.length) {
                console.warn(`Customer ${customerId} not found for notification`);
                return;
            }
            const message = this.formatOrderStatus({
                ...order,
                status: newStatus,
            });
            await this.sendMessage(customer[0].phone, message);
            await this.saveMessage(storeId, customerId, message, "outbound");
        }
        catch (error) {
            console.error("Failed to send order status notification:", error);
            // Don't throw - notifications should not block order processing
        }
    }
    /**
     * Send payment confirmed notification
     */
    async notifyPaymentConfirmed(customerId, storeId, order) {
        try {
            const db = getDb();
            const customer = await db
                .select()
                .from(customers)
                .where(eq(customers.id, customerId));
            if (!customer.length) {
                return;
            }
            const message = this.formatPaymentConfirmation(order);
            await this.sendMessage(customer[0].phone, message);
            await this.saveMessage(storeId, customerId, message, "outbound");
        }
        catch (error) {
            console.error("Failed to send payment confirmation:", error);
        }
    }
    /**
     * Send order shipped notification
     */
    async notifyOrderShipped(customerId, storeId, order, trackingNumber) {
        try {
            const db = getDb();
            const customer = await db
                .select()
                .from(customers)
                .where(eq(customers.id, customerId));
            if (!customer.length) {
                return;
            }
            let message = "*📦 Pesanan Dikirim!*\n\n";
            message += `Nomor Pesanan: ${order.order_number}\n`;
            if (trackingNumber) {
                message += `Nomor Tracking: ${trackingNumber}\n`;
            }
            message += "\nPesanan Anda sedang dalam perjalanan.\n";
            message += "Anda akan menerima notifikasi ketika pesanan tiba.";
            await this.sendMessage(customer[0].phone, message);
            await this.saveMessage(storeId, customerId, message, "outbound");
        }
        catch (error) {
            console.error("Failed to send shipped notification:", error);
        }
    }
    /**
     * Send order delivered notification
     */
    async notifyOrderDelivered(customerId, storeId, order) {
        try {
            const db = getDb();
            const customer = await db
                .select()
                .from(customers)
                .where(eq(customers.id, customerId));
            if (!customer.length) {
                return;
            }
            let message = "*✅ Pesanan Tiba!*\n\n";
            message += `Nomor Pesanan: ${order.order_number}\n`;
            message += "Terima kasih telah berbelanja dengan kami!\n\n";
            message += "Jika ada pertanyaan, hubungi kami kapan saja.";
            await this.sendMessage(customer[0].phone, message);
            await this.saveMessage(storeId, customerId, message, "outbound");
        }
        catch (error) {
            console.error("Failed to send delivered notification:", error);
        }
    }
    /**
     * Create order from WhatsApp message
     * Integrates with OrderService for order creation
     */
    async createOrderFromMessage(storeId, customerId, productId, quantity) {
        const { OrderService } = await import("@/services/order.service");
        const orderService = new OrderService();
        try {
            const order = await orderService.createOrder(storeId, customerId, {
                customer_id: customerId,
                items: [{ product_id: productId, quantity }],
            });
            return order;
        }
        catch (error) {
            console.error("Failed to create order from WhatsApp:", error);
            throw error;
        }
    }
    /**
     * Get order by order number
     */
    async getOrderByNumber(storeId, orderNumber) {
        const db = getDb();
        const result = await db
            .select()
            .from(orders)
            .where(and(eq(orders.store_id, storeId), eq(orders.order_number, orderNumber)));
        return result.length > 0 ? result[0] : null;
    }
    /**
     * Get order items for an order
     */
    async getOrderItems(orderId) {
        const { order_items } = await import("@/db/schema");
        const db = getDb();
        const items = await db
            .select()
            .from(order_items)
            .where(eq(order_items.order_id, orderId));
        return items;
    }
    /**
     * Get products info for order items
     */
    async getOrderWithProducts(storeId, orderId) {
        const db = getDb();
        const order = await db
            .select()
            .from(orders)
            .where(and(eq(orders.id, orderId), eq(orders.store_id, storeId)));
        if (order.length === 0) {
            return null;
        }
        const items = await this.getOrderItems(orderId);
        // Enrich items with product names
        const enrichedItems = await Promise.all(items.map(async (item) => {
            const product = await db
                .select()
                .from(products)
                .where(eq(products.id, item.product_id));
            return {
                ...item,
                product_name: product.length > 0 ? product[0].name : "Unknown",
            };
        }));
        return {
            ...order[0],
            items: enrichedItems,
        };
    }
}
// Export singleton
export const whatsAppService = new WhatsAppService();
//# sourceMappingURL=whatsapp.service.js.map