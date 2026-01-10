# 🚀 Supabase Setup - Complete This Now (20 minutes total)

Your Supabase project is configured and ready. Complete these 3 steps to activate authentication.

## ✅ What's Already Done
- Environment variables configured in `.env.local`
- Supabase client code updated and tested
- All 5 email templates prepared and ready to copy
- Database schema and seed data ready

---

## 📋 Step 1: Run Database Migration (3 minutes)

**Goal**: Create all database tables (profiles, menu_items, events, orders, etc.)

1. Open this link: **https://supabase.com/dashboard/project/suguzikgatlamtpralh/sql/new**

2. Open the file `001_initial_schema.sql` in your project

3. Select ALL contents (Ctrl+A) and Copy (Ctrl+C)

4. Paste into the Supabase SQL Editor

5. Click the **Run** button (bottom right)

6. Wait for "Success. No rows returned" message

**✅ Verification**: Go to Table Editor - you should see 12 new tables

---

## 📋 Step 2: Load Test Data (2 minutes) - OPTIONAL

**Goal**: Add sample menu items, events, and products for testing

1. Open a new SQL query in Supabase: **https://supabase.com/dashboard/project/suguzikgatlamtpralh/sql/new**

2. Open the file `seed.sql` in your project

3. Copy ALL contents (Ctrl+A, Ctrl+C)

4. Paste into SQL Editor

5. Click **Run**

6. Wait for "Success"

**✅ Verification**: Check Table Editor → menu_items - you should see sample drinks

---

## 📋 Step 3: Configure Email Templates (15 minutes)

**Goal**: Set up branded emails for signup, password reset, etc.

### Link: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/templates

For EACH of the 5 templates below:
1. Click the template name in Supabase
2. Find the template in `SUPABASE_EMAIL_TEMPLATES.md`
3. Copy the **Subject line**
4. Copy the **HTML body**
5. Paste both into Supabase
6. Click **Save**

### Template Checklist:
- [ ] **Confirm signup** - "Welcome, Adventurer! Confirm Your Email"
- [ ] **Invite user** - "You're Invited to Join Questpoint Cafe"
- [ ] **Magic Link** - "Your Magic Link to Questpoint Cafe"
- [ ] **Change Email Address** - "Confirm Your New Email Address"
- [ ] **Reset Password** - "Reset Your Questpoint Cafe Password"

**📁 All templates are in**: `SUPABASE_EMAIL_TEMPLATES.md`

**✅ Verification**: Each template should show your custom content in the preview

---

## 📋 Step 4: Configure Authentication Settings (2 minutes)

**Goal**: Set allowed URLs for auth redirects

1. Open: **https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/url-configuration**

2. Set **Site URL**:
   ```
   http://localhost:3000
   ```

3. Set **Redirect URLs**:
   ```
   http://localhost:3000/**
   ```

4. Scroll down and click **Save**

**✅ Verification**: Your URLs should be saved and showing in the dashboard

---

## 🧪 Test Your Setup (5 minutes)

### Start the App:
```bash
npm run dev
```

### Test Registration:
1. Go to: http://localhost:3000/auth/register
2. Enter your email (use a real email!)
3. Create a password
4. Click **Register**

### Check Email:
1. You should receive a branded email with purple/gold design
2. Subject: "Welcome, Adventurer! Confirm Your Email"
3. Click **Confirm Your Email** button

### Test Login:
1. Go to: http://localhost:3000/auth/login
2. Enter your email and password
3. Click **Sign In**
4. You should be redirected to homepage as logged in

### Test Admin Panel:
1. Make sure your email is in `.env.local` under `ADMIN_EMAILS`
2. Go to: http://localhost:3000/admin
3. You should see the admin dashboard

---

## ✅ Success Checklist

You're done when ALL of these work:

- [ ] Database has 12 tables in Table Editor
- [ ] You can register a new account
- [ ] You receive the branded confirmation email
- [ ] You can confirm your email via the link
- [ ] You can log in successfully
- [ ] You can access the admin panel
- [ ] Your profile shows in Supabase → Authentication → Users

---

## 🆘 Troubleshooting

### "Email not confirmed" error
- Check spam folder
- Resend confirmation from login page
- Check Supabase → Authentication → Users to verify user exists

### "Invalid redirect URL" error
- Double-check Step 4 above
- Make sure you added `http://localhost:3000/**` with `/**` wildcard
- Save the settings

### Emails not arriving
- Free tier limit: 3 emails per hour per address
- Check spam folder
- Try a different email address

### Admin panel shows login page
- Your email MUST be in `ADMIN_EMAILS` in `.env.local`
- Restart dev server after changing `.env.local`: `npm run dev`
- Make sure you're logged in first

### Tables not created
- Make sure you ran the ENTIRE `001_initial_schema.sql` file
- Check for error messages in SQL Editor
- Look in Table Editor to verify tables exist

---

## 📞 Quick Links

- **Your Supabase Project**: https://supabase.com/dashboard/project/suguzikgatlamtpralh
- **SQL Editor**: https://supabase.com/dashboard/project/suguzikgatlamtpralh/sql
- **Table Editor**: https://supabase.com/dashboard/project/suguzikgatlamtpralh/editor
- **Authentication Users**: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/users
- **Email Templates**: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/templates
- **Auth Settings**: https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/url-configuration

---

## 📚 Reference Files

- `001_initial_schema.sql` - Database migration
- `seed.sql` - Test data
- `SUPABASE_EMAIL_TEMPLATES.md` - All 5 branded email templates
- `SUPABASE_QUICK_SETUP.md` - Detailed setup guide
- `.env.local` - Your environment variables (already configured)

---

**Total time: 20 minutes**

**Next step after completion**: Test the full registration → confirmation → login flow!
