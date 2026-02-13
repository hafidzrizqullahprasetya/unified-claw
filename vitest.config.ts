import { defineConfig } from "vitest/config";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "node_modules"],
    },
    include: ["src/**/*.test.ts"],
    exclude: ["node_modules", "dist"],
  },
});
