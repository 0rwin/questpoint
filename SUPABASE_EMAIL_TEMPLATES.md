# Supabase Email Templates - Questpoint Cafe Branded

Follow these steps to configure branded email templates in your Supabase project.

## Step 1: Configure Authentication Settings

1. **Go to Supabase Dashboard**
   - Navigate to: Authentication → Settings

2. **Site URL Configuration**
   - Site URL: `http://www.questpointcafe.com` (or your domain)
   - For local dev: `http://localhost:3000`

3. **Redirect URLs**
   - Add these allowed redirect URLs:
   ```
   http://localhost:3000/**
   http://www.questpointcafe.com/**
   https://www.questpointcafe.com/**
   ```

4. **Email Settings**
   - Confirm email: **ENABLED** ✓
   - Email rate limiting: **Enabled** (recommended)

## Step 2: Update Email Templates

Go to: **Authentication → Email Templates**

### Template 1: Confirm Signup

**Subject:**
```
Welcome to Questpoint Cafe - Confirm Your Email
```

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Questpoint Cafe</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #1A1A1A;
      color: #F5F5DC;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #4A148C 0%, #1A1A1A 100%);
      border-radius: 12px 12px 0 0;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #FFC107;
      margin: 0;
    }
    .tagline {
      color: #F5F5DC;
      font-size: 14px;
      margin: 8px 0 0 0;
      opacity: 0.8;
    }
    .content {
      background-color: #2C2C2C;
      padding: 40px 30px;
      border-radius: 0 0 12px 12px;
    }
    h1 {
      color: #FFC107;
      font-size: 24px;
      margin: 0 0 20px 0;
    }
    p {
      color: #F5F5DC;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    .button {
      display: inline-block;
      background-color: #FFC107;
      color: #1A1A1A;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 9999px;
      font-weight: 600;
      margin: 20px 0;
      transition: transform 0.2s;
    }
    .button:hover {
      transform: scale(1.02);
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      color: rgba(245, 245, 220, 0.6);
      font-size: 12px;
    }
    .footer a {
      color: #FFC107;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">⚔️ Questpoint Cafe</h1>
      <p class="tagline">Your Quest Begins Here</p>
    </div>

    <div class="content">
      <h1>Welcome, Adventurer!</h1>
      <p>Thank you for joining the Questpoint Cafe community. You're one step away from unlocking your account.</p>
      <p>Click the button below to confirm your email address and start your journey:</p>

      <a href="{{ .ConfirmationURL }}" class="button">Confirm Your Email</a>

      <p style="color: rgba(245, 245, 220, 0.7); font-size: 14px; margin-top: 30px;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    </div>

    <div class="footer">
      <p>Questpoint Cafe | 123 Gaming Ave, Your City, CA 12345</p>
      <p>
        <a href="http://www.questpointcafe.com">Visit Website</a> |
        <a href="http://www.questpointcafe.com/privacy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### Template 2: Invite User

**Subject:**
```
You're Invited to Join Questpoint Cafe!
```

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Join Questpoint Cafe</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #1A1A1A;
      color: #F5F5DC;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #4A148C 0%, #1A1A1A 100%);
      border-radius: 12px 12px 0 0;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #FFC107;
      margin: 0;
    }
    .tagline {
      color: #F5F5DC;
      font-size: 14px;
      margin: 8px 0 0 0;
      opacity: 0.8;
    }
    .content {
      background-color: #2C2C2C;
      padding: 40px 30px;
      border-radius: 0 0 12px 12px;
    }
    h1 {
      color: #FFC107;
      font-size: 24px;
      margin: 0 0 20px 0;
    }
    p {
      color: #F5F5DC;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    .button {
      display: inline-block;
      background-color: #FFC107;
      color: #1A1A1A;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 9999px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      color: rgba(245, 245, 220, 0.6);
      font-size: 12px;
    }
    .footer a {
      color: #FFC107;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">⚔️ Questpoint Cafe</h1>
      <p class="tagline">Your Quest Begins Here</p>
    </div>

    <div class="content">
      <h1>You're Invited!</h1>
      <p>You've been invited to join Questpoint Cafe - where premium coffee meets the ultimate gaming sanctuary.</p>
      <p>Click below to accept your invitation and create your account:</p>

      <a href="{{ .ConfirmationURL }}" class="button">Accept Invitation</a>

      <p style="color: rgba(245, 245, 220, 0.7); font-size: 14px; margin-top: 30px;">
        This invitation will expire in 24 hours.
      </p>
    </div>

    <div class="footer">
      <p>Questpoint Cafe | 123 Gaming Ave, Your City, CA 12345</p>
      <p>
        <a href="http://www.questpointcafe.com">Visit Website</a> |
        <a href="http://www.questpointcafe.com/privacy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### Template 3: Magic Link

**Subject:**
```
Your Questpoint Cafe Sign-In Link
```

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In to Questpoint Cafe</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #1A1A1A;
      color: #F5F5DC;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #4A148C 0%, #1A1A1A 100%);
      border-radius: 12px 12px 0 0;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #FFC107;
      margin: 0;
    }
    .tagline {
      color: #F5F5DC;
      font-size: 14px;
      margin: 8px 0 0 0;
      opacity: 0.8;
    }
    .content {
      background-color: #2C2C2C;
      padding: 40px 30px;
      border-radius: 0 0 12px 12px;
    }
    h1 {
      color: #FFC107;
      font-size: 24px;
      margin: 0 0 20px 0;
    }
    p {
      color: #F5F5DC;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    .button {
      display: inline-block;
      background-color: #FFC107;
      color: #1A1A1A;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 9999px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      color: rgba(245, 245, 220, 0.6);
      font-size: 12px;
    }
    .footer a {
      color: #FFC107;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">⚔️ Questpoint Cafe</h1>
      <p class="tagline">Your Quest Begins Here</p>
    </div>

    <div class="content">
      <h1>Sign In to Your Account</h1>
      <p>Click the button below to securely sign in to your Questpoint Cafe account:</p>

      <a href="{{ .ConfirmationURL }}" class="button">Sign In</a>

      <p style="color: rgba(245, 245, 220, 0.7); font-size: 14px; margin-top: 30px;">
        If you didn't request this email, you can safely ignore it. This link will expire in 1 hour.
      </p>
    </div>

    <div class="footer">
      <p>Questpoint Cafe | 123 Gaming Ave, Your City, CA 12345</p>
      <p>
        <a href="http://www.questpointcafe.com">Visit Website</a> |
        <a href="http://www.questpointcafe.com/privacy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### Template 4: Change Email Address

**Subject:**
```
Confirm Your New Email Address - Questpoint Cafe
```

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Email Change</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #1A1A1A;
      color: #F5F5DC;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #4A148C 0%, #1A1A1A 100%);
      border-radius: 12px 12px 0 0;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #FFC107;
      margin: 0;
    }
    .tagline {
      color: #F5F5DC;
      font-size: 14px;
      margin: 8px 0 0 0;
      opacity: 0.8;
    }
    .content {
      background-color: #2C2C2C;
      padding: 40px 30px;
      border-radius: 0 0 12px 12px;
    }
    h1 {
      color: #FFC107;
      font-size: 24px;
      margin: 0 0 20px 0;
    }
    p {
      color: #F5F5DC;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    .button {
      display: inline-block;
      background-color: #FFC107;
      color: #1A1A1A;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 9999px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      color: rgba(245, 245, 220, 0.6);
      font-size: 12px;
    }
    .footer a {
      color: #FFC107;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">⚔️ Questpoint Cafe</h1>
      <p class="tagline">Your Quest Begins Here</p>
    </div>

    <div class="content">
      <h1>Confirm Your New Email</h1>
      <p>You recently requested to change the email address for your Questpoint Cafe account.</p>
      <p>Click the button below to confirm your new email address:</p>

      <a href="{{ .ConfirmationURL }}" class="button">Confirm New Email</a>

      <p style="color: rgba(245, 245, 220, 0.7); font-size: 14px; margin-top: 30px;">
        If you didn't make this change, please contact us immediately at hello@questpointcafe.com
      </p>
    </div>

    <div class="footer">
      <p>Questpoint Cafe | 123 Gaming Ave, Your City, CA 12345</p>
      <p>
        <a href="http://www.questpointcafe.com">Visit Website</a> |
        <a href="http://www.questpointcafe.com/privacy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

### Template 5: Reset Password

**Subject:**
```
Reset Your Questpoint Cafe Password
```

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #1A1A1A;
      color: #F5F5DC;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #4A148C 0%, #1A1A1A 100%);
      border-radius: 12px 12px 0 0;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #FFC107;
      margin: 0;
    }
    .tagline {
      color: #F5F5DC;
      font-size: 14px;
      margin: 8px 0 0 0;
      opacity: 0.8;
    }
    .content {
      background-color: #2C2C2C;
      padding: 40px 30px;
      border-radius: 0 0 12px 12px;
    }
    h1 {
      color: #FFC107;
      font-size: 24px;
      margin: 0 0 20px 0;
    }
    p {
      color: #F5F5DC;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    .button {
      display: inline-block;
      background-color: #FFC107;
      color: #1A1A1A;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 9999px;
      font-weight: 600;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 30px 20px;
      color: rgba(245, 245, 220, 0.6);
      font-size: 12px;
    }
    .footer a {
      color: #FFC107;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">⚔️ Questpoint Cafe</h1>
      <p class="tagline">Your Quest Begins Here</p>
    </div>

    <div class="content">
      <h1>Reset Your Password</h1>
      <p>We received a request to reset the password for your Questpoint Cafe account.</p>
      <p>Click the button below to choose a new password:</p>

      <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>

      <p style="color: rgba(245, 245, 220, 0.7); font-size: 14px; margin-top: 30px;">
        If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
      </p>
      <p style="color: rgba(245, 245, 220, 0.7); font-size: 14px;">
        This link will expire in 1 hour for security.
      </p>
    </div>

    <div class="footer">
      <p>Questpoint Cafe | 123 Gaming Ave, Your City, CA 12345</p>
      <p>
        <a href="http://www.questpointcafe.com">Visit Website</a> |
        <a href="http://www.questpointcafe.com/privacy">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

---

## Step 3: Run Database Migration

1. **Open Supabase SQL Editor**
   - Go to: SQL Editor → New Query

2. **Run the Schema Migration**
   - Copy the contents of `001_initial_schema.sql` from your project
   - Paste into SQL Editor
   - Click **Run**
   - Wait for "Success" message

3. **Verify Tables Created**
   - Go to Table Editor
   - You should see 12 tables created

## Step 4: Seed Test Data (Optional)

1. **Open SQL Editor** again
2. **Run Seed Script**
   - Copy contents of `seed.sql`
   - Paste and Run
   - This adds sample menu items, events, products

## Step 5: Configure OAuth (Optional)

### Google OAuth

1. Go to: Authentication → Providers
2. Enable **Google**
3. Follow Supabase guide to create Google OAuth app
4. Add Client ID and Secret

### Discord OAuth

1. Enable **Discord**
2. Create Discord OAuth app at https://discord.com/developers
3. Add Client ID and Secret
4. Redirect URL: `https://suguzikgatlamtpralh.supabase.co/auth/v1/callback`

## Step 6: Test Authentication

1. **Restart Dev Server**
   ```bash
   npm run dev
   ```

2. **Test Registration**
   - Visit: http://localhost:3000/auth/register
   - Create account with your email
   - Check inbox for confirmation email
   - Click confirmation link

3. **Test Login**
   - Visit: http://localhost:3000/auth/login
   - Sign in with credentials

4. **Test Admin Access**
   - Make sure `ADMIN_EMAILS` in `.env.local` includes your email
   - Visit: http://localhost:3000/admin
   - You should see admin dashboard

## Troubleshooting

### Emails Not Sending

1. Check Supabase → Project Settings → API
2. Verify project is not paused
3. Check spam folder
4. Free tier has email rate limits

### "Invalid redirect URL" Error

1. Go to Authentication → URL Configuration
2. Add your domain to allowed redirect URLs
3. Include `/**` wildcard

### Templates Not Updating

1. Click "Save" after pasting each template
2. Clear browser cache
3. Send test email from Supabase dashboard

## Security Checklist

✓ Email confirmation required for signup
✓ Password reset requires email verification
✓ Email change requires confirmation
✓ Redirect URLs limited to your domains
✓ RLS policies enabled on all tables
✓ Service role key never exposed to client

Your Supabase authentication is now fully configured and branded!
