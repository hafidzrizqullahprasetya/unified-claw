import { describe, it, expect } from 'vitest';

describe('Health Check', () => {
  it('should have environment variables defined', () => {
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.PORT).toBeDefined();
  });

  it('should import modules without errors', async () => {
    const { getEnv } = await import('@/env');
    const env = getEnv();
    expect(env).toBeDefined();
    expect(env.PORT).toEqual(3000);
  });
});
