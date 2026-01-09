'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  ChevronLeft,
  Trophy,
  Sparkles,
  PartyPopper,
  CheckCircle,
  AlertCircle,
  Info,
  Share2,
} from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { formatCurrency, formatDate, formatTime, cn } from '@/lib/utils';
import { getEventBySlug, isUserRegistered, type Event, type EventType } from '@/data/events-mock';
import { useFeature } from '@/hooks/use-feature-flags';

// Mock user
const MOCK_USER = {
  id: 'user_123',
  email: 'customer@example.com',
  name: 'John Doe',
  isGuest: false, // Set to true to test guest redirect
};

// Event type configurations
const eventTypes: Record<EventType, { label: string; icon: typeof Trophy; color: string }> = {
  tournament: { label: 'Tournament', icon: Trophy, color: 'purple' },
  social: { label: 'Social', icon: PartyPopper, color: 'gold' },
  launch: { label: 'Launch', icon: Sparkles, color: 'warning' },
  recurring: { label: 'Weekly', icon: Calendar, color: 'ghost' },
  private: { label: 'Private', icon: MapPin, color: 'ghost' },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'registered' | 'waitlist' | null>(null);

  const eventsEnabled = useFeature('EVENTS_ENABLED');
  const squareEnabled = useFeature('SQUARE_PAYMENTS_ENABLED');

  useEffect(() => {
    // Fetch event (stubbed)
    const fetchEvent = async () => {
      console.log('[STUB] Fetching event:', resolvedParams.slug);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const foundEvent = getEventBySlug(resolvedParams.slug);

      if (!foundEvent) {
        router.push('/events');
        return;
      }

      setEvent(foundEvent);
      setIsRegistered(isUserRegistered(MOCK_USER.id, foundEvent.id));
      setIsLoading(false);
    };

    fetchEvent();
  }, [resolvedParams.slug, router]);

  // Redirect guests to login
  useEffect(() => {
    if (MOCK_USER.isGuest) {
      router.push(`/auth/login?redirect=/events/${resolvedParams.slug}`);
    }
  }, [resolvedParams.slug, router]);

  const handleRegister = async (status: 'registered' | 'waitlist') => {
    if (!event) return;

    setIsRegistering(true);
    console.log(`[STUB] Registering user for event ${event.id} as ${status}`);

    try {
      // For paid events, process payment first
      if (event.fee > 0) {
        console.log('[STUB] Processing payment:', event.fee);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Create registration
      const registrationData = {
        eventId: event.id,
        userId: MOCK_USER.id,
        status,
        paymentStatus: event.fee > 0 ? 'paid' : 'pending',
      };

      console.log('[STUB] Creating registration:', registrationData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsRegistered(true);
      setRegistrationStatus(status);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!event) return;

    if (!confirm('Are you sure you want to cancel your registration?')) {
      return;
    }

    setIsRegistering(true);
    console.log('[STUB] Cancelling registration for event:', event.id);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsRegistered(false);
      setRegistrationStatus(null);
    } catch (error) {
      console.error('Cancellation error:', error);
      alert('Cancellation failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quest-gold mx-auto mb-4" />
          <p className="text-quest-cream/60">Loading event details...</p>
        </div>
      </div>
    );
  }

  const eventTypeConfig = eventTypes[event.eventType];
  const EventIcon = eventTypeConfig.icon;
  const eventDate = new Date(event.eventDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;
  const isAlmostFull = event.maxCapacity && (event.currentRegistrations / event.maxCapacity) >= 0.8;
  const isFull = event.maxCapacity && event.currentRegistrations >= event.maxCapacity;
  const spotsLeft = event.maxCapacity ? event.maxCapacity - event.currentRegistrations : null;
  const isPastEvent = eventDate < new Date();

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Hero Image */}
      {event.imageUrl && (
        <div className="relative h-72 md:h-96 w-full">
          <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-quest-dark via-quest-dark/50 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link href="/events">
              <Button variant="ghost" size="sm" className="bg-quest-dark/80 backdrop-blur-sm">
                <ChevronLeft size={18} />
                Back to Events
              </Button>
            </Link>
          </div>

          {/* Featured Badge */}
          {event.isFeatured && (
            <div className="absolute top-4 right-4">
              <Badge variant="gold">
                <Sparkles size={14} className="mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Header (if no image) */}
      {!event.imageUrl && (
        <section className="bg-quest-gradient border-b border-quest-cream/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <Link href="/events">
              <Button variant="ghost" size="sm" className="mb-4">
                <ChevronLeft size={18} />
                Back to Events
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Event Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Type */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={eventTypeConfig.color as any}>
                  <EventIcon size={16} className="mr-2" />
                  {eventTypeConfig.label}
                </Badge>
                {event.isRecurring && (
                  <Badge variant="ghost" size="sm">
                    Recurring
                  </Badge>
                )}
              </div>
              <h1 className="font-fantasy text-4xl text-quest-cream mb-4">
                {event.title}
              </h1>
              <p className="text-quest-cream/70 text-lg leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Event Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Date & Time */}
              <Card className="bg-quest-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-quest-gold/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-quest-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-quest-cream/40 uppercase mb-1">Date</p>
                    <p className="text-quest-cream font-medium">
                      {event.isRecurring ? event.recurrencePattern : formatDate(eventDate)}
                    </p>
                    {!event.isRecurring && (
                      <p className="text-sm text-quest-cream/60 mt-1">
                        <Clock size={14} className="inline mr-1" />
                        {formatTime(eventDate)}
                        {endDate && ` - ${formatTime(endDate)}`}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Location */}
              <Card className="bg-quest-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-quest-purple/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-quest-purple" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-quest-cream/40 uppercase mb-1">Location</p>
                    <p className="text-quest-cream font-medium">Questpoint Cafe</p>
                    <p className="text-sm text-quest-cream/60 mt-1">
                      123 Gaming Street
                    </p>
                  </div>
                </div>
              </Card>

              {/* Entry Fee */}
              <Card className="bg-quest-charcoal/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-quest-gold/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="text-quest-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-quest-cream/40 uppercase mb-1">Entry Fee</p>
                    <p className="text-quest-cream font-medium">
                      {event.fee > 0 ? formatCurrency(event.fee) : 'Free'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Capacity */}
              {event.maxCapacity && (
                <Card className={cn(
                  "bg-quest-charcoal/50",
                  isFull && "border-red-500/30 bg-red-500/5"
                )}>
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      isFull ? "bg-red-500/20" : "bg-quest-purple/20"
                    )}>
                      <Users className={isFull ? "text-red-500" : "text-quest-purple"} size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-quest-cream/40 uppercase mb-1">Capacity</p>
                      <p className="text-quest-cream font-medium">
                        {event.currentRegistrations} / {event.maxCapacity} registered
                      </p>
                      {spotsLeft !== null && spotsLeft > 0 && (
                        <p className={cn(
                          "text-sm mt-1",
                          isAlmostFull ? "text-yellow-400" : "text-quest-cream/60"
                        )}>
                          {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                        </p>
                      )}
                      {isFull && (
                        <p className="text-sm text-red-400 mt-1">
                          Event is full
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Prize Support */}
            {event.prizeSupport && (
              <Card>
                <h3 className="font-fantasy text-lg text-quest-gold mb-3">Prize Support</h3>
                <p className="text-quest-cream/70">{event.prizeSupport}</p>
              </Card>
            )}

            {/* Requirements */}
            {event.requirements && event.requirements.length > 0 && (
              <Card>
                <h3 className="font-fantasy text-lg text-quest-gold mb-3">What to Bring</h3>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-quest-cream/70">
                      <CheckCircle size={16} className="text-quest-gold flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Right Column: Registration */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <h2 className="font-fantasy text-xl text-quest-gold mb-4">Registration</h2>

              {/* Already Registered */}
              {isRegistered && (
                <Card className="bg-green-500/10 border-green-500/30 mb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-green-500 mb-1">
                        You're Registered!
                      </p>
                      <p className="text-sm text-quest-cream/70">
                        {registrationStatus === 'waitlist'
                          ? "You're on the waitlist. We'll notify you if a spot opens up."
                          : "See you at the event!"}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Events Not Enabled */}
              {!eventsEnabled && (
                <Card className="bg-yellow-500/10 border-yellow-500/30 mb-4">
                  <div className="flex gap-3">
                    <AlertCircle className="text-yellow-500 flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-500 mb-1">Events Disabled</p>
                      <p className="text-quest-cream/80">
                        Event registration is not currently enabled. Visit{' '}
                        <Link href="/admin/settings" className="text-quest-gold hover:underline">
                          Admin Settings
                        </Link>{' '}
                        to enable events.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Past Event */}
              {isPastEvent && (
                <Card className="bg-quest-charcoal/50 border-quest-cream/10 mb-4">
                  <div className="flex gap-3">
                    <Info className="text-quest-cream/40 flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <p className="font-medium text-quest-cream/70 mb-1">This event has passed</p>
                      <p className="text-quest-cream/60">
                        Check out our other upcoming events!
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Registration Buttons */}
              {!isPastEvent && eventsEnabled && (
                <div className="space-y-3">
                  {/* Price Summary */}
                  <div className="p-4 bg-quest-charcoal/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-quest-cream/60">Entry Fee</span>
                      <span className="text-quest-cream font-bold text-xl">
                        {event.fee > 0 ? formatCurrency(event.fee) : 'Free'}
                      </span>
                    </div>
                    {event.fee > 0 && !squareEnabled && (
                      <p className="text-xs text-yellow-500">
                        Payment processing is disabled
                      </p>
                    )}
                  </div>

                  {/* Register or Cancel */}
                  {!isRegistered ? (
                    <>
                      {!isFull ? (
                        <Button
                          variant="gold"
                          size="lg"
                          onClick={() => handleRegister('registered')}
                          disabled={isRegistering || !eventsEnabled || (event.fee > 0 && !squareEnabled)}
                          isLoading={isRegistering}
                          className="w-full"
                        >
                          {event.fee > 0 ? `Register - ${formatCurrency(event.fee)}` : 'Register for Free'}
                        </Button>
                      ) : (
                        <Button
                          variant="purple"
                          size="lg"
                          onClick={() => handleRegister('waitlist')}
                          disabled={isRegistering || !eventsEnabled}
                          isLoading={isRegistering}
                          className="w-full"
                        >
                          Join Waitlist
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={handleCancelRegistration}
                      disabled={isRegistering}
                      isLoading={isRegistering}
                      className="w-full"
                    >
                      Cancel Registration
                    </Button>
                  )}

                  {/* Info Text */}
                  <p className="text-xs text-quest-cream/40 text-center">
                    {event.fee > 0
                      ? 'Payment will be processed via Square'
                      : 'No payment required'}
                  </p>
                </div>
              )}

              {/* Share Button */}
              <div className="pt-4 border-t border-quest-cream/10">
                <button className="flex items-center justify-center gap-2 text-quest-cream/60 hover:text-quest-gold transition-colors text-sm w-full">
                  <Share2 size={16} />
                  Share Event
                </button>
              </div>
            </Card>

            {/* Help Card */}
            <Card className="bg-quest-charcoal/50">
              <p className="text-sm text-quest-cream/60 text-center">
                Questions?{' '}
                <Link href="/contact" className="text-quest-gold hover:underline">
                  Contact us
                </Link>
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
