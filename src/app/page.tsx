import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import {
  ChevronRight,
  Clock,
  MapPin,
  Calendar,
  Coffee,
  Gamepad2,
  Users,
  Sparkles
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { isCafeOpen, formatCurrency } from '@/lib/utils';

// Mock featured items - will come from database
const featuredItems = [
  {
    id: '1',
    name: 'Black Lotus Latte',
    description: 'Dark cocoa infused espresso with activated charcoal and edible gold dust',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop',
    category: 'coffee',
    isSeasonal: true,
  },
  {
    id: '2',
    name: 'Mana Potion Boba',
    description: 'Butterfly pea flower tea with honey boba and a splash of lemonade',
    price: 7.25,
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?q=80&w=400&auto=format&fit=crop',
    category: 'boba',
    isSeasonal: false,
  },
  {
    id: '3',
    name: 'Jinx\'s Chaos Slush',
    description: 'Electric blue energy drink with popping boba and citrus burst',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?q=80&w=400&auto=format&fit=crop',
    category: 'specialty',
    isSeasonal: true,
  },
];

// Mock upcoming events - will come from database
const upcomingEvents = [
  {
    id: '1',
    title: 'Friday Night Magic',
    date: 'This Friday',
    time: '6:00 PM',
    type: 'tournament',
    fee: 10,
  },
  {
    id: '2',
    title: 'Board Game Social',
    date: 'Tuesday',
    time: '5:00 PM',
    type: 'social',
    fee: 0,
  },
];

export default function HomePage() {
  const { isOpen, status, nextChange } = isCafeOpen();

  // Structured data for LocalBusiness schema (SEO)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: 'Questpoint Cafe',
    image: 'https://questpointcafe.com/og-image.jpg',
    description:
      'Premium coffee & boba meets the ultimate gaming sanctuary. Order drinks, register for events, and level up your daily ritual.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Gaming Ave',
      addressLocality: 'Your City',
      addressRegion: 'CA',
      postalCode: '12345',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    telephone: '+1-555-QUEST-00',
    priceRange: '$$',
    servesCuisine: ['Coffee', 'Boba Tea', 'Smoothies', 'Light Snacks'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '08:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '20:00',
      },
    ],
    sameAs: [
      'https://twitch.tv/questpointcafe',
      'https://instagram.com/questpointcafe',
      'https://facebook.com/questpointcafe',
      'https://twitter.com/questpointcafe',
    ],
    hasMap: 'https://maps.google.com/?q=Questpoint+Cafe',
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <div className="page-enter">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/questpoint-background-banner.jpg"
            alt="Questpoint Cafe gaming lounge"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-quest-dark via-quest-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-quest-gradient opacity-60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
          <div className="max-w-2xl">
            {/* Status Badge */}
            <Badge variant={isOpen ? 'success' : 'ghost'} className="mb-4">
              {status} · {nextChange}
            </Badge>

            {/* Headline */}
            <h1 className="font-fantasy text-4xl sm:text-5xl lg:text-6xl text-quest-cream leading-tight mb-4">
              YOUR QUEST{' '}
              <span className="text-quest-gold block">BEGINS HERE</span>
            </h1>

            {/* Subheadline */}
            <p className="text-quest-cream/80 text-lg sm:text-xl mb-8 max-w-lg">
              Premium coffee & boba meets the ultimate gaming sanctuary. 
              Level up your daily ritual.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/menu">
                <Button size="lg" rightIcon={<ChevronRight size={20} />}>
                  View Menu
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="ghost" size="lg">
                  See Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-quest-charcoal/50 border-y border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-quest-purple/30 text-quest-gold">
                <Clock size={22} />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase tracking-wide">Hours</p>
                <p className="text-quest-cream font-medium">10 AM - Midnight</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-quest-purple/30 text-quest-gold">
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase tracking-wide">Location</p>
                <p className="text-quest-cream font-medium">Questpoint Plaza</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-quest-purple/30 text-quest-gold">
                <Coffee size={22} />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase tracking-wide">Menu</p>
                <p className="text-quest-cream font-medium">100+ Drinks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-quest-purple/30 text-quest-gold">
                <Gamepad2 size={22} />
              </div>
              <div>
                <p className="text-quest-cream/50 text-xs uppercase tracking-wide">Gaming</p>
                <p className="text-quest-cream font-medium">Free WiFi + Consoles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Brews</h2>
            <p className="section-subtitle mt-1">Fan favorites and seasonal specials</p>
          </div>
          <Link 
            href="/menu" 
            className="text-quest-gold hover:text-quest-gold-300 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <Link key={item.id} href={`/menu/${item.id}`}>
              <Card variant="interactive" padding="none" className="overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.isSeasonal && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="gold" size="sm">Seasonal</Badge>
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-fantasy text-lg text-quest-cream group-hover:text-quest-gold transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-quest-gold font-bold whitespace-nowrap">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                  <p className="text-quest-cream/60 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-quest-charcoal/30 border-y border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-title">Upcoming Events</h2>
              <p className="section-subtitle mt-1">Join the community</p>
            </div>
            <Link 
              href="/events" 
              className="text-quest-gold hover:text-quest-gold-300 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              All Events <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card variant="interactive" className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-quest-purple/30">
                    <Calendar size={28} className="text-quest-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={event.type === 'tournament' ? 'purple' : 'ghost'} 
                        size="sm"
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <h3 className="font-fantasy text-lg text-quest-cream truncate">
                      {event.title}
                    </h3>
                    <p className="text-quest-cream/60 text-sm">
                      {event.date} at {event.time} · {event.fee > 0 ? formatCurrency(event.fee) : 'Free'}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-quest-cream/40" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">The Questpoint Experience</h2>
          <p className="section-subtitle mt-2 max-w-2xl mx-auto">
            More than a cafe. More than a game store. Your new favorite place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Coffee,
              title: 'Premium Drinks',
              description: 'Craft coffee, boba, smoothies, and themed specialty drinks',
            },
            {
              icon: Gamepad2,
              title: 'Gaming Lounge',
              description: 'Consoles, PCs, board games, and MTG tables',
            },
            {
              icon: Calendar,
              title: 'Weekly Events',
              description: 'FNM, tournaments, watch parties, and more',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'A welcoming space for all skill levels',
            },
          ].map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-quest-purple/30 text-quest-gold mb-4">
                <feature.icon size={28} />
              </div>
              <h3 className="font-fantasy text-lg text-quest-cream mb-2">{feature.title}</h3>
              <p className="text-quest-cream/60 text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-quest-gradient border-t border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Sparkles className="mx-auto text-quest-gold mb-4" size={32} />
          <h2 className="font-fantasy text-3xl sm:text-4xl text-quest-cream mb-4">
            Ready to Begin Your Quest?
          </h2>
          <p className="text-quest-cream/70 mb-8 max-w-lg mx-auto">
            Join our rewards program and earn points on every purchase. 
            Your first drink is on us.
          </p>
          <Link href="/account">
            <Button size="lg" rightIcon={<ChevronRight size={20} />}>
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
