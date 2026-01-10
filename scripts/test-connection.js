#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function test() {
  console.log('Testing Supabase Connection...\n');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('URL:', url);
  console.log('Anon Key:', key ? key.substring(0, 20) + '...' : 'MISSING');
  console.log('Service Key:', serviceKey ? serviceKey.substring(0, 20) + '...' : 'MISSING');
  console.log('');

  // Test with anon key first
  console.log('1️⃣  Testing with anon key...');
  const supabaseAnon = createClient(url, key);

  try {
    const { data, error } = await supabaseAnon.from('profiles').select('count').limit(1);

    if (error) {
      console.log('   Error:', error.message);
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('   ✅ Connection works! (Table just doesn\'t exist yet)\n');
      } else {
        console.log('   ❌ Connection failed\n');
      }
    } else {
      console.log('   ✅ Connection successful!');
      console.log('   Data:', data);
    }
  } catch (err) {
    console.log('   ❌ Exception:', err.message);
  }

  // Test with service role key
  console.log('\n2️⃣  Testing with service role key...');
  const supabaseService = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    const { data, error } = await supabaseService.from('profiles').select('count').limit(1);

    if (error) {
      console.log('   Error:', error.message);
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('   ✅ Connection works! (Table just doesn\'t exist yet)\n');
      } else {
        console.log('   ❌ Connection failed\n');
      }
    } else {
      console.log('   ✅ Connection successful!');
      console.log('   Data:', data);
    }
  } catch (err) {
    console.log('   ❌ Exception:', err.message);
  }

  // Test auth
  console.log('\n3️⃣  Testing auth API...');
  try {
    const { data: { session }, error } = await supabaseAnon.auth.getSession();
    if (error) {
      console.log('   Error:', error.message);
    } else {
      console.log('   ✅ Auth API works! Session:', session ? 'exists' : 'none');
    }
  } catch (err) {
    console.log('   ❌ Exception:', err.message);
  }
}

test().catch(console.error);
