# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build (must pass before commits)
npm run start     # Start production server
npm run lint      # Run ESLint

# Note: There are NO tests configured yet
```

## High-Level Architecture

### Framework: Next.js 16 App Router + TypeScript

This is a **Next.js App Router** application (not Pages Router). All routes are in `src/app/` using the file-based routing convention:
- `src/app/page.tsx` = `/` (home)
- `src/app/menu/page.tsx` = `/menu`
- `src/app/api/auth/callback/route.ts` = API route

### Critical Pattern: Stub Services

**All third-party integrations are stubbed** and ready to be "activated" when franchise agreements are purchased. This is intentional MVP architecture:

```typescript
// src/services/stripe.ts - Payment processing (stubbed)
// src/services/tcgplayer.ts - TCG inventory (stubbed)
// src/services/homebase.ts - Workforce management (stubbed)
// src/lib/supabase/client.ts - Database & auth (stubbed)
// src/lib/supabase/server.ts - Server-side database (stubbed)
```

When implementing features that interact with these services:
1. Use the stub implementations which log to console
2. Follow the existing TypeScript interfaces
3. The stubs return proper type signatures so the app compiles and runs
4. Do NOT try to "fix" or implement these services unless explicitly asked

### Design Philosophy: Gaming-Themed, Not Gamified

From ARCHITECTURE.md:
- The gaming aesthetic is in **visual design, drink names, and branding**
- NOT in forcing RPG mechanics (no XP bars, character classes, or "quest logs")
- Professional enough for investors, fun enough for MTG players
- Copy should feel welcoming, not like a D&D campaign

**Wrong:** "Level up your Warrior class by completing daily quests!"
**Right:** "Earn points on every purchase. Redeem for free drinks."

## State Management

### Zustand Cart Store (src/store/cart-store.ts)

The shopping cart uses Zustand with persistence:

```typescript
import { useCartStore } from '@/store/cart-store';

// In a component
const { items, addItem, getTotal } = useCartStore();
```

**Key patterns:**
- State is persisted to localStorage as `questpoint-cart`
- Computed values are **functions** (e.g., `getTotal()`, not `total`)
- Cart items have unique generated IDs for customization tracking
- Tax rate is 8.25% (configurable constant)

## Component Architecture

### UI Components (src/components/ui/)

All UI components follow a **variant-based pattern**:

```typescript
// button.tsx example
<Button variant="gold" size="lg" isLoading={loading}>
  Click Me
</Button>

// Variants: 'gold' | 'purple' | 'ghost' | 'danger'
// Sizes: 'sm' | 'md' | 'lg'
```

Components use:
- `forwardRef` for ref forwarding
- `cn()` utility from `@/lib/utils` for className merging
- Lucide React for icons
- Custom Tailwind classes with `quest-*` prefix

### Layout Components (src/components/layout/)

- `Header` - Fixed top navigation with logo and search
- `Footer` - Desktop footer (hidden on mobile)
- `MobileNav` - Bottom navigation (mobile only, fixed)

Root layout (`src/app/layout.tsx`) orchestrates these with padding to avoid overlaps.

## Custom Tailwind Theme

The entire brand uses a custom color palette in `tailwind.config.ts`:

```typescript
// Primary colors
quest-purple      // #4A148C (primary brand color)
quest-gold        // #FFC107 (accent, CTAs)
quest-dark        // #1A1A1A (backgrounds)
quest-charcoal    // #2C2C2C (surface/cards)
quest-cream       // #F5F5DC (text)

// Both have shades: quest-purple-50 through quest-purple-900
```

**Custom utilities:**
- `bg-quest-gradient` - Purple to dark gradient
- `shadow-gold-glow` - Gold glow effect for buttons
- `font-fantasy` - Cinzel font for headers
- `animate-fade-in`, `animate-slide-up` - Custom animations

## Database Architecture

### Supabase Tables (see 001_initial_schema.sql)

Core tables (all stubbed currently):
- `profiles` - User accounts (extends auth.users)
- `menu_items` - Drinks and food
- `menu_customizations` - Size, milk, toppings options
- `events` - Tournaments, socials, launches
- `event_registrations` - User signups for events
- `orders` - Online orders
- `order_items` - Line items
- `products` - Retail TCG products
- `favorites` - User saved items
- `points_transactions` - Loyalty points ledger
- `rewards` - Redeemable rewards catalog

**RLS (Row Level Security)** is enabled. Users can only access their own:
- Profiles, orders, registrations, favorites, points
- Menu items and events are public read

## Path Aliases

```typescript
// tsconfig.json configures:
"@/*": ["./src/*"]

// So you can import:
import { Button } from '@/components/ui';
import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/lib/utils';
```

## Utility Functions (src/lib/utils.ts)

```typescript
cn(...classes)                          // Merge Tailwind classes
formatCurrency(amount: number)          // "$6.50"
formatDate(date, options?)              // "Jan 3, 2026" or custom
formatTime(date)                        // "3:45 PM"
isCafeOpen()                            // { isOpen, status, nextChange }
```

## Page Patterns

### Client vs Server Components

Most pages are **client components** (`'use client'`) because they:
- Use hooks (useState, useCartStore, etc.)
- Handle user interactions
- Need browser APIs

API routes are server-only (route.ts files in app/api/).

### Standard Page Structure

```typescript
'use client';

export default function MenuPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="page-enter"> {/* Custom animation class */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="section-title">Menu</h1>
        <p className="section-subtitle">Browse our drinks</p>
        {/* Content */}
      </section>
    </div>
  );
}
```

**Common CSS classes:**
- `page-enter` - Fade-in animation on route change
- `section-title` - Large fantasy font headings
- `section-subtitle` - Muted description text
- `max-w-7xl mx-auto px-4 sm:px-6` - Standard container

## Authentication Flow (Stubbed)

Supabase auth is stubbed but the UI flow is complete:
1. `src/app/auth/login/page.tsx` - Email/password and OAuth
2. `src/app/auth/register/page.tsx` - Sign up flow
3. `src/app/api/auth/callback/route.ts` - OAuth callback handler

The stub clients in `src/lib/supabase/` return proper types:

```typescript
const { error } = await supabase.auth.signInWithPassword({ email, password });
// error has AuthError type with .message property
```

## Important Constraints

1. **No real API calls** - All services are stubbed
2. **Tailwind v3** - Downgraded from v4 for stability
3. **No testing framework** - Tests not set up yet
4. **No database migrations** - Schema exists but Supabase not connected
5. **Build must pass** - TypeScript strict mode enabled

## When Adding Features

1. Check if a stub service exists for the integration you need
2. Use the existing component variants (don't create new button styles)
3. Follow the quest-* color palette (don't introduce new colors)
4. Keep copy professional and gaming-themed (not over-gamified)
5. Use the cart store for any e-commerce state
6. Mobile-first responsive design (test at 375px width)

## Common Gotchas

1. **formatDate signature** - Takes optional second parameter for Intl options
2. **Cart store methods** - Are functions, not computed properties (call `getTotal()`)
3. **Button disabled** - Use `!!value` to coerce boolean | null to boolean
4. **Import paths** - Must use `@/` alias, not relative paths for cross-directory imports
5. **Supabase clients** - Use `client.ts` for browser, `server.ts` for API routes
