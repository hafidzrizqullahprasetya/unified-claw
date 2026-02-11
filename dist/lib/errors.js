export var ErrorCode;
(function (ErrorCode) {
    // Auth errors (1000-1999)
    ErrorCode["UNAUTHORIZED"] = "AUTH_001";
    ErrorCode["INVALID_CREDENTIALS"] = "AUTH_002";
    ErrorCode["TOKEN_EXPIRED"] = "AUTH_003";
    ErrorCode["TOKEN_INVALID"] = "AUTH_004";
    ErrorCode["USER_NOT_FOUND"] = "AUTH_005";
    ErrorCode["USER_ALREADY_EXISTS"] = "AUTH_006";
    // Validation errors (2000-2999)
    ErrorCode["VALIDATION_FAILED"] = "VAL_001";
    ErrorCode["INVALID_INPUT"] = "VAL_002";
    ErrorCode["MISSING_REQUIRED_FIELD"] = "VAL_003";
    // Resource errors (3000-3999)
    ErrorCode["NOT_FOUND"] = "RES_001";
    ErrorCode["CONFLICT"] = "RES_002";
    ErrorCode["FORBIDDEN"] = "RES_003";
    // Payment errors (4000-4999)
    ErrorCode["PAYMENT_FAILED"] = "PAY_001";
    ErrorCode["PAYMENT_DECLINED"] = "PAY_002";
    ErrorCode["INVALID_PAYMENT_METHOD"] = "PAY_003";
    ErrorCode["INSUFFICIENT_FUNDS"] = "PAY_004";
    // Inventory errors (5000-5999)
    ErrorCode["OUT_OF_STOCK"] = "INV_001";
    ErrorCode["INSUFFICIENT_STOCK"] = "INV_002";
    ErrorCode["RESERVATION_FAILED"] = "INV_003";
    // Server errors (9000-9999)
    ErrorCode["INTERNAL_ERROR"] = "SRV_001";
    ErrorCode["SERVICE_UNAVAILABLE"] = "SRV_002";
    ErrorCode["DATABASE_ERROR"] = "SRV_003";
})(ErrorCode || (ErrorCode = {}));
export const ErrorMessages = {
    // Auth
    [ErrorCode.UNAUTHORIZED]: 'Authentication required',
    [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
    [ErrorCode.TOKEN_EXPIRED]: 'Token has expired',
    [ErrorCode.TOKEN_INVALID]: 'Invalid token',
    [ErrorCode.USER_NOT_FOUND]: 'User not found',
    [ErrorCode.USER_ALREADY_EXISTS]: 'User with this email already exists',
    // Validation
    [ErrorCode.VALIDATION_FAILED]: 'Validation failed',
    [ErrorCode.INVALID_INPUT]: 'Invalid input provided',
    [ErrorCode.MISSING_REQUIRED_FIELD]: 'Missing required field',
    // Resources
    [ErrorCode.NOT_FOUND]: 'Resource not found',
    [ErrorCode.CONFLICT]: 'Resource conflict',
    [ErrorCode.FORBIDDEN]: 'Access forbidden',
    // Payments
    [ErrorCode.PAYMENT_FAILED]: 'Payment processing failed',
    [ErrorCode.PAYMENT_DECLINED]: 'Payment was declined',
    [ErrorCode.INVALID_PAYMENT_METHOD]: 'Invalid payment method',
    [ErrorCode.INSUFFICIENT_FUNDS]: 'Insufficient funds',
    // Inventory
    [ErrorCode.OUT_OF_STOCK]: 'Product is out of stock',
    [ErrorCode.INSUFFICIENT_STOCK]: 'Insufficient stock available',
    [ErrorCode.RESERVATION_FAILED]: 'Failed to reserve inventory',
    // Server
    [ErrorCode.INTERNAL_ERROR]: 'Internal server error',
    [ErrorCode.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable',
    [ErrorCode.DATABASE_ERROR]: 'Database operation failed',
};
export class AppError extends Error {
    code;
    statusCode;
    context;
    constructor(code, statusCode = 500, message, context) {
        super(message || ErrorMessages[code]);
        this.code = code;
        this.statusCode = statusCode;
        this.context = context;
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
    toJSON() {
        return {
            code: this.code,
            message: this.message,
            statusCode: this.statusCode,
            context: this.context,
        };
    }
}
export class ValidationError extends AppError {
    constructor(message, context) {
        super(ErrorCode.VALIDATION_FAILED, 400, message, context);
        this.name = 'ValidationError';
    }
}
export class NotFoundError extends AppError {
    constructor(resourceType, id) {
        const message = id ? `${resourceType} with id ${id} not found` : `${resourceType} not found`;
        super(ErrorCode.NOT_FOUND, 404, message);
        this.name = 'NotFoundError';
    }
}
export class AuthError extends AppError {
    constructor(code, message) {
        super(code, 401, message);
        this.name = 'AuthError';
    }
}
export class ForbiddenError extends AppError {
    constructor(message = 'Access forbidden') {
        super(ErrorCode.FORBIDDEN, 403, message);
        this.name = 'ForbiddenError';
    }
}
export class ConflictError extends AppError {
    constructor(message, context) {
        super(ErrorCode.CONFLICT, 409, message, context);
        this.name = 'ConflictError';
    }
}
export class PaymentError extends AppError {
    constructor(code, message, context) {
        super(code, 402, message, context);
        this.name = 'PaymentError';
    }
}
export class InventoryError extends AppError {
    constructor(code, message, context) {
        super(code, 400, message, context);
        this.name = 'InventoryError';
    }
}
//# sourceMappingURL=errors.js.map