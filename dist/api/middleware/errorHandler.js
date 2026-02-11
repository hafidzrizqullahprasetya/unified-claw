import { AppError, ErrorCode, ErrorMessages } from '@/lib/errors';
export async function errorMiddleware(c, next) {
    try {
        await next();
    }
    catch (error) {
        console.error('Error caught:', error);
        if (error instanceof AppError) {
            return c.json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                    ...(error.context && { context: error.context }),
                },
            }, error.statusCode);
        }
        if (error instanceof SyntaxError) {
            return c.json({
                success: false,
                error: {
                    code: ErrorCode.INVALID_INPUT,
                    message: 'Invalid JSON in request body',
                },
            }, 400);
        }
        // Generic error handler
        console.error('Unhandled error:', error);
        return c.json({
            success: false,
            error: {
                code: ErrorCode.INTERNAL_ERROR,
                message: ErrorMessages[ErrorCode.INTERNAL_ERROR],
            },
        }, 500);
    }
}
//# sourceMappingURL=errorHandler.js.map