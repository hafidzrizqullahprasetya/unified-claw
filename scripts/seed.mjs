import { sql } from 'drizzle-orm';
import db from './src/db/config.js';
import { users, stores, products, customers } from './src/db/schema.js';
import { hashPassword } from './src/lib/hashing.js';

console.log('🌱 Seeding database dengan test data...\n');

try {
  // 1. Create test user (admin)
  const adminPassword = await hashPassword('Admin123!');
  const adminResult = await db.insert(users).values({
    id: crypto.randomUUID(),
    email: 'admin@test.com',
    password: adminPassword,
    name: 'Admin Test',
    role: 'admin',
  }).returning();
  
  console.log('✅ Admin user created:', adminResult[0].email);

  // 2. Create test store
  const storeResult = await db.insert(stores).values({
    id: crypto.randomUUID(),
    userId: adminResult[0].id,
    name: 'Toko Test',
    slug: 'toko-test',
    description: 'Toko test untuk development',
  }).returning();
  
  console.log('✅ Store created:', storeResult[0].name);

  // 3. Create test products
  const productResults = await db.insert(products).values([
    {
      id: crypto.randomUUID(),
      storeId: storeResult[0].id,
      name: 'Produk A',
      slug: 'produk-a',
      description: 'Produk test A',
      price: 10000,
      category: 'electronics',
    },
    {
      id: crypto.randomUUID(),
      storeId: storeResult[0].id,
      name: 'Produk B',
      slug: 'produk-b',
      description: 'Produk test B',
      price: 25000,
      category: 'electronics',
    },
  ]).returning();
  
  console.log(`✅ ${productResults.length} products created`);

  // 4. Create test customers
  const customerResults = await db.insert(customers).values([
    {
      id: crypto.randomUUID(),
      storeId: storeResult[0].id,
      name: 'Customer A',
      email: 'customer-a@test.com',
      phone: '081234567890',
      city: 'Jakarta',
    },
    {
      id: crypto.randomUUID(),
      storeId: storeResult[0].id,
      name: 'Customer B',
      email: 'customer-b@test.com',
      phone: '081234567891',
      city: 'Surabaya',
    },
  ]).returning();
  
  console.log(`✅ ${customerResults.length} customers created`);

  console.log('\n✨ Database seeding complete!\n');
  console.log('📝 Test credentials:');
  console.log('   Email: admin@test.com');
  console.log('   Password: Admin123!\n');
  
  process.exit(0);
} catch (error) {
  console.error('❌ Seeding failed:', error.message);
  process.exit(1);
}
