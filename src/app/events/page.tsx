'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  ChevronRight,
  Trophy,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { cn, formatCurrency, formatDate, formatTime } from '@/lib/utils';
import { MOCK_EVENTS, type Event, type EventType } from '@/data/events-mock';

// Event type configurations
const eventTypes: Record<EventType, { label: string; icon: typeof Trophy; color: string }> = {
  tournament: { label: 'Tournament', icon: Trophy, color: 'purple' },
  social: { label: 'Social', icon: PartyPopper, color: 'gold' },
  launch: { label: 'Launch', icon: Sparkles, color: 'warning' },
  recurring: { label: 'Weekly', icon: Calendar, color: 'ghost' },
  private: { label: 'Private', icon: MapPin, color: 'ghost' },
};

// Filter categories
const filterOptions = [
  { id: 'all', label: 'All Events' },
  { id: 'tournament', label: 'Tournaments' },
  { id: 'social', label: 'Social' },
  { id: 'launch', label: 'Launches' },
];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = activeFilter === 'all'
    ? MOCK_EVENTS
    : MOCK_EVENTS.filter(e => e.eventType === activeFilter);

  // Sort by date
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
  );

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Events</h1>
          <p className="section-subtitle">
            Join the community. Tournaments, socials, launches, and more.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-quest-dark/95 backdrop-blur-lg border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  activeFilter === filter.id
                    ? 'bg-quest-gold text-quest-dark'
                    : 'bg-quest-cream/5 text-quest-cream/60 hover:text-quest-cream hover:bg-quest-cream/10'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-quest-cream/20 mb-4" />
            <p className="text-quest-cream/60">No events found in this category.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Host Your Own Event CTA */}
      <section className="bg-quest-charcoal/30 border-t border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <Card className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-fantasy text-xl text-quest-gold mb-2">
                Want to Host Your Own Event?
              </h3>
              <p className="text-quest-cream/60">
                Book our space for birthday parties, team events, or private tournaments.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="gold" rightIcon={<ChevronRight size={18} />}>
                Contact Us
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Event Card Component
interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const eventTypeConfig = eventTypes[event.eventType];
  const EventIcon = eventTypeConfig.icon;
  
  const date = new Date(event.eventDate);
  const isAlmostFull = event.maxCapacity && 
    (event.currentRegistrations / event.maxCapacity) >= 0.8;
  const isFull = event.maxCapacity && 
    event.currentRegistrations >= event.maxCapacity;
  const spotsLeft = event.maxCapacity 
    ? event.maxCapacity - event.currentRegistrations 
    : null;

  return (
    <Link href={`/events/${event.slug}`}>
      <Card variant="interactive" className="group">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Date Block */}
          <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 md:min-w-[100px]">
            <div className="text-center md:text-left">
              <p className="text-quest-gold font-bold text-sm uppercase">
                {event.isRecurring ? event.recurrencePattern : formatDate(date, { month: 'short' })}
              </p>
              <p className="font-fantasy text-4xl text-quest-cream">
                {event.isRecurring ? '🔄' : date.getDate()}
              </p>
            </div>
            <div className="md:mt-2">
              <Badge 
                variant={eventTypeConfig.color as 'gold' | 'purple' | 'ghost' | 'warning'}
                size="sm"
              >
                <EventIcon size={12} className="mr-1" />
                {eventTypeConfig.label}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-fantasy text-xl text-quest-cream group-hover:text-quest-gold transition-colors mb-2">
              {event.title}
            </h3>
            <p className="text-quest-cream/60 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-quest-cream/50">
                <Clock size={14} />
                <span>{formatTime(date)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-quest-cream/50">
                <MapPin size={14} />
                <span>Questpoint Cafe</span>
              </div>
              {event.maxCapacity && (
                <div className={cn(
                  "flex items-center gap-1.5",
                  isFull ? "text-red-400" : isAlmostFull ? "text-yellow-400" : "text-quest-cream/50"
                )}>
                  <Users size={14} />
                  <span>
                    {isFull 
                      ? 'Full' 
                      : `${spotsLeft} spots left`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-quest-cream/10">
            <div className="text-right">
              {event.fee > 0 ? (
                <>
                  <p className="text-quest-cream/50 text-xs uppercase">Entry</p>
                  <p className="text-quest-gold font-bold text-lg">{formatCurrency(event.fee)}</p>
                </>
              ) : (
                <Badge variant="success" size="sm">Free</Badge>
              )}
            </div>
            <Button
              variant={isFull ? 'ghost' : 'purple'}
              size="sm"
              disabled={!!isFull}
            >
              {isFull ? 'Waitlist' : 'Register'}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
