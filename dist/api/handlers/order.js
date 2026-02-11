import { createOrderSchema, updateOrderStatusSchema } from '@/lib/validation';
import { createOrderService } from '@/services/order.service';
import { ValidationError } from '@/lib/errors';
const orderService = createOrderService();
export async function createOrder(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const body = await c.req.json();
    try {
        const data = createOrderSchema.parse(body);
        const order = await orderService.createOrder(storeId, data.customer_id, data);
        return c.json({ success: true, data: order }, 201);
    }
    catch (error) {
        if (error instanceof (await import('zod')).ZodError) {
            throw new ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
}
export async function getOrder(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const orderId = parseInt(c.req.param('orderId'));
    const order = await orderService.getOrder(storeId, orderId);
    return c.json({ success: true, data: order });
}
export async function listOrders(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const customerId = c.req.query('customerId') ? parseInt(c.req.query('customerId')) : undefined;
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    const orders = await orderService.listOrders(storeId, customerId, limit, offset);
    return c.json({ success: true, data: orders, pagination: { limit, offset } });
}
export async function updateOrderStatus(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const orderId = parseInt(c.req.param('orderId'));
    const body = await c.req.json();
    try {
        const data = updateOrderStatusSchema.parse(body);
        const order = await orderService.updateOrderStatus(storeId, orderId, data);
        return c.json({ success: true, data: order });
    }
    catch (error) {
        if (error instanceof (await import('zod')).ZodError) {
            throw new ValidationError('Validation failed', { errors: error.errors });
        }
        throw error;
    }
}
export async function cancelOrder(c) {
    const user = c.get('user');
    const storeId = parseInt(c.req.param('storeId'));
    const orderId = parseInt(c.req.param('orderId'));
    const order = await orderService.cancelOrder(storeId, orderId);
    return c.json({ success: true, message: 'Order cancelled', data: order });
}
//# sourceMappingURL=order.js.map