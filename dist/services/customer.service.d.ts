import type { CreateCustomerInput, UpdateCustomerInput } from '@/lib/validation';
export declare class CustomerService {
    createCustomer(storeId: number, data: CreateCustomerInput): Promise<{
        name: string;
        id: number;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        metadata: unknown;
        created_at: Date;
        updated_at: Date;
    }>;
    getCustomer(storeId: number, customerId: number): Promise<{
        name: string;
        id: number;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        metadata: unknown;
        created_at: Date;
        updated_at: Date;
    }>;
    listCustomers(storeId: number, limit?: number, offset?: number): Promise<{
        name: string;
        id: number;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        metadata: unknown;
        created_at: Date;
        updated_at: Date;
    }[]>;
    updateCustomer(storeId: number, customerId: number, data: UpdateCustomerInput): Promise<{
        name: string;
        id: number;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        metadata: unknown;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteCustomer(storeId: number, customerId: number): Promise<{
        name: string;
        id: number;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        metadata: unknown;
        created_at: Date;
        updated_at: Date;
    }>;
    getCustomerByPhone(storeId: number, phone: string): Promise<{
        name: string;
        id: number;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        metadata: unknown;
        created_at: Date;
        updated_at: Date;
    } | null>;
}
export declare function createCustomerService(): CustomerService;
//# sourceMappingURL=customer.service.d.ts.map