'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Sparkles,
  PartyPopper,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { formatCurrency, formatDate, formatTime, cn } from '@/lib/utils';
import {
  MOCK_EVENTS,
  MOCK_USER_REGISTRATIONS,
  type Event,
  type EventType,
  type EventRegistration,
} from '@/data/events-mock';

// Mock user
const MOCK_USER = {
  id: 'user_123',
  email: 'customer@example.com',
  name: 'John Doe',
};

// Event type configurations
const eventTypes: Record<EventType, { label: string; icon: typeof Trophy; color: string }> = {
  tournament: { label: 'Tournament', icon: Trophy, color: 'purple' },
  social: { label: 'Social', icon: PartyPopper, color: 'gold' },
  launch: { label: 'Launch', icon: Sparkles, color: 'warning' },
  recurring: { label: 'Weekly', icon: Calendar, color: 'ghost' },
  private: { label: 'Private', icon: MapPin, color: 'ghost' },
};

export default function MyEventsPage() {
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  // Get user's registrations
  const userRegistrations = MOCK_USER_REGISTRATIONS.filter(
    (reg) => reg.userId === MOCK_USER.id
  );

  // Get events user is registered for
  const registeredEvents = userRegistrations
    .map((reg) => {
      const event = MOCK_EVENTS.find((e) => e.id === reg.eventId);
      if (!event) return null;
      return { event, registration: reg };
    })
    .filter((item): item is { event: Event; registration: EventRegistration } => item !== null);

  // Filter by upcoming/past
  const now = new Date();
  const filteredEvents = registeredEvents.filter(({ event }) => {
    const eventDate = new Date(event.eventDate);
    return filter === 'upcoming' ? eventDate >= now : eventDate < now;
  });

  // Sort by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.event.eventDate).getTime();
    const dateB = new Date(b.event.eventDate).getTime();
    return filter === 'upcoming' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">My Events</h1>
          <p className="section-subtitle">View and manage your event registrations</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past Events' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'upcoming' | 'past')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                filter === tab.id
                  ? 'bg-quest-gold text-quest-dark'
                  : 'bg-quest-cream/5 text-quest-cream/60 hover:text-quest-cream hover:bg-quest-cream/10'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
        {sortedEvents.length === 0 ? (
          <Card className="text-center py-12">
            <Calendar className="mx-auto mb-4 text-quest-cream/20" size={48} />
            <h3 className="font-fantasy text-xl text-quest-cream mb-2">
              {filter === 'upcoming' ? 'No Upcoming Events' : 'No Past Events'}
            </h3>
            <p className="text-quest-cream/60 mb-6">
              {filter === 'upcoming'
                ? "You haven't registered for any upcoming events yet"
                : "You haven't attended any events yet"}
            </p>
            <Link href="/events">
              <Button variant="gold" size="lg">
                Browse Events
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedEvents.map(({ event, registration }) => (
              <RegisteredEventCard
                key={event.id}
                event={event}
                registration={registration}
                isPast={filter === 'past'}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Registered Event Card Component
interface RegisteredEventCardProps {
  event: Event;
  registration: EventRegistration;
  isPast: boolean;
}

function RegisteredEventCard({ event, registration, isPast }: RegisteredEventCardProps) {
  const eventTypeConfig = eventTypes[event.eventType];
  const EventIcon = eventTypeConfig.icon;
  const eventDate = new Date(event.eventDate);

  return (
    <Link href={`/events/${event.slug}`}>
      <Card variant="interactive" className="group">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          {event.imageUrl && (
            <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
              {isPast && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="ghost" size="sm">
                    Past Event
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={eventTypeConfig.color as any} size="sm">
                    <EventIcon size={12} className="mr-1" />
                    {eventTypeConfig.label}
                  </Badge>
                  {registration.status === 'waitlist' && (
                    <Badge variant="warning" size="sm">
                      Waitlist
                    </Badge>
                  )}
                  {registration.status === 'attended' && (
                    <Badge variant="success" size="sm">
                      <CheckCircle size={12} className="mr-1" />
                      Attended
                    </Badge>
                  )}
                </div>

                <h3 className="font-fantasy text-xl text-quest-cream group-hover:text-quest-gold transition-colors mb-2">
                  {event.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-quest-cream/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{event.isRecurring ? event.recurrencePattern : formatDate(eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{formatTime(eventDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    <span>Questpoint Cafe</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-quest-gold font-bold">
                  {event.fee > 0 ? formatCurrency(event.fee) : 'Free'}
                </p>
                {registration.paymentStatus === 'paid' && (
                  <Badge variant="success" size="sm" className="mt-1">
                    Paid
                  </Badge>
                )}
              </div>
            </div>

            {/* Registration Info */}
            <div className="flex items-center justify-between pt-3 border-t border-quest-cream/10">
              <div className="flex items-center gap-2 text-sm">
                {registration.status === 'registered' ? (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-green-500 font-medium">
                      {isPast ? 'You attended this event' : "You're registered!"}
                    </span>
                  </>
                ) : registration.status === 'waitlist' ? (
                  <>
                    <AlertCircle size={16} className="text-yellow-400" />
                    <span className="text-yellow-400 font-medium">
                      On waitlist - We'll notify you if a spot opens
                    </span>
                  </>
                ) : null}
              </div>

              <div className="flex items-center gap-1 text-quest-gold text-sm font-medium">
                View Details
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
