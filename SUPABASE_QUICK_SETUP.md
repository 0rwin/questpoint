# Supabase Quick Setup Checklist

Your `.env.local` is configured! Follow these steps in order.

## ✓ Done
- [x] Environment variables set in `.env.local`
- [x] Supabase packages installed
- [x] Client code updated to use real Supabase

## 📋 Do Now (In Order)

### Step 1: Run Database Migration (5 minutes)

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `suguzikgatlamtpralh`
3. Go to: **SQL Editor** → **New Query**
4. Open file: `001_initial_schema.sql` in your project
5. Copy entire contents
6. Paste into SQL Editor
7. Click **Run** button
8. Wait for "Success. No rows returned" message

**What this does:** Creates 12 tables (profiles, menu_items, events, orders, etc.)

---

### Step 2: Configure Authentication Settings (3 minutes)

1. Go to: **Authentication** → **Settings**
2. Under **Site URL**, set:
   ```
   http://localhost:3000
   ```
   (Change to your domain when deploying)

3. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/**
   ```

4. Scroll to **Email Auth** section:
   - ✓ Confirm email: **ENABLED**
   - ✓ Secure email change: **ENABLED**

5. Click **Save** at bottom

---

### Step 3: Update Email Templates (15 minutes)

Go to: **Authentication** → **Email Templates**

#### Template 1: Confirm signup
1. Click **Confirm signup**
2. Open file: `SUPABASE_EMAIL_TEMPLATES.md`
3. Find "Template 1: Confirm Signup"
4. Copy the **Subject** and paste in Supabase
5. Copy the **Body (HTML)** and paste in Supabase
6. Click **Save**

#### Template 2: Invite user
1. Click **Invite user**
2. Find "Template 2: Invite User" in guide
3. Copy Subject and Body
4. Paste and **Save**

#### Template 3: Magic Link
1. Click **Magic Link**
2. Find "Template 3: Magic Link" in guide
3. Copy Subject and Body
4. Paste and **Save**

#### Template 4: Change Email Address
1. Click **Change Email Address**
2. Find "Template 4: Change Email Address" in guide
3. Copy Subject and Body
4. Paste and **Save**

#### Template 5: Reset Password
1. Click **Reset Password**
2. Find "Template 5: Reset Password" in guide
3. Copy Subject and Body
4. Paste and **Save**

---

### Step 4: Test Authentication (5 minutes)

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Test Registration**
   - Go to: http://localhost:3000/auth/register
   - Enter your email (use real email!)
   - Create password
   - Click Register
   - Check your inbox for confirmation email
   - Click the "Confirm Your Email" button

3. **Test Login**
   - Go to: http://localhost:3000/auth/login
   - Enter your email and password
   - Click Sign In
   - You should be redirected to homepage

4. **Test Admin Access**
   - Make sure your email is in `.env.local` under `ADMIN_EMAILS`
   - Go to: http://localhost:3000/admin
   - You should see admin dashboard
   - (Not login page - you're already authenticated!)

---

### Step 5: Seed Test Data (Optional - 2 minutes)

1. Go to: **SQL Editor** → **New Query**
2. Open file: `seed.sql` in your project
3. Copy entire contents
4. Paste and **Run**

**What this does:** Adds sample menu items, events, and products for testing

---

### Step 6: Verify Database (2 minutes)

1. Go to: **Table Editor**
2. Check these tables exist:
   - profiles
   - menu_items
   - events
   - products
   - orders
   - event_registrations
   - favorites
   - points_transactions
   - rewards

3. Click on **profiles** table
4. You should see your user account!

---

## Common Issues

### "Email not confirmed" error
- Check your spam folder
- Resend confirmation email from login page
- Check Supabase → Authentication → Users to verify user exists

### "Invalid redirect URL" error
- Double check Step 2 above
- Make sure you added `http://localhost:3000/**` with `/**` wildcard

### Emails not arriving
- Free tier has rate limits (3 emails per hour per email address)
- Check spam folder
- Try with different email address

### Admin panel shows login page
- Your email must be in `ADMIN_EMAILS` in `.env.local`
- Restart dev server after changing `.env.local`
- Make sure you're logged in first

---

## Quick Reference

**Supabase Dashboard:**
- Project: https://supabase.com/dashboard/project/suguzikgatlamtpralh
- SQL Editor: `/editor`
- Table Editor: `/editor`
- Authentication: `/auth/users`
- Email Templates: `/auth/templates`

**Your App:**
- Homepage: http://localhost:3000
- Login: http://localhost:3000/auth/login
- Register: http://localhost:3000/auth/register
- Admin: http://localhost:3000/admin
- Coming Soon: http://localhost:3000/coming-soon

---

## You're Done When:

✓ Database migration ran successfully
✓ You can register a new account
✓ You receive confirmation email (branded Questpoint design!)
✓ You can log in
✓ You can access admin panel
✓ Your profile appears in Supabase Table Editor

**Time estimate: 30 minutes total**

Need help? See `SUPABASE_EMAIL_TEMPLATES.md` for full details.
