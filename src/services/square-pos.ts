/**
 * Square POS Integration Service
 *
 * Spec Section 7.2 - POS Integration
 * - Send online orders to Square POS
 * - Update order status
 * - Sync with Square for order fulfillment
 *
 * All methods are stubbed and will be implemented when Square API credentials are configured
 */

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface POSOrder {
  id: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    modifiers?: string[];
  }>;
  total: number;
  customerName?: string;
  customerPhone?: string;
  orderType: 'pickup' | 'dine_in';
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface POSOrderResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}

/**
 * Send order to Square POS
 * @stub This will integrate with Square Orders API when credentials are configured
 */
export async function sendOrderToPOS(order: POSOrder): Promise<POSOrderResponse> {
  console.log('[STUB] Sending order to Square POS:', order.orderNumber);

  // TODO: Implement Square Orders API call
  // const response = await fetch('https://connect.squareup.com/v2/orders', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     location_id: process.env.SQUARE_LOCATION_ID,
  //     line_items: order.items.map(item => ({
  //       name: item.name,
  //       quantity: item.quantity.toString(),
  //       base_price_money: {
  //         amount: Math.round(item.price * 100),
  //         currency: 'USD',
  //       },
  //     })),
  //   }),
  // });

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    orderId: `square_${order.id}`,
  };
}

/**
 * Update order status in Square POS
 * @stub This will integrate with Square Orders API when credentials are configured
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<POSOrderResponse> {
  console.log('[STUB] Updating order status in Square POS:', orderId, status);

  // TODO: Implement Square Orders API update
  // const response = await fetch(`https://connect.squareup.com/v2/orders/${orderId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     order: {
  //       state: mapStatusToSquareState(status),
  //     },
  //   }),
  // });

  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    success: true,
    orderId,
  };
}

/**
 * Get order from Square POS
 * @stub This will integrate with Square Orders API when credentials are configured
 */
export async function getOrderFromPOS(orderId: string): Promise<POSOrder | null> {
  console.log('[STUB] Fetching order from Square POS:', orderId);

  // TODO: Implement Square Orders API retrieval
  // const response = await fetch(`https://connect.squareup.com/v2/orders/${orderId}`, {
  //   headers: {
  //     'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
  //   },
  // });

  await new Promise((resolve) => setTimeout(resolve, 300));

  return null; // Return null for stub
}

/**
 * Map internal status to Square order state
 */
function mapStatusToSquareState(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    pending: 'OPEN',
    preparing: 'IN_PROGRESS',
    ready: 'COMPLETED',
    completed: 'COMPLETED',
    cancelled: 'CANCELED',
  };

  return statusMap[status] || 'OPEN';
}

/**
 * Subscribe to order status updates from Square
 * @stub This would use Square Webhooks when configured
 */
export function subscribeToOrderUpdates(
  callback: (orderId: string, status: OrderStatus) => void
): () => void {
  console.log('[STUB] Subscribing to Square order updates');

  // TODO: Implement Square Webhooks subscription
  // When Square sends a webhook, parse it and call the callback
  // Example webhook: order.updated event

  // Return unsubscribe function
  return () => {
    console.log('[STUB] Unsubscribing from Square order updates');
  };
}

/**
 * Check if Square POS is online/reachable
 * @stub This will ping Square API when credentials are configured
 */
export async function checkPOSConnection(): Promise<boolean> {
  console.log('[STUB] Checking Square POS connection');

  // TODO: Implement Square API health check
  // const response = await fetch('https://connect.squareup.com/v2/locations', {
  //   headers: {
  //     'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
  //   },
  // });
  // return response.ok;

  return true; // Return true for stub
}

/**
 * Manual order entry for POS offline fallback
 * Spec Section 7.3 - POS Offline Handling
 */
export interface ManualOrderEntry {
  orderNumber: string;
  items: string;
  total: number;
  paymentMethod: 'online' | 'cash' | 'card';
  timestamp: string;
  notes?: string;
}

const MANUAL_ORDERS_KEY = 'questpoint_manual_orders';

/**
 * Save manual order entry for later sync
 * Used when Square POS is offline
 */
export function saveManualOrder(entry: ManualOrderEntry): void {
  try {
    const existing = getManualOrders();
    existing.push(entry);
    localStorage.setItem(MANUAL_ORDERS_KEY, JSON.stringify(existing));
    console.log('[POS OFFLINE] Saved manual order entry:', entry.orderNumber);
  } catch (error) {
    console.error('[POS OFFLINE] Failed to save manual order:', error);
  }
}

/**
 * Get all manual order entries awaiting sync
 */
export function getManualOrders(): ManualOrderEntry[] {
  try {
    const stored = localStorage.getItem(MANUAL_ORDERS_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('[POS OFFLINE] Failed to read manual orders:', error);
    return [];
  }
}

/**
 * Sync manual orders to Square when connection is restored
 */
export async function syncManualOrders(): Promise<{ success: number; failed: number }> {
  console.log('[POS OFFLINE] Syncing manual orders to Square...');

  const orders = getManualOrders();
  if (orders.length === 0) {
    console.log('[POS OFFLINE] No manual orders to sync');
    return { success: 0, failed: 0 };
  }

  let success = 0;
  let failed = 0;

  for (const order of orders) {
    try {
      // TODO: Send manual order to Square for record-keeping
      console.log('[STUB] Would sync manual order:', order.orderNumber);
      success++;
    } catch (error) {
      console.error('[POS OFFLINE] Failed to sync order:', order.orderNumber, error);
      failed++;
    }
  }

  // Clear synced orders
  if (failed === 0) {
    localStorage.removeItem(MANUAL_ORDERS_KEY);
    console.log('[POS OFFLINE] All manual orders synced successfully');
  }

  return { success, failed };
}
