# Deployment Checklist

This checklist ensures all constraints and assumptions from spec.md Section 9 are met before deployment.

## Pre-Deployment Verification

### Section 9.1 - Technical Constraints

#### Framework Requirements
- [ ] Next.js version ≥ 14.0.0 (currently 16.1.1) ✓
- [ ] TypeScript strict mode enabled in `tsconfig.json` ✓
- [ ] Tailwind CSS v3 (not v4) ✓
- [ ] All dependencies locked in `package-lock.json`

#### Service Configuration

**Supabase**
- [ ] Production project created
- [ ] Environment variables set in `.env.local`:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Database migrations applied (run `001_initial_schema.sql`)
- [ ] Seed data loaded (menu items, events)
- [ ] Row-level security policies enabled
- [ ] OAuth providers configured (Google, Discord)
- [ ] Monitor: Database size < 400MB (warn threshold)
- [ ] Monitor: Bandwidth < 1.5GB/day (warn threshold)

**Square**
- [ ] Square developer account created
- [ ] OAuth application approved for production
- [ ] Environment variables set:
  - [ ] `NEXT_PUBLIC_SQUARE_APPLICATION_ID`
  - [ ] `NEXT_PUBLIC_SQUARE_LOCATION_ID`
  - [ ] `SQUARE_ACCESS_TOKEN` (production token)
  - [ ] `NEXT_PUBLIC_SQUARE_ENVIRONMENT=production`
- [ ] Webhook endpoints configured:
  - [ ] `https://questpointcafe.com/api/webhooks/square`
  - [ ] Signature key saved in `SQUARE_WEBHOOK_SIGNATURE_KEY`
- [ ] Test payment flow in production
- [ ] Monitor: API rate < 8 req/sec (buffer for 10 req/sec limit)

### Section 9.2 - Business Constraints

#### Location Configuration
- [ ] Verify business address in `src/config/business.ts`:
  - [ ] Street address
  - [ ] City, state, ZIP
  - [ ] GPS coordinates for maps
- [ ] Update contact information:
  - [ ] Phone number
  - [ ] Email addresses (hello@, support@, privacy@)
- [ ] No multi-location features enabled ✓

#### Order Types
- [ ] Verify order types constrained to: `pickup` | `dine_in` ✓
- [ ] No delivery option in UI ✓
- [ ] Order type validation in API endpoints ✓

#### Business Hours
- [ ] Verify hours in `src/config/business.ts`: 7 AM - 10 PM daily
- [ ] Order cutoff 15 minutes before close (9:45 PM) ✓
- [ ] Hours displayed correctly in:
  - [ ] Footer
  - [ ] Contact page
  - [ ] After-hours notice
- [ ] Test `isCafeOpenNow()` function accuracy

#### Language
- [ ] All text in English ✓
- [ ] No i18n configuration ✓
- [ ] Currency set to USD ✓
- [ ] Date/time format set to US conventions ✓

### Section 9.3 - Assumptions Verification

#### Mobile-First Design
- [ ] Test all pages at 375px width (iPhone SE)
- [ ] Touch targets minimum 44px ✓
- [ ] No hover-only interactions
- [ ] Mobile navigation tested thoroughly
- [ ] Forms work on mobile keyboards
- [ ] Images optimized for mobile data

#### Internet Connection
- [ ] PWA manifest configured ✓
- [ ] Service worker caching menu data (24h) ✓
- [ ] Offline fallback page functional ✓
- [ ] Error handling for network failures ✓
- [ ] Retry logic for failed requests ✓

#### Staff & Systems
- [ ] Staff has Square POS terminal or iPad with Square app
- [ ] Staff trained on:
  - [ ] Receiving online orders in Square POS
  - [ ] Updating order status (preparing → ready → completed)
  - [ ] Manual order entry for offline fallback
  - [ ] Handling customer inquiries
- [ ] POS offline fallback procedure documented
- [ ] Contact information for tech support available

## Build & Deploy

### Pre-Build Checks
- [ ] Run `npm run lint` - all errors fixed
- [ ] Run `npm run build` - build succeeds
- [ ] No TypeScript errors
- [ ] No ESLint warnings (critical)
- [ ] Environment variables configured in Vercel dashboard

### Vercel Deployment
- [ ] Project connected to GitHub repository
- [ ] Production environment configured
- [ ] Domain configured: `questpointcafe.com`
- [ ] DNS propagated (check with `nslookup`)
- [ ] SSL certificate active (auto via Vercel)
- [ ] Environment variables set in Vercel:
  - [ ] All production env vars from `.env.example`
  - [ ] No development/test credentials
  - [ ] Sensitive values encrypted

### Post-Deploy Verification
- [ ] Homepage loads correctly
- [ ] Menu page displays items
- [ ] Shop page displays products
- [ ] Events page displays events
- [ ] Cart functionality works
- [ ] Checkout flow completes
- [ ] Payment processing works (test with real card)
- [ ] Order confirmation email sent (when configured)
- [ ] Square POS receives test order

## Monitoring Setup

### Analytics
- [ ] Vercel Analytics enabled (automatic in production)
- [ ] Check analytics dashboard shows data
- [ ] Cookie consent banner appears for new visitors
- [ ] Privacy policy page accessible

### Error Tracking
- [ ] Sentry DSN configured
- [ ] Test error reporting (throw test error)
- [ ] Verify errors appear in Sentry dashboard
- [ ] Source maps uploaded correctly
- [ ] Sentry alerts configured (email/Slack)

### Performance
- [ ] Run Lighthouse audit
  - [ ] Performance score > 90
  - [ ] Accessibility score > 95
  - [ ] Best Practices score > 90
  - [ ] SEO score > 90
- [ ] Core Web Vitals within targets:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

### Service Health
- [ ] Supabase dashboard accessible
  - [ ] Monitor database size
  - [ ] Monitor bandwidth usage
  - [ ] Check API request counts
- [ ] Square dashboard accessible
  - [ ] Monitor payment success rate
  - [ ] Check webhook delivery status
  - [ ] Verify API rate limits not exceeded

## Launch Strategy (Spec Section 13.2)

### Soft Launch Phase (2-4 weeks)
- [ ] Enable for walk-in customers only
- [ ] QR codes printed and placed at tables
- [ ] Staff informs walk-in customers about app
- [ ] NOT advertised publicly yet
- [ ] Monitor for critical issues
- [ ] Collect user feedback
- [ ] Fix bugs as they arise

### Success Criteria Before Public Launch
- [ ] 10+ successful orders completed
- [ ] No critical bugs reported
- [ ] No payment failures
- [ ] Average page load < 2 seconds
- [ ] Mobile experience smooth
- [ ] Staff comfortable with system

### Public Launch
- [ ] Announce on social media
- [ ] Email notification to newsletter subscribers
- [ ] Discord announcement
- [ ] Update website with ordering instructions
- [ ] Press release (optional)
- [ ] Monitor traffic spike carefully

## Rollback Plan

If critical issues arise:

1. **Immediate**
   - [ ] Revert to previous Vercel deployment (one-click)
   - [ ] Post status update on social media
   - [ ] Email customers if orders affected

2. **Within 1 hour**
   - [ ] Investigate root cause in Sentry logs
   - [ ] Check Vercel function logs
   - [ ] Review recent commits

3. **Database**
   - [ ] Restore from Supabase backup if needed
   - [ ] Supabase has automatic daily backups
   - [ ] Point-in-time recovery available

4. **Communication**
   - [ ] Update Discord/social media every 30 minutes
   - [ ] Email affected customers
   - [ ] Post estimated resolution time

## Support Contacts

- **Vercel Support**: support@vercel.com
- **Supabase Support**: support@supabase.com
- **Square Support**: https://squareup.com/help
- **Sentry Support**: support@sentry.io
- **Developer**: [Your contact info]

## Notes

- Keep this checklist updated as new constraints are added
- Mark items as completed during deployment
- Document any deviations from spec in `ARCHITECTURE.md`
- All items must be checked before public launch
