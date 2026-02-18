import postgres from 'postgres';

// Connection pooler mode (more firewall friendly)
const connectionString = 'postgresql://postgres.dbluwnepmjnhiklidbza:Hafidzprasetya_006@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres';

console.log('🔗 Testing PostgreSQL connection...\n');

try {
  const sql = postgres(connectionString, { connect_timeout: 10 });
  
  const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
  
  console.log('✅ Koneksi BERHASIL!\n');
  console.log('📅 Waktu server:', result[0].current_time);
  console.log('📦 PostgreSQL version:', result[0].pg_version.substring(0, 50) + '...\n');
  
  // Check tables
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `;
  
  console.log(`📊 Jumlah tables: ${tables.length}`);
  if (tables.length > 0) {
    console.log('Tables yang ada:');
    tables.forEach(t => console.log(`  - ${t.table_name}`));
  }
  
  await sql.end();
} catch (error) {
  console.error('❌ Koneksi GAGAL!\n');
  console.error('Error:', error.message);
  console.error('\n⚠️ Kemungkinan masalah:');
  console.error('1. Password salah');
  console.error('2. Host tidak bisa dijangkau (firewall/network)');
  console.error('3. Port 6543 terblokir');
  console.error('4. Database belum initialized');
  process.exit(1);
}
