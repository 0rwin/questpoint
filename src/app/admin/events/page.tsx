'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Calendar, Search, Filter } from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';
import { MOCK_EVENTS } from '@/data/events-mock';
import { formatDate, formatTime, cn } from '@/lib/utils';

/**
 * Admin Events Management Page
 *
 * Spec Section 7.4 - Admin Panel Capabilities
 * - Event creation, editing, capacity management
 * - Event check-in (scan QR codes or name lookup)
 */

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'past'>('all');
  const [events] = useState(MOCK_EVENTS);

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const now = new Date();
    const eventDate = new Date(event.eventDate);

    if (filterStatus === 'upcoming') {
      return matchesSearch && eventDate >= now;
    } else if (filterStatus === 'past') {
      return matchesSearch && eventDate < now;
    }

    return matchesSearch;
  });

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="section-title mb-2">Event Management</h1>
              <p className="section-subtitle">Create and manage events, tournaments, and activities</p>
            </div>
            <Button variant="gold" leftIcon={<Plus size={20} />}>
              Create Event
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              className="flex-1"
            />

            {/* Status Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'upcoming' ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('upcoming')}
              >
                Upcoming
              </Button>
              <Button
                variant={filterStatus === 'past' ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('past')}
              >
                Past
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-quest-purple/10 border-quest-purple/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center">
                <Calendar size={24} className="text-quest-gold" />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase">Total Events</p>
                <p className="font-fantasy text-2xl text-quest-cream">{events.length}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-quest-charcoal/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-gold/20 flex items-center justify-center">
                <Users size={24} className="text-quest-gold" />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase">Total Attendees</p>
                <p className="font-fantasy text-2xl text-quest-cream">
                  {events.reduce((sum, e) => sum + e.currentRegistrations, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-quest-charcoal/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Calendar size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase">Upcoming</p>
                <p className="font-fantasy text-2xl text-quest-cream">
                  {events.filter((e) => new Date(e.eventDate) >= new Date()).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Events Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-quest-cream/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Event
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Date & Time
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Capacity
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Fee
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Status
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-quest-gold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => {
                  const eventDate = new Date(event.eventDate);
                  const isPast = eventDate < new Date();
                  const isFull = event.maxCapacity ? event.currentRegistrations >= event.maxCapacity : false;

                  return (
                    <tr
                      key={event.id}
                      className="border-b border-quest-cream/5 hover:bg-quest-cream/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-quest-cream">{event.title}</p>
                          <p className="text-sm text-quest-cream/50 line-clamp-1">
                            {event.description}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="text-quest-cream">{formatDate(eventDate)}</p>
                          <p className="text-quest-cream/50">{formatTime(eventDate)}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-quest-gold" />
                          <span
                            className={cn(
                              'text-sm font-medium',
                              isFull ? 'text-red-400' : 'text-quest-cream'
                            )}
                          >
                            {event.currentRegistrations} / {event.maxCapacity || 'Unlimited'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-quest-cream">
                          {event.fee > 0 ? `$${event.fee}` : 'Free'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {isPast ? (
                          <Badge variant="ghost" size="sm">
                            Past
                          </Badge>
                        ) : isFull ? (
                          <Badge variant="danger" size="sm">
                            Full
                          </Badge>
                        ) : (
                          <Badge variant="gold" size="sm">
                            Open
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-quest-cream/60">No events found</p>
              </div>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
