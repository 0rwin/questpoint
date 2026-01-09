/**
 * Stream Service
 *
 * Handles Twitch/YouTube API integration for live stream status
 * Currently stubbed - will integrate with Twitch API when configured
 */

export interface StreamStatus {
  isLive: boolean;
  platform: 'twitch' | 'youtube';
  viewerCount: number;
  title: string;
  thumbnailUrl?: string;
  startedAt?: string;
}

export interface StreamConfig {
  twitchChannel: string;
  twitchClientId?: string;
  youtubeChannelId: string;
  youtubeApiKey?: string;
}

/**
 * Check if Twitch channel is currently live
 * @stub This will integrate with Twitch Helix API when credentials are configured
 */
export async function checkTwitchLiveStatus(
  channelName: string
): Promise<StreamStatus | null> {
  console.log('[STUB] Checking Twitch live status for:', channelName);

  // TODO: Implement Twitch API call
  // const response = await fetch(
  //   `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
  //   {
  //     headers: {
  //       'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   }
  // );

  // Mock response - return live for demo purposes
  return {
    isLive: true,
    platform: 'twitch',
    viewerCount: 47,
    title: 'Friday Night Magic - Modern Tournament',
    startedAt: new Date().toISOString(),
  };
}

/**
 * Check if YouTube channel is currently live (fallback)
 * @stub This will integrate with YouTube Data API when credentials are configured
 */
export async function checkYouTubeLiveStatus(
  channelId: string
): Promise<StreamStatus | null> {
  console.log('[STUB] Checking YouTube live status for:', channelId);

  // TODO: Implement YouTube Data API call
  // const response = await fetch(
  //   `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`
  // );

  // Mock response - return not live
  return null;
}

/**
 * Get current stream status (tries Twitch first, then YouTube)
 */
export async function getCurrentStreamStatus(
  config: StreamConfig
): Promise<StreamStatus | null> {
  // Try Twitch first
  const twitchStatus = await checkTwitchLiveStatus(config.twitchChannel);
  if (twitchStatus?.isLive) {
    return twitchStatus;
  }

  // Fallback to YouTube
  const youtubeStatus = await checkYouTubeLiveStatus(config.youtubeChannelId);
  if (youtubeStatus?.isLive) {
    return youtubeStatus;
  }

  return null;
}

/**
 * Subscribe to stream notifications
 * @stub This will integrate with browser notifications API and backend
 */
export async function subscribeToStreamNotifications(
  userId: string,
  streamScheduleId: string
): Promise<{ success: boolean; error?: string }> {
  console.log('[STUB] Subscribing to stream notifications:', {
    userId,
    streamScheduleId,
  });

  // TODO: Implement notification subscription
  // 1. Check browser notification permissions
  // 2. Save subscription to database
  // 3. Register service worker for push notifications

  return { success: true };
}

/**
 * Set reminder for upcoming stream
 * @stub This will send reminder email/notification before stream starts
 */
export async function setStreamReminder(
  userId: string,
  streamScheduleId: string,
  reminderMinutes: number = 30
): Promise<{ success: boolean; error?: string }> {
  console.log('[STUB] Setting stream reminder:', {
    userId,
    streamScheduleId,
    reminderMinutes,
  });

  // TODO: Implement reminder scheduling
  // 1. Save reminder to database
  // 2. Schedule reminder job (e.g., via Supabase Edge Functions)
  // 3. Send email/push notification X minutes before stream

  return { success: true };
}
