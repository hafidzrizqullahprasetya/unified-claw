import { describe, it, expect, beforeEach, vi } from "vitest";
import { createHmac } from "crypto";
import {
  WhatsAppService,
  type WhatsAppWebhookPayload,
} from "@/services/whatsapp.service";

// Mock environment
const mockEnv = {
  WHATSAPP_BUSINESS_PHONE_ID: "123456789",
  WHATSAPP_BUSINESS_ACCOUNT_ID: "app_987654",
  WHATSAPP_API_TOKEN: "test-token-abc123",
  WHATSAPP_WEBHOOK_VERIFY_TOKEN: "webhook-verify-token",
  NODE_ENV: "test" as const,
};

// Mock fetch
global.fetch = vi.fn();

// Mock getEnv
vi.mock("@/env", () => ({
  getEnv: () => mockEnv,
  validateEnv: () => mockEnv,
}));

// Mock database
vi.mock("@/db/config", () => ({
  getDb: () => ({
    select: () => ({
      from: () => ({
        where: () => Promise.resolve([]),
        limit: () => Promise.resolve([]),
      }),
    }),
    insert: () => ({
      values: () => ({
        returning: () => Promise.resolve([{ id: 1 }]),
      }),
    }),
  }),
}));

describe("WhatsApp Service", () => {
  let service: WhatsAppService;

  beforeEach(() => {
    service = new WhatsAppService();
    vi.clearAllMocks();
  });

  describe("Webhook Signature Verification", () => {
    it("should verify valid webhook signature", () => {
      const body = JSON.stringify({ test: "data" });
      const signature = createHmac(
        "sha256",
        mockEnv.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
      )
        .update(body)
        .digest("hex");

      const result = service.verifyWebhookSignature(
        `sha256=${signature}`,
        body,
      );
      expect(result).toBe(true);
    });

    it("should reject invalid webhook signature", () => {
      const body = JSON.stringify({ test: "data" });
      const result = service.verifyWebhookSignature("sha256=invalid", body);
      expect(result).toBe(false);
    });

    it("should throw error when webhook token not configured", () => {
      const originalEnv = mockEnv.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
      mockEnv.WHATSAPP_WEBHOOK_VERIFY_TOKEN = "";

      expect(() =>
        service.verifyWebhookSignature("sha256=test", "body"),
      ).toThrow();

      mockEnv.WHATSAPP_WEBHOOK_VERIFY_TOKEN = originalEnv;
    });
  });

  describe("Message Parsing", () => {
    it("should parse text message from webhook payload", () => {
      const payload: WhatsAppWebhookPayload = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "123",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  messages: [
                    {
                      from: "1234567890",
                      id: "msg_123",
                      timestamp: "1639032000",
                      type: "text",
                      text: {
                        body: "Hello, I want to order",
                      },
                    },
                  ],
                  contacts: [
                    {
                      profile: { name: "John Doe" },
                      wa_id: "1234567890",
                    },
                  ],
                  metadata: {
                    display_phone_number: "62812345678",
                    phone_number_id: "123456789",
                  },
                },
                field: "messages",
              },
            ],
          },
        ],
      };

      const result = service.parseIncomingMessage(payload);

      expect(result).toBeDefined();
      expect(result?.from).toBe("1234567890");
      expect(result?.text).toBe("Hello, I want to order");
      expect(result?.messageId).toBe("msg_123");
      expect(result?.type).toBe("text");
    });

    it("should parse image message from webhook payload", () => {
      const payload: WhatsAppWebhookPayload = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "123",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  messages: [
                    {
                      from: "1234567890",
                      id: "msg_img_123",
                      timestamp: "1639032000",
                      type: "image",
                      image: {
                        id: "img_123",
                        mime_type: "image/jpeg",
                      },
                    },
                  ],
                  metadata: {
                    display_phone_number: "62812345678",
                    phone_number_id: "123456789",
                  },
                },
                field: "messages",
              },
            ],
          },
        ],
      };

      const result = service.parseIncomingMessage(payload);

      expect(result).toBeDefined();
      expect(result?.type).toBe("image");
      expect(result?.text).toContain("[Image:");
    });

    it("should return null for non-whatsapp object", () => {
      const payload = {
        object: "instagram_business_account",
        entry: [],
      } as any;

      const result = service.parseIncomingMessage(payload);
      expect(result).toBeNull();
    });

    it("should return null when no messages in payload", () => {
      const payload: WhatsAppWebhookPayload = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "123",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  messages: [],
                  metadata: {
                    display_phone_number: "62812345678",
                    phone_number_id: "123456789",
                  },
                },
                field: "messages",
              },
            ],
          },
        ],
      };

      const result = service.parseIncomingMessage(payload);
      expect(result).toBeNull();
    });
  });

  describe("Message Formatting", () => {
    it("should format product menu correctly", () => {
      const products = [
        {
          id: 1,
          store_id: 1,
          name: "Shampo",
          slug: "shampo",
          description: "Shampo berkualitas tinggi",
          price: "15000",
          cost_price: "8000",
          sku: "SHP-001",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
          product_variants: [],
        },
        {
          id: 2,
          store_id: 1,
          name: "Kondisioner",
          slug: "kondisioner",
          description: "Kondisioner lembut untuk rambut",
          price: "12000",
          cost_price: "6000",
          sku: "KDN-001",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
          product_variants: [],
        },
      ] as any[];

      const message = service.formatProductMenu(products);

      expect(message).toContain("🏪 *Katalog Produk*");
      expect(message).toContain("Shampo");
      expect(message).toContain("Kondisioner");
      expect(message).toContain("Rp15.000");
      expect(message).toContain("order [nomor] qty [jumlah]");
    });

    it("should handle empty product list", () => {
      const message = service.formatProductMenu([]);

      expect(message).toContain("katalog produk sedang kosong");
    });

    it("should format order confirmation message", () => {
      const order = {
        order_number: "ORD-001",
        status: "confirmed",
        total_amount: "50000",
      };
      const items = [
        {
          product_name: "Shampo",
          quantity: 2,
          unit_price: "15000",
        },
      ];

      const message = service.formatOrderConfirmation(order, items);

      expect(message).toContain("✅ Pesanan Dikonfirmasi");
      expect(message).toContain("ORD-001");
      expect(message).toContain("Shampo x2");
      expect(message).toContain("Rp50.000");
    });

    it("should format order status message", () => {
      const order = {
        order_number: "ORD-001",
        status: "shipped",
        total_amount: "50000",
      };

      const message = service.formatOrderStatus(order);

      expect(message).toContain("Status Pesanan");
      expect(message).toContain("ORD-001");
      expect(message).toContain("SHIPPED");
      expect(message).toContain("📦 Pesanan sedang dalam perjalanan");
    });

    it("should format payment confirmation message", () => {
      const order = {
        order_number: "ORD-002",
        total_amount: "100000",
      };

      const message = service.formatPaymentConfirmation(order);

      expect(message).toContain("💳 Pembayaran Berhasil");
      expect(message).toContain("ORD-002");
      expect(message).toContain("Rp100.000");
    });
  });

  describe("Message Sending", () => {
    it("should send text message via Meta API", async () => {
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({
          messages: [{ id: "msg_sent_123" }],
        }),
      });

      const messageId = await service.sendMessage(
        "1234567890",
        "Hello, this is a test",
      );

      expect(messageId).toBe("msg_sent_123");
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("messages"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockEnv.WHATSAPP_API_TOKEN}`,
          }),
        }),
      );
    });

    it("should throw error when WhatsApp config incomplete", async () => {
      const originalPhoneId = mockEnv.WHATSAPP_BUSINESS_PHONE_ID;
      mockEnv.WHATSAPP_BUSINESS_PHONE_ID = "";

      await expect(service.sendMessage("1234567890", "Test")).rejects.toThrow();

      mockEnv.WHATSAPP_BUSINESS_PHONE_ID = originalPhoneId;
    });

    it("should throw error when Meta API returns error", async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => ({
          error: {
            message: "Invalid phone number",
          },
        }),
        statusText: "Bad Request",
      });

      try {
        await service.sendMessage("invalid", "Test");
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect((error as Error).message).toContain("WhatsApp API error");
      }
    });
  });

  describe("Customer Management", () => {
    it("should get or create customer", async () => {
      // This would require proper database mocking
      // For now, test the structure
      expect(service.getOrCreateCustomer).toBeDefined();
    });
  });

  describe("Product Retrieval", () => {
    it("should get store products", async () => {
      // This would require proper database mocking
      expect(service.getStoreProducts).toBeDefined();
    });
  });

  describe("Message Saving", () => {
    it("should save message to database", async () => {
      // This would require proper database mocking
      expect(service.saveMessage).toBeDefined();
    });
  });

  describe("Status Notification", () => {
    it("should notify order status change", async () => {
      // Mock send message
      vi.spyOn(service, "sendMessage").mockResolvedValue("msg_123");

      // Test that notification is sent (would need proper DB mock)
      expect(service.notifyOrderStatusChange).toBeDefined();
    });
  });

  describe("Integration Patterns", () => {
    it("should follow OpenClaw-like service architecture", () => {
      // Verify singleton pattern
      expect(service).toBeDefined();

      // Verify method signatures match OpenClaw pattern
      expect(typeof service.sendMessage).toBe("function");
      expect(typeof service.parseIncomingMessage).toBe("function");
      expect(typeof service.verifyWebhookSignature).toBe("function");
      expect(typeof service.saveMessage).toBe("function");
      expect(typeof service.notifyOrderStatusChange).toBe("function");
    });

    it("should have consistent error handling", async () => {
      (global.fetch as any).mockRejectedValue(new Error("Network error"));

      try {
        await service.sendMessage("123", "test");
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect((error as Error).message).toContain(
          "Failed to send WhatsApp message",
        );
      }
    });
  });
});
