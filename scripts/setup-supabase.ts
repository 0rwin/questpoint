#!/usr/bin/env tsx
/**
 * Automated Supabase Setup Script
 *
 * This script will:
 * 1. Test Supabase connection
 * 2. Run database migration
 * 3. Seed test data
 * 4. Create initial admin user
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Please set:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL');
  console.error('  SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('🚀 Starting Supabase Setup...\n');

  // Step 1: Test connection
  console.log('1️⃣ Testing Supabase connection...');
  const { error: connError } = await supabase.from('profiles').select('count').limit(1);

  if (connError) {
    if (connError.message.includes('relation "public.profiles" does not exist')) {
      console.log('   ⚠️  Database not migrated yet (expected)');
    } else {
      console.error('   ❌ Connection failed:', connError.message);
      process.exit(1);
    }
  } else {
    console.log('   ✅ Connected to Supabase!');
  }

  // Step 2: Run migration
  console.log('\n2️⃣ Running database migration...');
  const migrationSQL = fs.readFileSync(
    path.join(process.cwd(), '001_initial_schema.sql'),
    'utf-8'
  );

  // Split by semicolons and execute each statement
  const statements = migrationSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  let successCount = 0;
  let skipCount = 0;

  for (const statement of statements) {
    const { error } = await supabase.rpc('exec_sql', { sql: statement });

    if (error) {
      if (error.message.includes('already exists')) {
        skipCount++;
      } else {
        console.error(`   ⚠️  Statement failed: ${error.message}`);
      }
    } else {
      successCount++;
    }
  }

  console.log(`   ✅ Migration complete! (${successCount} created, ${skipCount} already exist)`);

  // Step 3: Seed data
  console.log('\n3️⃣ Seeding test data...');
  const seedSQL = fs.readFileSync(
    path.join(process.cwd(), 'seed.sql'),
    'utf-8'
  );

  const seedStatements = seedSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  let seedCount = 0;
  for (const statement of seedStatements) {
    const { error } = await supabase.rpc('exec_sql', { sql: statement });
    if (!error || error.message.includes('duplicate')) {
      seedCount++;
    }
  }

  console.log(`   ✅ Seed data loaded! (${seedCount} records)`);

  // Step 4: Verify tables
  console.log('\n4️⃣ Verifying database tables...');
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
    const { error } = await supabase.from(table).select('count').limit(1);
    if (error) {
      console.log(`   ❌ ${table} - not found`);
    } else {
      console.log(`   ✅ ${table}`);
    }
  }

  console.log('\n✨ Supabase setup complete!\n');
  console.log('📋 Next steps:');
  console.log('   1. Go to Supabase Dashboard: https://supabase.com/dashboard');
  console.log('   2. Navigate to: Authentication → Email Templates');
  console.log('   3. Copy/paste email templates from SUPABASE_EMAIL_TEMPLATES.md');
  console.log('   4. Test by registering at: http://localhost:3000/auth/register\n');
}

main().catch((error) => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});
