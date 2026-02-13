import { describe, it, expect, beforeEach } from "vitest";
import { WhatsAppParser } from "@/lib/whatsapp-parser";

describe("WhatsApp Parser", () => {
  let parser: WhatsAppParser;

  beforeEach(() => {
    parser = new WhatsAppParser();
  });

  describe("Menu Request Detection", () => {
    it("should detect menu request with keyword 'menu'", () => {
      expect(parser.isMenuRequest("menu")).toBe(true);
      expect(parser.isMenuRequest("Menu")).toBe(true);
      expect(parser.isMenuRequest("MENU")).toBe(true);
    });

    it("should detect menu request with keyword 'katalog'", () => {
      expect(parser.isMenuRequest("katalog")).toBe(true);
      expect(parser.isMenuRequest("Katalog produk")).toBe(true);
    });

    it("should detect menu request with keyword 'produk'", () => {
      expect(parser.isMenuRequest("produk apa aja")).toBe(true);
      expect(parser.isMenuRequest("produk")).toBe(true);
    });

    it("should detect menu request with keyword 'list'", () => {
      expect(parser.isMenuRequest("list produk")).toBe(true);
      expect(parser.isMenuRequest("list")).toBe(true);
    });

    it("should detect menu request with keyword 'apa aja'", () => {
      expect(parser.isMenuRequest("apa aja")).toBe(true);
      expect(parser.isMenuRequest("apa aja produk")).toBe(true);
    });

    it("should not detect non-menu messages as menu request", () => {
      expect(parser.isMenuRequest("order 1 qty 2")).toBe(false);
      expect(parser.isMenuRequest("berapa harga")).toBe(false);
      expect(parser.isMenuRequest("dimana pesanan saya")).toBe(false);
    });

    it("should be case insensitive for menu detection", () => {
      expect(parser.isMenuRequest("MENU")).toBe(true);
      expect(parser.isMenuRequest("MeNu")).toBe(true);
      expect(parser.isMenuRequest("KATALOG PRODUK")).toBe(true);
    });

    it("should detect menu request even with extra whitespace", () => {
      expect(parser.isMenuRequest("  menu  ")).toBe(true);
      expect(parser.isMenuRequest("\tmenu\n")).toBe(true);
    });
  });

  describe("Order Request Detection", () => {
    it("should detect order with pattern 'order [id] qty [qty]'", () => {
      expect(parser.isOrderRequest("order 1 qty 2")).toBe(true);
      expect(parser.isOrderRequest("Order 5 QTY 3")).toBe(true);
    });

    it("should detect order with pattern '[qty]x [id]'", () => {
      expect(parser.isOrderRequest("2x 1")).toBe(true);
      expect(parser.isOrderRequest("3x barang 5")).toBe(true);
    });

    it("should detect order with keyword 'pesan'", () => {
      expect(parser.isOrderRequest("pesan shampo")).toBe(true);
      expect(parser.isOrderRequest("pesan 2")).toBe(true);
    });

    it("should detect order with keyword 'beli'", () => {
      expect(parser.isOrderRequest("beli 3")).toBe(true);
      expect(parser.isOrderRequest("beli shampo")).toBe(true);
    });

    it("should detect order with 'qty' keyword", () => {
      expect(parser.isOrderRequest("qty 2")).toBe(true);
      expect(parser.isOrderRequest("saya butuh qty 5")).toBe(true);
    });

    it("should not detect non-order messages as order request", () => {
      expect(parser.isOrderRequest("menu")).toBe(false);
      expect(parser.isOrderRequest("berapa harga")).toBe(false);
      expect(parser.isOrderRequest("dimana")).toBe(false);
    });
  });

  describe("Payment Request Detection", () => {
    it("should detect payment request with keyword 'bayar'", () => {
      expect(parser.isPaymentRequest("bayar")).toBe(true);
      expect(parser.isPaymentRequest("Bayar sekarang")).toBe(true);
    });

    it("should detect payment request with keyword 'transfer'", () => {
      expect(parser.isPaymentRequest("transfer")).toBe(true);
      expect(parser.isPaymentRequest("transfer sekarang")).toBe(true);
    });

    it("should detect payment request with keyword 'payment'", () => {
      expect(parser.isPaymentRequest("payment")).toBe(true);
      expect(parser.isPaymentRequest("payment link")).toBe(true);
    });

    it("should detect payment request with keyword 'harga'", () => {
      expect(parser.isPaymentRequest("berapa harga")).toBe(true);
      expect(parser.isPaymentRequest("harga berapa")).toBe(true);
    });

    it("should not detect non-payment messages as payment request", () => {
      expect(parser.isPaymentRequest("menu")).toBe(false);
      expect(parser.isPaymentRequest("order 1 qty 2")).toBe(false);
    });
  });

  describe("Status Request Detection", () => {
    it("should detect status request with keyword 'status'", () => {
      expect(parser.isStatusRequest("status")).toBe(true);
      expect(parser.isStatusRequest("status pesanan")).toBe(true);
    });

    it("should detect status request with keyword 'track'", () => {
      expect(parser.isStatusRequest("track")).toBe(true);
      expect(parser.isStatusRequest("tracking")).toBe(true);
    });

    it("should detect status request with keyword 'sudah'", () => {
      expect(parser.isStatusRequest("sudah tiba")).toBe(true);
      expect(parser.isStatusRequest("sudah dikirim")).toBe(true);
    });

    it("should detect status request with keyword 'dimana'", () => {
      expect(parser.isStatusRequest("dimana pesanan")).toBe(true);
      expect(parser.isStatusRequest("mana barangnya")).toBe(true);
    });

    it("should detect status request with keyword 'kapan'", () => {
      expect(parser.isStatusRequest("kapan tiba")).toBe(true);
      expect(parser.isStatusRequest("berapa lama")).toBe(true);
    });

    it("should not detect non-status messages as status request", () => {
      expect(parser.isStatusRequest("menu")).toBe(false);
      expect(parser.isStatusRequest("order 1")).toBe(false);
    });
  });

  describe("Order Detail Extraction", () => {
    it("should extract order details from 'order [id] qty [qty]'", () => {
      const details = parser.extractOrderDetails("order 1 qty 2");
      expect(details).toBeDefined();
      expect(details?.productId).toBe(1);
      expect(details?.quantity).toBe(2);
    });

    it("should extract order details from 'Order 5 QTY 3'", () => {
      const details = parser.extractOrderDetails("Order 5 QTY 3");
      expect(details).toBeDefined();
      expect(details?.productId).toBe(5);
      expect(details?.quantity).toBe(3);
    });

    it("should extract order details from '[qty]x [id]'", () => {
      const details = parser.extractOrderDetails("2x 1");
      expect(details).toBeDefined();
      expect(details?.quantity).toBe(2);
      expect(details?.productId).toBe(1);
    });

    it("should extract order details from '[qty]x barang-[id]'", () => {
      const details = parser.extractOrderDetails("3x barang-2");
      expect(details).toBeDefined();
      expect(details?.quantity).toBe(3);
      expect(details?.productId).toBe(2);
    });

    it("should extract order details from 'order [id]' with separate qty", () => {
      const details = parser.extractOrderDetails("order 4 qty 5");
      expect(details).toBeDefined();
      expect(details?.productId).toBe(4);
      expect(details?.quantity).toBe(5);
    });

    it("should default quantity to 1 if not specified", () => {
      const details = parser.extractOrderDetails("order 1");
      expect(details).toBeDefined();
      expect(details?.productId).toBe(1);
      expect(details?.quantity).toBe(1);
    });

    it("should return null if order format is invalid", () => {
      const details = parser.extractOrderDetails("invalid order format");
      expect(details).toBeNull();
    });

    it("should handle spaces and case variations", () => {
      const details = parser.extractOrderDetails("ORDER 10 QTY 20");
      expect(details).toBeDefined();
      expect(details?.productId).toBe(10);
      expect(details?.quantity).toBe(20);
    });
  });

  describe("Order Number Extraction", () => {
    it("should extract order number from '#[number]'", () => {
      const orderNum = parser.extractOrderNumber("#123");
      expect(orderNum).toBe("123");
    });

    it("should extract order number from 'order [number]'", () => {
      const orderNum = parser.extractOrderNumber("order 456");
      expect(orderNum).toBe("456");
    });

    it("should extract order number from 'pesanan [number]'", () => {
      const orderNum = parser.extractOrderNumber("pesanan 789");
      expect(orderNum).toBe("789");
    });

    it("should extract order number from plain number", () => {
      const orderNum = parser.extractOrderNumber("12345");
      expect(orderNum).toBe("12345");
    });

    it("should return null if no order number found", () => {
      const orderNum = parser.extractOrderNumber("no order here");
      expect(orderNum).toBeNull();
    });

    it("should be case insensitive", () => {
      const orderNum = parser.extractOrderNumber("ORDER 999");
      expect(orderNum).toBe("999");
    });
  });

  describe("Intent Confidence Scoring", () => {
    it("should give high confidence to menu requests", () => {
      const score = parser.getIntentConfidence("menu", "menu");
      expect(score).toBeGreaterThan(0.9);
    });

    it("should give high confidence to order requests", () => {
      const score = parser.getIntentConfidence("order 1 qty 2", "order");
      expect(score).toBeGreaterThan(0.8);
    });

    it("should give zero confidence to unrelated intents", () => {
      const score = parser.getIntentConfidence("menu", "order");
      expect(score).toBe(0);
    });
  });

  describe("Primary Intent Detection", () => {
    it("should detect menu as primary intent", () => {
      const intent = parser.getPrimaryIntent("menu");
      expect(intent).toBe("menu");
    });

    it("should detect order as primary intent", () => {
      const intent = parser.getPrimaryIntent("order 1 qty 2");
      expect(intent).toBe("order");
    });

    it("should detect status as primary intent", () => {
      const intent = parser.getPrimaryIntent("status");
      expect(intent).toBe("status");
    });

    it("should detect payment as primary intent", () => {
      const intent = parser.getPrimaryIntent("bayar");
      expect(intent).toBe("payment");
    });

    it("should default to support for ambiguous requests", () => {
      const intent = parser.getPrimaryIntent("hello there");
      expect(intent).toBe("support");
    });

    it("should resolve conflicts by highest confidence", () => {
      // "menu" should win over other vague patterns
      const intent = parser.getPrimaryIntent("menu");
      expect(intent).toBe("menu");
    });
  });

  describe("Indonesian Language Support", () => {
    it("should understand Indonesian menu keywords", () => {
      expect(parser.isMenuRequest("katalog")).toBe(true);
      expect(parser.isMenuRequest("daftar produk")).toBe(true);
      expect(parser.isMenuRequest("apa aja produk")).toBe(true);
    });

    it("should understand Indonesian order keywords", () => {
      expect(parser.isOrderRequest("pesan shampo")).toBe(true);
      expect(parser.isOrderRequest("beli 2")).toBe(true);
    });

    it("should understand Indonesian status keywords", () => {
      expect(parser.isStatusRequest("sudah dikirim")).toBe(true);
      expect(parser.isStatusRequest("dimana pesanan")).toBe(true);
      expect(parser.isStatusRequest("kapan sampai")).toBe(true);
    });

    it("should handle Indonesian number formats", () => {
      const details = parser.extractOrderDetails("order 1 qty 2");
      expect(details?.productId).toBe(1);
      expect(details?.quantity).toBe(2);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings", () => {
      expect(parser.isMenuRequest("")).toBe(false);
      expect(parser.isOrderRequest("")).toBe(false);
    });

    it("should handle very long messages", () => {
      const longMsg = "order 1 qty 2 " + "a".repeat(1000);
      expect(parser.isOrderRequest(longMsg)).toBe(true);
    });

    it("should handle special characters", () => {
      expect(parser.isMenuRequest("menu!!!")).toBe(true);
      expect(parser.isOrderRequest("order 1 qty 2 @#$")).toBe(true);
    });

    it("should handle mixed case and spaces", () => {
      const details = parser.extractOrderDetails("  ORDER  1  QTY  2  ");
      expect(details).toBeDefined();
      expect(details?.productId).toBe(1);
      expect(details?.quantity).toBe(2);
    });

    it("should handle multiple spaces between words", () => {
      expect(parser.isMenuRequest("m  e  n  u")).toBe(false);
      expect(parser.isMenuRequest("menu    ")).toBe(true);
    });
  });
});
