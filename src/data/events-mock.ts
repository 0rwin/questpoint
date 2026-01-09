/**
 * Mock Event Data
 *
 * This file contains mock events for development and testing.
 * When SUPABASE_ENABLED = true, the app will query the database instead.
 */

export type EventType = 'tournament' | 'social' | 'launch' | 'private' | 'recurring';
export type RegistrationStatus = 'registered' | 'waitlist' | 'cancelled' | 'attended';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventType: EventType;
  eventDate: string;
  endDate?: string;
  fee: number;
  maxCapacity: number | null;
  currentRegistrations: number;
  imageUrl?: string;
  isFeatured: boolean;
  isRecurring: boolean;
  recurrencePattern?: string;
  prizeSupport?: string;
  requirements?: string[];
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  registeredAt: string;
}

// Mock events
export const MOCK_EVENTS: Event[] = [
  {
    id: 'evt_1',
    title: 'Friday Night Magic',
    slug: 'friday-night-magic',
    description: 'Our weekly Friday Night Magic tournament featuring Modern format. All skill levels welcome! Prize support includes booster packs for top finishers and random door prizes throughout the night. Bring your best deck and compete with the local community.',
    eventType: 'tournament',
    eventDate: '2026-01-10T18:00:00',
    endDate: '2026-01-10T23:00:00',
    fee: 10.0,
    maxCapacity: 32,
    currentRegistrations: 18,
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=800',
    isFeatured: true,
    isRecurring: true,
    recurrencePattern: 'Every Friday at 6:00 PM',
    prizeSupport: 'Booster packs for top 8, door prizes',
    requirements: ['Modern-legal deck', 'DCI number (optional)'],
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'evt_2',
    title: 'Midnight Launch: Duskmourn',
    slug: 'midnight-launch-duskmourn',
    description: 'Exclusive early access to the newest MTG set "Duskmourn: House of Horror"! Pre-release sealed event starting at midnight. Each entry includes 6 booster packs, exclusive promo card, and a chance at rare foil variants. Food and drinks available all night.',
    eventType: 'launch',
    eventDate: '2026-01-27T23:59:00',
    endDate: '2026-01-28T04:00:00',
    fee: 35.0,
    maxCapacity: 48,
    currentRegistrations: 42,
    imageUrl: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?q=80&w=800',
    isFeatured: true,
    isRecurring: false,
    prizeSupport: 'Extra packs for 3-0 record, promo card for all participants',
    requirements: ['No deck required - sealed format'],
    createdAt: new Date('2025-12-15').toISOString(),
  },
  {
    id: 'evt_3',
    title: 'Board Game Social',
    slug: 'board-game-social',
    description: 'Free play from our extensive board game library! No entry fee, no commitment. Our staff is available to teach any game in our collection. Perfect for casual players or those looking to try something new. Snacks and drinks available for purchase.',
    eventType: 'social',
    eventDate: '2026-01-14T17:00:00',
    endDate: '2026-01-14T22:00:00',
    fee: 0,
    maxCapacity: null,
    currentRegistrations: 0,
    imageUrl: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=800',
    isFeatured: false,
    isRecurring: true,
    recurrencePattern: 'Every Tuesday at 5:00 PM',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'evt_4',
    title: 'Commander League Night',
    slug: 'commander-league',
    description: 'Monthly Commander league with point tracking system. Earn points for creative plays, not just wins! Prizes awarded to top players at the end of each month. Bring your favorite Commander deck and make new friends.',
    eventType: 'tournament',
    eventDate: '2026-01-11T18:30:00',
    endDate: '2026-01-11T23:00:00',
    fee: 5.0,
    maxCapacity: 24,
    currentRegistrations: 16,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
    isFeatured: true,
    isRecurring: true,
    recurrencePattern: 'Every Saturday at 6:30 PM',
    prizeSupport: 'Store credit for monthly top 3',
    requirements: ['Commander-legal deck', 'Casual-friendly power level'],
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'evt_5',
    title: 'Anime Watch Party: Demon Slayer',
    slug: 'anime-watch-party-demon-slayer',
    description: 'Join us for the season premiere of Demon Slayer! We\'ll be screening the latest episode on our big screen. Themed drinks inspired by the show will be available. Cosplay encouraged but not required!',
    eventType: 'social',
    eventDate: '2026-01-15T19:00:00',
    endDate: '2026-01-15T21:00:00',
    fee: 0,
    maxCapacity: 30,
    currentRegistrations: 22,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800',
    isFeatured: false,
    isRecurring: false,
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'evt_6',
    title: 'League of Legends Tournament',
    slug: 'league-tournament',
    description: '5v5 tournament on our gaming PCs. Solo queue or bring your full team. Single elimination bracket with best-of-3 finals. Cash prizes for 1st and 2nd place teams. Live streaming of finals on our Twitch channel.',
    eventType: 'tournament',
    eventDate: '2026-01-18T14:00:00',
    endDate: '2026-01-18T20:00:00',
    fee: 15.0,
    maxCapacity: 40, // 8 teams of 5
    currentRegistrations: 30,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800',
    isFeatured: true,
    isRecurring: false,
    prizeSupport: '$500 first place, $200 second place',
    requirements: ['League account level 30+', 'Must check in 30 min early'],
    createdAt: new Date('2025-12-20').toISOString(),
  },
  {
    id: 'evt_7',
    title: 'D&D One-Shot Adventure',
    slug: 'dnd-oneshot',
    description: 'Join our experienced DM for a self-contained D&D adventure! No experience required - pre-generated characters provided. Perfect for new players or veterans looking for a quick session. Adventure runs 3-4 hours.',
    eventType: 'social',
    eventDate: '2026-01-20T18:00:00',
    endDate: '2026-01-20T22:00:00',
    fee: 5.0,
    maxCapacity: 6,
    currentRegistrations: 4,
    imageUrl: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=800',
    isFeatured: false,
    isRecurring: false,
    requirements: ['Dice provided, but bring your own if preferred'],
    createdAt: new Date('2026-01-08').toISOString(),
  },
  {
    id: 'evt_8',
    title: 'Pokemon VGC Regional Qualifier',
    slug: 'pokemon-vgc-qualifier',
    description: 'Official Pokemon VGC format tournament. Winner receives travel voucher to Regional Championships! Swiss rounds followed by top cut. Bring your team and battle for glory.',
    eventType: 'tournament',
    eventDate: '2026-01-25T10:00:00',
    endDate: '2026-01-25T18:00:00',
    fee: 20.0,
    maxCapacity: 64,
    currentRegistrations: 45,
    imageUrl: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=800',
    isFeatured: true,
    isRecurring: false,
    prizeSupport: 'Regional travel voucher, booster boxes for top cut',
    requirements: ['Pokemon Trainer Club account', 'VGC 2026 legal team'],
    createdAt: new Date('2025-12-01').toISOString(),
  },
];

// Mock user registrations (for testing)
export const MOCK_USER_REGISTRATIONS: EventRegistration[] = [
  {
    id: 'reg_1',
    eventId: 'evt_1',
    userId: 'user_123',
    status: 'registered',
    paymentStatus: 'paid',
    registeredAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'reg_2',
    eventId: 'evt_4',
    userId: 'user_123',
    status: 'registered',
    paymentStatus: 'paid',
    registeredAt: new Date('2026-01-06').toISOString(),
  },
];

// Helper to get event by slug
export function getEventBySlug(slug: string): Event | undefined {
  return MOCK_EVENTS.find((event) => event.slug === slug);
}

// Helper to get user's registrations
export function getUserRegistrations(userId: string): EventRegistration[] {
  return MOCK_USER_REGISTRATIONS.filter((reg) => reg.userId === userId);
}

// Helper to check if user is registered for event
export function isUserRegistered(userId: string, eventId: string): boolean {
  return MOCK_USER_REGISTRATIONS.some(
    (reg) => reg.userId === userId && reg.eventId === eventId && reg.status === 'registered'
  );
}

// Helper to get upcoming events
export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return MOCK_EVENTS.filter((event) => new Date(event.eventDate) > now).sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );
}
