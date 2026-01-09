# Questpoint Cafe - Product Specification
**Version:** 2.0
**Date:** January 7, 2026
**Status:** Active Development

---

## 1. Product Overview

### 1.1 Vision
Questpoint Cafe's digital platform serves as the primary customer touchpoint for ordering, event management, and community engagement. It combines the convenience of modern web applications with the personality of a gaming-themed cafe.

### 1.2 Mission
Enable customers to seamlessly browse, order, and engage with Questpoint Cafe while maintaining a professional yet playful gaming aesthetic.

### 1.3 Target Users

| User Type | Description | Primary Needs |
|-----------|-------------|---------------|
| Casual Customer | Remote workers, students | Quick ordering, menu browsing |
| Gaming Enthusiast | MTG/TCG players | Event registration, retail products |
| Regular | Loyalty program members | Points tracking, order history |
| Event Participant | Tournament/social attendees | Registration, scheduling |

### 1.4 Core Philosophy
**Pickup-only model:** This platform is designed exclusively for in-store pickup orders. Customers order online and pick up at the cafe. We sell gaming products (TCG, accessories) alongside drinks and food, all available for pickup only.

---

## 2. Product Goals

### 2.1 Business Goals
- Increase online orders to 20% of total revenue within 6 months
- Reduce order errors by 50% through digital ordering
- Increase event attendance by 30% through easier registration
- Build customer loyalty with 500+ registered users in first year

### 2.2 User Goals
- Order drinks/food in under 2 minutes
- Find and register for events in under 1 minute
- Track loyalty points and rewards easily
- Access order history and reorder favorites

### 2.3 Technical Goals
- 99.9% uptime during business hours
- Page load times under 2 seconds
- Mobile-first responsive design
- Progressive Web App (PWA) capabilities

---

## 3. Feature Requirements

### 3.1 Menu Browsing (P0 - MVP)

#### User Stories
1. As a **customer**, I want to **browse all menu items** so that I can **see what drinks and food are available**
2. As a **customer**, I want to **filter by category** so that I can **quickly find the type of item I want**
3. As a **customer**, I want to **search for items** so that I can **find specific drinks by name**
4. As a **customer with dietary restrictions**, I want to **see allergen information** so that I can **make safe choices**

#### Acceptance Criteria
- [ ] Menu displays all active items with name, image, price, description
- [ ] Categories: Coffee, Boba, Smoothies, Food, Seasonal
- [ ] Filters work for category, dietary restrictions, availability
- [ ] Search returns results in under 1 second using substring matching (contains anywhere)
- [ ] Item detail shows full description, allergens, caffeine level, calories
- [ ] Menu loads without authentication (public access)
- [ ] Images lazy-load for performance
- [ ] Pagination: 20 items per page
- [ ] Price display: $X.00 or $X.50 only (half-dollar increments)

#### Technical Requirements
- Data source: Supabase `menu_items` table
- Implement client-side filtering for instant results
- Search algorithm: Simple substring matching (e.g., 'lat' finds 'Iced Vanilla Latte')
- Support offline viewing with 24-hour cache + background refresh
- Responsive grid layout (1 column mobile, 3 columns desktop)
- Image loading: Lazy load with pagination (20 items/page)
- Staff uploads images via admin panel

#### Menu Item Variants
- Hot vs Iced: Model as separate menu items (e.g., "Hot Latte", "Iced Latte")
- Rationale: Simpler queries, dedicated images/descriptions, easier pricing flexibility

#### Seasonal Items
- Staff marks items as `is_seasonal: true`
- Seasonal items are only visible to staff (hidden from customer menu)
- Allows staff to prepare items in advance without customer-facing display

---

### 3.2 Item Customization (P0 - MVP)

#### User Stories
1. As a **customer**, I want to **customize my drink** so that I can **get it exactly how I like it**
2. As a **customer**, I want to **see price changes** so that I can **know the cost of my customizations**
3. As a **customer**, I want to **save my preferences** so that I can **reorder quickly next time**

#### Acceptance Criteria
- [ ] Customization options load from database
- [ ] Size selector (S/M/L) with price modifiers
- [ ] Milk options (whole, 2%, oat, almond, etc.)
- [ ] Sweetness level (0%, 25%, 50%, 75%, 100%)
- [ ] Toppings (boba, jelly, foam, etc.) with price add-ons
- [ ] Special instructions text field (max 200 characters)
- [ ] Price updates in real-time as options change
- [ ] Selected customizations visible in cart
- [ ] Validation occurs on add-to-cart only (not real-time sync)

#### Technical Requirements
- Data source: `menu_customizations` table
- Join with `menu_items` on item selection
- Store customizations as JSON in cart
- Validate required selections before adding to cart
- Validation strategy: Cache customization options on load, validate against current DB when adding to cart
- If options changed (e.g., "Oat Milk" removed), show error and reopen customization modal

#### Allergen Updates
- When allergen information changes for an item, notify customers **when they add the item to cart**
- Display alert: "Allergen information was recently updated for this item. Please review."
- No proactive mass notifications (rely on contextual notification)

---

### 3.3 Shopping Cart (P0 - MVP)

#### User Stories
1. As a **customer**, I want to **add items to a cart** so that I can **order multiple items at once**
2. As a **customer**, I want to **modify quantities** so that I can **adjust my order**
3. As a **customer**, I want to **see the total** so that I can **know what I'll pay**
4. As a **customer**, I want to **save my cart** so that I can **continue later**

#### Acceptance Criteria
- [ ] Add items to cart from menu or item detail
- [ ] Cart persists across sessions (localStorage)
- [ ] Edit item customizations from cart
- [ ] Remove items from cart
- [ ] Adjust quantity (1-10 per item for food/drinks, unlimited for retail)
- [ ] Display subtotal, tax (8.25%), total
- [ ] Empty cart state with CTA to browse menu
- [ ] Cart accessible from all pages (icon in header)
- [ ] Badge shows item count on cart icon
- [ ] Guest users can build cart (signup required at checkout only)

#### Technical Requirements
- Zustand store: `cart-store.ts`
- Persist to localStorage as `questpoint-cart`
- Each item has unique ID for customization tracking
- Tax calculation: `subtotal * 0.0825`
- Computed values as functions (not properties)

#### Cart Staleness Handling
**When menu items in cart get updated or removed:**
- Show warning modal on cart open: "Some items in your cart have changed"
- List each changed item with details:
  - Price changes: "Iced Latte is now $5.50 (was $5.00)"
  - Removed items: "Pumpkin Spice Latte is no longer available"
- User decides per item: "Keep in cart" or "Remove"
- Must review and confirm changes before checkout

#### Mobile Cart UX
- **Bottom sheet drawer** (swipe up from bottom)
- Floating cart button fixed at bottom-right
- Tap opens drawer sliding up from bottom
- Modern mobile pattern, non-intrusive

#### Order Size Limits
- **Retail products (TCG, accessories, dice, etc.):** No limit
  - If out of stock, notify user: "Only 3 available, reduced quantity to 3"
- **Food/drink items:** Warning when cart exceeds 10 items
  - "Large order! Estimated prep time: 30-45 minutes"
  - Soft warning, no hard block

---

### 3.4 Checkout Flow (P1 - Post-MVP)

#### User Stories
1. As a **customer**, I want to **choose pickup or dine-in** so that I can **get my order the way I want**
2. As a **customer**, I want to **pay securely** so that I can **complete my order**
3. As a **customer**, I want to **receive a confirmation** so that I can **know my order was placed**
4. As a **customer**, I want to **see estimated ready time** so that I can **plan my pickup**

#### Acceptance Criteria
- [ ] Guest cart users redirected to signup/login at checkout
- [ ] Select order type: Pickup or Dine-in
- [ ] For dine-in (at-table): Auto-filled via QR code scan at table
- [ ] For dine-in (from counter): Assigned physical table stand with number, given to customer
- [ ] For pickup: Show estimated ready time
- [ ] Apply points discount (auto-applied with prompt to add/remove)
- [ ] Payment via Square Web Payments SDK
- [ ] Support credit/debit cards
- [ ] Support saved payment methods (Square customer vault with explicit opt-in)
  - Checkbox: "Save card for future orders"
- [ ] Order confirmation screen with order number
- [ ] Send confirmation via email, SMS, and in-app notification (if contact info available)
- [ ] If all notifications fail, staff notified to call customer and leave message
- [ ] Redirect to order status page
- [ ] Support tipping: Pooled tips across all staff
  - Pre-payment screen with suggested amounts (15%, 18%, 20%, custom)
  - Tips distributed: Cash tips weekly, electronic tips in paychecks

#### Technical Requirements
- API: `POST /api/orders`
- Square integration: `src/lib/square/payments.ts`
- Generate unique order number (e.g., `QP-20260107-001`)
- **Payment-first approach:** Only create order record after successful payment
  - Prevents orphaned records, ensures data consistency
  - Requires idempotency handling
- Calculate points earned: `Math.floor(total)`
- Send confirmation via multiple channels (email, SMS, in-app)
- Supabase edge function for email notifications

#### Points Redemption
- **Auto-apply points at maximum benefit** but prompt user to confirm
- "Your points can save you $10. Apply discount?"
- User can toggle on/off before payment
- Points locked once payment screen is loaded
- Recalculate total dynamically when toggled

#### Split Payments
- **Yes - points + card split allowed**
- User applies points discount (e.g., 1000 points = $10 off)
- Remainder charged to card
- Two-step payment: Apply discount, then charge card

#### Network Failure Recovery
- **Store payment intent locally, resume on reconnect**
- Save Square payment intent ID to localStorage
- When connection returns, check if order exists in DB
- If not exists, create order record
- Requires deduplication logic (check by payment intent ID)

#### Future/Scheduled Orders
- **After-hours orders only:** Allow scheduling for next opening time
- If ordering when cafe is closed (after 10 PM), auto-schedule for 7 AM next day
- Display: "We're closed. Order will be prepared when we open at 7 AM tomorrow."
- No full scheduling (custom date/time picker) for regular orders

---

### 3.5 Order Tracking (P1 - Post-MVP)

#### User Stories
1. As a **customer**, I want to **see my order status** so that I can **know when it's ready**
2. As a **customer**, I want to **receive notifications** so that I can **be alerted when ready**

#### Acceptance Criteria
- [ ] Order status page shows current status
- [ ] Status options: Pending, Confirmed, Preparing, Ready, Completed
- [ ] Estimated ready time displayed (no queue position shown)
- [ ] Status updates in real-time (no manual refresh)
- [ ] Push notification when status changes (PWA)
- [ ] Completed orders show completion time
- [ ] Simple status display (no "3 orders ahead of you")

#### Technical Requirements
- Supabase Realtime subscription on `orders` table
- Filter: `WHERE id = order_id AND user_id = auth.uid()`
- Status updates pushed from POS system (future integration)
- Fallback: Poll every 30 seconds if Realtime unavailable

#### Order Modification
- **Time-based modification window: 2 minutes after submission**
- Within 2 minutes: "Edit Order" button available
  - Can change items, quantities, customizations
  - Handle payment delta (refund/charge difference via Square)
- After 2 minutes: Order locked
  - Show "Need changes? Call us at (XXX) XXX-XXXX"

#### Order Timeout & Abandonment
- **Auto-cancel pending orders after cafe closing time**
- Multi-stage notification system before cancellation:
  - 6 hours before closing: "Your order is still pending. Complete checkout soon!"
  - 3 hours before closing: "Reminder: Complete your order within 3 hours"
  - 90 minutes before closing: "Your order will be canceled soon if not completed"
  - 15 minutes before closing: "Last chance to complete your order"
- At closing time (10 PM): Auto-cancel any remaining pending orders
- Send cancellation notification via email/SMS

---

### 3.6 Event Calendar (P0 - MVP)

#### User Stories
1. As a **customer**, I want to **see upcoming events** so that I can **plan which ones to attend**
2. As a **customer**, I want to **view event details** so that I can **decide if I want to register**
3. As a **customer**, I want to **register for events** so that I can **secure my spot**
4. As a **customer**, I want to **add to my calendar** so that I can **remember to attend**

#### Acceptance Criteria
- [ ] Calendar view shows all upcoming events
- [ ] List view option for detailed information
- [ ] Filter by event type (Tournament, Social, Launch, Private)
- [ ] Event card shows: title, date/time, fee, capacity, image
- [ ] Event detail page shows full description
- [ ] Registration button (requires login)
- [ ] Capacity indicator (X/Y spots filled)
- [ ] Sold out state when capacity reached
- [ ] Download .ics calendar file
- [ ] Links to Google/Apple/Outlook calendar
- [ ] Prominently display refund policy on event detail page

#### Technical Requirements
- Data source: `events` table
- Filter: `WHERE event_date >= NOW() ORDER BY event_date ASC`
- Join with `event_registrations` to check if user registered
- Calendar file generation: use `ics` library
- Recurring events: Generate instances from pattern

#### Recurring Events
- **Series + instances hybrid model**
- Master "series" record (e.g., "Friday Night Magic" series)
- Auto-generate individual instances 4 weeks out
- Each instance has own capacity, registrations, date
- User registers for specific instances
- Keeps related events linked while allowing per-date management

#### Event Capacity Handling
- **Over-provision capacity by 5%**
  - If physical capacity is 20, set `max_capacity: 21` in DB
  - Provides buffer for race conditions
- **Automatic waitlist for over-capacity registrations**
  - If capacity exceeded during registration, auto-add to waitlist
  - Status: `waitlist` instead of `registered`
  - Notify if spot opens

#### Event Refund Policy
**Prominently displayed on event detail page:**
- **> 7-3 days before event:** 100% refund
- **1-2 days before event:** 50% refund
- **Day of event (last-minute cancellation):** 10% refund
- **After event start time:** No refund

Implementation:
- Display policy clearly with calendar date calculations
- Auto-disable refund button based on current time vs event time
- Process refunds via Square API to original payment method

#### Event Check-In
- **Flexible check-in: QR code OR name lookup**
- Option 1: User shows QR code from "My Events" in app
  - Staff scans with tablet/phone running check-in app
- Option 2: User provides name
  - Staff searches name on tablet, marks attended
- Staff choice based on event size and setup

---

### 3.7 Event Registration (P0 - MVP)

#### User Stories
1. As a **customer**, I want to **register for events** so that I can **participate**
2. As a **customer**, I want to **pay the entry fee** so that I can **secure my spot**
3. As a **customer**, I want to **cancel my registration** so that I can **get a refund if I can't attend**

#### Acceptance Criteria
- [ ] Register button on event detail page
- [ ] Redirect to login if not authenticated
- [ ] Free events: Instant registration
- [ ] Paid events: Payment via Square
- [ ] Confirmation message after registration
- [ ] Registration appears in user account
- [ ] Cancel registration with refund based on policy
- [ ] Email confirmation sent
- [ ] Award 50 points on event attendance (marked by staff)

#### Technical Requirements
- API: `POST /api/events/[id]/register`
- Create record in `event_registrations`
- Increment `current_registrations` on events table
- Check capacity before allowing registration (5% over-provision buffer)
- For paid events: Process payment via Square
- Record points earned (50 points per event)
- Cancellation: `DELETE /api/events/[id]/register` (with refund processing)

#### Event Race Condition Handling
- **Combination approach:**
  1. Over-provision capacity by 5% (buffer against races)
  2. Auto-waitlist if capacity exceeded
- No spot reservation (no temporary holds)
- Payment required immediately
- If capacity exceeded during payment, auto-add to waitlist with notification

---

### 3.8 User Authentication (P0 - MVP)

#### User Stories
1. As a **new customer**, I want to **create an account** so that I can **place orders and register for events**
2. As a **returning customer**, I want to **log in** so that I can **access my account**
3. As a **customer**, I want to **reset my password** so that I can **regain access if I forget it**
4. As a **customer**, I want to **sign in with Google/Apple** so that I can **skip creating a password**

#### Acceptance Criteria
- [ ] Registration form: email, password, display name
- [ ] Email verification required
- [ ] Login form: email, password
- [ ] "Forgot password" link sends reset email
- [ ] Google OAuth sign-in
- [ ] Apple OAuth sign-in
- [ ] Session persists for 30 days
- [ ] Logout button in account menu
- [ ] Protected routes redirect to login
- [ ] Monthly email reminders to users with password-only accounts to set up OAuth

#### Technical Requirements
- Supabase Auth: `src/lib/supabase/client.ts`
- OAuth providers: Google, Apple (configured in Supabase)
- Callback handler: `src/app/api/auth/callback/route.ts`
- Middleware: Check auth on protected routes
- Create profile record after signup (trigger in database)

#### Password Policy
- **Encourage OAuth, allow password as backup**
- For password accounts: Minimum 8 characters (no complexity requirements)
- Send monthly email reminders: "Sign in with Google for faster, more secure access"
- Rationale: Length > complexity for memorability

#### Duplicate Account Prevention
- **Flag duplicates but allow account creation**
- As user fills out profile (email, phone, address), check for duplicates
- If duplicate detected, flag account in admin panel
- Staff manually reviews flagged accounts
- Staff can merge/combine accounts as necessary
- Don't block signup (prevents false positives from shared info)

---

### 3.9 User Profile (P1 - Post-MVP)

#### User Stories
1. As a **customer**, I want to **view my profile** so that I can **see my information**
2. As a **customer**, I want to **edit my profile** so that I can **update my details**
3. As a **customer**, I want to **add my birthday** so that I can **receive birthday rewards**

#### Acceptance Criteria
- [ ] Display name, email, phone, birthday
- [ ] Edit display name (min 2 characters)
- [ ] Edit phone (optional, format validation)
- [ ] Edit birthday (optional, for birthday bonus)
- [ ] Email change requires re-verification
- [ ] Profile picture upload (future feature)
- [ ] Notification preferences (4 independent categories)
- [ ] Change password button

#### Technical Requirements
- API: `GET /PATCH /api/user/profile`
- Update `profiles` table
- Validate phone format: `(XXX) XXX-XXXX`
- Birthday bonus: Automatic 100 points on birthday

#### Notification Preferences
Users can independently toggle 4 categories:
1. **Order updates** - Status changes (preparing, ready, completed)
2. **Event reminders** - 24h and 1h before registered events
3. **Points & rewards** - Milestones, new rewards available
4. **Marketing** - New menu items, promotions, general events

#### Account Deletion
- **User can request account deletion**
- If user has upcoming event registrations:
  - Notify: "You have upcoming events: [Event 1], [Event 2]"
  - "Your account will be automatically deleted after your last event on [date]"
- Staff notified to attempt retention during events (exit interview)
- Data retention policy:
  - **Retain:** Orders (for business records, email intact for receipts)
  - **Delete:** Profile, points, points_transactions, favorites, event_registrations
- Auto-delete triggers after last event date

---

### 3.10 Points & Rewards (P1 - Post-MVP)

#### User Stories
1. As a **customer**, I want to **see my points balance** so that I can **know what I can redeem**
2. As a **customer**, I want to **earn points on purchases** so that I can **get free items**
3. As a **customer**, I want to **redeem points for rewards** so that I can **save money**
4. As a **customer**, I want to **see my points history** so that I can **track my earning and spending**

#### Acceptance Criteria
- [ ] Points balance displayed prominently in account
- [ ] Lifetime points earned shown
- [ ] Earn 1 point per $1 spent
- [ ] Bonus points: Birthday (100), Event attendance (50), Referral (200)
- [ ] Rewards catalog shows available rewards
- [ ] Rewards tiered: 250, 500, 1000, 2500 points
- [ ] Redeem button applies discount to cart
- [ ] Points history page shows transactions
- [ ] Transactions show: date, amount, type, description

#### Technical Requirements
- Points balance: `profiles.points`
- Lifetime: `profiles.lifetime_points`
- Transactions: `points_transactions` table
- Calculate on order: `UPDATE profiles SET points = points + earned`
- Redeem: `UPDATE profiles SET points = points - redeemed`
- Transaction types: purchase, redemption, bonus, referral, event

#### Points Expiration
- **Rolling 1-year expiration from earning date**
- Each points_transaction has `expires_at = created_at + 1 year`
- FIFO redemption (oldest points redeemed first)
- Warning email at 11 months: "You have 500 points expiring soon!"
- Automated cleanup job zeros out expired points daily

#### Birthday Bonus
- **100 points awarded on first login on birthday**
- Grace period: 1 week after birthday
- Logic:
  ```
  IF birthday = today OR (today - birthday <= 7 days)
  AND not_awarded_this_year
  THEN award 100 points
  ```
- Transaction type: `bonus`
- Description: "Happy Birthday bonus!"

#### Referral Program
- **Shareable link with tracking:** `questpoint.com/ref/abc123`
- Each user gets unique referral code (generated on signup)
- New user clicks link → tracking cookie/URL param → associates with referrer
- On new user's first order (>$10): Award 200 points to both parties
- Prevent abuse: Duplicate account flags reviewed manually by staff

---

### 3.11 Order History (P1 - Post-MVP)

#### User Stories
1. As a **customer**, I want to **see my past orders** so that I can **remember what I ordered**
2. As a **customer**, I want to **reorder a previous order** so that I can **quickly get my favorite items**
3. As a **customer**, I want to **see order details** so that I can **check what I paid**

#### Acceptance Criteria
- [ ] List of past orders (most recent first)
- [ ] Order card shows: order number, date, total, status
- [ ] Tap to expand details
- [ ] Details show: items, customizations, subtotal, tax, total, points earned
- [ ] "Reorder" button prompts review before adding to cart
- [ ] Filter by date range
- [ ] Search orders by item name

#### Technical Requirements
- API: `GET /api/orders?user_id={user_id}`
- Join with `order_items` and `menu_items`
- Sort: `ORDER BY created_at DESC`
- Pagination: 20 orders per page

#### Reorder Logic
- **Prompt review before adding to cart**
- When user clicks "Reorder":
  1. Fetch current menu data for each item
  2. Compare prices, availability, customizations
  3. Show modal: "Review Order Changes"
     - List price increases: "Iced Latte now $5.50 (was $5.00)"
     - List removed items: "Pumpkin Spice Latte no longer available"
     - List new customizations: "Oat Milk now available for +$1.00"
  4. User approves: Add items to cart
  5. User cancels: Return to order history

#### Order Issues & Refunds
- **In-app refunds issue store credit**
- Completed orders have "Report Issue" button
- User selects reason (wrong item, quality issue, missing item)
- Automatically issue store credit (points) equal to order value
- **For cash refund:** User must contact support or visit in-store
- Staff can manually process cash refund via Square
- Rationale: Keeps revenue in ecosystem, prevents abuse, fast resolution

---

### 3.12 Favorites (P2 - Nice to Have)

#### User Stories
1. As a **customer**, I want to **save favorite items** so that I can **find them quickly**
2. As a **customer**, I want to **reorder favorites** so that I can **skip browsing the menu**

#### Acceptance Criteria
- [ ] Heart icon on menu items
- [ ] Tap to add/remove from favorites
- [ ] Favorites section in account
- [ ] Quick order from favorites
- [ ] Limit: 20 favorites per user

#### Technical Requirements
- API: `POST/DELETE /api/user/favorites`
- Table: `favorites`
- Icon state synced with database

#### Deleted Favorites Handling
- **When menu item is deleted but exists in user favorites:**
  1. Send notification: "Your favorite [Item Name] will be discontinued in X days"
  2. Countdown notification updates (7 days, 3 days, 1 day)
  3. Ask for feedback: "Would you like to see [Item Name] come back?" 👍 👎
  4. After X days (deadline), auto-remove from favorites
  5. Store feedback in DB for product decisions

---

### 3.13 Retail Shop (P2 - Nice to Have)

#### User Stories
1. As a **TCG player**, I want to **browse products** so that I can **see what's in stock**
2. As a **customer**, I want to **pre-order releases** so that I can **secure new products**
3. As a **customer**, I want to **add to pickup order** so that I can **get everything at once**

#### Acceptance Criteria
- [ ] Product catalog with categories
- [ ] Categories: TCG, Accessories, Dice, Merch, Snacks
- [ ] Product detail: name, price, description, stock status
- [ ] In stock / Low stock / Out of stock indicators
- [ ] Pre-order available badge for upcoming releases
- [ ] Add to cart alongside menu items
- [ ] Pickup only (no shipping)
- [ ] No order size limit on retail products
- [ ] If out of stock, reduce quantity automatically with notification

#### Technical Requirements
- Table: `products`
- Stock tracking: `stock_quantity`
- Low stock threshold: Show warning when `stock_quantity <= low_stock_threshold`
- Pre-orders: `is_preorder = true` and `release_date > NOW()`

#### Inventory Synchronization
- **Real-time webhook sync: Square → Supabase**
- Square sends webhooks on inventory changes (sale, restock, adjustment)
- Webhook endpoint: `/api/webhooks/square/inventory`
- Update `products.stock_quantity` in Supabase
- Near-instant accuracy (< 5 second lag)
- Prevents selling out-of-stock items

---

### 3.14 Stream Integration (P2 - Nice to Have)

#### User Stories
1. As a **customer**, I want to **watch live streams** so that I can **see events remotely**
2. As a **customer**, I want to **see stream schedule** so that I can **know when to tune in**

#### Acceptance Criteria
- [ ] Twitch embed when live
- [ ] YouTube embed as fallback
- [ ] Stream schedule below player
- [ ] "Live Now" badge when streaming
- [ ] VOD library of past streams

#### Technical Requirements
- Twitch API to check if channel is live
- Embed: `<iframe src="https://player.twitch.tv/?channel={channel}">`
- Schedule: `stream_schedule` table

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load: < 2 seconds on 3G connection
- Time to Interactive (TTI): < 3 seconds
- First Contentful Paint (FCP): < 1 second
- Image optimization: WebP format, lazy loading
- Code splitting: Dynamic imports for routes

### 4.2 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support with custom shortcuts:
  - **Shift+C:** Open cart
  - **/:** Focus search bar
  - **1-5:** Filter by category (when on menu page)
  - **+/-:** Adjust quantity (when cart item focused)
- Screen reader compatibility
- Color contrast ratio: 4.5:1 minimum
- Focus indicators visible
- Alt text for all images

### 4.3 Security
- HTTPS only (enforce redirect)
- Row Level Security (RLS) on all tables
- API authentication via Supabase JWT
- XSS protection (sanitize user input)
- CSRF protection on forms
- Rate limiting on API endpoints (endpoint-specific):
  - Auth endpoints: 10 requests/minute
  - Read endpoints (menu, events): 100 requests/minute
  - Write endpoints (orders, favorites): 30 requests/minute
- Payment processing via Square (PCI compliant)

### 4.4 Browser Support
- Chrome/Edge (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### 4.5 Device Support
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Responsive breakpoints in Tailwind config

### 4.6 SEO
- **Full SSR for menu items and events**
- Individual pages for all items: `/menu/black-lotus-latte`
- Individual pages for all events: `/events/friday-night-magic`
- Fully crawlable, shareable links
- Meta tags: title, description, Open Graph
- Structured data: LocalBusiness schema
- Sitemap.xml generation
- Robots.txt configuration

---

## 5. Design Requirements

### 5.1 Color Palette
```
Primary:   #4A148C (Quest Purple)
Accent:    #FFC107 (Quest Gold)
Dark:      #1A1A1A (Quest Dark)
Charcoal:  #2C2C2C (Quest Charcoal)
Cream:     #F5F5DC (Quest Cream)
```

### 5.2 Typography
- Headers: Cinzel (fantasy font)
- Body: DM Sans (clean, readable)
- Monospace: JetBrains Mono (for order numbers)

### 5.3 Component Patterns
- Buttons: 4 variants (gold, purple, ghost, danger)
- Cards: Elevated with shadow, rounded corners
- Forms: Floating labels, validation states
- Modals: Center-aligned, backdrop blur
- Toast: Bottom-right notifications

### 5.4 Animation
- Page transitions: Fade in
- Hover states: Scale(1.02)
- Loading states: Skeleton screens
- Micro-interactions: Button press feedback

---

## 6. Error Handling & Resilience

### 6.1 Error Messages
- **User message + error code format**
- Example: "Payment failed. Please try again. (Error: PAY-401)"
- User sees friendly message + reference code
- Support can look up error code for technical details
- Balance between user-friendly and debuggable

### 6.2 Supabase Outage Handling
**Degraded mode includes:**
1. **Show cached menu (read-only mode)**
   - Display last-cached menu data from localStorage (24h cache)
   - Banner: "Online ordering temporarily unavailable"
   - Disable add-to-cart, checkout, authentication
2. **Phone/email fallback instructions**
   - Prominent message: "Can't order online? Call us at (XXX) XXX-XXXX or visit in person!"
   - Display hours, address, map
3. **Note:** Ordering is pickup-only, so customers can always visit in-store

### 6.3 Network Resilience
- **Progressive Web App (PWA) with offline support**
- Service worker caches:
  - Menu data (24h)
  - Static assets (images, CSS, JS)
  - App shell
- Queue failed requests, retry on reconnect

### 6.4 Payment Failure Handling
- Declined card: "Payment declined. Please try a different card. (Error: PAY-DECLINED)"
- Network error during payment: Store intent locally, resume on reconnect
- If all retries fail: "Payment failed. No charge was made. Please try again or contact support."

---

## 7. Staff Operations

### 7.1 Staff Interface
- **Hybrid approach:**
  - **Orders:** Managed via Square POS (online orders push to POS)
  - **Events:** Managed via web admin panel
  - **Inventory:** Managed via web admin panel (syncs to Square)
  - **Menu items:** Managed via web admin panel (staff uploads images)

### 7.2 POS Integration
- Online orders automatically send to Square POS
- Staff fulfills from POS screen
- Updates order status from POS (preparing, ready, completed)
- Status updates push to customer via Supabase Realtime

### 7.3 POS Offline Handling
**If Square POS is offline when customer picks up order:**
1. **Primary:** Use backup Square terminal (mobile app on staff tablet/phone)
   - Re-ring order on mobile device
   - Maintains payment tracking
2. **Fallback:** Manual spreadsheet tracking
   - Record order number, items, total on paper/spreadsheet
   - Sync to Square when connection returns
   - Give customer their order (honor online payment)

### 7.4 Admin Panel Capabilities
Staff can manage via web admin:
- Event creation, editing, capacity management
- Event check-in (scan QR codes or name lookup)
- Product inventory updates
- Menu item creation/editing/deletion
- Image uploads for menu items
- Manual discount application to specific orders
- View flagged duplicate accounts, merge accounts
- Review and process refund requests

### 7.5 Promotional Discounts
- **Staff-only manual discounts** (no customer-facing promo codes)
- Admin can apply discount to specific orders
- Useful for:
  - Complaint resolution
  - VIP customers
  - Employee discounts
- No promo code system infrastructure needed (simplifies MVP)

---

## 8. Analytics & Monitoring

### 8.1 Analytics Tracking
Implement all 4 categories:

1. **Basic traffic metrics**
   - Page views, sessions, bounce rate
   - Tool: Vercel Analytics

2. **Conversion funnels**
   - Cart adds, checkout starts, order completions
   - Track drop-off points
   - Anonymized user IDs

3. **Feature usage**
   - Search terms, filter usage, favorite items
   - Most popular menu categories
   - Event registration patterns

4. **Performance monitoring**
   - Core Web Vitals (LCP, FID, CLS)
   - API response times
   - Error tracking via Sentry

### 8.2 Privacy
- No PII in analytics events
- Anonymized user IDs only
- Cookie consent banner (if required by jurisdiction)
- Privacy policy clearly states data collection

---

## 9. Constraints & Assumptions

### 9.1 Technical Constraints
- Must use Next.js 14+ with App Router
- TypeScript strict mode required
- Tailwind CSS v3 (not v4)
- Supabase free tier limits: 500MB database, 2GB bandwidth/day
- Square API rate limits: 10 requests/second

### 9.2 Business Constraints
- Single location only (no multi-location support)
- **Pickup and dine-in only (no delivery)**
- Business hours: 7 AM - 10 PM daily
- English language only (no i18n initially)

### 9.3 Assumptions
- Users have smartphones (90%+ mobile traffic expected)
- Users have stable internet connection during ordering
- Staff has POS system to receive orders
- Square integration is approved and operational
- Supabase Auth is sufficient for user management

---

## 10. Out of Scope (Future Phases)

### Phase 2 Features
- Delivery integration (DoorDash, Uber Eats)
- Gift card purchases
- Subscription service (daily coffee)
- Catering orders

### Phase 3 Features
- Mobile native apps (iOS/Android)
- Apple Pay / Google Pay
- Push notifications (non-PWA)
- Multi-language support

### Phase 4 Features
- Franchise portal
- Multi-location support
- Analytics dashboard for owner
- A/B testing framework
- Customer-facing promo code system

---

## 11. Success Criteria

### 11.1 Launch Criteria (MVP)
- [ ] All P0 features implemented and tested
- [ ] 10 beta users successfully complete orders
- [ ] No critical bugs in production
- [ ] Page load time < 2 seconds
- [ ] Mobile responsive on iPhone and Android
- [ ] Staff trained on order fulfillment

### 11.2 Success Metrics (6 Months Post-Launch)
| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly Active Users | 500+ | Supabase Auth |
| Online Orders | 20% of total | Orders table |
| Event Registrations | 80%+ attendance | Event registrations |
| PWA Installs | 200+ | Analytics |
| Customer Satisfaction | 4.5+ stars | In-app survey |
| Average Order Value | $15+ | Orders table |
| Points Redemption | 40%+ | Points transactions |

---

## 12. Testing Requirements

### 12.1 Priority: API Endpoint Tests (Foundation)
- Test all API routes first: orders, events, user, auth
- Ensures backend works before frontend testing
- Catches data integrity issues early

### 12.2 Integration Tests
- Authentication flow (signup, login, OAuth, logout)
- Payment processing (Square SDK)
- Webhook handlers (Square inventory updates)

### 12.3 E2E Tests
- Complete order flow (browse → cart → checkout → confirmation)
- Event registration flow
- User account creation and profile update

### 12.4 Manual Testing
- Cross-browser testing (Chrome, Safari, Firefox)
- Cross-device testing (iPhone, Android, tablet, desktop)
- Accessibility testing (screen reader, keyboard navigation)
- Performance testing (Lighthouse scores)

---

## 13. Deployment Plan

### 13.1 Environments
- **Development:** Local (localhost:3000)
- **Staging:** Vercel preview deployment (auto on PR)
- **Production:** Vercel production (questpointcafe.com)

### 13.2 Launch Strategy
- **Soft launch: Enable for walk-in customers only**
- QR codes at tables linking to app
- Staff informs walk-in customers about online ordering
- Not advertised publicly yet
- Gradual ramp-up allows debugging with real users
- Easy to pull back if critical issues arise
- Duration: 2-4 weeks before public announcement

### 13.3 PWA Installation Prompt
- **Show after first successful order**
- Post-order confirmation screen: "Order placed! Install app for faster ordering next time."
- Context-relevant timing (user already invested)
- Manual "Install App" button also available in footer/menu

### 13.4 Deployment Checklist
- [ ] All tests passing
- [ ] Build succeeds (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Seed data loaded (menu items, events)
- [ ] Domain configured and DNS propagated
- [ ] SSL certificate active
- [ ] Monitoring setup (Vercel Analytics)
- [ ] Error tracking configured (Sentry)
- [ ] Square webhooks configured and tested
- [ ] Email/SMS notifications tested

### 13.5 Rollback Plan
- Revert to previous Vercel deployment (one-click)
- Database: Restore from backup (Supabase daily backups)
- Clear cache if needed
- Communicate downtime via social media/Discord

---

## 14. Support & Maintenance

### 14.1 Monitoring
- Uptime monitoring: Vercel (99.9% SLA)
- Error tracking: Sentry for runtime errors
- Analytics: Vercel Analytics for traffic
- Performance: Lighthouse CI in GitHub Actions

### 14.2 Maintenance Windows
- Database: Supabase auto-maintains, no downtime
- Application: Zero-downtime deployments via Vercel
- Emergency fixes: Deploy immediately, no window needed

### 14.3 Support Channels
- In-app: Help button → email support@questpointcafe.com
- Social: Instagram DM, Discord
- Phone: (XXX) XXX-XXXX during business hours

---

## 15. Implementation Details & Edge Cases

### 15.1 Admin Panel - Menu Item Concurrency
- **Optimistic locking (version number check)**
- Each `menu_items` record has `version` column
- When staff opens item for editing, store current version
- On save: `UPDATE menu_items SET ... WHERE id = ? AND version = ?`
- If version changed (another staff edited), update fails
- Show error: "Item was modified by another user. Reload and try again."

### 15.2 Table Number Assignment
**Two modes:**
1. **At-table ordering:** QR code on table auto-fills table number
   - User scans QR code at their table
   - Table number pre-populated in order form
2. **Counter ordering:** Physical table stand system
   - Customer orders at counter
   - Staff assigns numbered table stand
   - Customer takes stand to table
   - Staff delivers to table number on stand

### 15.3 Tipping Distribution
- Tips collected at checkout (pre-payment screen)
- Suggested amounts: 15%, 18%, 20%, custom
- Tips pooled across all staff working that day
- **Distribution:**
  - Cash tips: Counted and distributed weekly
  - Electronic tips: Added to paychecks (next pay period)
- Requires tracking tips by date for distribution calculations

---

## Appendix A: API Reference

See `docs/API.md` for full API documentation.

---

## Appendix B: Database Schema

See `001_initial_schema.sql` for complete database schema.

### Key Schema Updates Based on Decisions:
- `menu_items.version` - For optimistic locking
- `events.series_id` - Links instances to parent series (recurring events)
- `event_registrations.status` - Include 'waitlist' option
- `points_transactions.expires_at` - Track 1-year rolling expiration
- `profiles.oauth_reminder_sent_at` - Track monthly OAuth nudges
- `menu_items.is_seasonal` - Flag seasonal items (staff-visible only)
- `orders.table_number` - For dine-in orders
- `orders.scheduled_for` - For after-hours orders scheduled for next opening

---

## Appendix C: User Research

### C.1 Customer Interviews (Dec 2025)
- 15 regular customers interviewed
- Top request: Mobile ordering (87%)
- Second: Event registration (73%)
- Third: Loyalty rewards (67%)

### C.2 Competitive Analysis
- Analyzed 5 similar cafe apps
- Avg. order flow: 5 steps (we target 4)
- Avg. load time: 3.2s (we target < 2s)
- None had event management integration

---

## Appendix D: Design Decision Log

### D.1 Why Guest Checkout with Signup at Checkout?
**Decision:** Allow unauthenticated users to build cart, require account creation only at checkout.

**Rationale:**
- Maximizes conversion (users can browse and build cart without friction)
- Reduces cart abandonment compared to forced early signup
- Account creation happens when user is committed (cart built, ready to buy)
- Tradeoff: Potential abandoned guest carts, but acceptable given low storage cost

**Alternatives considered:**
- Require account to add to cart: Too much friction for first-time users
- Full guest checkout: Complicates order history, loyalty points, event registration

---

### D.2 Why Over-Provision Capacity vs Waitlist Only?
**Decision:** Over-provision event capacity by 5% AND auto-waitlist overflow.

**Rationale:**
- 5% buffer handles race conditions without complex reservation logic
- Auto-waitlist ensures no one sees "Event full" error (better UX)
- Combines simplicity (buffer) with safety net (waitlist)
- Requires physical space buffer (confirm room capacity supports overflow)

**Alternatives considered:**
- Database transaction locks: Technically correct but complex retry logic
- Payment holds: Creates disappointment if capacity exceeded after "You're registered!" message

---

### D.3 Why Substring Search vs Fuzzy Search?
**Decision:** Simple substring matching (contains anywhere)

**Rationale:**
- Fast, predictable, easy to implement
- Good enough for menu size (~100-150 items)
- Finds 'latte' in 'Iced Vanilla Latte' intuitively
- Fuzzy search adds complexity and can return irrelevant results

**Tradeoff:**
- Won't catch typos ('ltae' won't find 'latte')
- Acceptable given small menu and visual browsing

---

### D.4 Why Separate Items for Hot/Iced vs Single Item with Customization?
**Decision:** Model Hot Latte and Iced Latte as separate menu items.

**Rationale:**
- Simpler queries and cart logic
- Dedicated images for each (iced drinks look different)
- Easier to price differently if needed
- Cleaner for staff (POS shows exact item ordered)

**Tradeoff:**
- More menu items (100 becomes ~150)
- Acceptable given pagination and filtering

---

### D.5 Why Payment-First vs Optimistic Order Creation?
**Decision:** Only create order record after successful payment.

**Rationale:**
- Prevents orphaned "pending" records
- Clean data (orders table only contains paid orders)
- No complex rollback/reversal logic
- Idempotency easier to handle

**Tradeoff:**
- If payment succeeds but DB write fails, need recovery logic
- Acceptable given Square webhooks as backup

---

**Document End**

---

## Appendix E: Architectural Decisions from Technical Interview

**Interview Date:** January 8, 2026
**Participants:** Product Owner, Technical Lead
**Scope:** Comprehensive technical implementation decisions covering UX/UI, operations, edge cases, and architectural tradeoffs

---

### E.1 Cart & Order Management

#### E.1.1 Cart Abandonment Recovery
**Decision:** Send recovery email after 24 hours, preserve cart for 7 days, send another recovery email, then clear cart 24 hours after.

**Rationale:**
- 24-hour initial delay prevents annoying customers who just need time to think
- 7-day preservation gives reasonable window without indefinite staleness
- Second email serves as final reminder before deletion
- Balances conversion recovery with cart freshness

**Implementation:**
- Scheduled job checks for carts older than 24 hours with no checkout
- Email template includes direct cart link for easy return
- Final deletion after 8 days total (7 days + 24 hour grace)

---

#### E.1.2 Customization Staleness Handling
**Decision:** Convert invalid customizations to special instructions when menu items change.

**Rationale:**
- Preserves customer intent even when exact options no longer available
- Prevents order failures and cart abandonment
- Staff can read special instructions and accommodate when possible
- Better UX than blocking checkout with errors

**Implementation:**
- When adding to cart, validate customizations against current menu_customizations
- If customization no longer exists (e.g., "Oat Milk" removed):
  - Convert to special instruction: "Customer requested: Oat Milk (no longer available)"
  - Alert customer: "Some customizations have changed. We've added notes for staff."
- Staff sees notes and can offer alternatives or substitutes

**Example:**
```
Original order: Iced Latte + Oat Milk (+$1.50)
After oat milk discontinued: Iced Latte + Special instructions: "Customer requested Oat Milk (discontinued)"
```

---

#### E.1.3 Order Modification Window
**Decision:** 2-minute window - customer can edit freely, then order is locked.

**Rationale:**
- Catches immediate mistakes (wrong size, forgot item)
- Short enough to not disrupt kitchen workflow
- Clear, predictable cutoff time
- After 2 minutes, kitchen may have already started prep

**Implementation:**
- Show countdown timer on order confirmation: "You have 1:45 to modify this order"
- "Edit Order" button active during window
- Can add/remove items, change customizations, adjust quantities
- Handle payment deltas via Square refund/charge APIs
- After 2 minutes: Show "Need changes? Call us at (XXX) XXX-XXXX"

**Post-2-Minute Additions:**
- Show "Add to In-Progress Order" button (from earlier interview decision)
- Allows adding items without canceling original order
- Creates new transaction for additional items
- Kitchen receives addendum notification

---

#### E.1.4 Pre-Order Lead Time
**Decision:** Event-synced - can order until event start time if registered for event.

**Rationale:**
- Ties ordering to event attendance (logical pairing)
- Reduces no-show orders (registered attendees are committed)
- Simpler than arbitrary time windows
- Works well for tournament players ordering lunch during event

**Implementation:**
- Check if user has active event registration for today
- If registered: Allow pre-order until event start time
- Order tagged with event ID for kitchen context
- Estimated prep time accounts for event timing
- For non-registered customers: Same-day only (default behavior)

**Display:**
```
"You're registered for Friday Night Magic starting at 6 PM.
Order now for pickup during the event!"
```

---

### E.2 Event Management

#### E.2.1 Event Capacity Display
**Decision:** Always show '24/32 + 5 waitlist' inline.

**Rationale:**
- Full transparency helps customers make informed decisions
- Seeing "5 waiting" indicates high demand, creates urgency
- Customers know their position if joining waitlist
- Reduces support questions about capacity

**Implementation:**
- Event card shows: "24/32 registered"
- When full: "32/32 registered + 5 waitlist"
- Color coding: Green (spots available), Yellow (filling up), Red (full + waitlist)

---

#### E.2.2 Event Overrun Policy
**Decision:** Announce 'last round' 30min before close, no new rounds after.

**Rationale:**
- Balances competitive integrity with staff scheduling
- Gives ongoing matches time to finish naturally
- Prevents mid-game interruptions
- Predictable for staff (known end time within reason)

**Implementation:**
- Tournament organizer announces: "Last round starting in 30 minutes"
- Games in progress allowed to finish
- Staff stays until natural conclusion (estimated +30-60min past close)
- Communicated to attendees during registration
- Staff compensated for extended hours

**Example Timeline:**
```
9:30 PM: "Last round announcement - 30 minutes!"
10:00 PM: Cafe officially closes, no new rounds
10:00-10:45 PM: Final games finish
10:45 PM: Event ends, staff closes
```

---

#### E.2.3 Waitlist Priority
**Decision:** Pure FIFO (first-in-first-served).

**Rationale:**
- Simplest and fairest
- No perception of favoritism
- Easy to communicate and implement
- Automatic queue management

**Implementation:**
- Waitlist ordered by registration timestamp
- When spot opens, notify first person on list
- 2-hour response window to claim spot
- If no response, move to next in line
- SMS + email + in-app notification for maximum reach

---

#### E.2.4 Stream VOD Access
**Decision:** Stream is saved for staff review to edit for highlights/reels/shorts/media.

**Rationale:**
- Content marketing value (create highlight reels, TikToks, YouTube Shorts)
- Staff can review for quality improvement
- Builds brand presence on social media
- Not customer-facing (privacy preserved)

**Implementation:**
- Auto-save all event streams to private storage
- Staff editor access only
- Create highlight packages for social media
- Obtain player consent via event registration terms
- Zone-wide signage: "Streaming area - by attending you consent to being recorded"

---

#### E.2.5 Prize Money Age Verification
**Decision:** Allow minors with uploaded parental consent form.

**Rationale:**
- Inclusive for competitive youth players
- Many top MTG players are under 18
- Parental consent transfers legal responsibility
- Grows competitive community

**Implementation:**
- Registration form includes age check
- If under 18: Require parental consent form upload
- Form template provided (downloadable PDF)
- Parent signs and uploads scanned copy
- Staff verifies authenticity (name matching, signature present)
- Prize paid to parent/guardian if minor wins

---

### E.3 Loyalty & Rewards Program

#### E.3.1 Points Value Model
**Decision:** Fixed dollar value - 100 points = $1.

**Rationale:**
- Simple mental math for customers
- Easy to communicate and display
- Predictable redemption value
- Industry standard (Starbucks uses similar model)

**Implementation:**
- Earn: 1 point per $1 spent (100 points per $100 order)
- Redeem: Apply points at checkout (1000 points = $10 off)
- Display: "You have 850 points ($8.50 value)"

---

#### E.3.2 Reward Scope (Free Drink Coverage)
**Decision:** Reward covers everything including add-ons (true 'any drink').

**Rationale:**
- Best customer experience
- Matches reward language ("any drink, any size")
- Eliminates confusion and nickel-and-diming
- Builds genuine loyalty through generosity

**Implementation:**
- "Free Drink" reward covers base + all customizations
- No upcharges for oat milk, extra shots, toppings
- Clear messaging: "Includes all sizes and add-ons"
- Accept higher reward cost as loyalty investment

**Tradeoff:**
- Higher cost per redemption (avg. $8 instead of $5)
- Acceptable as loyalty program is meant to reward best customers

---

#### E.3.3 Reward Visibility Strategy
**Decision:** Show all rewards with progress indicators ("X points away").

**Rationale:**
- Motivates earning (customers see what's achievable)
- Transparent and goal-oriented
- No artificial scarcity or hidden rewards
- Gamification without being pushy

**Implementation:**
- Reward catalog shows all tiers
- Locked rewards display: "250 points needed" (if user has 150 points)
- Progress bar: Visual indicator of completion percentage
- Unlock animation when user reaches threshold

**Example:**
```
[🔒] Free Specialty Drink - 300 points
     ▓▓▓▓▓▓▓▓▓▓░░░░░ 150 more points to unlock
```

---

#### E.3.4 Points Expiration Policy
**Decision:** FIFO rolling 12 months. Every 3 months send a point-balance email.

**Rationale:**
- Encourages regular redemption without punishing occasional customers
- 12 months is generous (industry standard is 6-12 months)
- FIFO ensures oldest points are used first (auto-managed)
- Quarterly emails keep customers engaged without spam

**Implementation:**
- Each points_transaction has `expires_at = created_at + 12 months`
- Redemptions deduct from oldest points first (FIFO queue)
- Quarterly scheduled email: "You have X points (Y expiring soon)"
- Warning at 11 months: "You have 500 points expiring in 30 days!"
- Daily cron job expires points and sends notifications

**Example Flow:**
```
Jan 2025: Earn 100 points (expires Jan 2026)
Jun 2025: Earn 200 points (expires Jun 2026)
Dec 2025: Redeem 150 points → deducts 100 from Jan, 50 from Jun
Jan 2026: Remaining 50 from Jan batch expires
```

---

#### E.3.5 Birthday Bonus Timing
**Decision:** Already specified in spec as 1 week grace period after birthdate.

**Confirmation:**
- Award 100 points on first login during birthday week
- No change needed to existing specification

---

#### E.3.6 Reward Redemption Stacking
**Decision:** Each person's items get their own discount (split bill first).

**Rationale:**
- Honors both customers' earned rewards fairly
- No margin erosion from full stacking (50% off risk)
- Prevents gaming system with groups
- Clear per-person redemption model

**Implementation:**
- Before checkout, prompt: "Is this a shared order?"
- If yes: Split items by customer
- Each customer applies their own rewards to their items only
- Two separate transactions or one split transaction
- POS shows itemized discounts per customer

**Example:**
```
Customer A items: $20 → applies 25% reward → $15
Customer B items: $18 → applies 25% reward → $13.50
Total: $28.50 (instead of $19 if fully stacked)
```

---

#### E.3.7 Referral Reward Timing
**Decision:** Tiered - 100 points at signup, 100 more after friend's first purchase.

**Rationale:**
- Immediate gratification encourages sharing
- Delayed second bonus ensures quality referrals
- Reduces fake account fraud (need real purchase)
- Balanced incentive structure

**Implementation:**
- User shares referral link: `questpoint.com/ref/abc123`
- Friend signs up via link → Referrer gets 100 points instantly
- Friend places first order → Referrer gets additional 100 points
- Both parties receive full 200-point value on completion
- Track via `referral_id` field in profiles table

---

### E.4 Customer Communication

#### E.4.1 Order Communication Channel
**Decision:** SMS with 2-minute response window, then staff calls.

**Rationale:**
- SMS is fastest and highest open rate (98%)
- 2-minute window allows quick customer response
- Phone call backup for non-responders or urgent issues
- Personal touch for problem resolution

**Implementation:**
- When order issue detected (out of ingredient, customization problem):
  1. Send SMS: "Hi [Name], we're out of oat milk for your latte. Reply 1 for almond milk, 2 for whole milk, or call us"
  2. Wait 2 minutes
  3. If no response, staff calls customer directly
  4. If no answer, leave voicemail and send follow-up email

**Requires:**
- Phone number collected during signup (required for order updates)
- SMS gateway integration (Twilio)

---

#### E.4.2 Email Frequency Management
**Decision:** Customer preference center - choose categories and frequency.

**Rationale:**
- Maximum personalization and control
- Prevents unsubscribes from email fatigue
- Respects different customer preferences
- Industry best practice

**Implementation:**
- Notification categories (4 independent toggles):
  1. **Order updates** - Status changes (ON by default)
  2. **Event reminders** - 24h and 1h before events (ON by default)
  3. **Points & rewards** - Milestones, new rewards (ON by default)
  4. **Marketing** - New menu items, promotions (OFF by default)

- Frequency settings per category:
  - Real-time (every notification)
  - Daily digest (batch into one email/day)
  - Weekly summary
  - Off

**User Interface:**
- Account Settings → Notifications
- Clear toggles with descriptions
- "Save Preferences" button
- Preview: "With these settings, you'll receive approximately X emails per week"

---

#### E.4.3 Product Recall Notification
**Decision:** In-app push notification + email.

**Rationale:**
- Multi-channel ensures customer sees critical safety info
- Digital-only keeps cost manageable
- Trackable and documentable for compliance
- Fast delivery (minutes not hours)

**Implementation:**
- Query orders table for affected items in last 7 days
- Send to all customers who ordered affected product
- Push notification: "URGENT: Product recall - [Item Name]"
- Email with full details, health advisory, refund info
- Log all sent notifications for compliance records

**Message Template:**
```
Subject: Important Safety Notice - [Product Name] Recall

Dear [Customer Name],

We've been notified of a recall affecting [Product Name] that you ordered on [Date].

Health Risk: [Brief description]
Action Required: [Dispose of product / Return for refund]
Refund: Full refund of $X.XX will be processed within 24 hours.

For questions, call us at (XXX) XXX-XXXX.

We sincerely apologize for any inconvenience.
```

---

#### E.4.4 Seasonal Menu Rotation Messaging
**Decision:** Countdown warnings - '3 days left!' badge on seasonal items.

**Rationale:**
- Creates urgency and drives final purchases
- Transparent (customers know when items leaving)
- Marketing opportunity (FOMO encourages orders)
- Sets expectations (no surprise removals)

**Implementation:**
- Staff sets `removal_date` when marking item seasonal
- 7 days before removal: Yellow badge "Leaving Soon"
- 3 days before: Orange badge "Last 3 Days!"
- Final day: Red badge "Last Day!"
- After removal: Item hidden from menu, archived in database

**Marketing:**
- Social media posts countdown
- Email to customers who previously ordered item
- "Seasonal Favorites" archive page (visible but not orderable)

---

### E.5 Payment & Financial Operations

#### E.5.1 Payment Failure Recovery
**Decision:** Combination - give customer refund option + background queue for retry.

**Rationale:**
- Customer empowerment (choose refund or wait)
- System resilience (auto-retry in background)
- Best of both approaches
- Reduces support burden

**Implementation:**
- When payment succeeds but order creation fails:
  1. Show modal: "Payment processed, but order failed to save. We're retrying..."
  2. Background job queues order creation with payment intent ID
  3. Retry every 30 seconds for 10 minutes
  4. If success: Send confirmation, charge customer
  5. If all retries fail: Offer choice
     - "Get Full Refund" (auto-process via Square)
     - "Wait for Manual Review" (staff will call within 1 hour)

**Database:**
- `pending_order_queue` table tracks failed orders
- Store: payment_intent_id, cart_data, user_id, timestamp
- Worker process checks queue every 30s

---

#### E.5.2 Offline Reward Redemption
**Decision:** Staff can manually approve, log in paper ledger.

**Rationale:**
- Exceptional customer service during outages
- Human override for edge cases
- Maintains goodwill during technical issues
- Paper trail for reconciliation

**Implementation:**
- POS offline mode allows staff to mark "Manual Reward Redemption"
- Staff records in paper ledger:
  - Customer name
  - Reward redeemed
  - Points deducted
  - Staff initials
  - Timestamp
- When system comes online, staff enters manual redemptions
- Reconciliation report flags discrepancies for manager review

**Tradeoff:**
- Fraud risk (requires staff training and trust)
- Acceptable for rare outages and high-value customer experience

---

#### E.5.3 Saved Payment Methods
**Decision:** Optional save - checkbox at checkout 'Remember for next time'.

**Rationale:**
- Customer chooses their own risk tolerance
- Opt-in reduces security concerns
- Balances convenience with compliance
- Industry standard pattern

**Implementation:**
- Checkout screen shows checkbox: "☐ Save card for future orders"
- If checked: Store tokenized card via Square Customer Vault
- Next checkout: Show saved card with last 4 digits
- Customer can remove saved cards in Account Settings
- All card data tokenized (PCI compliant)

---

#### E.5.4 Price Change Notification for Pre-Orders
**Decision:** Notify customer, let them confirm or cancel.

**Rationale:**
- Transparent and builds trust
- Avoids legal issues (bait-and-switch)
- Gives customer choice
- Honors original intent while acknowledging changes

**Implementation:**
- When menu prices update, check for pending pre-orders with old pricing
- Send notification: "Price Update for Your Order"
- Email shows:
  - Original price: $12.50
  - New price: $13.00
  - Difference: +$0.50
- Two buttons: "Confirm Order" or "Cancel Order"
- 48-hour response window
- If no response: Auto-cancel with email notification

---

#### E.5.5 Chargeback Dispute Strategy
**Decision:** Fight all chargebacks - auto-submit evidence package to bank.

**Rationale:**
- Deters fraud if customers know disputes will be contested
- Automated system reduces staff effort
- Even small chargebacks add up
- Protects business from serial fraud

**Implementation:**
- On chargeback notification from Square:
  1. Auto-gather evidence:
     - Order confirmation screenshot
     - Pickup signature/photo
     - Email/SMS receipts
     - Timestamp logs
  2. Auto-submit to Square/bank within 7 days
  3. No manual follow-up (accept automated win/loss)
- Staff notified of chargeback for internal tracking
- Flag customer account for review (potential ban if pattern)

---

#### E.5.6 Tip Distribution
**Decision:** Equal pool split among all clocked-in staff.

**Rationale:**
- Most egalitarian and fair
- Encourages teamwork (everyone invested in good service)
- No disputes over individual contributions
- Includes support staff (dishwashers, cleaners)

**Implementation:**
- Tips collected at checkout (15%, 18%, 20%, custom)
- Daily tip total calculated
- Divide by number of staff hours worked that day
- Cash tips: Counted and distributed weekly
- Electronic tips: Added to paychecks (next pay period)

**Example:**
```
Daily tips: $120
Staff A: 8 hours
Staff B: 6 hours
Staff C: 4 hours
Total hours: 18

Hourly tip rate: $120 / 18 = $6.67/hour

Staff A: $6.67 × 8 = $53.36
Staff B: $6.67 × 6 = $40.02
Staff C: $6.67 × 4 = $26.68
```

---

#### E.5.7 Tax-Exempt Organization Handling
**Decision:** Special account type - 'Non-Profit' accounts pre-approved, auto tax-exempt.

**Rationale:**
- Seamless repeat orders for approved organizations
- One-time verification reduces ongoing friction
- Secure (staff reviews certificate before approval)
- Scales well for repeat customers

**Implementation:**
- Organization submits tax-exempt certificate via email/upload
- Staff verifies authenticity:
  - Valid tax ID number
  - Matches organization name
  - Not expired
- Create "Non-Profit" account type in database
- Flag `is_tax_exempt = true`
- All future orders auto-exclude tax at checkout
- Annual renewal: Re-verify certificate (automated email reminder)

---

#### E.5.8 Catering Order Requirements
**Decision:** Combination - $150+ OR 20+ items, both require 24hr notice.

**Rationale:**
- Covers both high-dollar and high-quantity scenarios
- 24-hour notice gives kitchen adequate prep time
- Flexible thresholds serve different customer needs
- Prevents overwhelming kitchen with last-minute bulk orders

**Implementation:**
- Cart checks during checkout:
  - IF total >= $150 OR item_count >= 20:
    - Check order time vs pickup time
    - IF pickup_time - current_time < 24 hours:
      - Block checkout
      - Show message: "Large orders require 24-hour advance notice. Please schedule for [earliest_available_time]."
- Allow scheduling catering pickup time during checkout

---

### E.6 Inventory & Menu Management

#### E.6.1 Low Inventory Display
**Decision:** Show 'Limited availability' badge, allow orders.

**Rationale:**
- Creates urgency without artificial scarcity
- Transparent - customers aware of risk
- Maximizes sales opportunity
- Better than disappointing early hiding

**Implementation:**
- When `stock_quantity <= low_stock_threshold` (e.g., 2-5 units):
  - Display yellow badge: "⚠ Limited availability"
  - Allow add to cart
- When `stock_quantity = 0`:
  - Display red badge: "Out of stock"
  - Disable add to cart
  - Show "Notify me when available" button

**Inventory Sync:**
- Real-time webhook from Square on inventory changes
- Updates within 5 seconds of sale/restock
- Prevents overselling with high accuracy

---

#### E.6.2 TCG Product Inventory Display
**Decision:** Show exact counts ('3 left in stock') AND waitlist when out of stock.

**Rationale:**
- Exact counts create urgency for scarce items (sealed product releases)
- Transparency builds trust
- Waitlist captures demand for out-of-stock items
- Helps with restock planning

**Implementation:**
- Sealed products (booster boxes, precons):
  - Show exact count: "3 in stock"
  - When stock = 0: "Out of stock - Join Waitlist"
- Waitlist notification when restocked:
  - Send to all waitlisted customers
  - 48-hour priority purchase window
  - FIFO order (first on waitlist gets first opportunity)

**Example:**
```
Commander Masters Collector Booster Box - $279.99
[📦] 2 in stock - Order soon!

[Out of stock]
✉ Join Waitlist - We'll notify you when restocked
```

---

#### E.6.3 Menu Item Photography Standards
**Decision:** Staff can submit photos if they meet quality guidelines (lighting, angle, background).

**Rationale:**
- Faster than waiting for professional photographer
- Empowers staff to contribute
- Modern smartphones have excellent cameras
- Cost-effective for frequent menu changes

**Implementation:**
- Photo guidelines document:
  - Natural lighting or well-lit setting
  - 45-degree angle (shows drink/food best)
  - Neutral background (wood table, white surface)
  - No clutter or distractions
  - Minimum resolution: 1080x1080px
- Staff uploads via admin panel
- Manager reviews and approves before publishing
- Rejected photos include feedback for resubmission

**Professional Photography:**
- Reserved for signature items and marketing campaigns
- Quarterly photoshoot for new seasonal menu

---

#### E.6.4 Equipment Failure Menu Management
**Decision:** Staff manually marks items 'unavailable' via POS dashboard.

**Rationale:**
- Human judgment for complex situations (machine working intermittently)
- Staff know reality (equipment, ingredient shortages, staffing)
- Faster than waiting for automated systems
- No false positives from sensor errors

**Implementation:**
- POS dashboard shows all menu items
- Toggle button: "Available / Unavailable"
- When marked unavailable:
  - Item hidden from online menu immediately
  - Banner on item detail: "Temporarily unavailable"
- Staff can add note: "Espresso machine down, back by 2 PM"
- Auto-reminder every 2 hours: "Is [item] available again?"

---

#### E.6.5 TCG Card Condition Grading
**Decision:** Hybrid - customer reports, staff reviews, final grade is staff decision.

**Rationale:**
- Balances speed (customer starts process) with accuracy (staff verifies)
- Scalable for growing inventory
- Builds buyer trust (staff-verified grading)
- Efficient workflow

**Implementation:**
- Customer selling cards:
  1. Fills out form with self-assessed condition (NM, LP, MP, HP, DMG)
  2. Uploads photos (front, back, closeups of any damage)
- Staff reviews:
  1. Compares photos to grading standards
  2. Adjusts grade if necessary
  3. Provides feedback if significantly different
- Final grade published on listing
- Staff signature on grading (accountability)

**Grading Standards:**
- NM (Near Mint): No visible wear
- LP (Lightly Played): Minor edge wear, slight scratches
- MP (Moderately Played): Noticeable wear, light creasing
- HP (Heavily Played): Significant wear, creases, whitening
- DMG (Damaged): Major creases, tears, water damage

---

### E.7 Staff Operations

#### E.7.1 Inventory Shrinkage Investigation
**Decision:** Accept 10-15% shrinkage as normal, only investigate extremes.

**Rationale:**
- Realistic for busy cafe (breakage, comps, sampling)
- Low-overhead trust model
- Focuses investigation on actual problems (20%+ variance)
- Good staff morale (not micromanaged)

**Implementation:**
- Weekly inventory count
- Compare to expected (orders - sales - known comps)
- Variance under 15%: Note in log, no action
- Variance 15-25%: Manager investigates (check logs, ask staff)
- Variance over 25%: Formal investigation (camera review if needed)

**Tracked Separately:**
- High-value items (alcohol, sealed TCG): Lower threshold (5%)
- Low-value items (cups, napkins): Higher threshold (20%)

---

#### E.7.2 Cash Drawer Variance Handling
**Decision:** Manager investigates - intentional shortage = staff pays, error = house absorbs.

**Rationale:**
- Nuanced and fair approach
- Distinguishes honest mistakes from theft
- Staff not penalized for complex situations
- Manager oversight ensures fairness

**Implementation:**
- Closing process: Count cash, compare to expected
- Variance over $5: Fill out incident report
- Manager reviews:
  - Transaction logs
  - Video footage (if available and necessary)
  - Staff interview
- Decision:
  - Honest error (math mistake, wrong change): House absorbs
  - Negligence (didn't count before shift): Written warning, house absorbs first offense
  - Intentional (theft, pocketing): Staff pays + disciplinary action

---

#### E.7.3 Staff Schedule Conflict Resolution
**Decision:** Shift swap marketplace - staff find their own coverage, manager approves.

**Rationale:**
- Empowers staff to solve problems
- Builds collaboration and flexibility
- Reduces manager workload
- Still has oversight (manager approval)

**Implementation:**
- Staff app feature: "Shift Swap Board"
- Post shift: "Need coverage for Friday 4-9 PM"
- Other staff can claim shift
- Both parties agree
- Manager approves swap (ensures qualifications, no overtime issues)
- System updates schedule automatically

**Unclaimed Shifts:**
- If no swap within 48 hours: Escalate to manager
- Manager can:
  - Mandate coverage (rotation)
  - Offer incentive pay (1.5x for pickup)
  - Deny original PTO request if critical coverage

---

#### E.7.4 Staff Uniform Policy
**Decision:** Provide staff merchandise shop, let them choose different branded shirts/aprons/etc. Staff may purchase additional items if they would like. Any shirts sold to customers are also permissible for staff. Culture is more important than brand when it comes to staff uniforms. Provide 1 branded uniform free upon hire.

**Rationale:**
- Staff autonomy and comfort
- Brand consistency without rigidity
- Builds culture (staff can express personality)
- Cost-effective (staff can expand wardrobe if desired)

**Implementation:**
- New hire receives:
  - 1 branded T-shirt (choice of design)
  - 1 apron with logo
- Staff shop with discounted items:
  - Multiple shirt designs
  - Hoodies, hats, pins
  - 50% staff discount
- Dress code:
  - Must wear branded item (shirt, apron, or both)
  - Clean, appropriate, closed-toe shoes
  - No offensive graphics or text

---

#### E.7.5 Staff Training Requirements
**Decision:** Digital modules for compliance (food safety), shadowing for skills.

**Rationale:**
- Compliance covered with documentation
- Hands-on skills learned best through shadowing
- Balances legal requirements with practical training
- Cost-effective

**Implementation:**
- **Digital Modules (complete before first shift):**
  - Food safety certification (state-required)
  - Allergen awareness
  - Cash handling procedures
  - Sexual harassment prevention
  - Quiz required (80% pass)

- **Shadowing (first 2-3 shifts):**
  - POS system training
  - Drink preparation
  - Customer service standards
  - Event check-in process
  - Manager checklist: Sign off on competencies

---

### E.8 Customer Account Management

#### E.8.1 Account Signup Requirements
**Decision:** Email + First name required, phone and birthday optional for loyalty/communication, last name required for event registration for verification on attendance.

**Rationale:**
- Minimizes signup friction (only essentials required)
- Optional fields for enhanced features (birthday bonus, SMS)
- Last name needed for event check-in (staff verifies identity)
- Progressive data collection

**Implementation:**
- Signup form:
  - Email* (required)
  - First name* (required)
  - Last name (optional initially, required when registering for events)
  - Phone (optional, prompted for order updates)
  - Birthday (optional, prompted for loyalty bonus)

- Progressive prompts:
  - After first order: "Add your phone for order updates?"
  - In loyalty section: "Add your birthday for 100 bonus points!"
  - Before event registration: "We need your last name for check-in"

---

#### E.8.2 Login Security (New Device)
**Decision:** 2FA via authenticator app (Google Authenticator, Authy).

**Rationale:**
- Strongest security against account takeover
- Industry standard for security-conscious applications
- Protects customer payment methods and loyalty points
- One-time setup, minimal ongoing friction

**Implementation:**
- Optional 2FA (encouraged, not mandatory)
- Setup flow:
  1. Account Settings → Enable 2FA
  2. Scan QR code with authenticator app
  3. Enter 6-digit code to verify
  4. Backup codes generated (print/download)
- Login with 2FA:
  1. Enter email/password
  2. Prompted for 6-digit code from app
  3. Option: "Trust this device for 30 days"

**Incentive:**
- Offer 50 bonus points for enabling 2FA
- Monthly email reminders for accounts without 2FA

---

#### E.8.3 Account Banning Policy
**Decision:** Escalation - 1st warning → 30-day ban → permanent (manager approvals).

**Rationale:**
- Graduated response gives second chances
- Documented escalation (legal protection)
- Manager oversight prevents staff abuse
- Serious issues can skip to permanent (violence, threats)

**Implementation:**
- **Trigger events:**
  - Harassment of staff/customers
  - Chargebacks (3+ fraudulent)
  - Event disruption
  - Theft

- **Escalation Path:**
  1. **First incident:** Written warning (email + in-app)
     - Document incident in customer notes
     - Manager reviews and approves warning
  2. **Second incident:** 30-day account suspension
     - Cannot order or register for events
     - Manager contact: "One more incident = permanent ban"
  3. **Third incident:** Permanent ban
     - Account disabled
     - Store credit forfeited
     - Refund any pre-paid events

- **Serious incidents skip to permanent:**
  - Physical violence
  - Credible threats
  - Illegal activity

---

#### E.8.4 Account Deletion (GDPR)
**Decision:** Anonymize - convert to generic 'User_12345', keep order data.

**Rationale:**
- Complies with GDPR "right to be forgotten"
- Preserves business analytics and financial records
- True anonymization (no re-identification possible)
- Balances privacy and business needs

**Implementation:**
- User requests deletion via Account Settings
- Process:
  1. Anonymize profile:
     - Display name → `User_12345`
     - Email → `deleted_user_12345@internal.questpoint.com`
     - Phone → NULL
     - Birthday → NULL
  2. Delete: Favorites, event_registrations (non-financial)
  3. Retain: Orders, order_items, points_transactions (anonymized)
- Order history shows "Deleted User" but retains transaction data
- Email confirmation: "Your account has been deleted. Order history retained for 7 years per tax law."

---

#### E.8.5 Review Visibility and Moderation
**Decision:** Manager-only visibility - staff see anonymous, managers see identity.

**Rationale:**
- Balances accountability with retaliation prevention
- Managers can investigate serious claims
- Staff can't target reviewers
- Encourages honest feedback

**Implementation:**
- Customer leaves review (1-5 stars + comment)
- Staff dashboard shows:
  - Anonymous: "Customer left 1-star review: 'Drink was cold'"
  - Can post public response
- Manager dashboard shows:
  - Customer name and order history
  - Can contact customer privately for resolution
  - Can offer refund/store credit

---

#### E.8.6 Refund Request Handling
**Decision:** Manager discretion - case-by-case based on customer history.

**Rationale:**
- Flexible and human approach
- Can identify serial refunders
- Rewards loyal customers with benefit of doubt
- Prevents abuse while maintaining service

**Implementation:**
- Customer reports issue: "Report Issue" button on order
- Selects reason:
  - Wrong item
  - Quality issue (taste, temperature)
  - Missing item
  - Long wait time
- Manager reviews:
  - Customer refund history
  - Order photos/notes
  - Staff notes
- Decision:
  - **Approve:** Issue store credit or cash refund
  - **Partial:** Offer discount on next order
  - **Deny:** Explain reason, offer remake

**Auto-flags:**
- 3+ refund requests in 30 days → Flag for manager review
- Patterns (always same item) → Investigate

---

### E.9 Security & Privacy

#### E.9.1 Allergen Warning Display
**Decision:** Prominent badge on menu item + summary at checkout (no checkbox).

**Rationale:**
- Visible but non-blocking UX
- Customers see warnings without friction
- Balances safety with conversion
- Multi-touchpoint awareness (menu + checkout)

**Implementation:**
- Menu item card:
  - Orange badge: "Contains: Dairy, Nuts"
  - Icon indicators: 🥛 🥜
- Item detail page:
  - Allergen section with full list
  - "May contain traces of..." warnings
- Checkout summary:
  - Orange alert box if cart contains allergens:
    "⚠ Allergen Notice: Items in your cart contain Dairy, Nuts, Soy"
  - Not blocking (can proceed without checkbox)

**Legal Protection:**
- All menu items tagged with allergen flags
- Disclaimer in footer: "We cannot guarantee allergen-free preparation"
- Staff trained on cross-contamination risks

---

#### E.9.2 Stream Privacy and Consent
**Decision:** Zone-wide signage ("Zone A is streaming zone").

**Rationale:**
- Clear, visible consent mechanism
- Entering zone = implied consent
- Protects both business and customers
- Industry standard (sports venues, events)

**Implementation:**
- Physical signage at zone boundaries:
  - "STREAMING IN PROGRESS"
  - "By entering this area, you consent to being recorded"
  - QR code to privacy policy
- Event registration includes:
  - Checkbox: "I consent to being recorded during this event"
  - Required for competitive events
- Non-streaming areas:
  - Designated "off-camera" seating for privacy-conscious customers
  - Staff can accommodate requests to stay off-stream

---

#### E.9.3 User-Generated Content Rights
**Decision:** Implied consent - tagging cafe = permission to repost with credit.

**Rationale:**
- Fast and frictionless content sharing
- Industry standard (most customers expect this)
- Enables authentic social proof
- Still provides credit/attribution

**Implementation:**
- Terms of Service clause:
  - "By tagging @questpointcafe, you grant permission to share your content"
- Always credit original poster
  - "📷 by @username"
- If customer requests removal: Honor immediately (within 24hr)
- Never repost content with minors without explicit parent consent

---

### E.10 Support & Customer Service

#### E.10.1 Customer Support Ticket SLA
**Decision:** First response within 1hr, resolution varies by complexity.

**Rationale:**
- Shows immediate attention and care
- Buys time for complex investigations
- Sets realistic expectations
- Balances speed with quality

**Implementation:**
- Ticket categories:
  - Payment issues (high priority)
  - Order issues (medium priority)
  - General questions (low priority)

- SLA Targets:
  - First response: 1 hour (all tickets)
  - Resolution:
    - Simple (account questions): 2 hours
    - Medium (refunds, order issues): 4 hours
    - Complex (payment disputes): 24-48 hours

- Auto-response:
  - Immediate email: "We received your request and will respond within 1 hour"
  - Include ticket number

---

#### E.10.2 Lost and Found Policy
**Decision:** Tiered - high-value (phones, wallets) 90 days, low-value 30 days.

**Rationale:**
- Balances good faith with storage limitations
- Prioritizes important items
- Pragmatic for space management
- Clear communication prevents disputes

**Implementation:**
- Item intake:
  - Staff logs: Item description, location found, date, staff initials
  - Photo of item
  - Stored in locked cabinet

- Claiming process:
  - Customer describes item
  - Staff retrieves and verifies
  - ID required for high-value items

- Disposal timeline:
  - **High-value** (phones, wallets, jewelry, keys): 90 days → donate
  - **Medium-value** (notebooks, chargers, dice): 30 days → donate
  - **Low-value** (napkins, papers): 7 days → dispose

- Notification:
  - If item has ID (bag with name tag): Email customer
  - Social media post with vague description: "Found a blue notebook on 1/8"

---

#### E.10.3 Wi-Fi Access Policy
**Decision:** Receipt code - purchase unlocks 4 hours of Wi-Fi.

**Rationale:**
- Ties access to purchase (discourages camping without buying)
- 4 hours is reasonable for work/study session
- Encourages repeat purchases for extended stays
- Industry standard (Panera, Starbucks use similar)

**Implementation:**
- Receipt prints Wi-Fi code:
  - `Network: Questpoint_Guest`
  - `Password: [unique 8-char code]`
  - `Valid for 4 hours from [timestamp]`

- Landing page after connecting:
  - "Welcome! Your Wi-Fi access expires at [time]"
  - "Need more time? Make another purchase for extended access"

- Auto-disconnect after 4 hours:
  - Redirect to page: "Wi-Fi expired. Order again for more access"

---

#### E.10.4 Parking Validation
**Decision:** On case-by-case basis, allowing parking garage to set validation limits.

**Rationale:**
- Defers to parking partner's policy
- Flexible based on partnership terms
- Staff can validate exceptional cases
- Avoids overpromising benefits

**Implementation:**
- Partner with nearby garage
- Negotiate validation terms (e.g., 2 hours free with $5+ purchase)
- Staff validates parking ticket at register
- Track validation usage for partnership review

**Exceptional Cases:**
- Events: Full validation for event attendees (included in fee)
- Catering: Full validation for large orders ($100+)
- VIP/regulars: Manager discretion for extended validation

---

#### E.10.5 Nutrition Information Display
**Decision:** Behind info icon - tap to see full nutrition panel.

**Rationale:**
- Clean default UI (not cluttered)
- Info available for those who need it
- Accessibility (allergens always visible, calories opt-in)
- Compliant with labeling laws

**Implementation:**
- Menu item card:
  - Allergen badges visible (🥛 Dairy, 🥜 Nuts)
  - Info icon (ⓘ) - tap to expand
- Expanded panel shows:
  - Calories: 240
  - Caffeine: 95mg
  - Sugar: 18g
  - Protein: 8g
  - Full allergen list
  - Dietary tags: Vegetarian, Vegan, Gluten-Free options

---

### E.11 Advanced Features & Workflows

#### E.11.1 Order Templates and Reordering
**Decision:** No templates, but 'Reorder' button on order history.

**Rationale:**
- Quick repeat without explicit saving
- Encourages menu exploration (see full menu each time)
- Simpler UX than template management
- Still provides convenience for regulars

**Implementation:**
- Order history shows "Reorder" button on each past order
- Clicking "Reorder":
  1. Show confirmation: "Add these items to cart?"
  2. Lists all items from original order
  3. User confirms
  4. Items added to cart (can modify before checkout)

**Validation:**
- Check if items still available
- Check if prices changed
- Alert user to changes before adding to cart

---

#### E.11.2 Menu Popularity Indicators
**Decision:** Real-time daily counters - '🔥 12 ordered today'.

**Rationale:**
- Creates social proof and urgency
- Helps indecisive customers
- Accurate (reflects current popularity)
- Engaging UX (dynamic, not static)

**Implementation:**
- Track orders per menu item per day
- Display badge when count >= 5:
  - "🔥 12 ordered today"
  - Color intensity based on count (yellow → orange → red)
- Reset counter daily at midnight
- Top 3 items of the day highlighted on homepage

**Analytics:**
- Use data for:
  - Inventory planning (prep more of popular items)
  - Menu optimization (promote/discontinue items)
  - Staff scheduling (predict busy periods)

---

#### E.11.3 Gift Card System
**Decision:** Both physical and digital - customer chooses at purchase.

**Rationale:**
- Maximum flexibility for gift-givers
- Physical for holidays/birthdays (tangible gift)
- Digital for last-minute/remote gifts
- Serves all use cases

**Implementation:**
- Purchase flow:
  1. Select amount ($10, $25, $50, $100, custom)
  2. Choose type: Physical or Digital
  3. Enter recipient info (name, email for digital)
  4. Add message (optional)
  5. Pay

- **Physical cards:**
  - Printed card with unique code
  - Available for pickup at counter
  - Can reload online

- **Digital codes:**
  - Sent via email immediately
  - Recipient gets code + redemption link
  - Add to account as store credit

---

#### E.11.4 Party Package Pricing
**Decision:** Tiered packages with cafe discretion for boundary customers.

**Rationale:**
- Clear options simplify decision
- Tiered pricing encourages upsells
- Discretion prevents forcing awkward upgrades (9 people paying for 15)
- Balances revenue with customer satisfaction

**Implementation:**
- **Package Tiers:**
  1. **Silver** - $150 for up to 8 people
     - 2-hour private space
     - 1 drink per person
     - 1 snack per person

  2. **Gold** - $250 for up to 15 people
     - 3-hour private space
     - 1 drink + 1 snack per person
     - Event host assistance (tournament organization)

  3. **Platinum** - $400 for up to 25 people
     - 4-hour private space
     - Unlimited drinks (coffee, soda)
     - Food platters (sandwiches, snacks)
     - Dedicated staff member
     - Stream setup for event

- **Boundary Cases:**
  - Customer wants 9 people in Silver (8-person package):
    - Offer: Pay $150 + $20 per additional person ($170 total)
    - OR upgrade to Gold for $250 (better value if 11+)
  - Manager discretion for pricing

---

#### E.11.5 Prep Time Estimation
**Decision:** ML model trained on historical order completion times.

**Rationale:**
- Most accurate predictions
- Accounts for time of day, day of week, item complexity, queue depth
- Improves over time with more data
- Better customer satisfaction (accurate ETAs)

**Implementation:**
- **Training Data:**
  - Order timestamp
  - Items and customizations
  - Start prep timestamp
  - Ready timestamp
  - Time of day, day of week
  - Queue depth at order time

- **Model:**
  - Predict prep time based on features
  - Update predictions every 2 weeks with new data
  - Fallback to static averages if model unavailable

- **Display:**
  - "Your order will be ready in 15-18 minutes"
  - Update in real-time if estimate changes
  - Push notification when actually ready

---

### E.12 Health, Safety & Compliance

#### E.12.1 Health Inspection Logging
**Decision:** Automated sensors for temps, staff manually log cleaning tasks.

**Rationale:**
- Removes human error on critical temps (food safety)
- Automated logging creates perfect audit trail
- Staff log what sensors can't track (handwashing, cleaning)
- Balances automation with practicality

**Implementation:**
- **Automated Sensors:**
  - Fridge/freezer temps logged every 15 minutes
  - Alert if out of range (fridge >40°F, freezer >0°F)
  - Data stored in cloud for inspections

- **Manual Logs (digital):**
  - Staff use tablet to log:
    - Handwashing (after bathroom, before shift)
    - Surface cleaning (tables, counters)
    - Equipment sanitizing
  - Timestamped and staff-signed

- **Health Inspection:**
  - Print last 30 days of logs
  - Show inspector real-time dashboard

---

### E.13 Implementation Priority & Phasing

Based on the interview findings, the following features should be prioritized:

#### Immediate Implementation (Phase 1 - MVP)
- Cart abandonment recovery emails
- Customization staleness handling
- Event capacity inline display (with waitlist)
- Points value model (100 pts = $1)
- Reward progress indicators
- SMS order communications
- Birthday bonus (existing spec)

#### Post-MVP (Phase 2)
- ML prep time estimation
- Menu popularity indicators
- Gift card system (both physical and digital)
- Party package booking
- Staff shift swap marketplace
- Advanced analytics and reporting

#### Future Phases (Phase 3+)
- Automated health inspection compliance
- Advanced fraud detection
- Customer segmentation and personalization
- Multi-location support (franchise)

---

## Appendix F: Success Metrics by Feature

Based on interview decisions, track these metrics post-launch:

### Cart & Order Management
- Cart abandonment recovery email open rate (target: 40%+)
- Cart abandonment recovery conversion rate (target: 15%+)
- Order modification usage within 2-minute window (target: 5% of orders)
- Pre-order lead time distribution (measure event-synced usage)

### Event Management
- Waitlist conversion rate (waitlist → registered when spot opens) (target: 60%+)
- Event overrun frequency (events ending >1hr past close) (target: <10%)
- Event check-in method split (QR code vs name lookup)

### Loyalty & Rewards
- Reward redemption rate (target: 40% of earned points redeemed)
- Birthday bonus claim rate (target: 70% of eligible users)
- Referral program participation (target: 20% of users share link)
- Points expiration rate (target: <10% of points expire unclaimed)

### Communication & Support
- SMS response rate (target: 80% respond within 2min)
- Email preference center usage (target: 30% of users customize)
- Support ticket first response SLA adherence (target: 95% within 1hr)

### Financial Operations
- Payment failure recovery success rate (target: 80% recovered)
- Chargeback win rate (target: 60% successfully contested)
- Tax-exempt account usage (target: 10+ approved organizations)
- Catering order volume (target: 5% of total orders)

---

**Interview Summary:**
This appendix documents 90+ architectural decisions made during a comprehensive stakeholder interview covering UX/UI tradeoffs, operational workflows, edge case handling, security considerations, and business policy definitions. These decisions provide implementation guidance for engineers and establish clear business rules for the Questpoint Cafe platform.

**Last Updated:** January 8, 2026
**Interview Duration:** 13 rounds, 52 questions across all operational domains

---

**Revision History:**
- v1.0 (Jan 7, 2026): Initial specification
- v2.0 (Jan 7, 2026): Comprehensive update with detailed implementation decisions based on stakeholder interview
- v2.1 (Jan 8, 2026): Added Appendix E - Architectural Decisions from Technical Interview (90+ decisions documented)
