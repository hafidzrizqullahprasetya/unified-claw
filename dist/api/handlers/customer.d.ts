import { Context } from 'hono';
export declare function createCustomer(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        metadata: import("hono/utils/types").JSONValue;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: string;
        updated_at: string;
    };
}, any, "json">>;
export declare function getCustomer(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        metadata: import("hono/utils/types").JSONValue;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: string;
        updated_at: string;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function listCustomers(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        metadata: import("hono/utils/types").JSONValue;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: string;
        updated_at: string;
    }[];
    pagination: {
        limit: number;
        offset: number;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function updateCustomer(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    data: {
        metadata: import("hono/utils/types").JSONValue;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: string;
        updated_at: string;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function deleteCustomer(c: Context): Promise<Response & import("hono").TypedResponse<{
    success: true;
    message: string;
    data: {
        metadata: import("hono/utils/types").JSONValue;
        id: number;
        name: string;
        store_id: number;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        province: string | null;
        postal_code: string | null;
        created_at: string;
        updated_at: string;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
//# sourceMappingURL=customer.d.ts.map