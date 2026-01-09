import Link from 'next/link';
import { Calendar, Menu, Package, Settings, BarChart3, Users } from 'lucide-react';
import { Card, Button } from '@/components/ui';

/**
 * Admin Dashboard
 *
 * Overview page with quick links to admin features
 */

export default function AdminDashboard() {
  const adminSections = [
    {
      title: 'Event Management',
      description: 'Create and manage events, tournaments, and activities',
      icon: Calendar,
      href: '/admin/events',
      color: 'purple',
    },
    {
      title: 'Menu Management',
      description: 'Manage menu items, prices, and availability',
      icon: Menu,
      href: '/admin/menu',
      color: 'gold',
    },
    {
      title: 'Inventory',
      description: 'Track product stock levels and restock items',
      icon: Package,
      href: '/admin/inventory',
      color: 'purple',
    },
    {
      title: 'Settings',
      description: 'Configure business hours, contact info, and preferences',
      icon: Settings,
      href: '/admin/settings',
      color: 'gold',
    },
  ];

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Admin Dashboard</h1>
          <p className="section-subtitle">Manage your cafe from one central location</p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-quest-purple/10 border-quest-purple/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center">
                <BarChart3 size={24} className="text-quest-gold" />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase">Orders Today</p>
                <p className="font-fantasy text-2xl text-quest-cream">—</p>
              </div>
            </div>
          </Card>

          <Card className="bg-quest-gold/10 border-quest-gold/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-gold/20 flex items-center justify-center">
                <Users size={24} className="text-quest-purple" />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase">Active Users</p>
                <p className="font-fantasy text-2xl text-quest-cream">—</p>
              </div>
            </div>
          </Card>

          <Card className="bg-quest-purple/10 border-quest-purple/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center">
                <Calendar size={24} className="text-quest-gold" />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase">Upcoming Events</p>
                <p className="font-fantasy text-2xl text-quest-cream">—</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {adminSections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card
                variant="interactive"
                className={
                  section.color === 'gold'
                    ? 'bg-quest-gold/10 border-quest-gold/30 hover:border-quest-gold/50'
                    : 'bg-quest-purple/10 border-quest-purple/30 hover:border-quest-purple/50'
                }
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                      section.color === 'gold'
                        ? 'bg-quest-gold/20'
                        : 'bg-quest-purple/20'
                    }`}
                  >
                    <section.icon
                      size={28}
                      className={section.color === 'gold' ? 'text-quest-gold' : 'text-quest-purple'}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-fantasy text-xl text-quest-cream mb-2">
                      {section.title}
                    </h3>
                    <p className="text-quest-cream/70 text-sm mb-4">{section.description}</p>
                    <Button variant="ghost" size="sm">
                      Manage →
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Getting Started Notice */}
        <Card className="mt-8 bg-quest-charcoal/50 border-quest-gold/30">
          <div className="space-y-3">
            <h3 className="font-fantasy text-lg text-quest-gold">Getting Started</h3>
            <p className="text-quest-cream/70 text-sm">
              Welcome to the Questpoint Cafe admin panel! Currently running in stub mode with mock
              data. To connect to your Supabase database and enable full functionality, see the
              setup guide in <code className="text-quest-gold">SUPABASE_SETUP.md</code>.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
