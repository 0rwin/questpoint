'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Receipt,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Search,
  Calendar,
  RefreshCw,
  Flag,
  Download,
  Mail,
  ShoppingCart,
  X,
} from 'lucide-react';
import { Card, Badge, Button, Input } from '@/components/ui';
import { formatCurrency, formatDate, formatTime, cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

// Mock orders (will come from Supabase)
const MOCK_ORDERS = [
  {
    id: '1',
    orderNumber: 'QP-20260107-001',
    status: 'ready',
    orderType: 'pickup',
    items: [
      { id: 'item1', name: 'Mana Potion Boba', quantity: 2, price: 7.0, available: true },
      { id: 'item2', name: 'Hot Black Lotus Latte', quantity: 1, price: 6.5, available: true },
    ],
    subtotal: 20.5,
    tax: 1.69,
    tip: 3.08,
    total: 25.27,
    pointsEarned: 20,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    estimatedReadyAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: '2',
    orderNumber: 'QP-20260106-045',
    status: 'completed',
    orderType: 'dine_in',
    items: [
      { id: 'item3', name: 'Taro Milk Tea', quantity: 1, price: 6.5, available: true },
      { id: 'item4', name: 'Takoyaki (6 pcs)', quantity: 1, price: 8.5, available: false }, // Unavailable
    ],
    subtotal: 15.0,
    tax: 1.24,
    tip: 0,
    total: 16.24,
    pointsEarned: 15,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60000 + 45 * 60000).toISOString(),
  },
  {
    id: '3',
    orderNumber: 'QP-20260105-022',
    status: 'completed',
    orderType: 'pickup',
    items: [
      { id: 'item5', name: 'Cold Brew', quantity: 2, price: 4.5, available: true },
      { id: 'item6', name: 'Soft Pretzel', quantity: 1, price: 6.5, available: true },
    ],
    subtotal: 15.5,
    tax: 1.28,
    tip: 0.06,
    total: 16.84,
    pointsEarned: 15,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60000 + 20 * 60000).toISOString(),
  },
  {
    id: '4',
    orderNumber: 'QP-20260101-088',
    status: 'completed',
    orderType: 'pickup',
    items: [
      { id: 'item7', name: 'Iced Latte', quantity: 1, price: 5.5, available: true },
      { id: 'item8', name: 'Blueberry Muffin', quantity: 1, price: 4.5, available: true },
    ],
    subtotal: 10.0,
    tax: 0.83,
    tip: 0,
    total: 10.83,
    pointsEarned: 10,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60000 + 15 * 60000).toISOString(),
  },
];

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';

export default function OrderHistoryPage() {
  const router = useRouter();
  const { addItem } = useCartStore();

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | '7days' | '30days' | '90days'>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [reportingIssue, setReportingIssue] = useState<string | null>(null);
  const [issueDescription, setIssueDescription] = useState('');

  // Filter orders
  const filteredOrders = MOCK_ORDERS.filter((order) => {
    // Status filter
    if (filter === 'active' && !['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)) {
      return false;
    }
    if (filter === 'completed' && order.status !== 'completed') {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesOrderNumber = order.orderNumber.toLowerCase().includes(query);
      const matchesItems = order.items.some((item) => item.name.toLowerCase().includes(query));
      if (!matchesOrderNumber && !matchesItems) return false;
    }

    // Date filter
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dateFilter === '7days' && daysDiff > 7) return false;
      if (dateFilter === '30days' && daysDiff > 30) return false;
      if (dateFilter === '90days' && daysDiff > 90) return false;
    }

    return true;
  });

  // Handle reorder
  const handleReorder = (order: typeof MOCK_ORDERS[0]) => {
    const unavailableItems = order.items.filter((item) => !item.available);

    if (unavailableItems.length > 0) {
      const itemNames = unavailableItems.map((item) => item.name).join(', ');
      alert(
        `Some items are no longer available: ${itemNames}\n\nWould you like to add the available items to your cart instead?`
      );
    }

    // Add available items to cart
    const availableItems = order.items.filter((item) => item.available);
    availableItems.forEach((item) => {
      // TODO: Load full item details from menu
      console.log('[STUB] Adding to cart:', item.name, 'x', item.quantity);
      // addItem({ ... }) - would add with full menu item data
    });

    if (availableItems.length > 0) {
      router.push('/cart');
    }
  };

  // Handle report issue
  const handleReportIssue = (orderNumber: string) => {
    if (!issueDescription.trim()) {
      alert('Please describe the issue with your order');
      return;
    }

    console.log('[STUB] Reporting issue for order:', orderNumber, issueDescription);

    // TODO: Submit to support system
    alert(
      `Issue reported for order ${orderNumber}.\n\nOur team will review your request and issue store credit if approved. You'll receive an email within 24 hours.`
    );

    setReportingIssue(null);
    setIssueDescription('');
  };

  // Handle receipt download
  const handleDownloadReceipt = (orderNumber: string) => {
    console.log('[STUB] Downloading receipt for order:', orderNumber);
    alert(`Receipt for ${orderNumber} would download as PDF`);
  };

  // Handle email receipt
  const handleEmailReceipt = (orderNumber: string) => {
    console.log('[STUB] Emailing receipt for order:', orderNumber);
    alert(`Receipt for ${orderNumber} will be sent to your email`);
  };

  return (
    <div className="page-enter min-h-screen pb-24">
      {/* Header */}
      <section className="bg-quest-gradient border-b border-quest-cream/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-2">Order History</h1>
          <p className="section-subtitle">View your past and current orders</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* Search and Filters */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by order # or item name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-quest-cream/40 hover:text-quest-cream"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Date Filter */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="w-full px-4 py-3 pl-10 bg-quest-charcoal text-quest-cream border border-quest-cream/10 rounded-xl focus:outline-none focus:border-quest-gold/50 appearance-none"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-quest-cream/40" size={18} />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
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

      {/* Orders List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <Receipt className="mx-auto mb-4 text-quest-cream/20" size={48} />
            <h3 className="font-fantasy text-xl text-quest-cream mb-2">No Orders Found</h3>
            <p className="text-quest-cream/60 mb-6">
              {searchQuery
                ? 'No orders match your search'
                : filter === 'active'
                ? "You don't have any active orders"
                : "You haven't placed any orders yet"}
            </p>
            <Link href="/menu">
              <Button variant="gold" size="lg">
                Browse Menu
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                expanded={expandedOrder === order.id}
                onToggleExpand={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
                onReorder={() => handleReorder(order)}
                onReportIssue={() => {
                  setReportingIssue(order.orderNumber);
                  setIssueDescription('');
                }}
                onDownloadReceipt={() => handleDownloadReceipt(order.orderNumber)}
                onEmailReceipt={() => handleEmailReceipt(order.orderNumber)}
              />
            ))}
          </div>
        )}

        {/* Report Issue Modal */}
        {reportingIssue && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Flag className="text-red-400" size={20} />
                </div>
                <div>
                  <h3 className="font-fantasy text-lg text-quest-cream">Report Issue</h3>
                  <p className="text-quest-cream/60 text-sm">Order #{reportingIssue}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-quest-cream text-sm mb-2">
                    Describe the issue with your order:
                  </label>
                  <textarea
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="e.g., Wrong item, cold food, missing item..."
                    className="w-full px-4 py-3 bg-quest-dark text-quest-cream border border-quest-cream/10 rounded-xl focus:outline-none focus:border-quest-gold/50 min-h-[100px] resize-none"
                    maxLength={500}
                  />
                  <p className="text-quest-cream/40 text-xs mt-1">
                    {issueDescription.length}/500 characters
                  </p>
                </div>

                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-sm text-yellow-500">
                  <p className="font-medium mb-1">Refund Policy:</p>
                  <p className="text-yellow-500/80 text-xs">
                    Manager will review and may issue store credit. Refunds processed as store
                    credit valid for 1 year.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="danger"
                    onClick={() => handleReportIssue(reportingIssue)}
                    disabled={!issueDescription.trim()}
                  >
                    Submit Report
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setReportingIssue(null);
                      setIssueDescription('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}

// Order Card Component
interface OrderCardProps {
  order: typeof MOCK_ORDERS[0];
  expanded: boolean;
  onToggleExpand: () => void;
  onReorder: () => void;
  onReportIssue: () => void;
  onDownloadReceipt: () => void;
  onEmailReceipt: () => void;
}

function OrderCard({
  order,
  expanded,
  onToggleExpand,
  onReorder,
  onReportIssue,
  onDownloadReceipt,
  onEmailReceipt,
}: OrderCardProps) {
  const isActive = ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status);
  const canReportIssue = order.status === 'completed' &&
    new Date().getTime() - new Date(order.completedAt || order.createdAt).getTime() < 24 * 60 * 60 * 1000;

  return (
    <Card variant="default" padding="none" className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-fantasy text-lg text-quest-cream">
                Order #{order.orderNumber}
              </h3>
              <StatusBadge status={order.status as OrderStatus} />
            </div>
            <div className="flex items-center gap-4 text-sm text-quest-cream/60">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <span className="capitalize">{order.orderType.replace('_', '-')}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-quest-gold font-bold text-xl">
              {formatCurrency(order.total)}
            </p>
            <p className="text-xs text-quest-cream/40">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Items Preview (collapsed) */}
        {!expanded && (
          <div className="flex flex-wrap gap-2 mb-4">
            {order.items.slice(0, 3).map((item, idx) => (
              <Badge key={idx} variant="ghost" size="sm">
                {item.quantity}x {item.name}
              </Badge>
            ))}
            {order.items.length > 3 && (
              <Badge variant="ghost" size="sm">
                +{order.items.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Expanded Order Details */}
        {expanded && (
          <div className="mb-4 space-y-4">
            {/* Items */}
            <div className="border-t border-quest-cream/10 pt-4">
              <h4 className="text-quest-cream font-medium mb-3">Order Items</h4>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-quest-cream/60">{item.quantity}x</span>
                      <span className="text-quest-cream">{item.name}</span>
                      {!item.available && (
                        <Badge variant="danger" size="sm">Unavailable</Badge>
                      )}
                    </div>
                    <span className="text-quest-cream/60">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-quest-cream/10 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-quest-cream/60">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-quest-cream/60">
                <span>Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              {order.tip > 0 && (
                <div className="flex justify-between text-quest-cream/60">
                  <span>Tip</span>
                  <span>{formatCurrency(order.tip)}</span>
                </div>
              )}
              <div className="flex justify-between text-quest-cream font-semibold pt-2 border-t border-quest-cream/10">
                <span>Total</span>
                <span className="text-quest-gold">{formatCurrency(order.total)}</span>
              </div>
            </div>

            {/* Points Earned */}
            <div className="flex items-center justify-between p-3 bg-quest-gold/10 rounded-lg border border-quest-gold/30">
              <span className="text-sm text-quest-cream">Points Earned</span>
              <span className="text-quest-gold font-bold">+{order.pointsEarned}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {/* View Status / Expand Details */}
          {isActive ? (
            <Link href={`/orders/${order.orderNumber}`} className="flex-1">
              <Button variant="gold" size="sm" className="w-full">
                <Clock size={16} />
                View Status
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="sm" onClick={onToggleExpand} className="flex-1">
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              {expanded ? 'Hide' : 'Show'} Details
            </Button>
          )}

          {/* Reorder */}
          {!isActive && (
            <Button variant="purple" size="sm" onClick={onReorder}>
              <RefreshCw size={16} />
              Reorder
            </Button>
          )}

          {/* Report Issue */}
          {canReportIssue && (
            <Button variant="ghost" size="sm" onClick={onReportIssue}>
              <Flag size={16} />
              Report Issue
            </Button>
          )}

          {/* Receipt Options */}
          {expanded && (
            <>
              <Button variant="ghost" size="sm" onClick={onDownloadReceipt}>
                <Download size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onEmailReceipt}>
                <Mail size={16} />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: OrderStatus }) {
  const variants: Record<OrderStatus, { variant: 'gold' | 'success' | 'warning' | 'danger'; label: string }> = {
    pending: { variant: 'warning', label: 'Pending' },
    confirmed: { variant: 'gold', label: 'Confirmed' },
    preparing: { variant: 'warning', label: 'Preparing' },
    ready: { variant: 'success', label: 'Ready' },
    completed: { variant: 'success', label: 'Completed' },
  };

  const { variant, label } = variants[status];

  return (
    <Badge variant={variant} size="sm">
      {label}
    </Badge>
  );
}
