import { pgTable, serial, varchar, text, decimal, integer, timestamp, boolean, jsonb, index, unique, foreignKey, pgEnum, } from 'drizzle-orm/pg-core';
// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'seller', 'customer']);
export const orderStatusEnum = pgEnum('order_status', [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
]);
export const paymentStatusEnum = pgEnum('payment_status', [
    'pending',
    'processing',
    'paid',
    'failed',
    'cancelled',
    'refunded',
]);
export const paymentMethodEnum = pgEnum('payment_method', [
    'qris',
    'bank_transfer',
    'credit_card',
    'e_wallet',
    'cash',
]);
export const channelEnum = pgEnum('channel', ['whatsapp', 'telegram', 'web', 'mobile', 'api']);
// Tables
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password_hash: varchar('password_hash', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    full_name: varchar('full_name', { length: 255 }).notNull(),
    role: userRoleEnum('role').notNull().default('customer'),
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    emailIdx: index('users_email_idx').on(table.email),
    phoneIdx: index('users_phone_idx').on(table.phone),
    createdAtIdx: index('users_created_at_idx').on(table.created_at),
}));
export const stores = pgTable('stores', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    description: text('description'),
    logo_url: varchar('logo_url', { length: 500 }),
    banner_url: varchar('banner_url', { length: 500 }),
    city: varchar('city', { length: 100 }),
    province: varchar('province', { length: 100 }),
    postal_code: varchar('postal_code', { length: 20 }),
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    userIdFk: foreignKey({ columns: [table.user_id], foreignColumns: [users.id] }),
    userIdIdx: index('stores_user_id_idx').on(table.user_id),
    slugIdx: index('stores_slug_idx').on(table.slug),
}));
export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    store_id: integer('store_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    description: text('description'),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    cost_price: decimal('cost_price', { precision: 12, scale: 2 }),
    sku: varchar('sku', { length: 100 }),
    category: varchar('category', { length: 100 }),
    image_urls: jsonb('image_urls').default([]),
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    storeIdIdx: index('products_store_id_idx').on(table.store_id),
    skuIdx: index('products_sku_idx').on(table.sku),
    slugIdx: unique('products_store_id_slug_uq').on(table.store_id, table.slug),
}));
export const product_variants = pgTable('product_variants', {
    id: serial('id').primaryKey(),
    product_id: integer('product_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    sku: varchar('sku', { length: 100 }),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    stock_quantity: integer('stock_quantity').notNull().default(0),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    productIdFk: foreignKey({ columns: [table.product_id], foreignColumns: [products.id] }),
    productIdIdx: index('product_variants_product_id_idx').on(table.product_id),
}));
export const customers = pgTable('customers', {
    id: serial('id').primaryKey(),
    store_id: integer('store_id').notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }),
    address: text('address'),
    city: varchar('city', { length: 100 }),
    province: varchar('province', { length: 100 }),
    postal_code: varchar('postal_code', { length: 20 }),
    metadata: jsonb('metadata').default({}),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    storeIdIdx: index('customers_store_id_idx').on(table.store_id),
    phoneIdx: index('customers_phone_idx').on(table.phone),
    storePhoneUq: unique('customers_store_id_phone_uq').on(table.store_id, table.phone),
}));
export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    store_id: integer('store_id').notNull(),
    customer_id: integer('customer_id').notNull(),
    order_number: varchar('order_number', { length: 50 }).notNull(),
    status: orderStatusEnum('status').notNull().default('pending'),
    total_amount: decimal('total_amount', { precision: 12, scale: 2 }).notNull(),
    tax_amount: decimal('tax_amount', { precision: 12, scale: 2 }).default('0'),
    shipping_amount: decimal('shipping_amount', { precision: 12, scale: 2 }).default('0'),
    discount_amount: decimal('discount_amount', { precision: 12, scale: 2 }).default('0'),
    notes: text('notes'),
    channel: channelEnum('channel').notNull().default('web'),
    metadata: jsonb('metadata').default({}),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    customerIdFk: foreignKey({ columns: [table.customer_id], foreignColumns: [customers.id] }),
    orderNumberUq: unique('orders_store_id_order_number_uq').on(table.store_id, table.order_number),
    storeIdIdx: index('orders_store_id_idx').on(table.store_id),
    customerIdIdx: index('orders_customer_id_idx').on(table.customer_id),
    statusIdx: index('orders_status_idx').on(table.status),
    createdAtIdx: index('orders_created_at_idx').on(table.created_at),
}));
export const order_items = pgTable('order_items', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull(),
    product_id: integer('product_id').notNull(),
    product_variant_id: integer('product_variant_id'),
    quantity: integer('quantity').notNull(),
    unit_price: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
    subtotal: decimal('subtotal', { precision: 12, scale: 2 }).notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    orderIdFk: foreignKey({ columns: [table.order_id], foreignColumns: [orders.id] }),
    productIdFk: foreignKey({ columns: [table.product_id], foreignColumns: [products.id] }),
    orderIdIdx: index('order_items_order_id_idx').on(table.order_id),
}));
export const payments = pgTable('payments', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull(),
    store_id: integer('store_id').notNull(),
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
    status: paymentStatusEnum('status').notNull().default('pending'),
    method: paymentMethodEnum('method').notNull(),
    reference_id: varchar('reference_id', { length: 255 }),
    gateway_response: jsonb('gateway_response').default({}),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    orderIdFk: foreignKey({ columns: [table.order_id], foreignColumns: [orders.id] }),
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    orderIdIdx: index('payments_order_id_idx').on(table.order_id),
    statusIdx: index('payments_status_idx').on(table.status),
    referenceIdIdx: index('payments_reference_id_idx').on(table.reference_id),
}));
export const payment_methods = pgTable('payment_methods', {
    id: serial('id').primaryKey(),
    customer_id: integer('customer_id'),
    store_id: integer('store_id').notNull(),
    type: paymentMethodEnum('type').notNull(),
    token: varchar('token', { length: 500 }),
    is_default: boolean('is_default').notNull().default(false),
    metadata: jsonb('metadata').default({}),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    customerIdFk: foreignKey({ columns: [table.customer_id], foreignColumns: [customers.id] }),
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    customerIdIdx: index('payment_methods_customer_id_idx').on(table.customer_id),
    storeIdIdx: index('payment_methods_store_id_idx').on(table.store_id),
}));
export const inventory_reservations = pgTable('inventory_reservations', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull(),
    product_variant_id: integer('product_variant_id').notNull(),
    quantity: integer('quantity').notNull(),
    reserved_at: timestamp('reserved_at', { withTimezone: true }).defaultNow().notNull(),
    released_at: timestamp('released_at', { withTimezone: true }),
}, (table) => ({
    orderIdFk: foreignKey({ columns: [table.order_id], foreignColumns: [orders.id] }),
    orderIdIdx: index('inventory_reservations_order_id_idx').on(table.order_id),
}));
export const inventory_movements = pgTable('inventory_movements', {
    id: serial('id').primaryKey(),
    product_variant_id: integer('product_variant_id').notNull(),
    store_id: integer('store_id').notNull(),
    type: varchar('type', { length: 50 }).notNull(), // 'in', 'out', 'adjustment'
    quantity: integer('quantity').notNull(),
    reason: varchar('reason', { length: 255 }),
    reference_id: varchar('reference_id', { length: 100 }),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    storeIdIdx: index('inventory_movements_store_id_idx').on(table.store_id),
}));
export const customer_messages = pgTable('customer_messages', {
    id: serial('id').primaryKey(),
    customer_id: integer('customer_id').notNull(),
    store_id: integer('store_id').notNull(),
    channel: channelEnum('channel').notNull(),
    message_type: varchar('message_type', { length: 50 }).notNull(), // 'text', 'image', 'file'
    content: text('content').notNull(),
    direction: varchar('direction', { length: 10 }).notNull(), // 'inbound', 'outbound'
    metadata: jsonb('metadata').default({}),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    customerIdFk: foreignKey({ columns: [table.customer_id], foreignColumns: [customers.id] }),
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    customerIdIdx: index('customer_messages_customer_id_idx').on(table.customer_id),
    storeIdIdx: index('customer_messages_store_id_idx').on(table.store_id),
    createdAtIdx: index('customer_messages_created_at_idx').on(table.created_at),
}));
export const order_status_history = pgTable('order_status_history', {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull(),
    from_status: orderStatusEnum('from_status'),
    to_status: orderStatusEnum('to_status').notNull(),
    notes: text('notes'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    orderIdFk: foreignKey({ columns: [table.order_id], foreignColumns: [orders.id] }),
    orderIdIdx: index('order_status_history_order_id_idx').on(table.order_id),
}));
export const payment_webhook_logs = pgTable('payment_webhook_logs', {
    id: serial('id').primaryKey(),
    store_id: integer('store_id').notNull(),
    gateway: varchar('gateway', { length: 50 }).notNull(), // 'xendit', 'stripe', 'qris'
    event_type: varchar('event_type', { length: 100 }).notNull(),
    payload: jsonb('payload').notNull(),
    processed: boolean('processed').notNull().default(false),
    error_message: text('error_message'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    storeIdIdx: index('payment_webhook_logs_store_id_idx').on(table.store_id),
    processedIdx: index('payment_webhook_logs_processed_idx').on(table.processed),
}));
export const event_audit_log = pgTable('event_audit_log', {
    id: serial('id').primaryKey(),
    store_id: integer('store_id').notNull(),
    entity_type: varchar('entity_type', { length: 100 }).notNull(),
    entity_id: integer('entity_id').notNull(),
    action: varchar('action', { length: 50 }).notNull(),
    old_values: jsonb('old_values'),
    new_values: jsonb('new_values'),
    user_id: integer('user_id'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({
    storeIdFk: foreignKey({ columns: [table.store_id], foreignColumns: [stores.id] }),
    storeIdIdx: index('event_audit_log_store_id_idx').on(table.store_id),
    userIdIdx: index('event_audit_log_user_id_idx').on(table.user_id),
}));
//# sourceMappingURL=schema.js.map