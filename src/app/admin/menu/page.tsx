'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Eye, EyeOff, Upload } from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';
import { MOCK_MENU_ITEMS } from '@/data/menu-mock';
import { formatCurrency, cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * Admin Menu Items Management Page
 *
 * Spec Section 7.4 - Admin Panel Capabilities
 * - Menu item creation/editing/deletion
 * - Image uploads for menu items
 * - Manage seasonal items visibility
 */

export default function AdminMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [items] = useState(MOCK_MENU_ITEMS);

  const categories = ['all', 'coffee', 'boba', 'smoothie', 'food', 'specialty'];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="section-title mb-2">Menu Management</h1>
              <p className="section-subtitle">Create and manage menu items, prices, and availability</p>
            </div>
            <Button variant="gold" leftIcon={<Plus size={20} />}>
              Add Menu Item
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
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              className="flex-1"
            />

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? 'gold' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-quest-purple/10 border-quest-purple/30">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Total Items</p>
              <p className="font-fantasy text-3xl text-quest-cream">{items.length}</p>
            </div>
          </Card>

          <Card className="bg-quest-charcoal/50">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Available</p>
              <p className="font-fantasy text-3xl text-quest-cream">
                {items.filter((i) => i.isAvailable).length}
              </p>
            </div>
          </Card>

          <Card className="bg-quest-charcoal/50">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Seasonal</p>
              <p className="font-fantasy text-3xl text-quest-cream">
                {items.filter((i) => i.isSeasonal).length}
              </p>
            </div>
          </Card>

          <Card className="bg-quest-charcoal/50">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Featured</p>
              <p className="font-fantasy text-3xl text-quest-cream">
                {items.filter((i) => i.isFeatured).length}
              </p>
            </div>
          </Card>
        </div>

        {/* Items Grid */}
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:border-quest-gold/30 transition-colors">
              <div className="flex gap-4">
                {/* Image */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-quest-charcoal">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                  <button
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    title="Change image"
                  >
                    <Upload size={20} className="text-white" />
                  </button>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-fantasy text-lg text-quest-cream">{item.name}</h3>
                        {item.isSeasonal && (
                          <Badge variant="gold" size="sm">
                            Seasonal
                          </Badge>
                        )}
                        {item.isFeatured && (
                          <Badge variant="purple" size="sm">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-quest-cream/60 line-clamp-1 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-quest-cream/50">
                        <span className="capitalize">{item.category}</span>
                        {item.calories && <span>{item.calories} cal</span>}
                        {item.caffeineLevel !== 'none' && (
                          <span className="capitalize">{item.caffeineLevel} caffeine</span>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-quest-gold font-bold text-xl mb-1">
                        {formatCurrency(item.price)}
                      </p>
                      <Badge
                        variant={item.isAvailable ? 'gold' : 'ghost'}
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-quest-cream/10">
                    <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={item.isAvailable ? <EyeOff size={14} /> : <Eye size={14} />}
                    >
                      {item.isAvailable ? 'Hide' : 'Show'}
                    </Button>
                    <Button variant="ghost" size="sm" leftIcon={<Trash2 size={14} />}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {filteredItems.length === 0 && (
            <Card className="text-center py-12">
              <p className="text-quest-cream/60">No menu items found</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
