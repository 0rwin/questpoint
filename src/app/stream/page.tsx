'use client';

import { useState } from 'react';
import {
  Play,
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Radio,
  Bell,
  Youtube
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { cn, formatDate, formatTime } from '@/lib/utils';
import {
  MOCK_STREAM_CONFIG,
  MOCK_STREAM_SCHEDULE,
  MOCK_STREAM_HIGHLIGHTS
} from '@/data/stream-mock';
import { setStreamReminder } from '@/services/stream';

export default function StreamPage() {
  const [activeTab, setActiveTab] = useState<'live' | 'schedule' | 'highlights'>('live');
  const [streamPlatform, setStreamPlatform] = useState<'twitch' | 'youtube'>('twitch');
  const [settingReminder, setSettingReminder] = useState<string | null>(null);

  const streamConfig = MOCK_STREAM_CONFIG;
  const schedule = MOCK_STREAM_SCHEDULE;
  const highlights = MOCK_STREAM_HIGHLIGHTS;

  // Handle setting a reminder for an upcoming stream
  const handleSetReminder = async (streamId: string) => {
    setSettingReminder(streamId);

    try {
      // TODO: Get actual user ID from auth
      const result = await setStreamReminder('mock_user_id', streamId, 30);

      if (result.success) {
        alert('Reminder set! We\'ll notify you 30 minutes before the stream starts.');
      } else {
        alert('Failed to set reminder. Please try again.');
      }
    } catch (error) {
      alert('Failed to set reminder. Please try again.');
    } finally {
      setSettingReminder(null);
    }
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="section-title">Watch</h1>
            {streamConfig.isLive && (
              <Badge variant="danger" className="animate-pulse">
                <Radio size={10} className="mr-1" />
                LIVE
              </Badge>
            )}
          </div>
          <p className="section-subtitle">
            Catch live events, tournaments, and community highlights
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-16 z-40 bg-quest-dark/95 backdrop-blur-lg border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1">
            {[
              { id: 'live', label: 'Live Stream', icon: Play },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'highlights', label: 'Highlights', icon: Play },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all border-b-2',
                  activeTab === tab.id
                    ? 'text-quest-gold border-quest-gold'
                    : 'text-quest-cream/60 border-transparent hover:text-quest-cream'
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Live Stream Tab */}
        {activeTab === 'live' && (
          <div className="space-y-8">
            {/* Stream Player */}
            <div>
              {streamConfig.isLive ? (
                <div className="space-y-4">
                  {/* Platform Switcher */}
                  <div className="flex gap-2">
                    <Button
                      variant={streamPlatform === 'twitch' ? 'purple' : 'ghost'}
                      size="sm"
                      onClick={() => setStreamPlatform('twitch')}
                      leftIcon={<Radio size={14} />}
                    >
                      Twitch
                    </Button>
                    <Button
                      variant={streamPlatform === 'youtube' ? 'danger' : 'ghost'}
                      size="sm"
                      onClick={() => setStreamPlatform('youtube')}
                      leftIcon={<Youtube size={14} />}
                    >
                      YouTube (Fallback)
                    </Button>
                  </div>

                  {/* Stream Embed */}
                  <div className="relative aspect-video bg-quest-charcoal rounded-2xl overflow-hidden">
                    {streamPlatform === 'twitch' ? (
                      <iframe
                        src={`https://player.twitch.tv/?channel=${streamConfig.twitchChannel}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`}
                        height="100%"
                        width="100%"
                        allowFullScreen
                        className="absolute inset-0"
                      />
                    ) : (
                      <iframe
                        src={`https://www.youtube.com/embed/live_stream?channel=${streamConfig.youtubeChannelId}`}
                        height="100%"
                        width="100%"
                        allowFullScreen
                        className="absolute inset-0"
                      />
                    )}
                  </div>

                  {/* Stream Info */}
                  <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="danger">
                          <Radio size={10} className="mr-1" />
                          LIVE
                        </Badge>
                        <span className="text-quest-cream/50 text-sm flex items-center gap-1">
                          <Users size={14} />
                          {streamConfig.currentViewers} watching
                        </span>
                      </div>
                      <h2 className="font-fantasy text-xl text-quest-cream">
                        {streamConfig.currentTitle}
                      </h2>
                    </div>
                    <a
                      href={
                        streamPlatform === 'twitch'
                          ? `https://twitch.tv/${streamConfig.twitchChannel}`
                          : `https://youtube.com/channel/${streamConfig.youtubeChannelId}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="purple" rightIcon={<ExternalLink size={16} />}>
                        Watch on {streamPlatform === 'twitch' ? 'Twitch' : 'YouTube'}
                      </Button>
                    </a>
                  </Card>

                  {/* Twitch Chat Embed (only for Twitch) */}
                  {streamPlatform === 'twitch' && (
                    <Card padding="none" className="overflow-hidden">
                      <div className="h-[400px]">
                        <iframe
                          src={`https://www.twitch.tv/embed/${streamConfig.twitchChannel}/chat?parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&darkpopout`}
                          height="100%"
                          width="100%"
                          className="border-0"
                        />
                      </div>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-quest-purple/30 flex items-center justify-center mx-auto mb-6">
                    <Play size={32} className="text-quest-gold" />
                  </div>
                  <h2 className="font-fantasy text-2xl text-quest-cream mb-2">
                    We're Offline
                  </h2>
                  <p className="text-quest-cream/60 mb-6">
                    Check the schedule for upcoming streams
                  </p>
                  <Button onClick={() => setActiveTab('schedule')}>
                    View Schedule
                  </Button>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <h2 className="font-fantasy text-xl text-quest-gold mb-6">Upcoming Streams</h2>
            {schedule.map((stream) => {
              const date = new Date(stream.scheduledAt);
              const endTime = new Date(date.getTime() + stream.durationMinutes * 60000);
              
              return (
                <Card 
                  key={stream.id} 
                  className={cn(
                    'flex flex-col sm:flex-row gap-4',
                    stream.isLive && 'border-quest-gold/30 shadow-gold-glow'
                  )}
                >
                  {/* Date */}
                  <div className="sm:min-w-[100px] sm:text-center">
                    <p className="text-quest-gold font-bold text-sm uppercase">
                      {formatDate(date, { weekday: 'short' })}
                    </p>
                    <p className="font-fantasy text-3xl text-quest-cream">
                      {date.getDate()}
                    </p>
                    <p className="text-quest-cream/50 text-sm">
                      {formatDate(date, { month: 'short' })}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {stream.isLive && (
                        <Badge variant="danger">
                          <Radio size={10} className="mr-1" />
                          LIVE NOW
                        </Badge>
                      )}
                      <Badge variant="ghost" size="sm">
                        {stream.streamType.replace('_', ' ')}
                      </Badge>
                    </div>
                    <h3 className="font-fantasy text-lg text-quest-cream mb-1">
                      {stream.title}
                    </h3>
                    <p className="text-quest-cream/50 text-sm flex items-center gap-1">
                      <Clock size={14} />
                      {formatTime(date)} - {formatTime(endTime)}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="sm:self-center">
                    {stream.isLive ? (
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => setActiveTab('live')}
                        leftIcon={<Play size={14} />}
                      >
                        Watch Now
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetReminder(stream.id)}
                        isLoading={settingReminder === stream.id}
                        leftIcon={<Bell size={14} />}
                      >
                        {settingReminder === stream.id ? 'Setting...' : 'Set Reminder'}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Highlights Tab */}
        {activeTab === 'highlights' && (
          <div>
            <h2 className="font-fantasy text-xl text-quest-gold mb-6">Recent Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((video) => {
                const videoUrl =
                  video.platform === 'twitch'
                    ? `https://twitch.tv/videos/${video.videoId}`
                    : `https://youtube.com/watch?v=${video.videoId}`;

                return (
                  <a
                    key={video.id}
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card
                      variant="interactive"
                      padding="none"
                      className="overflow-hidden group h-full"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-quest-charcoal">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Platform badge */}
                        <div className="absolute top-2 left-2">
                          <Badge variant="ghost" size="sm" className="backdrop-blur-sm">
                            {video.platform === 'twitch' ? (
                              <>
                                <Radio size={10} className="mr-1" />
                                Twitch
                              </>
                            ) : (
                              <>
                                <Youtube size={10} className="mr-1" />
                                YouTube
                              </>
                            )}
                          </Badge>
                        </div>
                        {/* Duration badge */}
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white font-medium">
                          {video.duration}
                        </div>
                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-quest-gold flex items-center justify-center">
                            <Play size={24} className="text-quest-dark ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-medium text-quest-cream text-sm line-clamp-2 mb-2 group-hover:text-quest-gold transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-quest-cream/50 text-xs">
                          {video.views.toLocaleString()} views · {formatDate(video.date)}
                        </p>
                      </div>
                    </Card>
                  </a>
                );
              })}
            </div>

            {/* View More */}
            <div className="text-center mt-8">
              <a
                href={`https://twitch.tv/${streamConfig.twitchChannel}/videos`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" rightIcon={<ExternalLink size={16} />}>
                  More on Twitch
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
