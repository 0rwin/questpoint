/**
 * Mock Stream Data
 *
 * This file contains mock data for stream schedule and VODs
 * In production, this data will come from Supabase `stream_schedule` table
 */

export interface StreamScheduleItem {
  id: string;
  title: string;
  description?: string;
  streamType: 'mtg' | 'console' | 'board_game' | 'special';
  scheduledAt: string; // ISO 8601 timestamp
  durationMinutes: number;
  platform: 'twitch' | 'youtube';
  isLive: boolean;
}

export interface StreamHighlight {
  id: string;
  title: string;
  thumbnail: string;
  duration: string; // e.g., "15:42"
  views: number;
  date: string; // ISO 8601 date
  platform: 'twitch' | 'youtube';
  videoId: string;
}

export interface StreamConfig {
  twitchChannel: string;
  youtubeChannelId: string;
  isLive: boolean;
  currentViewers: number;
  currentTitle: string;
}

// Current stream configuration
export const MOCK_STREAM_CONFIG: StreamConfig = {
  twitchChannel: 'questpointcafe',
  youtubeChannelId: 'UCxxxxxxxxxxxxxxxx', // Replace with actual YouTube channel ID
  isLive: true, // Toggle this to test offline state
  currentViewers: 47,
  currentTitle: 'Friday Night Magic - Modern Tournament',
};

// Upcoming stream schedule
export const MOCK_STREAM_SCHEDULE: StreamScheduleItem[] = [
  {
    id: 'stream_1',
    title: 'Friday Night Magic',
    description: 'Watch the FNM tournament live! Commentary and deck techs.',
    streamType: 'mtg',
    scheduledAt: '2026-01-10T18:00:00-08:00', // 6 PM PST
    durationMinutes: 240, // 4 hours
    platform: 'twitch',
    isLive: true,
  },
  {
    id: 'stream_2',
    title: 'Saturday Commander Games',
    description: 'Casual Commander games with viewer interaction.',
    streamType: 'mtg',
    scheduledAt: '2026-01-11T14:00:00-08:00', // 2 PM PST
    durationMinutes: 180, // 3 hours
    platform: 'twitch',
    isLive: false,
  },
  {
    id: 'stream_3',
    title: 'Board Game Night Stream',
    description: 'Join us for board game night! We\'ll be playing community favorites.',
    streamType: 'board_game',
    scheduledAt: '2026-01-14T18:00:00-08:00', // 6 PM PST
    durationMinutes: 180, // 3 hours
    platform: 'twitch',
    isLive: false,
  },
  {
    id: 'stream_4',
    title: 'League of Legends Tournament',
    description: 'Local LoL tournament with cash prizes!',
    streamType: 'console',
    scheduledAt: '2026-01-18T14:00:00-08:00', // 2 PM PST
    durationMinutes: 300, // 5 hours
    platform: 'twitch',
    isLive: false,
  },
  {
    id: 'stream_5',
    title: 'Modern Horizons 3 Preview',
    description: 'Exclusive preview of upcoming Modern Horizons 3 cards!',
    streamType: 'special',
    scheduledAt: '2026-01-22T19:00:00-08:00', // 7 PM PST
    durationMinutes: 120, // 2 hours
    platform: 'twitch',
    isLive: false,
  },
  {
    id: 'stream_6',
    title: 'Sunday Funday - Viewer Games',
    description: 'Play with us! We\'ll be taking viewer requests and playing together.',
    streamType: 'mtg',
    scheduledAt: '2026-01-26T12:00:00-08:00', // 12 PM PST
    durationMinutes: 240, // 4 hours
    platform: 'twitch',
    isLive: false,
  },
];

// Past stream highlights/VODs
export const MOCK_STREAM_HIGHLIGHTS: StreamHighlight[] = [
  {
    id: 'vod_1',
    title: 'Insane Top 8 Match - Modern Championship',
    thumbnail:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    duration: '15:42',
    views: 1243,
    date: '2025-12-28',
    platform: 'twitch',
    videoId: '1234567890',
  },
  {
    id: 'vod_2',
    title: 'New Player Pulls $500 Card!',
    thumbnail:
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    duration: '3:21',
    views: 8432,
    date: '2025-12-20',
    platform: 'twitch',
    videoId: '1234567891',
  },
  {
    id: 'vod_3',
    title: 'Commander Game Goes 3 Hours - Epic Ending',
    thumbnail:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    duration: '45:18',
    views: 892,
    date: '2025-12-15',
    platform: 'twitch',
    videoId: '1234567892',
  },
  {
    id: 'vod_4',
    title: 'Midnight Launch Highlights - Foundations',
    thumbnail:
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    duration: '22:05',
    views: 2156,
    date: '2025-11-14',
    platform: 'twitch',
    videoId: '1234567893',
  },
  {
    id: 'vod_5',
    title: 'Draft Night - Karlov Manor',
    thumbnail:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    duration: '1:12:33',
    views: 645,
    date: '2025-11-08',
    platform: 'twitch',
    videoId: '1234567894',
  },
  {
    id: 'vod_6',
    title: 'Best Moments of October',
    thumbnail:
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    duration: '18:27',
    views: 3421,
    date: '2025-11-01',
    platform: 'twitch',
    videoId: '1234567895',
  },
  {
    id: 'vod_7',
    title: 'Pioneer Tournament - Game 5 Thriller',
    thumbnail:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    duration: '28:14',
    views: 1876,
    date: '2025-10-22',
    platform: 'twitch',
    videoId: '1234567896',
  },
  {
    id: 'vod_8',
    title: 'Opening 12 Collector Boosters Live!',
    thumbnail:
      'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?q=80&w=400&auto=format&fit=crop',
    duration: '34:56',
    views: 5234,
    date: '2025-10-15',
    platform: 'twitch',
    videoId: '1234567897',
  },
];
