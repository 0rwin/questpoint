'use client';

import { useState } from 'react';
import { Plus, Edit, Package, AlertTriangle, Search, TrendingUp } from 'lucide-react';
import { Card, Button, Input, Badge } from '@/components/ui';
import { MOCK_PRODUCTS } from '@/data/shop-mock';
import { formatCurrency, cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * Admin Inventory Management Page
 *
 * Spec Section 7.4 - Admin Panel Capabilities
 * - Product inventory updates
 * - Stock level tracking
 * - Sync with Square (stubbed)
 */

export default function AdminInventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStock, setFilterStock] = useState<'all' | 'low' | 'out'>('all');
  const [products] = useState(MOCK_PRODUCTS);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStock === 'low') {
      return matchesSearch && product.stock > 0 && product.stock <= 5;
    } else if (filterStock === 'out') {
      return matchesSearch && product.stock === 0;
    }

    return matchesSearch;
  });

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="section-title mb-2">Inventory Management</h1>
              <p className="section-subtitle">Track and manage product stock levels</p>
            </div>
            <Button variant="gold" leftIcon={<Plus size={20} />}>
              Add Product
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Alerts */}
        {(lowStockCount > 0 || outOfStockCount > 0) && (
          <Card className="mb-8 bg-yellow-500/10 border-yellow-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-yellow-400 mb-1">Inventory Alerts</p>
                <div className="text-sm text-quest-cream/80 space-y-1">
                  {lowStockCount > 0 && (
                    <p>• {lowStockCount} product{lowStockCount > 1 ? 's' : ''} low on stock</p>
                  )}
                  {outOfStockCount > 0 && (
                    <p>
                      • {outOfStockCount} product{outOfStockCount > 1 ? 's are' : ' is'} out of
                      stock
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              className="flex-1"
            />

            {/* Stock Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterStock === 'all' ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setFilterStock('all')}
              >
                All
              </Button>
              <Button
                variant={filterStock === 'low' ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setFilterStock('low')}
              >
                Low Stock
              </Button>
              <Button
                variant={filterStock === 'out' ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setFilterStock('out')}
              >
                Out of Stock
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <Card className="bg-quest-purple/10 border-quest-purple/30">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Total Products</p>
              <p className="font-fantasy text-3xl text-quest-cream">{products.length}</p>
            </div>
          </Card>

          <Card className="bg-quest-charcoal/50">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Total Value</p>
              <p className="font-fantasy text-3xl text-quest-cream">
                {formatCurrency(products.reduce((sum, p) => sum + p.price * p.stock, 0))}
              </p>
            </div>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Low Stock</p>
              <p className="font-fantasy text-3xl text-yellow-400">{lowStockCount}</p>
            </div>
          </Card>

          <Card className="bg-red-500/10 border-red-500/30">
            <div className="text-center">
              <p className="text-quest-cream/50 text-xs uppercase mb-2">Out of Stock</p>
              <p className="font-fantasy text-3xl text-red-400">{outOfStockCount}</p>
            </div>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-quest-cream/10">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Product
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Category
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Price
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-quest-gold">
                    Stock
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
                {filteredProducts.map((product) => {
                  const isLowStock = product.stock > 0 && product.stock <= 5;
                  const isOutOfStock = product.stock === 0;

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-quest-cream/5 hover:bg-quest-cream/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-quest-charcoal">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-quest-cream">{product.name}</p>
                            <p className="text-xs text-quest-cream/50 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="ghost" size="sm">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-quest-cream">
                          {formatCurrency(product.price)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Package
                            size={14}
                            className={cn(
                              isOutOfStock
                                ? 'text-red-400'
                                : isLowStock
                                ? 'text-yellow-400'
                                : 'text-quest-gold'
                            )}
                          />
                          <span
                            className={cn(
                              'text-sm font-medium',
                              isOutOfStock
                                ? 'text-red-400'
                                : isLowStock
                                ? 'text-yellow-400'
                                : 'text-quest-cream'
                            )}
                          >
                            {product.stock}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {isOutOfStock ? (
                          <Badge variant="danger" size="sm">
                            Out of Stock
                          </Badge>
                        ) : isLowStock ? (
                          <Badge size="sm" className="bg-yellow-500/20 text-yellow-400">
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="gold" size="sm">
                            In Stock
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                            Update
                          </Button>
                          <Button variant="ghost" size="sm" leftIcon={<TrendingUp size={14} />}>
                            Restock
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-quest-cream/60">No products found</p>
              </div>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
