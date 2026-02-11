import { z } from 'zod';

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Store schemas
export const createStoreSchema = z.object({
  name: z.string().min(3, 'Store name must be at least 3 characters'),
  description: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
});

export const updateStoreSchema = createStoreSchema.partial();

// Product schemas
export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.string().or(z.number()).refine(
    (val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return num > 0;
    },
    'Price must be greater than 0'
  ),
  cost_price: z
    .string()
    .or(z.number())
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = typeof val === 'string' ? parseFloat(val) : val;
        return num > 0;
      },
      'Cost price must be greater than 0'
    ),
  sku: z.string().optional(),
  category: z.string().optional(),
  image_urls: z.array(z.string().url()).optional(),
});

export const updateProductSchema = createProductSchema.partial();

// Customer schemas
export const createCustomerSchema = z.object({
  phone: z.string().min(10, 'Phone number must be valid'),
  name: z.string().min(2, 'Customer name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

// Order schemas
export const createOrderSchema = z.object({
  customer_id: z.number().int('Customer ID must be an integer'),
  items: z.array(
    z.object({
      product_id: z.number().int(),
      product_variant_id: z.number().int().optional(),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })
  ),
  notes: z.string().optional(),
  channel: z.enum(['whatsapp', 'telegram', 'web', 'mobile', 'api']).optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  notes: z.string().optional(),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
