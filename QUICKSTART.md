# Questpoint Cafe - Quick Start Guide

## What You Have Now

✓ **Coming Soon Page** at `/coming-soon`
- Newsletter signup form
- Discrete "Staff" login link in bottom-right corner
- Gaming-themed landing page

✓ **Admin Panel** at `/admin`
- Protected with authentication (dev mode bypassed for testing)
- Dashboard with event, menu, and inventory management
- Logout functionality

✓ **Full Application** (menu, shop, events, cart, checkout)
- All features implemented
- Running in stub mode with mock data

## Quick Actions

### 1. View Coming Soon Page

```bash
npm run dev
```

Visit: http://localhost:3000/coming-soon

### 2. Test Admin Access (Without Supabase)

In development mode, authentication is automatically bypassed with a mock session.

1. Start dev server: `npm run dev`
2. Click "Staff" link in bottom-right of coming soon page
3. You'll see a login page - **in dev mode, this redirects directly to admin**
4. Visit http://localhost:3000/admin directly

### 3. Connect to Supabase (Real Authentication)

Follow the detailed guide in `SUPABASE_SETUP.md`:

1. Create Supabase project (free tier)
2. Copy API keys to `.env.local`
3. Run database migration (`001_initial_schema.sql`)
4. Set `NEXT_PUBLIC_SUPABASE_ENABLED=true`
5. Add your email to `ADMIN_EMAILS`

After setup:
- Real user registration/login works
- Admin panel requires actual login
- All data persisted to Supabase

## Making Coming Soon Your Homepage

### Option 1: Redirect (Recommended)

Replace `src/app/page.tsx` with:

```typescript
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/coming-soon');
}
```

### Option 2: Replace Content

```bash
# Backup current homepage
mv src/app/page.tsx src/app/_page.backup.tsx

# Use coming soon as homepage
cp src/app/coming-soon/page.tsx src/app/page.tsx
```

## Development Workflow

### Stub Mode (Default)

- All third-party services stubbed
- Mock data for menu, events, products
- Dev authentication bypass
- Perfect for testing UI/UX

### Supabase Enabled

- Real database and authentication
- User accounts persist
- Admin panel requires login
- See `SUPABASE_SETUP.md`

## File Structure

```
questpoint/
├── src/app/
│   ├── coming-soon/          # Landing page
│   ├── admin/                 # Admin panel (protected)
│   │   ├── layout.tsx         # Auth check wrapper
│   │   ├── page.tsx           # Dashboard
│   │   ├── events/            # Event management
│   │   ├── menu/              # Menu management
│   │   └── inventory/         # Inventory management
│   ├── auth/                  # Login/register/signout
│   └── ...                    # Other pages
├── src/lib/
│   └── supabase/
│       ├── client.ts          # Browser client (stub)
│       └── server.ts          # Server client (stub + dev mock)
├── SUPABASE_SETUP.md          # Supabase connection guide
├── DEPLOYMENT.md              # Pre-launch checklist
├── CONSTRAINTS.md             # Technical limits
└── .env.example               # Environment variables template
```

## Common Tasks

### Update Business Hours

Edit `src/config/business.ts`:

```typescript
export const BUSINESS_HOURS = {
  openHour: 7,      // 7 AM
  closeHour: 22,    // 10 PM
  // ...
};
```

### Update Location/Contact

Edit `src/config/business.ts`:

```typescript
export const LOCATION = {
  name: 'Questpoint Cafe',
  address: {
    street: '123 Gaming Ave',
    city: 'Your City',
    state: 'CA',
    zip: '12345',
  },
  contact: {
    phone: '(555) 555-QUEST',
    email: 'hello@questpointcafe.com',
  },
};
```

### Add Newsletter Signups to Database

1. Connect Supabase (see `SUPABASE_SETUP.md`)
2. Create `newsletter_signups` table:

```sql
CREATE TABLE newsletter_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Update `src/app/coming-soon/page.tsx`:

```typescript
const handleNewsletterSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  const supabase = createClient();
  const { error } = await supabase
    .from('newsletter_signups')
    .insert({ email });

  if (!error) {
    setIsSubmitted(true);
  }
};
```

### Customize Coming Soon Page

Edit `src/app/coming-soon/page.tsx`:

- Update title and tagline
- Change feature cards
- Add social media links
- Modify colors/styling

## Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables (from `.env.local`)
4. Deploy!

Coming soon page is production-ready.

## Next Steps

1. **Test Coming Soon Page**
   - Newsletter signup
   - Admin login flow
   - Mobile responsiveness

2. **Connect Supabase** (optional now, required for production)
   - Follow `SUPABASE_SETUP.md`
   - Test real authentication

3. **Customize Branding**
   - Update location in `src/config/business.ts`
   - Add social media links
   - Upload real images (replace Unsplash placeholders)

4. **Soft Launch**
   - Deploy coming soon page
   - Collect newsletter signups
   - Test with early users

5. **Full Launch**
   - Enable all features
   - Connect Square payments
   - Go public!

## Support

- **Supabase Setup**: See `SUPABASE_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Technical Constraints**: See `CONSTRAINTS.md`
- **Architecture**: See `ARCHITECTURE.md`

## Current Status

✓ Coming soon page ready
✓ Admin panel functional (dev mode)
✓ Full app built and tested
✓ Build passing
✓ Supabase integration ready (waiting for credentials)

You're ready to deploy the coming soon page and start collecting signups!
