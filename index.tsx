
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Coffee, 
  Gamepad2, 
  Calendar, 
  User, 
  Home as HomeIcon, 
  QrCode, 
  Star, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Sparkles,
  Search,
  Sword,
  Shield,
  Zap
} from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// --- Types & Constants ---

type Category = 'Coffee' | 'Boba' | 'Food' | 'Merch';

interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: string;
  description: string;
  isSeasonal: boolean;
  imageUrl: string;
}

interface CafeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  type: 'Tournament' | 'Social' | 'Launch';
  fee?: string;
}

const MOCK_MENU: MenuItem[] = [
  { id: '1', name: 'Black Lotus Latte', category: 'Coffee', price: '$6.50', description: 'Dark cocoa infused espresso with activated charcoal and gold leaf dusting.', isSeasonal: true, imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '2', name: 'Mana Potion Boba', category: 'Boba', price: '$7.25', description: 'Butterfly pea flower tea with honey boba and a splash of lime.', isSeasonal: false, imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '3', name: 'Health Potion Boba', category: 'Boba', price: '$7.25', description: 'Hibiscus and rose tea with strawberry popping pearls.', isSeasonal: false, imageUrl: 'https://images.unsplash.com/photo-1558857563-b371f3044469?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '4', name: 'Orc-Slayer Sandwich', category: 'Food', price: '$12.00', description: 'Triple-decker roast beef with spicy horseradish and smoked gouda.', isSeasonal: false, imageUrl: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?q=80&w=300&h=300&auto=format&fit=crop' },
  { id: '5', name: 'Eldrazi Mist', category: 'Coffee', price: '$5.75', description: 'Earl grey latte with a lavender vanilla foam.', isSeasonal: true, imageUrl: 'https://images.unsplash.com/photo-1573339660211-48737d782f9e?q=80&w=300&h=300&auto=format&fit=crop' },
];

const MOCK_EVENTS: CafeEvent[] = [
  { id: 'e1', title: 'Friday Night Magic', date: 'This Friday', time: '6:00 PM', description: 'Modern format tournament. All skill levels welcome.', type: 'Tournament', fee: '$10' },
  { id: 'e2', title: 'Midnight Launch: Duskmourn', date: 'Sept 27', time: '11:59 PM', description: 'Exclusive early access to the newest MTG set.', type: 'Launch', fee: '$25' },
  { id: 'e3', title: 'Board Game Social', date: 'Every Tuesday', time: '5:00 PM', description: 'Free play for all library games. No entry fee.', type: 'Social', fee: 'Free' },
];

// --- Components ---

// Fix: Made children optional in prop type to allow JSX children to be recognized correctly in strict environments
const Badge = ({ children, variant = 'gold' }: { children?: React.ReactNode, variant?: 'gold' | 'purple' }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
    variant === 'gold' ? 'bg-quest-gold text-quest-dark' : 'bg-quest-purple text-quest-cream'
  }`}>
    {children}
  </span>
);

const Navbar = ({ active, setActive }: { active: string, setActive: (s: string) => void }) => {
  const items = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'menu', icon: Coffee, label: 'Menu' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'quest', icon: User, label: 'Quest Log' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-quest-gold/20 flex justify-around items-center px-4 py-3 z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            active === item.id ? 'text-quest-gold scale-110' : 'text-quest-cream/50'
          }`}
        >
          <item.icon size={22} strokeWidth={active === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-semibold uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Home = ({ onNavigate }: { onNavigate: (s: string) => void }) => {
  const [vibe, setVibe] = useState("Scanning the multiverse...");
  const [loadingVibe, setLoadingVibe] = useState(true);

  useEffect(() => {
    async function fetchVibe() {
      try {
        // Fix: Use process.env.API_KEY directly for GoogleGenAI initialization as per guidelines
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Generate a short, 1-sentence fantasy-themed 'vibe check' or 'quest hook' for a gaming cafe named Questpoint Cafe. Something like 'The planes are aligning for a legendary brew.' or 'An adventure begins with a single sip of Mana Potion.'",
        });
        setVibe(response.text || "Your quest begins here.");
      } catch (e) {
        setVibe("The planes are aligning for a legendary brew.");
      } finally {
        setVibe(prev => prev); // Ensure state update trigger
        setLoadingVibe(false);
      }
    }
    fetchVibe();
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-24 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col justify-end p-6 overflow-hidden rounded-b-[2rem] isekai-gradient">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Cafe Background"
          />
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <Badge variant="gold">Status: Open</Badge>
          <h1 className="font-fantasy text-4xl md:text-6xl text-quest-cream leading-tight">
            YOUR QUEST <br/><span className="text-quest-gold">BEGINS HERE</span>
          </h1>
          <p className="text-quest-cream/80 max-w-xs text-sm">
            Premium Coffee & Boba meets the ultimate gaming sanctuary. Level up your daily ritual.
          </p>
          <div className="mt-4 flex gap-3">
            <button 
              onClick={() => onNavigate('menu')}
              className="bg-quest-gold text-quest-dark px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors"
            >
              Start Order <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Vibe Status */}
      <section className="px-6">
        <div className="glass p-6 rounded-2xl border-quest-gold/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={48} className="text-quest-gold" />
          </div>
          <h3 className="text-quest-gold font-fantasy uppercase text-xs tracking-[0.2em] mb-2">Current Vibe</h3>
          <p className={`text-lg italic leading-relaxed ${loadingVibe ? 'animate-pulse text-quest-cream/30' : 'text-quest-cream'}`}>
            "{vibe}"
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="px-6 grid grid-cols-2 gap-4">
        <div className="glass p-4 rounded-xl flex items-center gap-3">
          <div className="bg-quest-purple p-2 rounded-lg text-quest-gold">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase text-quest-cream/50 font-bold">Hours Today</p>
            <p className="text-xs font-semibold">10 AM - Midnight</p>
          </div>
        </div>
        <div className="glass p-4 rounded-xl flex items-center gap-3">
          <div className="bg-quest-purple p-2 rounded-lg text-quest-gold">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase text-quest-cream/50 font-bold">Location</p>
            <p className="text-xs font-semibold">Questpoint Plaza</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Menu = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  
  const filteredItems = filter === 'All' ? MOCK_MENU : MOCK_MENU.filter(i => i.category === filter);

  return (
    <div className="px-6 pt-12 pb-24 flex flex-col gap-6 animate-in slide-in-from-bottom duration-500">
      <header className="flex flex-col gap-2">
        <h2 className="font-fantasy text-3xl text-quest-gold">Alchemist's Menu</h2>
        <p className="text-quest-cream/60 text-sm italic">Infusions and elixirs to boost your stats.</p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
        {['All', 'Coffee', 'Boba', 'Food'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === cat 
                ? 'bg-quest-gold text-quest-dark' 
                : 'glass text-quest-cream/60 hover:text-quest-cream'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="glass p-3 rounded-2xl flex gap-4 group hover:border-quest-gold/60 transition-colors">
            <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {item.isSeasonal && (
                <div className="absolute top-1 left-1">
                  <Badge>Seasonal</Badge>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between py-1 flex-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-fantasy text-lg text-quest-cream leading-tight">{item.name}</h3>
                  <span className="text-quest-gold font-bold">{item.price}</span>
                </div>
                <p className="text-[11px] text-quest-cream/50 mt-1 line-clamp-2">{item.description}</p>
              </div>
              <button className="self-end bg-quest-purple text-quest-gold p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <Zap size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Events = () => {
  return (
    <div className="px-6 pt-12 pb-24 flex flex-col gap-8 animate-in slide-in-from-bottom duration-500">
      <header className="flex flex-col gap-2">
        <h2 className="font-fantasy text-3xl text-quest-gold">Event Codex</h2>
        <p className="text-quest-cream/60 text-sm italic">Join the collective quest. Every week is legendary.</p>
      </header>

      <div className="flex flex-col gap-4">
        {MOCK_EVENTS.map((event) => (
          <div key={event.id} className="relative glass p-6 rounded-3xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-quest-purple/20 blur-3xl -z-10 transition-all group-hover:bg-quest-gold/20"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                <Badge variant={event.type === 'Tournament' ? 'purple' : 'gold'}>{event.type}</Badge>
                <h3 className="font-fantasy text-xl mt-1">{event.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-quest-gold font-bold">{event.date}</p>
                <p className="text-xs text-quest-cream/50">{event.time}</p>
              </div>
            </div>
            
            <p className="text-sm text-quest-cream/70 mb-4">{event.description}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-quest-cream/10">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-quest-cream/40 uppercase font-bold tracking-widest">Fee:</span>
                <span className="text-quest-gold font-semibold">{event.fee}</span>
              </div>
              <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuestLog = () => {
  const points = 850;
  const nextLevel = 1000;
  const progress = (points / nextLevel) * 100;

  return (
    <div className="px-6 pt-12 pb-24 flex flex-col gap-8 animate-in slide-in-from-bottom duration-500">
      <header className="flex flex-col gap-2">
        <h2 className="font-fantasy text-3xl text-quest-gold">Quest Log</h2>
        <p className="text-quest-cream/60 text-sm italic">Your journey through the Sanctum.</p>
      </header>

      {/* Profile Card */}
      <section className="isekai-gradient p-6 rounded-[2.5rem] border border-quest-gold/30 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-20 h-20 rounded-full border-4 border-quest-gold p-1">
            <div className="w-full h-full rounded-full bg-quest-charcoal flex items-center justify-center overflow-hidden">
               <User size={40} className="text-quest-gold" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-fantasy text-2xl">Aris_The_Bold</h3>
            <p className="text-quest-gold text-sm font-bold tracking-widest uppercase">Level 12 Mage</p>
          </div>
        </div>

        <div className="mt-8 relative z-10">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
            <span>Mana (Points)</span>
            <span>{points} / {nextLevel} XP</span>
          </div>
          <div className="h-3 w-full bg-quest-dark rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-quest-purple to-quest-gold transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Rewards Grid */}
      <section className="grid grid-cols-3 gap-3">
         {[
          { icon: Sword, label: 'Warrior' },
          { icon: Shield, label: 'Guardian' },
          { icon: Zap, label: 'Spellweaver' }
         ].map((badge, i) => (
           <div key={i} className="glass p-4 rounded-2xl flex flex-col items-center gap-2 grayscale opacity-40">
             <badge.icon size={24} className="text-quest-gold" />
             <span className="text-[10px] font-bold uppercase">{badge.label}</span>
           </div>
         ))}
      </section>

      {/* QR Code Section */}
      <section className="flex flex-col items-center gap-6 glass p-8 rounded-[2rem] border-dashed border-quest-gold/40">
        <div className="text-center">
          <h4 className="font-fantasy text-xl mb-1">Scan for XP</h4>
          <p className="text-xs text-quest-cream/50">Show this to your Alchemist at checkout.</p>
        </div>
        
        <div className="bg-white p-4 rounded-2xl gold-glow shadow-inner">
          <QrCode size={180} className="text-quest-dark" />
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center text-sm glass px-4 py-3 rounded-xl">
             <div className="flex items-center gap-3">
               <div className="bg-quest-gold/20 p-2 rounded-lg"><Star size={16} className="text-quest-gold" /></div>
               <span className="font-semibold">Redeem Rewards</span>
             </div>
             <ChevronRight size={16} className="text-quest-cream/40" />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- App Shell ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <Home onNavigate={setActiveTab} />;
      case 'menu': return <Menu />;
      case 'events': return <Events />;
      case 'quest': return <QuestLog />;
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen relative font-sans">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass">
        <div className="flex items-center gap-2">
          <div className="bg-quest-gold text-quest-dark p-1.5 rounded-lg">
            <Gamepad2 size={24} />
          </div>
          <span className="font-fantasy text-xl tracking-tighter">QUESTPOINT</span>
        </div>
        <button className="text-quest-cream/60 hover:text-quest-gold">
          <Search size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {renderContent()}
      </main>

      {/* Navigation */}
      <Navbar active={activeTab} setActive={setActiveTab} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
