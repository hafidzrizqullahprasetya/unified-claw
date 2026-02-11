export interface JwtPayload {
    userId: number;
    email: string;
    role: 'admin' | 'seller' | 'customer';
    storeId?: number;
    iat?: number;
    exp?: number;
}
export declare function signToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string;
export declare function verifyToken(token: string): JwtPayload;
export declare function refreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string;
//# sourceMappingURL=jwt.d.ts.map