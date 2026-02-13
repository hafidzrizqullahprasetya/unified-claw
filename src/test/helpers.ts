/**
 * Test utilities and mock database helpers
 * Used across all unit and integration tests
 */

import { vi, expect } from "vitest";

/**
 * Mock database builder
 * Helps create mock database objects for testing
 */
export class MockDatabase {
  private chainMock: any;

  constructor() {
    this.chainMock = this.createChain();
  }

  private createChain() {
    return {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      and: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      returning: vi.fn().mockReturnThis(),
    };
  }

  getDb() {
    return this.chainMock;
  }

  mockSelect(data: any[]) {
    this.chainMock.select.mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue(data),
        }),
      }),
    });
    return this;
  }

  mockSelectFrom(data: any[]) {
    this.chainMock.select.mockReturnValue({
      from: vi.fn().mockResolvedValue(data),
    });
    return this;
  }

  mockInsert(data: any[]) {
    this.chainMock.insert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue(data),
      }),
    });
    return this;
  }

  mockUpdate() {
    this.chainMock.update.mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([{ affected: 1 }]),
      }),
    });
    return this;
  }

  reset() {
    this.chainMock = this.createChain();
    return this;
  }
}

/**
 * Create mock user
 */
export function createMockUser(overrides = {}) {
  return {
    id: 1,
    email: "test@example.com",
    password_hash: "hashed-password",
    full_name: "Test User",
    phone: "6281234567890",
    role: "seller",
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock store
 */
export function createMockStore(overrides = {}) {
  return {
    id: 1,
    user_id: 1,
    name: "Test Store",
    slug: "test-store",
    description: "Test store description",
    logo_url: null,
    address: null,
    city: null,
    phone: null,
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock product
 */
export function createMockProduct(overrides = {}) {
  return {
    id: 1,
    store_id: 1,
    name: "Test Product",
    description: "Test product description",
    price: "50000",
    image_url: null,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock product variant
 */
export function createMockProductVariant(overrides = {}) {
  return {
    id: 1,
    product_id: 1,
    name: "Size S",
    sku: "TEST-S",
    price: "50000",
    stock_quantity: 100,
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock customer
 */
export function createMockCustomer(overrides = {}) {
  return {
    id: 1,
    store_id: 1,
    phone: "6289876543210",
    name: "Test Customer",
    email: null,
    address: null,
    city: null,
    province: null,
    postal_code: null,
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock order
 */
export function createMockOrder(overrides = {}) {
  return {
    id: 1,
    store_id: 1,
    customer_id: 1,
    order_number: "ORD-1-123456-ABCDEF",
    total_amount: "150000",
    status: "pending",
    notes: null,
    channel: "web",
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock order item
 */
export function createMockOrderItem(overrides = {}) {
  return {
    id: 1,
    order_id: 1,
    product_id: 1,
    product_variant_id: 1,
    quantity: 2,
    unit_price: "50000",
    subtotal: "100000",
    created_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock payment
 */
export function createMockPayment(overrides = {}) {
  return {
    id: 1,
    store_id: 1,
    order_id: 1,
    customer_id: 1,
    amount: "150000",
    currency: "IDR",
    payment_method: "bank_transfer",
    status: "pending",
    transaction_id: "txn-123456",
    reference_id: "ORD-1-123456-ABCDEF",
    metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Create mock inventory reservation
 */
export function createMockReservation(overrides = {}) {
  return {
    id: 1,
    order_id: 1,
    product_variant_id: 1,
    quantity: 5,
    reserved_at: new Date(),
    released_at: null,
    ...overrides,
  };
}

/**
 * Create mock inventory movement
 */
export function createMockMovement(overrides = {}) {
  return {
    id: 1,
    product_variant_id: 1,
    store_id: 1,
    type: "out",
    quantity: -5,
    reason: "order_reservation",
    reference_id: "1",
    created_at: new Date(),
    ...overrides,
  };
}

/**
 * Assert error properties
 */
export function assertErrorCode(error: any, expectedCode: string) {
  expect(error).toBeDefined();
  expect(error.code).toBe(expectedCode);
}

/**
 * Assert error message
 */
export function assertErrorMessage(error: any, expectedMessage: string) {
  expect(error).toBeDefined();
  expect(error.message).toContain(expectedMessage);
}

/**
 * Setup mock database module
 */
export function setupMockDb(mockDb: MockDatabase) {
  const { getDb } = require("@/db/config");
  getDb.mockReturnValue(mockDb.getDb());
}
