/**
 * Test utilities and mock database helpers
 * Used across all unit and integration tests
 */
/**
 * Mock database builder
 * Helps create mock database objects for testing
 */
export declare class MockDatabase {
    private chainMock;
    constructor();
    private createChain;
    getDb(): any;
    mockSelect(data: any[]): this;
    mockSelectFrom(data: any[]): this;
    mockInsert(data: any[]): this;
    mockUpdate(): this;
    reset(): this;
}
/**
 * Create mock user
 */
export declare function createMockUser(overrides?: {}): {
    id: number;
    email: string;
    password_hash: string;
    full_name: string;
    phone: string;
    role: string;
    created_at: Date;
    updated_at: Date;
};
/**
 * Create mock store
 */
export declare function createMockStore(overrides?: {}): {
    id: number;
    user_id: number;
    name: string;
    slug: string;
    description: string;
    logo_url: null;
    address: null;
    city: null;
    phone: null;
    metadata: {};
    created_at: Date;
    updated_at: Date;
};
/**
 * Create mock product
 */
export declare function createMockProduct(overrides?: {}): {
    id: number;
    store_id: number;
    name: string;
    description: string;
    price: string;
    image_url: null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
};
/**
 * Create mock product variant
 */
export declare function createMockProductVariant(overrides?: {}): {
    id: number;
    product_id: number;
    name: string;
    sku: string;
    price: string;
    stock_quantity: number;
    created_at: Date;
    updated_at: Date;
};
/**
 * Create mock customer
 */
export declare function createMockCustomer(overrides?: {}): {
    id: number;
    store_id: number;
    phone: string;
    name: string;
    email: null;
    address: null;
    city: null;
    province: null;
    postal_code: null;
    metadata: {};
    created_at: Date;
    updated_at: Date;
};
/**
 * Create mock order
 */
export declare function createMockOrder(overrides?: {}): {
    id: number;
    store_id: number;
    customer_id: number;
    order_number: string;
    total_amount: string;
    status: string;
    notes: null;
    channel: string;
    created_at: Date;
    updated_at: Date;
};
/**
 * Create mock order item
 */
export declare function createMockOrderItem(overrides?: {}): {
    id: number;
    order_id: number;
    product_id: number;
    product_variant_id: number;
    quantity: number;
    unit_price: string;
    subtotal: string;
    created_at: Date;
};
/**
 * Create mock payment
 */
export declare function createMockPayment(overrides?: {}): {
    id: number;
    store_id: number;
    order_id: number;
    customer_id: number;
    amount: string;
    currency: string;
    payment_method: string;
    status: string;
    transaction_id: string;
    reference_id: string;
    metadata: {};
    created_at: Date;
    updated_at: Date;
};
/**
 * Create mock inventory reservation
 */
export declare function createMockReservation(overrides?: {}): {
    id: number;
    order_id: number;
    product_variant_id: number;
    quantity: number;
    reserved_at: Date;
    released_at: null;
};
/**
 * Create mock inventory movement
 */
export declare function createMockMovement(overrides?: {}): {
    id: number;
    product_variant_id: number;
    store_id: number;
    type: string;
    quantity: number;
    reason: string;
    reference_id: string;
    created_at: Date;
};
/**
 * Assert error properties
 */
export declare function assertErrorCode(error: any, expectedCode: string): void;
/**
 * Assert error message
 */
export declare function assertErrorMessage(error: any, expectedMessage: string): void;
/**
 * Setup mock database module
 */
export declare function setupMockDb(mockDb: MockDatabase): void;
//# sourceMappingURL=helpers.d.ts.map