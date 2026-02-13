import type { CreateCustomerInput, UpdateCustomerInput } from '@/lib/validation';
export declare class CustomerService {
    createCustomer(storeId: number, data: CreateCustomerInput): Promise<{
        name: string;
        email: string | null;
        phone: string;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        address: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
    }>;
    getCustomer(storeId: number, customerId: number): Promise<{
        name: string;
        email: string | null;
        phone: string;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        address: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
    }>;
    listCustomers(storeId: number, limit?: number, offset?: number): Promise<{
        name: string;
        email: string | null;
        phone: string;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        address: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
    }[]>;
    updateCustomer(storeId: number, customerId: number, data: UpdateCustomerInput): Promise<{
        name: string;
        email: string | null;
        phone: string;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        address: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
    }>;
    deleteCustomer(storeId: number, customerId: number): Promise<{
        name: string;
        email: string | null;
        phone: string;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        address: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
    }>;
    getCustomerByPhone(storeId: number, phone: string): Promise<{
        name: string;
        email: string | null;
        phone: string;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        address: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        store_id: number;
        metadata: unknown;
    } | null>;
}
export declare function createCustomerService(): CustomerService;
//# sourceMappingURL=customer.service.d.ts.map