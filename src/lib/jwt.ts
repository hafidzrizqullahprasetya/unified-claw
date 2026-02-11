import jwt from 'jsonwebtoken';
import { getEnv } from '@/env';
import { AuthError, ErrorCode } from '@/lib/errors';

export interface JwtPayload {
  userId: number;
  email: string;
  role: 'admin' | 'seller' | 'customer';
  storeId?: number;
  iat?: number;
  exp?: number;
}

export function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const env = getEnv();
  return jwt.sign(
    payload as jwt.JwtPayload,
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRY,
      algorithm: 'HS256',
    } as jwt.SignOptions
  );
}

export function verifyToken(token: string): JwtPayload {
  const env = getEnv();
  try {
    const payload = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return payload as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError(ErrorCode.TOKEN_EXPIRED, 'Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError(ErrorCode.TOKEN_INVALID, 'Invalid token');
    }
    throw error;
  }
}

export function refreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return signToken(payload);
}
