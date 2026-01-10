# Get Your Database Connection URL (2 minutes)

## Quick Steps:

1. **Open this link**: https://supabase.com/dashboard/project/suguzikgatlamtpralh/settings/database

2. **Scroll down** to the "Connection string" section (middle of page)

3. **Select the "URI" tab** (not "Connection parameters")

4. **Copy the full connection string** - it looks like:
   ```
   postgresql://postgres.suguzikgatlamtpralh:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

5. **Copy your database password** from the "Database password" field above (click the eye icon to reveal)

6. **Replace `[YOUR-PASSWORD]`** in the connection string with your actual password

7. **Add to `.env.local`** file:
   ```
   DATABASE_URL=postgresql://postgres.suguzikgatlamtpralh:your_actual_password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

## Important Notes:

⚠️ **Do NOT include brackets**: Remove `[` and `]` around the password
⚠️ **Do NOT add quotes**: Paste the password directly, no quotes needed
⚠️ **Keep it secret**: This password grants full database access

## Example:

❌ **Wrong**:
```
DATABASE_URL=postgresql://postgres.suguzikgatlamtpralh:[MyP@ssw0rd]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

✅ **Correct**:
```
DATABASE_URL=postgresql://postgres.suguzikgatlamtpralh:MyP@ssw0rd@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

## After Adding DATABASE_URL:

Run this command to complete the database setup automatically:

```bash
node scripts/run-migrations.js
```

This will:
- ✅ Connect to your database
- ✅ Create all 12 tables
- ✅ Load sample data
- ✅ Verify everything works

**Time: 30 seconds** (fully automated!)

---

## Lost Your Password?

If you don't have your database password:

1. Go to: https://supabase.com/dashboard/project/suguzikgatlamtpralh/settings/database
2. Scroll to "Reset database password"
3. Enter a new password
4. Click "Reset password"
5. Use the new password in the connection string above

⚠️ **Warning**: Resetting the password will break any existing connections using the old password.

---

## What Happens Next:

Once you run `node scripts/run-migrations.js` successfully, you'll only have 2 quick manual steps left:

1. **Configure email templates** (15 min) - Copy/paste from `SUPABASE_EMAIL_TEMPLATES.md`
2. **Set auth URLs** (2 min) - Set localhost:3000 as allowed redirect

Then your authentication will be fully functional!
