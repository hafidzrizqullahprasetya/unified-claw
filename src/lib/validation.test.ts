import { describe, it, expect } from "vitest";
import { z } from "zod";

/**
 * Validation Schema Tests
 * Tests all input validation schemas
 */

describe("Validation Schemas", () => {
  describe("Email Validation", () => {
    const emailSchema = z.string().email("Invalid email");

    it("should accept valid email addresses", () => {
      const validEmails = [
        "test@example.com",
        "user.name@company.co.id",
        "first+last@domain.org",
        "contact+tag@subdomain.co.uk",
      ];

      validEmails.forEach((email) => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid email addresses", () => {
      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "user @example.com",
        "user@.com",
      ];

      invalidEmails.forEach((email) => {
        const result = emailSchema.safeParse(email);
        expect(result.success).toBe(false);
      });
    });

    it("should reject empty email", () => {
      const result = emailSchema.safeParse("");
      expect(result.success).toBe(false);
    });
  });

  describe("Password Validation", () => {
    const passwordSchema = z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain uppercase")
      .regex(/[a-z]/, "Password must contain lowercase")
      .regex(/[0-9]/, "Password must contain number")
      .regex(/[!@#$%^&*]/, "Password must contain special character");

    it("should accept strong passwords", () => {
      const validPasswords = [
        "MySecurePassword123!",
        "StrongPass456@abc",
        "Secure#Pass789XYZ",
      ];

      validPasswords.forEach((password) => {
        const result = passwordSchema.safeParse(password);
        expect(result.success).toBe(true);
      });
    });

    it("should reject weak passwords", () => {
      const weakPasswords = [
        "123456", // Too short, no letters
        "password", // No uppercase, no numbers, no special char
        "PASSWORD123", // No lowercase, no special char
        "Pass123", // Too short
      ];

      weakPasswords.forEach((password) => {
        const result = passwordSchema.safeParse(password);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("Phone Number Validation", () => {
    const phoneSchema = z
      .string()
      .regex(/^(\+\d{1,2})?[\d\-\s]{9,}$/, "Invalid phone format");

    it("should accept valid phone numbers", () => {
      const validPhones = [
        "6281234567890",
        "+62 812 3456 7890",
        "628-123-456-789",
        "62 812 3456 7890",
      ];

      validPhones.forEach((phone) => {
        const result = phoneSchema.safeParse(phone);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid phone numbers", () => {
      const invalidPhones = [
        "123", // Too short
        "abc123", // Contains letters
        "", // Empty
      ];

      invalidPhones.forEach((phone) => {
        const result = phoneSchema.safeParse(phone);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("URL Validation", () => {
    const urlSchema = z.string().url("Invalid URL");

    it("should accept valid URLs", () => {
      const validUrls = [
        "https://example.com",
        "http://localhost:3000",
        "https://subdomain.example.co.id/path",
      ];

      validUrls.forEach((url) => {
        const result = urlSchema.safeParse(url);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid URLs", () => {
      const invalidUrls = [
        "not a url",
        "example.com", // Missing protocol
        "/path/only",
      ];

      invalidUrls.forEach((url) => {
        const result = urlSchema.safeParse(url);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("Number Validation", () => {
    const positiveIntSchema = z.number().int().positive();
    const amountSchema = z.number().min(0);

    it("should accept positive integers", () => {
      expect(positiveIntSchema.safeParse(1).success).toBe(true);
      expect(positiveIntSchema.safeParse(100).success).toBe(true);
      expect(positiveIntSchema.safeParse(999999).success).toBe(true);
    });

    it("should reject zero and negative", () => {
      expect(positiveIntSchema.safeParse(0).success).toBe(false);
      expect(positiveIntSchema.safeParse(-1).success).toBe(false);
    });

    it("should reject decimals", () => {
      expect(positiveIntSchema.safeParse(1.5).success).toBe(false);
      expect(positiveIntSchema.safeParse(100.99).success).toBe(false);
    });

    it("should accept amounts >= 0", () => {
      expect(amountSchema.safeParse(0).success).toBe(true);
      expect(amountSchema.safeParse(50000).success).toBe(true);
      expect(amountSchema.safeParse(999999.99).success).toBe(true);
    });

    it("should reject negative amounts", () => {
      expect(amountSchema.safeParse(-1).success).toBe(false);
      expect(amountSchema.safeParse(-999).success).toBe(false);
    });
  });

  describe("Array Validation", () => {
    const itemsSchema = z
      .array(
        z.object({
          product_id: z.number().int().positive(),
          quantity: z.number().int().positive(),
        }),
      )
      .min(1, "At least one item required");

    it("should accept valid items array", () => {
      const validArray = [
        { product_id: 1, quantity: 2 },
        { product_id: 2, quantity: 5 },
      ];

      const result = itemsSchema.safeParse(validArray);
      expect(result.success).toBe(true);
    });

    it("should reject empty items array", () => {
      const result = itemsSchema.safeParse([]);
      expect(result.success).toBe(false);
    });

    it("should reject invalid item structure", () => {
      const invalidArray = [{ product_id: 1, quantity: "two" }];

      const result = itemsSchema.safeParse(invalidArray);
      expect(result.success).toBe(false);
    });

    it("should reject zero quantity", () => {
      const invalidArray = [{ product_id: 1, quantity: 0 }];

      const result = itemsSchema.safeParse(invalidArray);
      expect(result.success).toBe(false);
    });
  });

  describe("Enum Validation", () => {
    const statusEnum = z.enum([
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
    ]);
    const methodEnum = z.enum([
      "qris",
      "bank_transfer",
      "credit_card",
      "e_wallet",
      "cash",
    ]);

    it("should accept valid order statuses", () => {
      const statuses = [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
      ];

      statuses.forEach((status) => {
        const result = statusEnum.safeParse(status);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid order status", () => {
      const result = statusEnum.safeParse("invalid-status");
      expect(result.success).toBe(false);
    });

    it("should accept valid payment methods", () => {
      const methods = [
        "qris",
        "bank_transfer",
        "credit_card",
        "e_wallet",
        "cash",
      ];

      methods.forEach((method) => {
        const result = methodEnum.safeParse(method);
        expect(result.success).toBe(true);
      });
    });

    it("should reject invalid payment method", () => {
      const result = methodEnum.safeParse("crypto");
      expect(result.success).toBe(false);
    });
  });

  describe("Object Validation", () => {
    const userSchema = z.object({
      email: z.string().email(),
      full_name: z.string().min(2),
      phone: z.string(),
      password: z.string().min(8),
    });

    it("should accept valid user object", () => {
      const user = {
        email: "test@example.com",
        full_name: "Test User",
        phone: "6281234567890",
        password: "SecurePassword123!",
      };

      const result = userSchema.safeParse(user);
      expect(result.success).toBe(true);
    });

    it("should reject object with missing fields", () => {
      const incompleteUser = {
        email: "test@example.com",
        full_name: "Test User",
      };

      const result = userSchema.safeParse(incompleteUser);
      expect(result.success).toBe(false);
    });

    it("should reject object with invalid field values", () => {
      const invalidUser = {
        email: "invalid-email",
        full_name: "A",
        phone: "123",
        password: "short",
      };

      const result = userSchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });

    it("should reject object with extra fields (strict mode)", () => {
      const userWithExtra = {
        email: "test@example.com",
        full_name: "Test User",
        phone: "6281234567890",
        password: "SecurePassword123!",
        extraField: "should not be here",
      };

      const strictSchema = userSchema.strict();
      const result = strictSchema.safeParse(userWithExtra);
      expect(result.success).toBe(false);
    });
  });

  describe("String Length Validation", () => {
    const shortStringSchema = z.string().min(1).max(50);
    const longStringSchema = z.string().min(10).max(500);

    it("should accept strings within length bounds", () => {
      expect(shortStringSchema.safeParse("Hello").success).toBe(true);
      expect(
        longStringSchema.safeParse("This is a longer string").success,
      ).toBe(true);
    });

    it("should reject strings too short", () => {
      expect(shortStringSchema.safeParse("").success).toBe(false);
      expect(longStringSchema.safeParse("Short").success).toBe(false);
    });

    it("should reject strings too long", () => {
      const longString = "a".repeat(51);
      expect(shortStringSchema.safeParse(longString).success).toBe(false);
    });
  });

  describe("Conditional Validation", () => {
    const addressSchema = z
      .object({
        use_default: z.boolean(),
        address: z.string().optional(),
        city: z.string().optional(),
      })
      .refine(
        (data) => data.use_default || (data.address && data.city),
        "Address and city required if not using default",
      );

    it("should accept with use_default true", () => {
      const result = addressSchema.safeParse({
        use_default: true,
      });
      expect(result.success).toBe(true);
    });

    it("should require address and city if use_default is false", () => {
      const result = addressSchema.safeParse({
        use_default: false,
        address: "123 Main St",
        city: "Jakarta",
      });
      expect(result.success).toBe(true);
    });
  });
});
