-- Questpoint Cafe Seed Data
-- Run this after the initial migration to populate test data

-- ============================================
-- MENU ITEMS - Based on questpoint_cafe_complete_offerings.md
-- ============================================

-- COFFEE
INSERT INTO menu_items (name, slug, description, price, category, subcategory, is_available, is_featured, is_seasonal, caffeine_level, sort_order) VALUES
('Black Lotus Latte', 'black-lotus-latte', 'Dark cocoa infused espresso with activated charcoal and edible gold dust. A legendary brew for true connoisseurs.', 6.50, 'coffee', 'signature', true, true, true, 'high', 1),
('Eldrazi Mist', 'eldrazi-mist', 'Earl grey latte with lavender vanilla foam. Ethereal and calming, with hints of mystery.', 5.75, 'coffee', 'signature', true, true, true, 'medium', 2),
('Planeswalker Brew', 'planeswalker-brew', 'Our signature house blend with notes of dark chocolate and cherry. Bold enough to cross dimensions.', 3.50, 'coffee', 'classics', true, false, false, 'high', 3),
('Mox Mocha', 'mox-mocha', 'Rich espresso with premium dark chocolate and steamed milk. A treasure in every cup.', 5.25, 'coffee', 'classics', true, false, false, 'high', 4),
('Caramel Macchiato', 'caramel-macchiato', 'Classic espresso with vanilla syrup, steamed milk, and caramel drizzle.', 5.50, 'coffee', 'classics', true, false, false, 'high', 5),
('Cold Brew', 'cold-brew', 'Slow-steeped for 20 hours. Smooth, bold, and incredibly refreshing.', 4.50, 'coffee', 'cold', true, false, false, 'high', 6),
('Iced Vanilla Latte', 'iced-vanilla-latte', 'Espresso over ice with vanilla and your choice of milk.', 5.25, 'coffee', 'cold', true, false, false, 'high', 7),
('Drip Coffee', 'drip-coffee', 'Freshly brewed single-origin coffee. Ask about today''s selection.', 2.75, 'coffee', 'classics', true, false, false, 'medium', 8),
('Americano', 'americano', 'Espresso with hot water. Bold and pure.', 3.25, 'coffee', 'classics', true, false, false, 'high', 9),
('Cappuccino', 'cappuccino', 'Equal parts espresso, steamed milk, and foam. Italian perfection.', 4.75, 'coffee', 'classics', true, false, false, 'high', 10);

-- BOBA
INSERT INTO menu_items (name, slug, description, price, category, subcategory, is_available, is_featured, is_seasonal, caffeine_level, sort_order) VALUES
('Mana Potion Boba', 'mana-potion-boba', 'Butterfly pea flower tea with honey boba and a splash of lemonade. Changes color when you add citrus!', 7.25, 'boba', 'signature', true, true, false, 'low', 20),
('Health Potion Boba', 'health-potion-boba', 'Hibiscus and rose tea with strawberry popping pearls. Refreshing and revitalizing.', 7.25, 'boba', 'signature', true, false, false, 'none', 21),
('Taro Milk Tea', 'taro-milk-tea', 'Creamy taro root blended with jasmine milk tea and tapioca pearls.', 6.50, 'boba', 'milk-tea', true, false, false, 'low', 22),
('Brown Sugar Milk Tea', 'brown-sugar-milk-tea', 'Tiger-striped caramelized brown sugar with fresh milk and chewy boba.', 7.00, 'boba', 'milk-tea', true, false, false, 'low', 23),
('Classic Pearl Milk Tea', 'classic-pearl-milk-tea', 'Traditional black milk tea with tapioca pearls. A timeless favorite.', 5.75, 'boba', 'milk-tea', true, false, false, 'medium', 24),
('Matcha Milk Tea', 'matcha-milk-tea', 'Premium ceremonial grade matcha with oat milk and honey boba.', 6.75, 'boba', 'milk-tea', true, false, false, 'medium', 25),
('Thai Tea', 'thai-tea', 'Strongly brewed Ceylon tea with condensed milk and tapioca pearls.', 6.25, 'boba', 'milk-tea', true, false, false, 'high', 26),
('Passion Fruit Green Tea', 'passion-fruit-green-tea', 'Light and refreshing green tea with passion fruit and lychee popping boba.', 6.50, 'boba', 'fruit-tea', true, false, false, 'low', 27),
('Mango Slush', 'mango-slush', 'Fresh mango blended with ice and coconut jelly. Tropical paradise.', 6.75, 'boba', 'slush', true, false, false, 'none', 28),
('Strawberry Milk Tea', 'strawberry-milk-tea', 'Sweet strawberry with creamy milk tea and crystal boba.', 6.50, 'boba', 'milk-tea', true, false, false, 'low', 29);

-- SMOOTHIES
INSERT INTO menu_items (name, slug, description, price, category, subcategory, is_available, is_featured, is_seasonal, caffeine_level, sort_order) VALUES
('Tropical Smoothie', 'tropical-smoothie', 'Mango, pineapple, and coconut blended with a hint of lime.', 7.50, 'smoothie', 'fruit', true, false, false, 'none', 40),
('Berry Blast', 'berry-blast', 'Mixed berries, banana, and Greek yogurt. Packed with antioxidants.', 7.50, 'smoothie', 'fruit', true, false, false, 'none', 41),
('Green Power', 'green-power', 'Spinach, banana, mango, and almond butter. Fuel for champions.', 8.00, 'smoothie', 'wellness', true, false, false, 'none', 42),
('PB&J Smoothie', 'pbj-smoothie', 'Peanut butter, strawberry, banana, and oat milk. Nostalgic comfort.', 7.75, 'smoothie', 'indulgent', true, false, false, 'none', 43),
('Açaí Bowl Smoothie', 'acai-bowl-smoothie', 'Thick açaí blend with granola and fresh berries on top.', 9.50, 'smoothie', 'wellness', true, false, false, 'none', 44);

-- SPECIALTY
INSERT INTO menu_items (name, slug, description, price, category, subcategory, is_available, is_featured, is_seasonal, caffeine_level, sort_order) VALUES
('Jinx''s Chaos Slush', 'jinxs-chaos-slush', 'Electric blue energy drink with popping boba and citrus burst. Chaotic energy in a cup.', 6.75, 'specialty', 'gaming', true, true, true, 'high', 60),
('Lux''s Radiance', 'luxs-radiance', 'Gold-shimmer lemonade with edible glitter and elderflower. Brilliant and refreshing.', 6.00, 'specialty', 'gaming', true, false, true, 'none', 61),
('Pikachu Thunder', 'pikachu-thunder', 'Yellow mango with electric blue swirl, passion fruit popping boba.', 7.00, 'specialty', 'gaming', true, false, true, 'none', 62),
('Forest Guardian Matcha', 'forest-guardian-matcha', 'Layered matcha with vanilla cream and mint chocolate pieces.', 7.50, 'specialty', 'gaming', true, false, true, 'medium', 63),
('Phoenix Rising', 'phoenix-rising', 'Spicy mango with chili-lime rim and dragon fruit. Rise from the ashes.', 7.25, 'specialty', 'gaming', true, false, true, 'none', 64);

-- FOOD
INSERT INTO menu_items (name, slug, description, price, category, subcategory, is_available, is_featured, is_seasonal, caffeine_level, sort_order) VALUES
('Orc-Slayer Sandwich', 'orc-slayer-sandwich', 'Triple-decker roast beef with spicy horseradish and smoked gouda on toasted sourdough.', 12.00, 'food', 'sandwiches', true, false, false, 'none', 80),
('Takoyaki (6 pcs)', 'takoyaki', 'Crispy octopus balls with bonito flakes, Japanese mayo, and okonomiyaki sauce.', 8.50, 'food', 'snacks', true, false, false, 'none', 81),
('Soft Pretzel', 'soft-pretzel', 'Warm Bavarian pretzel with beer cheese dip and honey mustard.', 6.50, 'food', 'snacks', true, false, false, 'none', 82),
('Onigiri (2 pcs)', 'onigiri', 'Japanese rice balls with your choice of filling: salmon, tuna mayo, or umeboshi.', 5.00, 'food', 'snacks', true, false, false, 'none', 83),
('Loaded Nachos', 'loaded-nachos', 'Tortilla chips with cheese, jalapeños, sour cream, and guacamole.', 10.00, 'food', 'shareable', true, false, false, 'none', 84),
('Mochi Ice Cream (3 pcs)', 'mochi-ice-cream', 'Assorted flavors: green tea, strawberry, and mango.', 6.00, 'food', 'desserts', true, false, false, 'none', 85),
('Croissant', 'croissant', 'Buttery, flaky croissant. Plain or chocolate filled.', 4.00, 'food', 'pastries', true, false, false, 'none', 86),
('Avocado Toast', 'avocado-toast', 'Smashed avocado on sourdough with everything bagel seasoning and cherry tomatoes.', 9.00, 'food', 'breakfast', true, false, false, 'none', 87);

-- ============================================
-- EVENTS
-- ============================================
INSERT INTO events (title, slug, description, event_type, event_date, fee, max_capacity, is_featured, is_recurring, recurrence_pattern) VALUES
('Friday Night Magic', 'friday-night-magic', 'Modern format tournament. All skill levels welcome. Prize support for top finishers. Bring your own deck or use one of our loaners.', 'tournament', '2026-01-03 18:00:00+00', 10.00, 32, true, true, 'weekly:friday'),
('Commander League Night', 'commander-league', 'Monthly Commander league with point tracking. Earn points for plays, not just wins. Prizes for top players at month end.', 'tournament', '2026-01-04 18:30:00+00', 5.00, 24, false, true, 'weekly:saturday'),
('Board Game Social', 'board-game-social', 'Free play for all library games. No entry fee. Staff available to teach new games. Snacks and drinks available for purchase.', 'social', '2026-01-07 17:00:00+00', 0.00, NULL, false, true, 'weekly:tuesday'),
('Midnight Launch: Duskmourn', 'midnight-launch-duskmourn', 'Exclusive early access to the newest MTG set. Pre-release sealed event at midnight. Includes 6 booster packs and promo card.', 'launch', '2026-01-27 23:59:00+00', 35.00, 48, true, false, NULL),
('Anime Watch Party: Demon Slayer', 'anime-watch-party-demon-slayer', 'Join us for the season premiere! Themed drinks available. Cosplay encouraged. Projector screening on the big screen.', 'social', '2026-01-15 19:00:00+00', 0.00, 30, false, false, NULL),
('League of Legends Tournament', 'league-tournament', '5v5 tournament on our gaming PCs. Solo queue or bring your team. Cash prizes for 1st and 2nd place.', 'tournament', '2026-01-18 14:00:00+00', 15.00, 40, false, false, NULL),
('Pokemon TCG League', 'pokemon-tcg-league', 'Weekly Pokemon trading card game meetup. All ages welcome. Trading encouraged!', 'social', '2026-01-05 14:00:00+00', 0.00, 20, false, true, 'weekly:sunday'),
('D&D One-Shot Night', 'dnd-one-shot', 'Drop-in D&D sessions. No experience needed - we provide characters and teach the rules. Adventure awaits!', 'social', '2026-01-08 18:00:00+00', 0.00, 6, false, true, 'weekly:wednesday');

-- ============================================
-- REWARDS
-- ============================================
INSERT INTO rewards (name, description, points_required, reward_type, reward_value, is_active, sort_order) VALUES
('Free Boba Topping', 'Add any topping to your boba drink - tapioca, popping boba, coconut jelly, and more!', 250, 'free_item', '{"type": "topping", "value": "any"}', true, 1),
('Free Pastry', 'Any pastry from our bakery case - croissants, muffins, scones, and more.', 500, 'free_item', '{"type": "pastry", "value": "any"}', true, 2),
('Free Drink (Any Size)', 'Any drink on our menu, any size. Go big or go home!', 1000, 'free_item', '{"type": "drink", "value": "any"}', true, 3),
('$10 Off Retail', 'Save $10 on TCG products, accessories, or merchandise.', 2500, 'discount', '{"amount": 10.00}', true, 4),
('Free Event Entry', 'One free entry to any paid event (up to $15 value).', 1500, 'discount', '{"amount": 15.00, "type": "event"}', true, 5),
('Birthday Reward', 'Free drink during your birthday month! Make sure your birthday is in your profile.', 0, 'free_item', '{"type": "drink", "value": "any", "condition": "birthday_month"}', true, 10);

-- ============================================
-- RETAIL PRODUCTS (Sample)
-- ============================================
INSERT INTO products (name, slug, description, price, category, subcategory, sku, stock_quantity, is_available) VALUES
('MTG Duskmourn: House of Horror Collector Booster', 'mtg-duskmourn-collector-booster', 'One collector booster pack from the Duskmourn: House of Horror set.', 24.99, 'tcg', 'mtg', 'MTG-DSK-CB-001', 50, true),
('MTG Duskmourn: House of Horror Draft Booster Box', 'mtg-duskmourn-draft-box', '36 draft booster packs. Perfect for draft night with friends.', 129.99, 'tcg', 'mtg', 'MTG-DSK-DB-BOX', 12, true),
('Pokemon Scarlet & Violet Elite Trainer Box', 'pokemon-sv-etb', 'Elite Trainer Box with 9 booster packs, sleeves, and accessories.', 49.99, 'tcg', 'pokemon', 'PKM-SV-ETB-001', 20, true),
('Ultra Pro Eclipse Sleeves (100 ct)', 'ultra-pro-eclipse-sleeves', 'Matte finish card sleeves. Available in multiple colors.', 12.99, 'accessories', 'sleeves', 'ACC-SLV-UPE-001', 100, true),
('Chessex 7-Die Polyhedral Set', 'chessex-dice-set', 'Complete RPG dice set: d4, d6, d8, d10, d10%, d12, d20.', 9.99, 'dice', 'polyhedral', 'DICE-CHX-7SET', 75, true),
('Questpoint Cafe T-Shirt', 'questpoint-tshirt', 'Official Questpoint Cafe t-shirt with logo. Soft cotton blend.', 25.00, 'merch', 'apparel', 'MERCH-TSH-001', 30, true),
('Questpoint Cafe Mug', 'questpoint-mug', '12oz ceramic mug with Questpoint logo. Microwave and dishwasher safe.', 15.00, 'merch', 'drinkware', 'MERCH-MUG-001', 40, true),
('Ultra Pro Playmat', 'ultra-pro-playmat', '24" x 13.5" gaming playmat. Rubber backing, cloth top.', 19.99, 'accessories', 'playmats', 'ACC-MAT-UP-001', 25, true);

-- ============================================
-- STREAM SCHEDULE (Sample)
-- ============================================
INSERT INTO stream_schedule (title, description, stream_type, scheduled_at, duration_minutes, platform, is_live) VALUES
('Friday Night Magic Stream', 'Watch the FNM tournament live! Commentary and deck techs.', 'mtg', '2026-01-03 18:00:00+00', 240, 'twitch', false),
('Saturday Commander Games', 'Casual Commander games with viewer interaction.', 'mtg', '2026-01-04 14:00:00+00', 180, 'twitch', false),
('Cozy Gaming Sunday', 'Chill vibes and cozy games. Chat with us!', 'console', '2026-01-05 12:00:00+00', 180, 'twitch', false);
