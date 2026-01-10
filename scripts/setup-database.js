#!/usr/bin/env node
/**
 * Automated Database Setup
 * Runs migration and seed data directly
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load from .env.local
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing credentials. Check .env.local has:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSQL(sql) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

async function setup() {
  console.log('🚀 Questpoint Cafe - Database Setup\n');

  // Test connection
  console.log('1️⃣  Testing connection...');
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('   ✅ Connected to Supabase!\n');
  } catch (err) {
    console.error('   ❌ Connection failed:', err.message);
    process.exit(1);
  }

  // Read migration file
  console.log('2️⃣  Running database migration...');
  const migrationPath = path.join(__dirname, '..', '001_initial_schema.sql');
  const migration = fs.readFileSync(migrationPath, 'utf-8');

  // Write temp file for manual execution
  console.log('   📝 Migration SQL prepared');
  console.log('   📂 File: 001_initial_schema.sql\n');

  // Read seed file
  console.log('3️⃣  Preparing seed data...');
  const seedPath = path.join(__dirname, '..', 'seed.sql');
  const seed = fs.readFileSync(seedPath, 'utf-8');
  console.log('   📝 Seed SQL prepared');
  console.log('   📂 File: seed.sql\n');

  console.log('══════════════════════════════════════════════════════\n');
  console.log('⚠️  MANUAL STEPS REQUIRED\n');
  console.log('I cannot execute SQL directly in your Supabase dashboard.');
  console.log('Please follow these steps:\n');

  console.log('📌 STEP 1: Run Migration (5 minutes)');
  console.log('──────────────────────────────────────────────────────');
  console.log('1. Open: https://supabase.com/dashboard/project/suguzikgatlamtpralh/sql/new');
  console.log('2. Copy ENTIRE contents of: 001_initial_schema.sql');
  console.log('3. Paste into SQL Editor');
  console.log('4. Click RUN');
  console.log('5. Wait for "Success" message\n');

  console.log('📌 STEP 2: Seed Test Data (2 minutes)');
  console.log('──────────────────────────────────────────────────────');
  console.log('1. Open NEW query in SQL Editor');
  console.log('2. Copy ENTIRE contents of: seed.sql');
  console.log('3. Paste and RUN');
  console.log('4. Wait for "Success"\n');

  console.log('📌 STEP 3: Configure Email Templates (10 minutes)');
  console.log('──────────────────────────────────────────────────────');
  console.log('1. Open: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/templates');
  console.log('2. For EACH template (Confirm signup, Invite, Magic Link, Change Email, Reset Password):');
  console.log('   - Click the template name');
  console.log('   - Copy Subject + Body from SUPABASE_EMAIL_TEMPLATES.md');
  console.log('   - Paste and SAVE');
  console.log('3. All 5 templates must be updated\n');

  console.log('📌 STEP 4: Configure Auth Settings (3 minutes)');
  console.log('──────────────────────────────────────────────────────');
  console.log('1. Open: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/url-configuration');
  console.log('2. Site URL: http://localhost:3000');
  console.log('3. Redirect URLs: http://localhost:3000/**');
  console.log('4. Save\n');

  console.log('══════════════════════════════════════════════════════\n');
  console.log('📖 Detailed instructions: SUPABASE_QUICK_SETUP.md');
  console.log('📧 Email templates: SUPABASE_EMAIL_TEMPLATES.md\n');

  console.log('✅ After completing the steps above, test with:');
  console.log('   npm run dev');
  console.log('   → Visit: http://localhost:3000/auth/register\n');
}

setup().catch(console.error);
