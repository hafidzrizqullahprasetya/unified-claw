import type { CreateCustomerInput, UpdateCustomerInput } from '@/lib/validation';
export declare class CustomerService {
    createCustomer(storeId: number, data: CreateCustomerInput): Promise<{
        metadata: unknown;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getCustomer(storeId: number, customerId: number): Promise<{
        metadata: unknown;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    listCustomers(storeId: number, limit?: number, offset?: number): Promise<{
        metadata: unknown;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    updateCustomer(storeId: number, customerId: number, data: UpdateCustomerInput): Promise<{
        metadata: unknown;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteCustomer(storeId: number, customerId: number): Promise<{
        metadata: unknown;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getCustomerByPhone(storeId: number, phone: string): Promise<{
        metadata: unknown;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: Date;
        updated_at: Date;
    } | null>;
}
export declare function createCustomerService(): CustomerService;
//# sourceMappingURL=customer.service.d.ts.map