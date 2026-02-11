import { Context } from 'hono';
import { createCustomerSchema, updateCustomerSchema } from '@/lib/validation';
import { createCustomerService } from '@/services/customer.service';
import { ValidationError, NotFoundError } from '@/lib/errors';

const customerService = createCustomerService();

export async function createCustomer(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));
  const body = await c.req.json();

  try {
    const data = createCustomerSchema.parse(body);
    const customer = await customerService.createCustomer(storeId, data);
    return c.json({ success: true, data: customer }, 201 as any);
  } catch (error) {
    if (error instanceof (await import('zod')).ZodError) {
      throw new ValidationError('Validation failed', { errors: error.errors });
    }
    throw error;
  }
}

export async function getCustomer(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));
  const customerId = parseInt(c.req.param('customerId'));

  const customer = await customerService.getCustomer(storeId, customerId);
  return c.json({ success: true, data: customer });
}

export async function listCustomers(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = parseInt(c.req.query('offset') || '0');

  const customers = await customerService.listCustomers(storeId, limit, offset);
  return c.json({ success: true, data: customers, pagination: { limit, offset } });
}

export async function updateCustomer(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));
  const customerId = parseInt(c.req.param('customerId'));
  const body = await c.req.json();

  try {
    const data = updateCustomerSchema.parse(body);
    const customer = await customerService.updateCustomer(storeId, customerId, data);
    return c.json({ success: true, data: customer });
  } catch (error) {
    if (error instanceof (await import('zod')).ZodError) {
      throw new ValidationError('Validation failed', { errors: error.errors });
    }
    throw error;
  }
}

export async function deleteCustomer(c: Context) {
  const user = c.get('user');
  const storeId = parseInt(c.req.param('storeId'));
  const customerId = parseInt(c.req.param('customerId'));

  const customer = await customerService.deleteCustomer(storeId, customerId);
  return c.json({ success: true, message: 'Customer deleted', data: customer });
}
