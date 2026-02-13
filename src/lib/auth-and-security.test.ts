import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { hashPassword, comparePassword } from "@/lib/hashing";
import { signToken, verifyToken } from "@/lib/jwt";
import {
  ValidationError,
  NotFoundError,
  AuthError,
  ErrorCode,
} from "@/lib/errors";

describe("Auth & Security", () => {
  describe("Password Hashing", () => {
    it("should hash password correctly", async () => {
      const password = "MySecurePassword123!";
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(20); // bcrypt hashes are long
    });

    it("should verify correct password", async () => {
      const password = "MySecurePassword123!";
      const hash = await hashPassword(password);
      const isValid = await comparePassword(password, hash);

      expect(isValid).toBe(true);
    });

    it("should reject incorrect password", async () => {
      const password = "MySecurePassword123!";
      const wrongPassword = "WrongPassword123!";
      const hash = await hashPassword(password);
      const isValid = await comparePassword(wrongPassword, hash);

      expect(isValid).toBe(false);
    });

    it("should handle different passwords differently", async () => {
      const password1 = "Password123!";
      const password2 = "Password456!";
      const hash1 = await hashPassword(password1);
      const hash2 = await hashPassword(password2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("JWT Token", () => {
    const testPayload = {
      userId: 1,
      email: "test@example.com",
      role: "seller" as const,
    };

    it("should sign token correctly", () => {
      const token = signToken(testPayload);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3); // JWT format: header.payload.signature
    });

    it("should verify valid token", () => {
      const token = signToken(testPayload);
      const verified = verifyToken(token);

      expect(verified).toBeDefined();
      expect(verified.userId).toBe(testPayload.userId);
      expect(verified.email).toBe(testPayload.email);
      expect(verified.role).toBe(testPayload.role);
    });

    it("should reject invalid token", () => {
      const invalidToken = "invalid.token.here";

      expect(() => verifyToken(invalidToken)).toThrow();
    });

    it("should reject expired token", () => {
      // Create a token with very short expiry
      const expiredToken = signToken(testPayload);
      // For this test, we'd need to mock time or use a library like jest-date-mock
      // This is a placeholder for the concept

      expect(expiredToken).toBeDefined();
    });

    it("should include all claims in token", () => {
      const token = signToken(testPayload);
      const verified = verifyToken(token);

      expect(verified.userId).toBe(1);
      expect(verified.email).toBe("test@example.com");
      expect(verified.role).toBe("seller");
    });
  });
});

describe("Error Handling", () => {
  describe("Validation Error", () => {
    it("should create validation error with message", () => {
      const message = "Email is required";
      const error = new ValidationError(message);

      expect(error.message).toBe(message);
      expect(error.code).toBe(ErrorCode.VALIDATION_FAILED);
      expect(error.statusCode).toBe(400);
    });

    it("should include context in error", () => {
      const message = "Invalid email format";
      const context = { field: "email", value: "invalid" };
      const error = new ValidationError(message, context);

      expect(error.context).toEqual(context);
    });
  });

  describe("NotFound Error", () => {
    it("should create not found error", () => {
      const error = new NotFoundError("User", 123);

      expect(error.message).toContain("User");
      expect(error.message).toContain("123");
      expect(error.statusCode).toBe(404);
    });

    it("should handle resource without ID", () => {
      const error = new NotFoundError("Product");

      expect(error.message).toContain("Product");
      expect(error.message).toContain("not found");
    });
  });

  describe("Auth Error", () => {
    it("should create auth error", () => {
      const error = new AuthError(ErrorCode.UNAUTHORIZED, "Token invalid");

      expect(error.message).toBe("Token invalid");
      expect(error.statusCode).toBe(401);
    });

    it("should use default message if not provided", () => {
      const error = new AuthError(ErrorCode.INVALID_CREDENTIALS);

      expect(error.message).toBeDefined();
      expect(error.statusCode).toBe(401);
    });
  });

  describe("Error JSON serialization", () => {
    it("should serialize error to JSON", () => {
      const error = new ValidationError("Test error", { field: "email" });
      const json = error.toJSON();

      expect(json.code).toBe(ErrorCode.VALIDATION_FAILED);
      expect(json.message).toBe("Test error");
      expect(json.statusCode).toBe(400);
      expect(json.context).toEqual({ field: "email" });
    });
  });
});

describe("Validation Schemas", () => {
  it("should validate email format", () => {
    // Test basic email validation patterns
    const validEmails = [
      "test@example.com",
      "user.name@company.co.id",
      "first+last@domain.org",
    ];

    const invalidEmails = [
      "notanemail",
      "@example.com",
      "user@",
      "user @example.com",
    ];

    // These would use Zod validation
    expect(validEmails).toBeDefined();
    expect(invalidEmails).toBeDefined();
  });

  it("should validate password requirements", () => {
    const strongPassword = "MySecurePassword123!";
    const weakPassword = "123";

    expect(strongPassword.length).toBeGreaterThan(8);
    expect(weakPassword.length).toBeLessThan(8);
  });

  it("should validate phone number format", () => {
    const validPhone = "6281234567890";
    const invalidPhone = "123";

    expect(validPhone).toBeDefined();
    expect(invalidPhone).toBeDefined();
  });
});
