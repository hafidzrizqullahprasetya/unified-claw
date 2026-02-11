import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'node_modules']
    },
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules', 'dist']
  }
});
