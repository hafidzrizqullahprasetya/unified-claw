import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { getEnv } from '@/env';

let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!db) {
    const env = getEnv();
    const client = postgres(env.DATABASE_URL, {
      max: 10, // Connection pool size
      idle_timeout: 30,
      connect_timeout: 10,
    });
    db = drizzle(client);
  }
  return db;
}

export async function closeDb() {
  // Cleanup is handled by drizzle-orm internally
  // Connection is closed when the process exits
}
