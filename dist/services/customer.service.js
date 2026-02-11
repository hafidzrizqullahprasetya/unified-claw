import { eq } from 'drizzle-orm';
import { getDb } from '@/db/config';
import { customers, stores } from '@/db/schema';
import { NotFoundError, ForbiddenError } from '@/lib/errors';
export class CustomerService {
    async createCustomer(storeId, data) {
        const db = getDb();
        // Verify store exists
        const store = await db.select().from(stores).where(eq(stores.id, storeId));
        if (!store.length) {
            throw new NotFoundError('Store', storeId);
        }
        const result = await db
            .insert(customers)
            .values({
            store_id: storeId,
            phone: data.phone,
            name: data.name,
            email: data.email,
            address: data.address,
            city: data.city,
            province: data.province,
            postal_code: data.postal_code,
        })
            .returning();
        return result[0];
    }
    async getCustomer(storeId, customerId) {
        const db = getDb();
        const result = await db
            .select()
            .from(customers)
            .where(eq(customers.id, customerId));
        if (!result.length) {
            throw new NotFoundError('Customer', customerId);
        }
        const customer = result[0];
        if (customer.store_id !== storeId) {
            throw new ForbiddenError('You do not have access to this customer');
        }
        return customer;
    }
    async listCustomers(storeId, limit = 50, offset = 0) {
        const db = getDb();
        const result = await db
            .select()
            .from(customers)
            .where(eq(customers.store_id, storeId))
            .limit(limit)
            .offset(offset);
        return result;
    }
    async updateCustomer(storeId, customerId, data) {
        const db = getDb();
        // Verify customer exists and belongs to store
        const customer = await this.getCustomer(storeId, customerId);
        const result = await db
            .update(customers)
            .set({
            phone: data.phone ?? customer.phone,
            name: data.name ?? customer.name,
            email: data.email ?? customer.email,
            address: data.address ?? customer.address,
            city: data.city ?? customer.city,
            province: data.province ?? customer.province,
            postal_code: data.postal_code ?? customer.postal_code,
            updated_at: new Date(),
        })
            .where(eq(customers.id, customerId))
            .returning();
        return result[0];
    }
    async deleteCustomer(storeId, customerId) {
        const db = getDb();
        // Verify customer exists and belongs to store
        await this.getCustomer(storeId, customerId);
        // Soft delete by marking as inactive (optional - depends on business logic)
        // For now, we'll just delete the record
        const result = await db
            .delete(customers)
            .where(eq(customers.id, customerId))
            .returning();
        return result[0];
    }
    async getCustomerByPhone(storeId, phone) {
        const db = getDb();
        const result = await db
            .select()
            .from(customers)
            .where(eq(customers.phone, phone));
        if (!result.length) {
            return null;
        }
        const customer = result[0];
        if (customer.store_id !== storeId) {
            return null;
        }
        return customer;
    }
}
export function createCustomerService() {
    return new CustomerService();
}
//# sourceMappingURL=customer.service.js.map