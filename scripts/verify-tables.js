#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function verifyTables() {
  console.log('🔍 Verifying Database Tables\n');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(url, key);

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

  let successCount = 0;
  let failCount = 0;

  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('count').limit(1);

      if (error) {
        console.log(`   ❌ ${table} - ${error.message}`);
        failCount++;
      } else {
        console.log(`   ✅ ${table}`);
        successCount++;
      }
    } catch (err) {
      console.log(`   ❌ ${table} - ${err.message}`);
      failCount++;
    }
  }

  console.log(`\n📊 Results: ${successCount}/${tables.length} tables verified\n`);

  if (successCount === tables.length) {
    console.log('✨ All tables exist! Database migration is complete.\n');
    return true;
  } else {
    console.log('⚠️  Some tables are missing. You may need to run the migration.\n');
    return false;
  }
}

verifyTables().catch(console.error);
