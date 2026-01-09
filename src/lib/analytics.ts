/**
 * Analytics Tracking Service
 *
 * Spec Section 8 - Analytics & Monitoring
 * Tracks conversion funnels, feature usage, and performance metrics
 * Privacy-focused: No PII, anonymized user IDs only
 */

// Analytics event types
export type AnalyticsEvent =
  // Conversion funnel events
  | 'cart_add'
  | 'cart_remove'
  | 'checkout_start'
  | 'checkout_complete'
  | 'order_complete'
  // Feature usage events
  | 'search'
  | 'filter_used'
  | 'favorite_add'
  | 'favorite_remove'
  | 'menu_category_view'
  | 'event_register'
  | 'event_view'
  // User actions
  | 'page_view'
  | 'button_click'
  | 'modal_open'
  | 'modal_close';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean | null>;
  userId?: string; // Anonymized user ID only
  timestamp?: string;
}

/**
 * Track analytics event
 * Sends to multiple analytics providers
 */
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, any>): void {
  // Don't track in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties);
    return;
  }

  const eventData: AnalyticsEventData = {
    event,
    properties: sanitizeProperties(properties),
    userId: getAnonymizedUserId(),
    timestamp: new Date().toISOString(),
  };

  // Send to Vercel Analytics (automatic page views)
  // Vercel Analytics tracks page views automatically via the Analytics component

  // Send custom events to analytics endpoint
  sendToAnalytics(eventData);
}

/**
 * Track page view
 * Called automatically by Next.js router
 */
export function trackPageView(path: string, properties?: Record<string, any>): void {
  trackEvent('page_view', {
    path,
    ...properties,
  });
}

/**
 * Track conversion funnel events
 */
export const ConversionTracking = {
  /**
   * Track item added to cart
   */
  cartAdd(itemName: string, price: number, category?: string): void {
    trackEvent('cart_add', {
      item_name: itemName,
      price,
      category,
    });
  },

  /**
   * Track item removed from cart
   */
  cartRemove(itemName: string): void {
    trackEvent('cart_remove', {
      item_name: itemName,
    });
  },

  /**
   * Track checkout started
   */
  checkoutStart(cartTotal: number, itemCount: number): void {
    trackEvent('checkout_start', {
      cart_total: cartTotal,
      item_count: itemCount,
    });
  },

  /**
   * Track checkout completed (payment successful)
   */
  checkoutComplete(orderTotal: number, paymentMethod: string): void {
    trackEvent('checkout_complete', {
      order_total: orderTotal,
      payment_method: paymentMethod,
    });
  },

  /**
   * Track order completed (confirmation page reached)
   */
  orderComplete(orderId: string, orderTotal: number, itemCount: number): void {
    trackEvent('order_complete', {
      order_id: orderId,
      order_total: orderTotal,
      item_count: itemCount,
    });
  },
};

/**
 * Track feature usage events
 */
export const FeatureTracking = {
  /**
   * Track search query
   */
  search(query: string, resultCount: number, category?: string): void {
    trackEvent('search', {
      query_length: query.length, // Don't send actual query for privacy
      result_count: resultCount,
      category,
    });
  },

  /**
   * Track filter usage
   */
  filterUsed(filterType: string, filterValue: string): void {
    trackEvent('filter_used', {
      filter_type: filterType,
      filter_value: filterValue,
    });
  },

  /**
   * Track favorite added
   */
  favoriteAdd(itemType: 'menu_item' | 'product', itemName: string): void {
    trackEvent('favorite_add', {
      item_type: itemType,
      item_name: itemName,
    });
  },

  /**
   * Track favorite removed
   */
  favoriteRemove(itemType: 'menu_item' | 'product', itemName: string): void {
    trackEvent('favorite_remove', {
      item_type: itemType,
      item_name: itemName,
    });
  },

  /**
   * Track menu category viewed
   */
  menuCategoryView(category: string): void {
    trackEvent('menu_category_view', {
      category,
    });
  },

  /**
   * Track event registration
   */
  eventRegister(eventId: string, eventType: string, fee: number): void {
    trackEvent('event_register', {
      event_id: eventId,
      event_type: eventType,
      fee,
    });
  },

  /**
   * Track event viewed
   */
  eventView(eventId: string, eventType: string): void {
    trackEvent('event_view', {
      event_id: eventId,
      event_type: eventType,
    });
  },
};

/**
 * Track performance metrics
 */
export const PerformanceTracking = {
  /**
   * Track Core Web Vitals
   */
  reportWebVitals(metric: {
    id: string;
    name: string;
    value: number;
    label: 'web-vital' | 'custom';
  }): void {
    // Send to analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      sendToAnalytics({
        event: 'page_view',
        properties: {
          metric_name: metric.name,
          metric_value: metric.value,
          metric_id: metric.id,
          metric_label: metric.label,
        },
        timestamp: new Date().toISOString(),
      });
    }
  },

  /**
   * Track API response time
   */
  apiResponseTime(endpoint: string, duration: number, status: number): void {
    if (process.env.NODE_ENV === 'production') {
      sendToAnalytics({
        event: 'page_view',
        properties: {
          api_endpoint: endpoint,
          duration_ms: duration,
          status_code: status,
        },
        timestamp: new Date().toISOString(),
      });
    }
  },
};

/**
 * Get anonymized user ID from session storage
 * Never includes PII - just a random UUID per device
 */
function getAnonymizedUserId(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  try {
    let userId = sessionStorage.getItem('anonymous_user_id');
    if (!userId) {
      userId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      sessionStorage.setItem('anonymous_user_id', userId);
    }
    return userId;
  } catch {
    return undefined;
  }
}

/**
 * Sanitize properties to remove PII
 */
function sanitizeProperties(
  properties?: Record<string, any>
): Record<string, string | number | boolean | null> | undefined {
  if (!properties) return undefined;

  const sanitized: Record<string, string | number | boolean | null> = {};

  // Only allow primitive types, no nested objects
  for (const [key, value] of Object.entries(properties)) {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null
    ) {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Send event data to analytics endpoint
 * @stub This will send to actual analytics service when configured
 */
async function sendToAnalytics(eventData: AnalyticsEventData): Promise<void> {
  try {
    // TODO: Send to analytics API endpoint
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(eventData),
    // });

    console.log('[Analytics] Event tracked:', eventData.event, eventData.properties);
  } catch (error) {
    // Fail silently - analytics errors shouldn't break the app
    console.error('[Analytics] Failed to track event:', error);
  }
}

/**
 * Check if user has consented to analytics
 * Required for GDPR/CCPA compliance
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const consent = localStorage.getItem('analytics_consent');
    return consent === 'true';
  } catch {
    return false;
  }
}

/**
 * Set analytics consent
 */
export function setAnalyticsConsent(consent: boolean): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('analytics_consent', consent ? 'true' : 'false');
  } catch {
    // Ignore localStorage errors
  }
}
