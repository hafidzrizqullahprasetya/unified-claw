import { Context, Next } from 'hono';
import { verifyToken } from '@/lib/jwt';
import { AuthError, ErrorCode } from '@/lib/errors';

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    throw new AuthError(ErrorCode.UNAUTHORIZED, 'Authorization header required');
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer') {
    throw new AuthError(ErrorCode.UNAUTHORIZED, 'Invalid authorization scheme');
  }

  if (!token) {
    throw new AuthError(ErrorCode.UNAUTHORIZED, 'Token required');
  }

  try {
    const payload = verifyToken(token);
    c.set('user', payload);
    await next();
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError(ErrorCode.UNAUTHORIZED, 'Invalid token');
  }
}
