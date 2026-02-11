import { Context, Next } from 'hono';
import { ErrorCode } from '@/lib/errors';
export declare function errorMiddleware(c: Context, next: Next): Promise<(Response & import("hono").TypedResponse<{
    success: false;
    error: {
        code: ErrorCode;
        message: string;
    };
}, any, "json">) | undefined>;
//# sourceMappingURL=errorHandler.d.ts.map