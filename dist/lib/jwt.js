import jwt from 'jsonwebtoken';
import { getEnv } from '@/env';
import { AuthError, ErrorCode } from '@/lib/errors';
export function signToken(payload) {
    const env = getEnv();
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRY,
        algorithm: 'HS256',
    });
}
export function verifyToken(token) {
    const env = getEnv();
    try {
        const payload = jwt.verify(token, env.JWT_SECRET, {
            algorithms: ['HS256'],
        });
        return payload;
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AuthError(ErrorCode.TOKEN_EXPIRED, 'Token has expired');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AuthError(ErrorCode.TOKEN_INVALID, 'Invalid token');
        }
        throw error;
    }
}
export function refreshToken(payload) {
    return signToken(payload);
}
//# sourceMappingURL=jwt.js.map