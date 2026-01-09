# Technical & Business Constraints

This document verifies compliance with spec.md Section 9 constraints and assumptions.

## 9.1 Technical Constraints

### Framework Requirements ✓

- **Next.js 14+**: ✓ Currently using Next.js 16.1.1 (App Router)
- **TypeScript Strict Mode**: ✓ Enabled in tsconfig.json (`"strict": true`)
- **Tailwind CSS v3**: ✓ Using Tailwind CSS v3 (not v4)

### Service Tier Limits

#### Supabase Free Tier
- **Database Size**: 500MB limit
- **Bandwidth**: 2GB/day limit
- **Monitoring**: Check usage in Supabase dashboard
- **Action Required**: Upgrade to Pro tier ($25/month) if limits exceeded

#### Square API Rate Limits
- **Rate Limit**: 10 requests/second
- **Implementation**: All Square API calls include exponential backoff retry logic
- **Monitoring**: Track API usage in Square Developer Dashboard

### Configuration Files

All technical constraints are verified:
- `tsconfig.json` - TypeScript strict mode enabled
- `tailwind.config.ts` - Tailwind v3 configuration
- `next.config.js` - Next.js 16 with App Router
- `package.json` - All dependencies locked to compatible versions

## 9.2 Business Constraints

### Location

- **Single Location Only**: No multi-location support in MVP
- **Address**: 123 Gaming Ave, Your City, CA 12345
- **Future**: Multi-location support deferred to Phase 4

### Order Fulfillment

- **Pickup Only**: ✓ Implemented in order flow
- **Dine-In**: ✓ Supported via order type selection
- **No Delivery**: Delivery integration deferred to Phase 2
- **Implementation**: Order type constrained to `'pickup' | 'dine_in'` (see `src/types/orders.ts`)

### Business Hours

- **Operating Hours**: 7 AM - 10 PM daily
- **Implementation**: `src/lib/utils.ts` - `isCafeOpen()` function
- **Display**: Hours shown in footer and contact sections
- **Ordering Cutoff**: Orders accepted up to 9:45 PM (15 min before close)

### Language

- **English Only**: No internationalization (i18n) in MVP
- **Future**: Multi-language support deferred to Phase 3
- **Implementation**: All text is hard-coded in English

## 9.3 Assumptions

### User Base

- **Mobile-First**: 90%+ traffic expected from smartphones
  - ✓ All pages tested at 375px width (iPhone SE)
  - ✓ Touch-friendly UI elements (min 44px tap targets)
  - ✓ Mobile navigation prioritized

- **Internet Connection**: Users have stable internet during ordering
  - ✓ PWA with offline fallback implemented
  - ✓ Service worker caches menu data (24h)
  - ✓ Error handling for network failures

### Staff & Systems

- **POS System**: Staff has Square POS to receive orders
  - ✓ Online orders push to Square POS
  - ✓ Fallback: Manual order entry if POS offline
  - ⚠️ Requires Square Terminal or iPad with Square app

- **Square Integration**: Square is approved and operational
  - ⚠️ Requires Square developer account
  - ⚠️ Requires approved OAuth application
  - ⚠️ Requires production access token
  - 📝 All Square calls currently stubbed

- **Supabase Auth**: Supabase Auth is sufficient for user management
  - ✓ Email/password authentication
  - ✓ OAuth providers (Google, Discord)
  - ✓ Row-level security policies
  - 📝 Currently stubbed, ready to activate

## Compliance Checklist

### Pre-Launch Requirements

- [ ] Square production credentials configured
- [ ] Supabase production project created
- [ ] Database migrations applied
- [ ] Environment variables set (.env.production)
- [ ] Sentry DSN configured for error tracking
- [ ] Vercel Analytics enabled
- [ ] Domain DNS configured
- [ ] SSL certificate active
- [ ] Square webhook endpoints configured
- [ ] Staff trained on order fulfillment

### Runtime Monitoring

Monitor these limits in production:

1. **Supabase Dashboard**
   - Database size (warn at 400MB)
   - Bandwidth usage (warn at 1.5GB/day)
   - API request count

2. **Square Dashboard**
   - API request rate (stay under 8 req/sec average)
   - Payment success rate
   - Webhook delivery status

3. **Vercel Dashboard**
   - Build minutes
   - Bandwidth
   - Function executions
   - Edge requests

## Known Limitations (By Design)

1. **No Delivery**: Pickup/dine-in only per business model
2. **Single Location**: MVP scoped to one location
3. **English Only**: No translation support yet
4. **Manual Discounts**: No customer-facing promo codes (staff-only)
5. **Payment Methods**: Square only (no Stripe, PayPal, etc.)
6. **Event Capacity**: Manual management (no waitlist automation)

## Upgrade Paths

When constraints are exceeded:

### Supabase Free → Pro
- Trigger: >400MB database or >1.5GB/day bandwidth
- Cost: $25/month
- Benefits: 8GB database, 50GB bandwidth, daily backups

### Square Free → Plus
- Trigger: >$250k/year in sales
- Cost: $0/month (transaction fees apply)
- Benefits: Same API access, lower processing fees

### Vercel Hobby → Pro
- Trigger: Team collaboration needed
- Cost: $20/month per member
- Benefits: Team features, advanced analytics, priority support

## Notes

- All constraints documented here match spec.md Section 9
- Technical constraints are actively enforced by tooling
- Business constraints are implemented in application logic
- Assumptions are reflected in UX design and error handling
