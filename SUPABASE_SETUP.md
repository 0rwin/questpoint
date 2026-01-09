# Supabase Setup Guide

This guide will walk you through connecting your Questpoint Cafe app to Supabase free tier.

## Prerequisites

- Supabase account (sign up at https://supabase.com)
- Supabase project created

## Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Click "New Project"

2. **Configure Project**
   - Name: `questpoint-cafe`
   - Database Password: Choose a strong password (save this!)
   - Region: Choose closest to your users
   - Plan: Free tier (500MB database, 2GB bandwidth/day)

3. **Wait for Project Setup**
   - Takes 1-2 minutes to initialize
   - Status will show "Active" when ready

## Step 2: Get Your API Keys

1. **Navigate to Project Settings**
   - Click on your project
   - Go to Settings → API

2. **Copy These Values**
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (starts with `eyJ`)
   - **service_role key**: `eyJhbGc...` (⚠️ Keep this secret!)

## Step 3: Configure Environment Variables

1. **Create .env.local File**
   ```bash
   # In the project root directory
   cp .env.example .env.local
   ```

2. **Edit .env.local**
   ```env
   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Enable Supabase (change to true when ready)
   NEXT_PUBLIC_SUPABASE_ENABLED=true

   # Admin emails (comma-separated)
   ADMIN_EMAILS=your.email@example.com
   ```

3. **⚠️ Important Notes**
   - Replace `YOUR_PROJECT_ID` with your actual project ID
   - Replace the keys with your actual keys from Step 2
   - **Never commit .env.local to Git** (already in .gitignore)
   - Add your email to `ADMIN_EMAILS` to access admin panel

## Step 4: Run Database Migration

1. **Open Supabase SQL Editor**
   - In Supabase Dashboard
   - Go to SQL Editor → New Query

2. **Copy Migration SQL**
   - Open `001_initial_schema.sql` in your project
   - Copy the entire contents

3. **Run Migration**
   - Paste into SQL Editor
   - Click "Run" button
   - Wait for "Success" message

4. **Verify Tables Created**
   - Go to Table Editor
   - You should see these tables:
     - `profiles`
     - `menu_items`
     - `menu_customizations`
     - `events`
     - `event_registrations`
     - `orders`
     - `order_items`
     - `products`
     - `favorites`
     - `points_transactions`
     - `rewards`

## Step 5: Configure Authentication

1. **Enable Email Auth**
   - Go to Authentication → Providers
   - Email is enabled by default ✓

2. **Configure Email Templates (Optional)**
   - Go to Authentication → Email Templates
   - Customize confirmation and password reset emails
   - Add your branding

3. **Configure Site URL**
   - Go to Authentication → URL Configuration
   - Site URL: `http://localhost:3000` (dev) or your domain
   - Redirect URLs: Add `http://localhost:3000/**`

4. **Enable OAuth Providers (Optional)**
   - Go to Authentication → Providers
   - Enable Google:
     - Follow Supabase guide to create Google OAuth app
     - Add Client ID and Secret
   - Enable Discord:
     - Create Discord OAuth app
     - Add Client ID and Secret

## Step 6: Test the Connection

1. **Restart Development Server**
   ```bash
   npm run dev
   ```

2. **Test Authentication**
   - Visit http://localhost:3000/auth/register
   - Create a test account with your email
   - Check your email for confirmation link
   - Click confirmation link
   - Try logging in at http://localhost:3000/auth/login

3. **Test Admin Access**
   - Make sure your email is in `ADMIN_EMAILS`
   - Log in
   - Visit http://localhost:3000/admin
   - You should see the admin dashboard

4. **Check Database**
   - In Supabase → Table Editor → profiles
   - Your new user should appear

## Step 7: Seed Test Data (Optional)

1. **Open SQL Editor**
   - Go to SQL Editor → New Query

2. **Run Seed Script**
   - Open `seed.sql` in your project
   - Copy and paste into SQL Editor
   - Click "Run"
   - This adds sample menu items, events, products

3. **Verify Data**
   - Check Table Editor for:
     - `menu_items` - should have sample drinks
     - `events` - should have sample events
     - `products` - should have sample shop items

## Step 8: Update Coming Soon Page (Optional)

If you want the coming soon page as your homepage:

1. **Option A: Redirect Homepage**
   ```typescript
   // src/app/page.tsx
   import { redirect } from 'next/navigation';

   export default function HomePage() {
     redirect('/coming-soon');
   }
   ```

2. **Option B: Replace Homepage Content**
   ```bash
   # Backup current homepage
   mv src/app/page.tsx src/app/page.backup.tsx

   # Use coming soon as homepage
   cp src/app/coming-soon/page.tsx src/app/page.tsx
   ```

## Troubleshooting

### "Invalid API Key" Error

- Double-check your API keys in `.env.local`
- Make sure there are no extra spaces
- Restart dev server: `npm run dev`

### "User Already Registered" Error

- Email already exists in database
- Use password reset flow
- Or use different email

### RLS Policy Errors

- Check Row Level Security is enabled
- Verify policies allow users to read/write their own data
- See `001_initial_schema.sql` for policy definitions

### Tables Not Found

- Re-run migration in SQL Editor
- Check for error messages during migration
- Verify project is "Active" in dashboard

### Coming Soon Page Not Showing

- Clear browser cache
- Check route in browser: http://localhost:3000/coming-soon
- Verify file exists: `src/app/coming-soon/page.tsx`

## Monitoring Usage (Free Tier Limits)

### Database Size (500MB limit)

1. Go to Settings → Database
2. Check "Database Size" metric
3. Warning threshold: 400MB

### Bandwidth (2GB/day limit)

1. Go to Settings → Usage
2. Check "Bandwidth" chart
3. Warning threshold: 1.5GB/day

### Monthly Active Users (Unlimited on free tier)

1. Go to Authentication → Users
2. Monitor user count growth

## Production Deployment

When deploying to Vercel/production:

1. **Add Environment Variables to Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - Set for Production, Preview, and Development

2. **Update Site URL in Supabase**
   - Authentication → URL Configuration
   - Site URL: `https://questpointcafe.com`
   - Add redirect URL: `https://questpointcafe.com/**`

3. **Test Production Auth Flow**
   - Sign up with test account
   - Verify confirmation email works
   - Test login and admin access

## Security Checklist

- [ ] `.env.local` is in `.gitignore` ✓
- [ ] Service role key never exposed to client ✓
- [ ] Row-level security (RLS) enabled on all tables ✓
- [ ] API keys rotated if accidentally committed
- [ ] Admin emails configured correctly
- [ ] OAuth redirect URLs limited to your domain
- [ ] Email confirmation required for new users

## Next Steps

After Supabase is connected:

1. **Remove Stub Mode**
   - Set `NEXT_PUBLIC_SUPABASE_ENABLED=true`
   - App will use real database instead of mocks

2. **Configure Square Payments**
   - See Square setup guide (coming soon)
   - Get production API keys

3. **Launch Coming Soon Page**
   - Deploy to Vercel
   - Share with early users
   - Collect newsletter signups

4. **Soft Launch**
   - Test with in-store customers
   - Monitor for issues
   - Iterate based on feedback

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Project Issues**: See `CONSTRAINTS.md` for troubleshooting

## Cost Estimation

Free Tier includes:
- 500MB database storage
- 2GB bandwidth per day
- Unlimited API requests
- 50,000 monthly active users

If you exceed limits:
- Upgrade to Pro: $25/month
- 8GB database
- 50GB bandwidth
- Priority support
- Daily backups

Recommendation: Start with free tier, upgrade when you hit 400MB database or 1.5GB/day bandwidth.
