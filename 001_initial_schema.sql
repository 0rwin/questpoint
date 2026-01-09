-- Questpoint Cafe Database Schema
-- Run this migration in Supabase SQL Editor or via CLI

-- ============================================
-- EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
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

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- MENU ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(is_featured);

-- ============================================
-- MENU CUSTOMIZATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS menu_customizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('size', 'milk', 'sweetness', 'topping', 'extra')),
  options JSONB NOT NULL, -- [{name: "Small", price_modifier: 0}, ...]
  is_required BOOLEAN DEFAULT FALSE,
  max_selections INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_menu_customizations_item ON menu_customizations(menu_item_id);

-- ============================================
-- EVENTS
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);

-- ============================================
-- EVENT REGISTRATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'waitlist', 'cancelled', 'attended')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  notes TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user ON event_registrations(user_id);

-- Trigger to update registration count
CREATE OR REPLACE FUNCTION update_event_registration_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events SET current_registrations = current_registrations + 1 WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events SET current_registrations = current_registrations - 1 WHERE id = OLD.event_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_event_count ON event_registrations;
CREATE TRIGGER update_event_count
  AFTER INSERT OR DELETE ON event_registrations
  FOR EACH ROW EXECUTE FUNCTION update_event_registration_count();

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id),
  name TEXT NOT NULL, -- Denormalized for history
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  customizations JSONB, -- Selected options
  special_instructions TEXT,
  subtotal DECIMAL(10,2) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ============================================
-- RETAIL PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(is_available);

-- ============================================
-- FAVORITES
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, menu_item_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- ============================================
-- POINTS TRANSACTIONS
-- ============================================
CREATE TABLE IF NOT EXISTS points_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- Positive for earn, negative for redeem
  type TEXT NOT NULL CHECK (type IN ('purchase', 'redemption', 'bonus', 'referral', 'event', 'adjustment')),
  description TEXT,
  order_id UUID REFERENCES orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_points_transactions_user ON points_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_points_transactions_created ON points_transactions(created_at DESC);

-- Trigger to update user points
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles 
  SET 
    points = points + NEW.amount,
    lifetime_points = CASE WHEN NEW.amount > 0 THEN lifetime_points + NEW.amount ELSE lifetime_points END,
    updated_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_points ON points_transactions;
CREATE TRIGGER update_points
  AFTER INSERT ON points_transactions
  FOR EACH ROW EXECUTE FUNCTION update_user_points();

-- ============================================
-- REWARDS CATALOG
-- ============================================
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  points_required INTEGER NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('free_item', 'discount', 'percentage_off')),
  reward_value JSONB NOT NULL, -- {item_id: '...'} or {discount: 10.00} or {percentage: 15}
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- ============================================
-- STREAM SCHEDULE
-- ============================================
CREATE TABLE IF NOT EXISTS stream_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  stream_type TEXT CHECK (stream_type IN ('mtg', 'console', 'board_game', 'special')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 120,
  platform TEXT DEFAULT 'twitch',
  is_live BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stream_schedule_date ON stream_schedule(scheduled_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE stream_schedule ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- MENU ITEMS: Public read
CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (true);

-- MENU CUSTOMIZATIONS: Public read
CREATE POLICY "Customizations are viewable by everyone" ON menu_customizations
  FOR SELECT USING (true);

-- EVENTS: Public read
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

-- EVENT REGISTRATIONS: Users can manage their own
CREATE POLICY "Users can view own registrations" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" ON event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel own registrations" ON event_registrations
  FOR UPDATE USING (auth.uid() = user_id);

-- ORDERS: Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- ORDER ITEMS: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- PRODUCTS: Public read
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- FAVORITES: Users can manage their own
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- POINTS TRANSACTIONS: Users can view their own
CREATE POLICY "Users can view own points" ON points_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- REWARDS: Public read
CREATE POLICY "Rewards are viewable by everyone" ON rewards
  FOR SELECT USING (true);

-- STREAM SCHEDULE: Public read
CREATE POLICY "Stream schedule is viewable by everyone" ON stream_schedule
  FOR SELECT USING (true);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
