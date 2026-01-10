#!/usr/bin/env node
/**
 * Supabase Migration via API
 * Uses Supabase Management API to execute SQL
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function runMigrations() {
  console.log('🚀 Questpoint Cafe - Database Migration via Supabase API\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
  }

  // Create Supabase client with service role key
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('1️⃣  Testing connection...');

  // Test connection
  const { data: testData, error: testError } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);

  if (testError) {
    if (testError.message.includes('relation "public.profiles" does not exist')) {
      console.log('   ⚠️  Database tables not created yet (expected)\n');
    } else {
      console.error('   ❌ Connection test failed:', testError.message);
      process.exit(1);
    }
  } else {
    console.log('   ✅ Connected to Supabase!\n');
  }

  // Read migration file
  console.log('2️⃣  Reading migration file...');
  const migrationPath = path.join(__dirname, '..', '001_initial_schema.sql');
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

  // Split into individual statements
  const statements = migrationSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`   📝 Found ${statements.length} SQL statements\n`);

  console.log('3️⃣  Executing migration statements...');
  console.log('   ⚠️  Note: This may take a few minutes\n');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    const preview = statement.substring(0, 60).replace(/\n/g, ' ');

    process.stdout.write(`   [${i + 1}/${statements.length}] ${preview}...`);

    try {
      // Execute via rpc if available, otherwise try direct query
      const { error } = await supabase.rpc('exec', {
        sql: statement
      });

      if (error) {
        if (error.message.includes('already exists') ||
            error.message.includes('duplicate')) {
          skipCount++;
          console.log(' SKIP');
        } else {
          errorCount++;
          console.log(` ERROR: ${error.message}`);
        }
      } else {
        successCount++;
        console.log(' ✓');
      }
    } catch (err) {
      errorCount++;
      console.log(` ERROR: ${err.message}`);
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n   📊 Results: ${successCount} created, ${skipCount} skipped, ${errorCount} errors\n`);

  if (errorCount > 0) {
    console.log('⚠️  Some statements failed. This might be OK if tables already exist.\n');
  }

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

  let verifiedCount = 0;

  for (const table of tables) {
    const { error } = await supabase.from(table).select('count').limit(1);
    if (!error) {
      console.log(`   ✅ ${table}`);
      verifiedCount++;
    } else {
      console.log(`   ❌ ${table}`);
    }
  }

  console.log('');

  if (verifiedCount === tables.length) {
    console.log('✨ Database migration complete!\n');

    // Try to load seed data
    console.log('5️⃣  Loading seed data...');
    const seedPath = path.join(__dirname, '..', 'seed.sql');

    if (fs.existsSync(seedPath)) {
      const seedSQL = fs.readFileSync(seedPath, 'utf-8');
      const seedStatements = seedSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      console.log(`   📝 Found ${seedStatements.length} seed statements\n`);

      let seedSuccess = 0;
      for (const statement of seedStatements) {
        try {
          const { error } = await supabase.rpc('exec', { sql: statement });
          if (!error || error.message.includes('duplicate')) {
            seedSuccess++;
          }
        } catch (err) {
          // Ignore seed errors
        }
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      console.log(`   ✅ Loaded ${seedSuccess} seed records\n`);
    } else {
      console.log('   ⚠️  No seed.sql file found, skipping\n');
    }

    console.log('═══════════════════════════════════════════════════\n');
    console.log('🎉 Setup Complete!\n');
    console.log('📋 Next Steps:\n');
    console.log('1. Configure Email Templates (15 minutes)');
    console.log('   Open: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/templates');
    console.log('   Copy templates from: SUPABASE_EMAIL_TEMPLATES.md\n');
    console.log('2. Configure Auth Settings (2 minutes)');
    console.log('   Open: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/url-configuration');
    console.log('   Site URL: http://localhost:3000');
    console.log('   Redirect URLs: http://localhost:3000/**\n');
    console.log('3. Test Your App');
    console.log('   Run: npm run dev');
    console.log('   Visit: http://localhost:3000/auth/register\n');

  } else {
    console.log('❌ Migration incomplete. Some tables are missing.\n');
    console.log('💡 You may need to run the migration manually in Supabase Dashboard:\n');
    console.log('1. Open: https://supabase.com/dashboard/project/suguzikgatlamtpralh/sql/new');
    console.log('2. Copy entire contents of: 001_initial_schema.sql');
    console.log('3. Paste and click RUN\n');
  }
}

runMigrations().catch((error) => {
  console.error('\n❌ Fatal error:', error.message);
  console.error('\n💡 Try running the migration manually in Supabase Dashboard.');
  process.exit(1);
});
