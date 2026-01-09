# Testing Guide - Questpoint Cafe

## Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Feature Flags System (Admin Settings)

### Accessing Admin Settings

Navigate to: **http://localhost:3000/admin/settings**

### Feature Flags Available

The feature flag system controls which features are enabled/disabled:

- **MENU_BROWSING** (Always enabled) - Public menu viewing
- **ORDERING_ENABLED** (Default: OFF) - Enable "Add to Cart" buttons
- **EVENTS_ENABLED** (Default: OFF) - Event registration
- **LOYALTY_ENABLED** (Default: OFF) - Points and rewards
- **RETAIL_ENABLED** (Default: OFF) - TCG product sales
- **STREAMING_ENABLED** (Default: OFF) - Live stream display
- **SUPABASE_ENABLED** (Default: OFF) - Database connection
- **SQUARE_PAYMENTS_ENABLED** (Default: OFF) - Payment processing
- And more...

### Testing the System

1. **Enable Ordering:**
   - Go to Admin Settings
   - Toggle "Online Ordering" to ON
   - Click "Save Changes" (page will reload)
   - Visit the Menu page - you should now see "Add to Cart" buttons

2. **Disable Ordering:**
   - Return to Admin Settings
   - Toggle "Online Ordering" to OFF
   - Save Changes
   - Menu cards now show "View Details →" instead of cart buttons

---

## Menu Browsing (Section 3.1) ✅ COMPLETED

### Features Implemented

#### 1. Menu Display
- **URL:** http://localhost:3000/menu
- Browse 25 mock menu items across 5 categories
- Responsive grid layout (1 column mobile, 3 columns desktop)
- Image lazy loading
- Featured items section

#### 2. Category Filtering
- Categories: All, Coffee, Boba, Smoothies, Food, Specialty
- Click any category to filter items
- Active category highlighted in gold

#### 3. Search (Substring Matching)
- Type in the search bar to filter items
- Searches item names and descriptions
- Example: Search "lat" finds "Latte" items
- Real-time results as you type

#### 4. Dietary Filters
- Click "Filters" button to expand dietary options
- Available filters:
  - 🌱 Vegan
  - 🥬 Vegetarian
  - 🌾 Gluten-Free
  - 🥛 Dairy-Free
- Select multiple filters (items must match ALL selected)
- Filter badge shows active filter count

#### 5. Allergen Information
- Each menu card shows allergen count
- Hover over "⚠️ X allergens" to see details
- Full allergen list on item detail page

#### 6. Nutrition Display
- Calorie count displayed on each card
- Full nutrition facts on detail page
- Caffeine level indicator (color-coded):
  - 🔴 High (red)
  - 🟡 Medium (yellow)
  - 🟢 Low (green)

#### 7. Pagination
- 20 items per page (spec requirement)
- Page numbers at bottom
- Previous/Next buttons
- Auto-reset to page 1 when filters change

#### 8. Item Detail Pages
- Click any item card to view full details
- **URL pattern:** `/menu/[slug]`
- Example: http://localhost:3000/menu/mana-potion-boba
- Features:
  - Full-screen hero image
  - Complete description
  - Nutrition facts sidebar
  - Allergen warnings
  - Dietary tags
  - Related items (same category)

#### 9. Add to Cart (when ORDERING_ENABLED)
- **Quick Add:** Add item with default options
- **Customize & Add:** Open customization modal
- Customization options (mock data):
  - Size: Small/Medium/Large (price modifiers)
  - Milk: Whole/2%/Oat/Almond/Soy (+$0.50 for alt milks)
  - Sweetness: 0%/25%/50%/75%/100%
  - Toppings: Boba/Jelly/Foam/etc. (extra charges)
  - Special instructions (200 char max)
  - Quantity selector (1-10)
- Real-time price calculation in modal

### Testing Checklist

- [ ] Menu page loads with 25 items
- [ ] Filter by category works
- [ ] Search finds items by name/description
- [ ] Dietary filters work (vegan, vegetarian, etc.)
- [ ] Pagination shows correct pages
- [ ] Item detail page loads when clicking an item
- [ ] Allergen warnings display correctly
- [ ] Nutrition info shows on detail page
- [ ] Quick Add works (when ordering enabled)
- [ ] Customization modal opens and works
- [ ] Price updates as customizations change
- [ ] Items add to cart successfully

---

## Mock Data

All menu items are currently using **mock data** from:
- `src/data/menu-mock.ts` - 25 menu items with full details

When **SUPABASE_ENABLED** is turned on, the app will query the database instead of using mocks.

---

## Price Validation

Per spec requirement, all prices follow **half-dollar increments**:
- ✅ Valid: $5.00, $5.50, $6.00, $6.50
- ❌ Invalid: $5.25, $5.75

All mock items follow this rule.

---

## Cart System

The shopping cart uses **Zustand** with **localStorage persistence**:
- Cart state saved as `questpoint-cart`
- Persists across page reloads
- Accessible from any page
- Tax rate: 8.25%

### Testing Cart

1. Enable ordering in Admin Settings
2. Add items to cart from menu
3. Refresh the page
4. Cart should still have items (persisted)

---

## Feature Flag Integration

Every feature respects the feature flag system:

- **Menu Browsing** always works (public access)
- **Add to Cart buttons** only show when `ORDERING_ENABLED = true`
- **Checkout flow** requires `ORDERING_ENABLED` and `SQUARE_PAYMENTS_ENABLED`
- Future features will check their respective flags

---

## Development Notes

### No Backend Yet
All integrations are **stubbed**:
- ❌ Supabase (database) - using mock data
- ❌ Square (payments) - stub only
- ❌ Authentication - UI complete, no auth server

### When to Enable Supabase
Once you configure Supabase:
1. Add credentials to `.env.local`
2. Enable `SUPABASE_ENABLED` in Admin Settings
3. App will switch from mock data to real database queries

### Building for Production

```bash
npm run build
npm run start
```

Feature flags persist in browser localStorage, so each user/franchise can configure their own settings.

---

---

## Shopping Cart (Section 3.3) ✅ COMPLETED

### Features Implemented

#### 1. Cart Page
- **URL:** http://localhost:3000/cart
- Full cart display with item images and details
- Order type selector (Pickup vs Dine-in)
- Promo code input (UI ready, backend needed)
- Points redemption (UI ready, loyalty system needed)
- Order summary with subtotal, tax, total

#### 2. Cart Staleness Detection
- Automatic check on cart page load
- Detects:
  - Removed menu items
  - Price changes
  - Unavailable items
- Warning modal shows all changes
- Per-item decision: "Keep" or "Remove"
- "Accept All Changes" button

#### 3. Item Management
- Quantity adjustment (+/- buttons)
- Max quantity: 10 per item for food/drinks
- Disabled states when limits reached
- Edit customizations (customizable items only)
  - Opens customization modal
  - Replaces item in cart with new version
- Remove item button
- Clear entire cart

#### 4. Large Order Warning
- Triggers when >10 food/drink items total
- Yellow banner: "Large order! Estimated prep time: 30-45 minutes"
- Soft warning (no blocking)

#### 5. Empty Cart State
- Clean UI with cart icon
- "Browse Menu" CTA button
- Centered, friendly message

#### 6. Cart Badge (Header)
- Shows total item count
- Appears in header cart icon
- Live updates as items added/removed
- Gold badge with pulsing animation
- Shows "9+" when count exceeds 9

#### 7. Persistence
- Cart survives page refreshes (localStorage)
- Stores: items, order type
- Computed values calculated on demand

### Testing Checklist

- [ ] Add items to cart from menu
- [ ] Cart badge appears in header with correct count
- [ ] Cart page shows all items with details
- [ ] Quantity +/- buttons work (max 10)
- [ ] Edit button opens customization modal
- [ ] Remove item button works
- [ ] Clear cart removes all items
- [ ] Empty cart shows proper state
- [ ] Large order warning appears after 10 items
- [ ] Cart persists after page refresh
- [ ] Order type toggle works (Pickup/Dine-in)
- [ ] Tax calculated at 8.25%
- [ ] Total updates when items change

### Cart Staleness Testing

To test cart staleness:
1. Add items to cart
2. Manually edit `src/data/menu-mock.ts`:
   - Change a price
   - Set `isAvailable: false` on an item
   - Remove an item from the array
3. Refresh the cart page
4. Modal should appear showing changes
5. Choose to keep or remove each item

---

---

## Checkout Flow (Section 3.4) ✅ COMPLETED

### Features Implemented

#### 1. Checkout Page
- **URL:** http://localhost:3000/checkout
- Full order summary with item images
- Order type confirmation (Pickup/Dine-in)
- Table number input for dine-in orders
- Estimated ready time display
- Points redemption system
- Tipping interface
- Payment form (stubbed Square SDK)
- Save card option (explicit opt-in)

#### 2. Guest User Redirect
- Checks if user is guest on page load
- Redirects to `/auth/login?redirect=/checkout`
- Preserves cart during auth flow
- Returns to checkout after login

#### 3. Points Auto-Apply Prompt (spec lines 215-220)
- Modal appears automatically if user has ≥100 points
- Shows potential savings
- "Your points can save you $X. Apply discount?"
- User can accept or decline
- Points locked after decision
- Can manually toggle points on/off before payment

#### 4. Tipping Interface (spec lines 200-202)
- Pre-payment tip selection
- Suggested amounts: 15%, 18%, 20%
- Custom tip amount input
- Shows calculated tip amount
- Tips pooled across all staff
- Note about distribution (weekly cash, paychecks for electronic)

#### 5. Payment Integration (Stubbed)
- Square Web Payments SDK placeholder
- Shows where payment form will load
- "Save card for future orders" checkbox
- Square Customer Vault opt-in
- Feature flag controlled (`SQUARE_PAYMENTS_ENABLED`)
- When disabled: Shows admin settings link

#### 6. Payment Processing
- **Payment-first approach** (spec line 208)
- Step 1: Process Square payment
- Step 2: Only create order after payment succeeds
- Prevents orphaned database records
- Generates unique order number: `QP-YYYYMMDD-NNN`
- 2-second processing simulation
- 10% chance of failure (for testing error handling)

#### 7. Order Confirmation Page
- **URL:** `/orders/[orderNumber]`
- Success checkmark animation
- Order number display
- Email/SMS/push confirmation message
- Estimated ready time countdown
- Full order details with customizations
- Payment summary breakdown
- Points earned badge
- Actions: "Back to Home", "View All Orders"
- Share receipt and download PDF options
- Help text with contact info

#### 8. Order API Endpoint
- **POST /api/orders**
- Creates order after successful payment
- Validates required fields
- Generates unique order number
- Calculates estimated ready time
- Returns order object with ID and details
- Stub implementation (will connect to Supabase)

#### 9. Points Calculation
- Points earned: `Math.floor(subtotal)` (spec line 211)
- Example: $20.50 order = 20 points
- Points to dollars: 100 points = $1.00
- Max redemption: lesser of (user points, order total * 100)

#### 10. Split Payments (spec lines 222-226)
- User applies points discount first
- Remainder charged to card
- Example: $25 order, use 1000 points ($10 off), pay $15 on card
- Both amounts shown in order summary

### Testing Checklist

- [ ] Navigate to checkout from cart
- [ ] Guest users redirected to login
- [ ] Order type shows correctly (Pickup/Dine-in)
- [ ] Table number input appears for dine-in
- [ ] Points prompt modal appears
- [ ] Accept/decline points works
- [ ] Tip percentages calculate correctly
- [ ] Custom tip input works
- [ ] Payment processing shows 2-second loading
- [ ] Redirects to confirmation page after success
- [ ] Order number displays correctly
- [ ] Points earned shown on confirmation
- [ ] All order items appear with customizations
- [ ] Payment summary matches cart totals

### Mock Data

**Test User:**
```javascript
MOCK_USER = {
  id: 'user_123',
  email: 'customer@example.com',
  name: 'John Doe',
  points: 1250,
  isGuest: false, // Set to true to test redirect
}
```

**Test Scenarios:**
1. **With Points:** User has 1250 points
   - Order $25 → Can use up to 1250 points ($12.50 off)
   - Prompt shows: "Your points can save you $12.50"

2. **Guest User:** Set `isGuest: true`
   - Immediately redirects to login
   - Preserves cart items

3. **Payment Failure:** 10% random chance
   - Shows error alert
   - Stays on checkout page
   - Cart preserved

4. **Tipping:**
   - 15% on $20 = $3.00
   - 18% on $20 = $3.60
   - 20% on $20 = $4.00
   - Custom: Enter any amount

---

---

## Order Tracking (Section 3.5) ✅ COMPLETED

### Features Implemented

#### 1. Order Status Page
- **URL:** `/orders/[orderNumber]`
- Example: http://localhost:3000/orders/QP-20260107-001
- Full order details with item images and customizations
- Real-time status timeline
- Payment summary breakdown
- Points earned display

#### 2. Real-Time Status Updates (Stubbed)
- Automatic status progression (demo mode)
- Updates every 20 seconds: Confirmed → Preparing → Ready → Completed
- Visual timeline with animated status indicators
- Will use Supabase Realtime in production

#### 3. Order Modification Window
- 2-minute window after order placement
- Live countdown timer (MM:SS format)
- "Edit Order" button during modification window
- After 2 minutes: Shows "Call us to make changes"
- Prevents modifications once order enters preparation

#### 4. Order Timeout Notifications
- Automatically detects when order exceeds estimated ready time
- Yellow warning banner appears when delayed
- Shows minutes delayed with helpful message
- Provides contact phone number for assistance
- Only shows for active orders (not completed or ready)

#### 5. Order History
- **URL:** http://localhost:3000/account/orders
- Filter tabs: All Orders, Active, Completed
- Order card previews with status badges
- Shows order date, type, items, and total
- Click any order to view full details

#### 6. Reorder Functionality
- One-click reorder button on order details
- Adds all items back to cart with original customizations
- Preserves special instructions
- Returns to cart page for review

### Testing Checklist

- [ ] Navigate to order confirmation after checkout
- [ ] Status timeline displays correctly
- [ ] Modification window countdown works
- [ ] Edit button appears in first 2 minutes
- [ ] "Call us" message appears after 2 minutes
- [ ] Timeout notification appears when order delayed
- [ ] Delay time calculates correctly
- [ ] Reorder button adds items to cart
- [ ] Order history page shows all orders
- [ ] Filter tabs work (All/Active/Completed)
- [ ] Order details page loads from history

### Testing Timeout Notifications

To test the timeout notification:

1. Place an order through checkout
2. Go to the order details page
3. In the code, the `estimatedReadyAt` is set to `Date.now() + 15 * 60000` (15 minutes in future)
4. To test delayed orders, temporarily modify line 65 in `src/app/orders/[orderNumber]/page.tsx`:
   ```typescript
   // Change from:
   estimatedReadyAt: new Date(Date.now() + 15 * 60000).toISOString(),
   // To (for immediate timeout):
   estimatedReadyAt: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
   ```
5. Refresh the order page
6. Yellow timeout notification banner should appear
7. Shows "running about 5 minutes behind schedule"

---

---

## Event Management (Section 3.6) ✅ COMPLETED

### Features Implemented

#### 1. Event Calendar/Browse Page
- **URL:** http://localhost:3000/events
- Browse all upcoming events
- 8 mock events with full details
- Event types: Tournament, Social, Launch, Recurring, Private
- Filter by event type (All, Tournaments, Social, Launches)
- Event cards show:
  - Date and time (or recurrence pattern)
  - Event type badge
  - Description preview
  - Entry fee
  - Capacity and spots remaining
  - Location
  - Registration button

#### 2. Event Detail Pages
- **URL:** `/events/[slug]`
- Example: http://localhost:3000/events/friday-night-magic
- Features:
  - Hero image with featured badge
  - Full event description
  - Event type and recurring status
  - Date, time, and location info cards
  - Entry fee display
  - Capacity tracker with spots remaining
  - Prize support details
  - Requirements/what to bring checklist
  - Registration sidebar (sticky)

#### 3. Event Registration Flow
- Registration button on detail page
- Guest redirect to login with return URL
- Free events: One-click registration
- Paid events: Square payment integration (stubbed)
  - Shows "Payment will be processed via Square"
  - Requires SQUARE_PAYMENTS_ENABLED feature flag
- Registration confirmation with status
- Cancel registration option
- Payment status tracking (pending/paid/refunded)

#### 4. Capacity Management
- Max capacity setting per event
- Real-time registration count
- Spots remaining calculation
- Visual indicators:
  - Green: Plenty of spots
  - Yellow: 80%+ full (almost full warning)
  - Red: Full capacity reached
- "X spots left" messaging
- Registration disabled when full

#### 5. Waitlist System
- Automatically available when event reaches capacity
- "Join Waitlist" button replaces "Register" when full
- Waitlist registrations tracked separately
- Status badge: "Waitlist" on event cards
- Notification message: "We'll notify you if a spot opens"

#### 6. User's Registered Events
- **URL:** http://localhost:3000/account/events
- View all registered events
- Filter tabs: Upcoming, Past Events
- Event cards show:
  - Event image and details
  - Registration status (Registered/Waitlist/Attended)
  - Payment status (Paid badge for paid events)
  - Entry fee
  - Date, time, location
- Click through to event details
- Empty state with "Browse Events" CTA

#### 7. Recurring Events
- Support for weekly/monthly recurring events
- Recurrence pattern display (e.g., "Every Friday at 6:00 PM")
- 🔄 icon instead of date number
- Examples:
  - Friday Night Magic (Every Friday)
  - Board Game Social (Every Tuesday)
  - Commander League (Every Saturday)

#### 8. Event Types
- **Tournament**: Competitive events with prizes
  - Icon: Trophy
  - Color: Purple
  - Examples: FNM, League tournaments
- **Social**: Casual community events
  - Icon: Party Popper
  - Color: Gold
  - Examples: Board game nights, watch parties
- **Launch**: Product launches and releases
  - Icon: Sparkles
  - Color: Warning (yellow)
  - Examples: MTG set pre-releases
- **Recurring**: Regular weekly events
  - Icon: Calendar
  - Color: Ghost (gray)
- **Private**: Private bookings
  - Icon: Map Pin
  - Color: Ghost

### Testing Checklist

- [ ] Events page loads with all events
- [ ] Event type filters work
- [ ] Event cards display correctly
- [ ] Click event card navigates to details
- [ ] Event detail page shows all info
- [ ] Register button works for free events
- [ ] Register button requires payment for paid events
- [ ] Capacity tracker shows correct spots remaining
- [ ] Almost full warning appears at 80%
- [ ] Full events show "Join Waitlist" button
- [ ] Waitlist registration works
- [ ] Registered status displays correctly
- [ ] Cancel registration works
- [ ] My Events page shows registered events
- [ ] Upcoming/Past filter works
- [ ] Empty state displays when no events
- [ ] Recurring events display pattern correctly
- [ ] Guest users redirected to login

### Mock Data

**Test Events:**
- Friday Night Magic (Tournament, $10, 18/32 registered, Recurring)
- Midnight Launch: Duskmourn (Launch, $35, 42/48 - Almost Full!)
- Board Game Social (Social, Free, No capacity limit, Recurring)
- Commander League (Tournament, $5, 16/24, Recurring)
- Anime Watch Party (Social, Free, 22/30 registered)
- League of Legends Tournament (Tournament, $15, 30/40 registered)
- D&D One-Shot (Social, $5, 4/6 registered)
- Pokemon VGC Qualifier (Tournament, $20, 45/64 registered)

**Test User:**
- User has 2 registrations (FNM and Commander League)
- Both events show as "Paid" status

### Feature Flag Integration

Event registration requires:
- `EVENTS_ENABLED = true` (to show registration buttons)
- `SQUARE_PAYMENTS_ENABLED = true` (for paid events only)

If EVENTS_ENABLED is off:
- Yellow warning banner on event details
- Link to Admin Settings to enable

### Testing Waitlist

To test the waitlist feature:

1. Find an almost-full event (e.g., Midnight Launch: 42/48)
2. Temporarily edit `src/data/events-mock.ts` to set `currentRegistrations: 48`
3. Refresh event details page
4. "Register" button should change to "Join Waitlist"
5. Capacity card should show "Event is full" in red
6. Click "Join Waitlist" - registration succeeds with waitlist status
7. My Events page shows "Waitlist" badge

---

---

## Loyalty Program (Section 3.7) ✅ COMPLETED

### Features Implemented

#### 1. Rewards Catalog
- **URL:** http://localhost:3000/account/rewards
- 10 different rewards across 3 types:
  - **Free Items**: Coffee, boba, specialty drinks, food
  - **Discounts**: $5 off, $10 off, free event entry
  - **Percentage Off**: 15% off, 25% off entire order
- Points required range from 100 to 750 points
- Visual reward cards with images
- "Can afford" vs "locked" states
- Redeem button functionality

#### 2. Points Summary Dashboard
- Current points balance (large, prominent display)
- Lifetime points earned
- Total points redeemed
- Visual breakdown with icons and colors

#### 3. Points Transaction History
- Complete transaction log
- Transaction types:
  - **Purchase**: Earned from orders (1 point per $1)
  - **Event**: Attendance bonuses (50 points per event)
  - **Bonus**: Birthday bonuses (100 points)
  - **Referral**: Friend referrals (200 points both parties)
  - **Redemption**: Points spent on rewards (negative)
  - **Adjustment**: Manual adjustments
- Timestamps and descriptions
- Color-coded amounts (green for earned, red for redeemed)
- Badge indicators for transaction type

#### 4. Redemption Flow
- One-click redemption from catalog
- Points balance validation
- Confirmation messages
- Reward code delivery simulation
- Requires LOYALTY_ENABLED feature flag

#### 5. Birthday Bonus System
- Automatic birthday detection (checks current month)
- 100 point birthday bonus
- Banner notification when eligible
- "Claim Birthday Bonus" button
- One-time per year restriction
- Already-claimed tracking

#### 6. How to Earn Points
- **Purchases**: 1 point per $1 spent (auto-calculated at checkout)
- **Event Attendance**: 50 points per event attended
- **Birthday**: 100 bonus points annually
- **Referrals**: 200 points for both referrer and friend
- Info card explaining all earning methods

#### 7. Account Overview Integration
- Points balance on account dashboard
- Progress bar to next reward
- Quick reward preview (4 rewards)
- "Rewards & Points" in account menu
- Link to full rewards catalog
- "Earn More Points" tips sidebar

#### 8. Reward Types
- **Free Item** (Coffee icon, Purple):
  - Free small coffee (100 pts)
  - Free boba drink (200 pts)
  - Free specialty drink (300 pts)
  - Free food item (350 pts)
- **Discount** (Tag icon, Gold):
  - $5 off $15+ (250 pts)
  - $10 off $30+ (500 pts)
  - Free event entry (600 pts)
- **Percentage Off** (Percent icon, Green):
  - 15% off entire order (400 pts)
  - 25% off entire order (750 pts)

### Testing Checklist

- [ ] Rewards page loads with all rewards
- [ ] Points summary displays correctly
- [ ] Can afford vs locked rewards show different states
- [ ] Redeem button works for affordable rewards
- [ ] Redemption confirmation appears
- [ ] Transaction history tab shows all transactions
- [ ] Transactions sorted by date (newest first)
- [ ] Transaction types display correct badges
- [ ] Positive amounts show in green
- [ ] Negative amounts show in red
- [ ] Birthday bonus banner appears (January birthday)
- [ ] Claim birthday bonus button works
- [ ] "How to Earn Points" section displays
- [ ] Account page shows points balance
- [ ] Account page has "Rewards & Points" menu item
- [ ] Progress bar to next reward works
- [ ] Reward preview cards clickable

### Mock Data

**Test User:**
```javascript
MOCK_USER = {
  id: 'user_123',
  email: 'customer@example.com',
  name: 'John Doe',
  birthday: new Date('1995-01-15'), // January birthday
}
```

**Points Summary:**
- Current Balance: 375 points (calculated from transactions)
- Lifetime Earned: 475 points
- Total Redeemed: 100 points

**Transaction History (8 transactions):**
1. +100 pts - Birthday bonus (Jan 1)
2. +25 pts - Purchase order #001 (Jan 2)
3. +50 pts - Event attendance: FNM (Jan 3)
4. +32 pts - Purchase order #012 (Jan 4)
5. -100 pts - Redeemed: Free Small Coffee (Jan 5)
6. +200 pts - Referral bonus (Jan 6)
7. +18 pts - Purchase order #005 (Jan 7)
8. +50 pts - Event attendance: Commander League (Jan 7)

**Rewards Catalog (10 rewards):**
- 100 pts: Free Small Coffee ✅ Can afford
- 200 pts: Free Boba Drink ✅ Can afford
- 250 pts: $5 Off Purchase ✅ Can afford
- 300 pts: Free Specialty Drink ✅ Can afford
- 350 pts: Free Food Item ✅ Can afford
- 400 pts: 15% Off Entire Order ❌ Locked
- 500 pts: $10 Off Purchase ❌ Locked
- 600 pts: Free Event Entry ❌ Locked
- 750 pts: 25% Off Entire Order ❌ Locked

### Feature Flag Integration

Loyalty redemption requires:
- `LOYALTY_ENABLED = true` (to enable redemptions)

If LOYALTY_ENABLED is off:
- Yellow warning banner on rewards page
- Redeem buttons disabled
- Link to Admin Settings to enable

### Testing Birthday Bonus

The mock user has a January birthday (1995-01-15). To test:

1. **Birthday This Month** (January):
   - Visit rewards page in January
   - Purple birthday banner should appear at top
   - Shows "🎉 Happy Birthday!"
   - "Claim Birthday Bonus" button visible
   - Click to claim - receives 100 points

2. **Already Claimed**:
   - Transaction history already has birthday bonus for 2026
   - Banner shows "Already claimed this year"
   - Claim button disabled

3. **Not Birthday Month** (February-December):
   - No birthday banner appears
   - Test by changing MOCK_USER.birthday month

### Points Earning Integration

Points are earned automatically when:

1. **Checkout**: Calculated as `Math.floor(subtotal)` (already implemented in checkout flow)
2. **Event Attendance**: 50 points added after event completion (stubbed)
3. **Birthday**: 100 points when claimed (implemented on rewards page)
4. **Referrals**: 200 points when friend signs up (stubbed)

---

## Next Steps

Implement remaining spec sections:
- **3.2 Item Customization** ✅ (Already complete)
- **3.3 Shopping Cart** ✅ (Already complete!)
- **3.4 Checkout Flow** ✅ (Just completed!)
- **3.5 Order Tracking** ✅ (Just completed!)
- **3.6 Event Management** ✅ (Just completed!)
- **3.7 Loyalty Program** ✅ (Just completed!)
- **Additional Features**: Admin dashboard, favorites, retail shop, etc.

---

## Summary

All core customer-facing features from spec sections 3.1-3.7 are now complete:
- ✅ Menu Browsing & Search
- ✅ Item Customization
- ✅ Shopping Cart with staleness detection
- ✅ Checkout with payments (stubbed Square)
- ✅ Order Tracking with real-time updates
- ✅ Event Management with registration & waitlist
- ✅ Loyalty Program with rewards & points

---

## Troubleshooting

### "Add to Cart" buttons not showing
→ Check Admin Settings, enable "Online Ordering"

### Items not filtering
→ Clear filters button in empty state, or refresh page

### Modal not opening
→ Check browser console for errors, ensure Modal is imported

### Build errors
→ Run `npm run build` to check TypeScript errors

---

Built with ❤️ for the gaming community.
