#!/usr/bin/env node
/**
 * Direct Database Migration Script
 * Executes SQL migrations directly via PostgreSQL connection
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function runMigrations() {
  console.log('🚀 Questpoint Cafe - Direct Database Migration\n');

  // Check for DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Missing DATABASE_URL in .env.local\n');
    console.log('📋 How to get your DATABASE_URL:\n');
    console.log('1. Go to: https://supabase.com/dashboard/project/suguzikgatlamtpralh/settings/database');
    console.log('2. Scroll to "Connection string" section');
    console.log('3. Select "URI" tab');
    console.log('4. Copy the connection string');
    console.log('5. Add to .env.local as:');
    console.log('   DATABASE_URL=postgresql://postgres.suguzikgatlamtpralh:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres\n');
    console.log('⚠️  Make sure to replace [YOUR-PASSWORD] with your actual database password!\n');
    process.exit(1);
  }

  // Connect to database
  console.log('1️⃣  Connecting to database...');

  // Parse and fix connection string if needed
  let connectionString = databaseUrl;

  // If using pooler, switch to direct connection on port 5432
  if (connectionString.includes(':6543')) {
    console.log('   ℹ️  Switching from pooler to direct connection...');
    connectionString = connectionString.replace(':6543', ':5432').replace('.pooler.', '.');
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('   ✅ Connected!\n');

    // Run migration
    console.log('2️⃣  Running migration (001_initial_schema.sql)...');
    const migrationPath = path.join(__dirname, '..', '001_initial_schema.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    await client.query(migrationSQL);
    console.log('   ✅ Migration complete!\n');

    // Run seed data
    console.log('3️⃣  Loading seed data...');
    const seedPath = path.join(__dirname, '..', 'seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf-8');

    await client.query(seedSQL);
    console.log('   ✅ Seed data loaded!\n');

    // Verify tables
    console.log('4️⃣  Verifying tables...');
    const tables = [
      'profiles',
      'menu_items',
      'menu_customizations',
      'events',
      'event_registrations',
      'orders',
      'order_items',
      'products',
      'favorites',
      'points_transactions',
      'rewards',
    ];

    for (const table of tables) {
      const result = await client.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = $1
        )`,
        [table]
      );

      if (result.rows[0].exists) {
        console.log(`   ✅ ${table}`);
      } else {
        console.log(`   ❌ ${table} - not found`);
      }
    }

    console.log('\n✨ Database setup complete!\n');
    console.log('📋 Remaining manual steps:\n');
    console.log('1. Configure email templates (15 min)');
    console.log('   → https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/templates');
    console.log('   → Copy from SUPABASE_EMAIL_TEMPLATES.md\n');
    console.log('2. Configure auth settings (2 min)');
    console.log('   → https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/url-configuration');
    console.log('   → Site URL: http://localhost:3000');
    console.log('   → Redirect URLs: http://localhost:3000/**\n');
    console.log('3. Test registration at: http://localhost:3000/auth/register\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);

    if (error.message.includes('connect')) {
      console.log('\n💡 Connection failed. Please verify:');
      console.log('   1. DATABASE_URL is correct in .env.local');
      console.log('   2. Password is correct (no [brackets])');
      console.log('   3. Your IP is allowed in Supabase settings');
    } else if (error.message.includes('already exists')) {
      console.log('\n💡 Tables already exist. This is OK if you ran this before.');
      console.log('   The database is ready to use!');
    }

    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations().catch(console.error);
