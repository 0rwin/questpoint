# Questpoint Cafe Digital Platform

## Architecture & Specification Document

**Version:** 2.0\
**Last Updated:** January 2, 2026\
**Status:** Active Development

---

## Executive Summary

Questpoint Cafe's digital platform is a unified web application and progressive
web app (PWA) that serves as the digital hub for all customer interactions. It
replaces the over-gamified prototype with a clean, professional experience that
maintains the gaming cafe's personality through branding rather than forced RPG
mechanics.

---

## Design Philosophy

### Core Principles

1. **Gaming-Themed, Not Gamified**
   - The fantasy/gaming aesthetic lives in visual design, drink names, and copy
   - NOT in forcing customers to "level up" or choose character classes
   - A remote worker getting coffee shouldn't feel like they're playing D&D

2. **Functionality First**
   - Every feature must serve a real business need
   - Loyalty = simple points system (not XP bars)
   - Account = order history, saved favorites, rewards (not "Quest Log")

3. **Professional with Personality**
   - Clean enough for investors and partnerships
   - Fun enough for the MTG crowd
   - Accessible to all demographics

### Visual Identity

| Element       | Specification              |
| ------------- | -------------------------- |
| Primary Color | `#4A148C` (Quest Purple)   |
| Accent Color  | `#FFC107` (Quest Gold)     |
| Background    | `#1A1A1A` (Quest Dark)     |
| Surface       | `#2C2C2C` (Quest Charcoal) |
| Text Primary  | `#F5F5DC` (Quest Cream)    |
| Display Font  | Cinzel (fantasy headers)   |
| Body Font     | DM Sans (readable, modern) |

---

## Feature Specification

### Phase 1: Core Platform (MVP)

#### 1.1 Home Page

- Hero section with cafe imagery
- Current status (open/closed with hours)
- Quick links: Menu, Events, Order
- Featured items / seasonal specials
- Location with map embed

#### 1.2 Full Menu

- **Categories:** Coffee, Boba, Smoothies, Food, Seasonal
- **Item Details:** Name, description, price, image, allergens, customizations
- **Filtering:** By category, dietary restrictions, availability
- **Search:** Full-text search across items
- **Data Source:** Supabase `menu_items` table

#### 1.3 Events Calendar

- **Event Types:** Tournament, Social, Launch, Private
- **Features:**
  - View upcoming events
  - Event details (date, time, fee, description, capacity)
  - Registration (requires account)
  - Add to calendar (Google/Apple/Outlook)
- **Data Source:** Supabase `events` + `event_registrations` tables

#### 1.4 User Accounts

- **Auth Methods:** Email/password, Google, Apple
- **Profile Data:** Display name, email, phone (optional)
- **Account Features:**
  - View points balance
  - Order history
  - Saved favorite items
  - Event registrations
  - Notification preferences

#### 1.5 Loyalty Program (Simplified)

- **Earning:** 1 point per $1 spent
- **Bonus Points:**
  - Birthday: 100 bonus points
  - Event attendance: 50 points
  - Referral: 200 points (both parties)
- **Redemption Tiers:**
  - 250 pts: Free boba topping
  - 500 pts: Free pastry
  - 1000 pts: Free drink (any size)
  - 2500 pts: $10 off retail

### Phase 2: Commerce

#### 2.1 Online Ordering

- **Order Types:**
  - Pickup (ready in X minutes)
  - Dine-in (table number)
- **Flow:**
  1. Browse menu / select items
  2. Customize (size, milk, toppings, etc.)
  3. Add to cart
  4. Review order
  5. Checkout (pay with Square)
  6. Receive confirmation + estimated time
  7. Track order status
- **Integration:** Square Web Payments SDK

#### 2.2 Retail Shop

- **Categories:** TCG Products, Accessories, Merch
- **Features:**
  - Product catalog with images
  - Inventory tracking (in stock / low stock / out)
  - Pre-orders for upcoming releases
  - Pickup only (no shipping initially)
- **Integration:** Square for inventory sync

### Phase 3: Community

#### 3.1 Stream Integration

- **Live Stream:** Embed Twitch/YouTube player
- **Schedule:** Upcoming stream times
- **VOD Library:** Past highlights and clips
- **Chat:** Link to Twitch/YouTube chat (not custom)

#### 3.2 Community Hub

- **Approach:** Discord integration rather than custom chat
- **Features:**
  - Discord server invite widget
  - Event announcements feed (pulled from Discord)
  - "Who's at the cafe" presence (opt-in)
- **Rationale:** Discord already handles moderation, is purpose-built

### Phase 4: Advanced

#### 4.1 Tournament Management

- **Features:**
  - Swiss pairing automation
  - Bracket display
  - Results entry
  - Prize distribution tracking
- **Integration:** Companion app for TOs (Tournament Organizers)

#### 4.2 Table Reservations

- **Features:**
  - Reserve gaming tables in advance
  - Time slots (2-hour blocks)
  - Deposit for no-shows
- **Use Case:** Friday Night Magic, private play groups

---

## Technical Architecture

### Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│  Next.js 14 (App Router) + React 18 + TypeScript        │
│  Tailwind CSS + Framer Motion                           │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      BACKEND                             │
│  Next.js API Routes + Server Actions                    │
│  Supabase Client (database + auth + realtime)           │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      DATABASE                            │
│  Supabase (PostgreSQL)                                  │
│  - Auth (built-in)                                      │
│  - Storage (images)                                     │
│  - Realtime (order updates)                             │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   INTEGRATIONS                           │
│  Square (payments, POS sync, inventory)                 │
│  Twitch/YouTube (streaming)                             │
│  Discord (community)                                    │
│  Google Maps (location)                                 │
└─────────────────────────────────────────────────────────┘
```

### File Structure

```
questpoint-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (main)/            # Main layout group
│   │   │   ├── page.tsx       # Home
│   │   │   ├── menu/
│   │   │   │   ├── page.tsx   # Menu listing
│   │   │   │   └── [id]/page.tsx  # Item detail
│   │   │   ├── events/
│   │   │   │   ├── page.tsx   # Events calendar
│   │   │   │   └── [id]/page.tsx  # Event detail
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx   # Retail products
│   │   │   │   └── [id]/page.tsx  # Product detail
│   │   │   ├── stream/
│   │   │   │   └── page.tsx   # Live stream + VODs
│   │   │   ├── account/
│   │   │   │   ├── page.tsx   # Account overview
│   │   │   │   ├── orders/page.tsx
│   │   │   │   ├── rewards/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   └── cart/
│   │   │       └── page.tsx   # Shopping cart
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── callback/route.ts
│   │   ├── api/
│   │   │   ├── orders/route.ts
│   │   │   ├── events/route.ts
│   │   │   └── webhooks/
│   │   │       └── square/route.ts
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   └── ...
│   │   ├── layout/            # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── sidebar.tsx
│   │   └── features/          # Feature-specific
│   │       ├── menu/
│   │       │   ├── menu-grid.tsx
│   │       │   ├── menu-item-card.tsx
│   │       │   └── menu-filters.tsx
│   │       ├── cart/
│   │       │   ├── cart-drawer.tsx
│   │       │   ├── cart-item.tsx
│   │       │   └── cart-summary.tsx
│   │       ├── events/
│   │       │   ├── event-card.tsx
│   │       │   └── event-calendar.tsx
│   │       ├── account/
│   │       │   ├── points-display.tsx
│   │       │   └── order-history.tsx
│   │       └── stream/
│   │           ├── live-player.tsx
│   │           └── vod-grid.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts      # Browser client
│   │   │   ├── server.ts      # Server client
│   │   │   └── middleware.ts  # Auth middleware
│   │   ├── square/
│   │   │   ├── client.ts
│   │   │   └── payments.ts
│   │   └── utils/
│   │       ├── cn.ts          # classnames helper
│   │       ├── format.ts      # formatters
│   │       └── constants.ts
│   │
│   ├── hooks/
│   │   ├── use-cart.ts
│   │   ├── use-user.ts
│   │   ├── use-menu.ts
│   │   └── use-events.ts
│   │
│   ├── types/
│   │   ├── database.ts        # Supabase generated types
│   │   ├── menu.ts
│   │   ├── events.ts
│   │   ├── orders.ts
│   │   └── user.ts
│   │
│   └── stores/
│       └── cart-store.ts      # Zustand cart state
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── supabase/
│   ├── migrations/            # SQL migrations
│   └── seed.sql              # Initial data
│
├── docs/
│   ├── ARCHITECTURE.md       # This file
│   ├── API.md                # API documentation
│   └── DEPLOYMENT.md         # Deployment guide
│
├── .env.local                # Local environment
├── .env.example              # Example env file
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Schema

### Core Tables

```sql
-- User profiles (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  phone TEXT,
  points INTEGER DEFAULT 0,
  lifetime_points INTEGER DEFAULT 0,
  birthday DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('coffee', 'boba', 'smoothie', 'food', 'specialty')),
  subcategory TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_seasonal BOOLEAN DEFAULT FALSE,
  allergens TEXT[],
  caffeine_level TEXT CHECK (caffeine_level IN ('none', 'low', 'medium', 'high')),
  calories INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu item customizations
CREATE TABLE menu_customizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('size', 'milk', 'sweetness', 'topping', 'extra')),
  options JSONB NOT NULL, -- [{name: "Small", price_modifier: 0}, ...]
  is_required BOOLEAN DEFAULT FALSE,
  max_selections INTEGER DEFAULT 1
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('tournament', 'social', 'launch', 'private', 'recurring')),
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  fee DECIMAL(10,2) DEFAULT 0,
  max_capacity INTEGER,
  current_registrations INTEGER DEFAULT 0,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT, -- 'weekly:friday', 'monthly:first-saturday'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'waitlist', 'cancelled', 'attended')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  notes TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  order_type TEXT NOT NULL CHECK (order_type IN ('pickup', 'dine_in')),
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  points_earned INTEGER DEFAULT 0,
  points_redeemed INTEGER DEFAULT 0,
  estimated_ready_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  square_order_id TEXT,
  square_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id),
  name TEXT NOT NULL, -- Denormalized for history
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  customizations JSONB, -- Selected options
  special_instructions TEXT,
  subtotal DECIMAL(10,2) NOT NULL
);

-- Retail products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tcg', 'accessories', 'dice', 'merch', 'snacks')),
  subcategory TEXT,
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_preorder BOOLEAN DEFAULT FALSE,
  release_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, menu_item_id)
);

-- Points transactions
CREATE TABLE points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- Positive for earn, negative for redeem
  type TEXT NOT NULL CHECK (type IN ('purchase', 'redemption', 'bonus', 'referral', 'event', 'adjustment')),
  description TEXT,
  order_id UUID REFERENCES orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rewards catalog
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('free_item', 'discount', 'percentage_off')),
  reward_value JSONB NOT NULL, -- {item_id: '...'} or {discount: 10.00} or {percentage: 15}
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- Stream schedule
CREATE TABLE stream_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  stream_type TEXT CHECK (stream_type IN ('mtg', 'console', 'board_game', 'special')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 120,
  platform TEXT DEFAULT 'twitch',
  is_live BOOLEAN DEFAULT FALSE
);
```

### Row Level Security (RLS)

```sql
-- Profiles: Users can read/update their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Orders: Users can view their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Menu items: Public read
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (true);

-- Events: Public read
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

-- Event registrations: Users can manage their own
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own registrations" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" ON event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## API Endpoints

### Menu

| Method | Endpoint                    | Description                         |
| ------ | --------------------------- | ----------------------------------- |
| GET    | `/api/menu`                 | Get all menu items                  |
| GET    | `/api/menu?category=coffee` | Filter by category                  |
| GET    | `/api/menu/[slug]`          | Get single item with customizations |
| GET    | `/api/menu/featured`        | Get featured items                  |

### Events

| Method | Endpoint                    | Description         |
| ------ | --------------------------- | ------------------- |
| GET    | `/api/events`               | Get upcoming events |
| GET    | `/api/events/[slug]`        | Get event details   |
| POST   | `/api/events/[id]/register` | Register for event  |
| DELETE | `/api/events/[id]/register` | Cancel registration |

### Orders

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| POST   | `/api/orders`             | Create new order           |
| GET    | `/api/orders`             | Get user's orders          |
| GET    | `/api/orders/[id]`        | Get order details          |
| GET    | `/api/orders/[id]/status` | Get order status (polling) |

### User

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/api/user/profile`        | Get current user profile     |
| PATCH  | `/api/user/profile`        | Update profile               |
| GET    | `/api/user/points`         | Get points balance + history |
| POST   | `/api/user/redeem`         | Redeem reward                |
| GET    | `/api/user/favorites`      | Get favorited items          |
| POST   | `/api/user/favorites`      | Add favorite                 |
| DELETE | `/api/user/favorites/[id]` | Remove favorite              |

---

## User Flows

### 1. First-Time Visitor → Customer

```
Landing Page
    │
    ├─→ Browse Menu (no account needed)
    │       │
    │       └─→ View Item Details
    │
    ├─→ View Events Calendar
    │
    └─→ Want to Order / Register
            │
            └─→ Create Account
                    │
                    ├─→ Email/Password
                    ├─→ Google Sign-In
                    └─→ Apple Sign-In
                            │
                            └─→ Complete Order / Register
```

### 2. Returning Customer → Order

```
Login
    │
    └─→ Home (personalized)
            │
            ├─→ "Order Again" (previous orders)
            │       │
            │       └─→ Quick Reorder
            │
            └─→ Browse Menu
                    │
                    └─→ Add to Cart
                            │
                            └─→ Customize Item
                                    │
                                    └─→ View Cart
                                            │
                                            └─→ Checkout
                                                    │
                                                    ├─→ Apply Points
                                                    └─→ Pay (Square)
                                                            │
                                                            └─→ Order Confirmation
                                                                    │
                                                                    └─→ Track Status
```

### 3. Event Registration

```
Events Calendar
    │
    └─→ View Event Details
            │
            ├─→ [Not Logged In] → Login/Register
            │
            └─→ [Logged In] → Register Button
                    │
                    ├─→ [Free Event] → Confirm Registration
                    │
                    └─→ [Paid Event] → Payment (Square)
                            │
                            └─→ Confirmation + Calendar Invite
```

---

## Deployment

### Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=https://questpointcafe.com
NEXT_PUBLIC_APP_NAME=Questpoint Cafe

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Square
NEXT_PUBLIC_SQUARE_APP_ID=xxx
NEXT_PUBLIC_SQUARE_LOCATION_ID=xxx
SQUARE_ACCESS_TOKEN=xxx

# Streaming
NEXT_PUBLIC_TWITCH_CHANNEL=questpointcafe
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=xxx
```

### Hosting

| Service  | Purpose         | Plan                         |
| -------- | --------------- | ---------------------------- |
| Vercel   | Frontend + API  | Pro ($20/mo)                 |
| Supabase | Database + Auth | Pro ($25/mo)                 |
| Square   | Payments        | Pay-as-you-go (2.6% + $0.10) |

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
    push:
        branches: [main]

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: "20"
            - run: npm ci
            - run: npm run lint
            - run: npm run build
            - uses: amondnet/vercel-action@v25
              with:
                  vercel-token: ${{ secrets.VERCEL_TOKEN }}
                  vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
                  vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
                  vercel-args: "--prod"
```

---

## Timeline

### Week 1-2: Foundation

- [x] Architecture document (this file)
- [ ] Project scaffold (Next.js + Tailwind)
- [ ] Supabase setup + migrations
- [ ] Component library (UI primitives)
- [ ] Layout components (header, nav, footer)

### Week 3-4: Core Features

- [ ] Home page
- [ ] Full menu (with filtering/search)
- [ ] Events calendar
- [ ] Authentication flow

### Week 5-6: Commerce

- [ ] Shopping cart
- [ ] Checkout flow
- [ ] Square integration
- [ ] Order status tracking

### Week 7-8: User Features

- [ ] Account dashboard
- [ ] Points/rewards system
- [ ] Order history
- [ ] Favorites

### Week 9-10: Polish

- [ ] Stream integration
- [ ] PWA configuration
- [ ] Performance optimization
- [ ] Testing

### Week 11-12: Launch

- [ ] Beta testing
- [ ] Bug fixes
- [ ] Production deployment
- [ ] Staff training

---

## Success Metrics

| Metric                  | Target (6 months)   |
| ----------------------- | ------------------- |
| Monthly Active Users    | 500+                |
| Online Orders           | 20% of total orders |
| Event Registration Rate | 80%+                |
| App Installs (PWA)      | 200+                |
| Customer Satisfaction   | 4.5+ stars          |
| Points Redemption Rate  | 40%+                |

---

## Appendix: Removed Features (From Original Prototype)

The following over-gamified features were intentionally removed:

| Feature                                          | Reason for Removal                     |
| ------------------------------------------------ | -------------------------------------- |
| Character levels (Level 12 Mage)                 | Alienates casual customers             |
| XP/Mana points                                   | Confusing; replaced with simple points |
| Character classes (Warrior/Guardian/Spellweaver) | No functional purpose                  |
| "Quest Log" naming                               | Replaced with "My Account"             |
| "Alchemist's Menu"                               | Replaced with "Menu"                   |
| "Event Codex"                                    | Replaced with "Events"                 |

The gaming theme is retained through:

- Drink names (Black Lotus Latte, Mana Potion Boba)
- Visual design (purple/gold palette, fantasy typography)
- Event names (Friday Night Magic, Midnight Launch)
- Marketing copy ("Your Quest Begins Here")
