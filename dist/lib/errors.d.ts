export declare enum ErrorCode {
    UNAUTHORIZED = "AUTH_001",
    INVALID_CREDENTIALS = "AUTH_002",
    TOKEN_EXPIRED = "AUTH_003",
    TOKEN_INVALID = "AUTH_004",
    USER_NOT_FOUND = "AUTH_005",
    USER_ALREADY_EXISTS = "AUTH_006",
    VALIDATION_FAILED = "VAL_001",
    INVALID_INPUT = "VAL_002",
    MISSING_REQUIRED_FIELD = "VAL_003",
    NOT_FOUND = "RES_001",
    CONFLICT = "RES_002",
    FORBIDDEN = "RES_003",
    PAYMENT_FAILED = "PAY_001",
    PAYMENT_DECLINED = "PAY_002",
    INVALID_PAYMENT_METHOD = "PAY_003",
    INSUFFICIENT_FUNDS = "PAY_004",
    OUT_OF_STOCK = "INV_001",
    INSUFFICIENT_STOCK = "INV_002",
    RESERVATION_FAILED = "INV_003",
    INTERNAL_ERROR = "SRV_001",
    SERVICE_UNAVAILABLE = "SRV_002",
    DATABASE_ERROR = "SRV_003"
}
export declare const ErrorMessages: Record<ErrorCode, string>;
export declare class AppError extends Error {
    code: ErrorCode;
    statusCode: number;
    context?: Record<string, unknown> | undefined;
    constructor(code: ErrorCode, statusCode?: number, message?: string, context?: Record<string, unknown> | undefined);
    toJSON(): {
        code: ErrorCode;
        message: string;
        statusCode: number;
        context: Record<string, unknown> | undefined;
    };
}
export declare class ValidationError extends AppError {
    constructor(message: string, context?: Record<string, unknown>);
}
export declare class NotFoundError extends AppError {
    constructor(resourceType: string, id?: string | number);
}
export declare class AuthError extends AppError {
    constructor(code: ErrorCode, message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message: string, context?: Record<string, unknown>);
}
export declare class PaymentError extends AppError {
    constructor(code: ErrorCode, message?: string, context?: Record<string, unknown>);
}
export declare class InventoryError extends AppError {
    constructor(code: ErrorCode, message?: string, context?: Record<string, unknown>);
}
//# sourceMappingURL=errors.d.ts.map