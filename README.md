# Questpoint Cafe - Digital Platform

A modern web application for Questpoint Cafe, a gaming-themed coffee and boba
shop.

## Features

- 🍵 **Full Menu** - Browse 100+ drinks and food items with filtering and search
- 📅 **Events Calendar** - View and register for tournaments, socials, and
  launches
- 🛒 **Online Ordering** - Mobile ordering for pickup and dine-in
- 🎁 **Rewards Program** - Earn points on purchases, redeem for free items
- 📺 **Live Streaming** - Watch Twitch/YouTube streams of cafe events
- 🛍️ **Retail Shop** - TCG products, accessories, and merchandise

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Email, Google, Apple)
- **Payments:** Square Web Payments SDK
- **State:** Zustand
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Square Developer account (optional, for payments)

### 1. Clone and Install

```bash
git clone https://github.com/your-org/questpoint-platform.git
cd questpoint-platform
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API to get your keys
3. Run the migration in Supabase SQL Editor:
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run in SQL Editor
4. (Optional) Run seed data:
   - Copy contents of `supabase/seed.sql`
   - Paste and run in SQL Editor

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Square (optional - for payments)
NEXT_PUBLIC_SQUARE_APP_ID=your-square-app-id
NEXT_PUBLIC_SQUARE_LOCATION_ID=your-location-id
SQUARE_ACCESS_TOKEN=your-access-token
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
questpoint-platform/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page
│   │   ├── menu/           # Menu pages
│   │   ├── events/         # Events pages
│   │   ├── shop/           # Shop pages
│   │   ├── stream/         # Streaming page
│   │   ├── account/        # Account pages
│   │   ├── cart/           # Shopping cart
│   │   └── auth/           # Authentication pages
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   ├── layout/         # Layout components
│   │   └── features/       # Feature-specific components
│   ├── lib/
│   │   ├── supabase/       # Supabase client setup
│   │   └── utils/          # Utility functions
│   ├── stores/             # Zustand state stores
│   └── types/              # TypeScript types
├── supabase/
│   ├── migrations/         # SQL migrations
│   └── seed.sql            # Seed data
├── public/                 # Static assets
└── docs/                   # Documentation
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Database Commands

```bash
# Generate TypeScript types from Supabase
npm run db:types

# Push migrations (requires Supabase CLI)
npm run db:migrate
```

## Customization

### Brand Colors

Edit `tailwind.config.ts` to change the color scheme:

```ts
colors: {
  quest: {
    purple: '#4A148C',  // Primary
    gold: '#FFC107',    // Accent
    dark: '#1A1A1A',    // Background
    charcoal: '#2C2C2C', // Surface
    cream: '#F5F5DC',   // Text
  }
}
```

### Adding Menu Items

1. Go to Supabase Dashboard → Table Editor → `menu_items`
2. Add new rows with required fields:
   - `name`, `slug`, `price`, `category`
3. Optional: Add `description`, `image_url`, `allergens`, etc.

### Adding Events

1. Go to Supabase Dashboard → Table Editor → `events`
2. Add events with:
   - `title`, `slug`, `event_type`, `event_date`, `fee`
3. Set `is_recurring: true` and `recurrence_pattern` for weekly events

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting provider:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SQUARE_APP_ID` (if using payments)
- `NEXT_PUBLIC_SQUARE_LOCATION_ID` (if using payments)
- `SQUARE_ACCESS_TOKEN` (if using payments)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary to Questpoint Cafe.

---

Built with ❤️ for the gaming community.
