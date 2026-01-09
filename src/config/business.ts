/**
 * Business Configuration
 *
 * Spec Section 9.2 - Business Constraints
 * Centralized configuration for business rules and constraints
 */

/**
 * Location Configuration
 * Spec: Single location only (no multi-location support)
 */
export const LOCATION = {
  name: 'Questpoint Cafe',
  address: {
    street: '123 Gaming Ave',
    city: 'Your City',
    state: 'CA',
    zip: '12345',
    country: 'USA',
  },
  contact: {
    phone: '(555) 555-QUEST',
    email: 'hello@questpointcafe.com',
    supportEmail: 'support@questpointcafe.com',
    privacyEmail: 'privacy@questpointcafe.com',
  },
  coordinates: {
    lat: 37.7749, // Update with actual coordinates
    lng: -122.4194,
  },
} as const;

/**
 * Business Hours Configuration
 * Spec: 7 AM - 10 PM daily
 */
export const BUSINESS_HOURS = {
  // Opening time (24-hour format)
  openHour: 7,
  openMinute: 0,

  // Closing time (24-hour format)
  closeHour: 22,
  closeMinute: 0,

  // Order cutoff (15 minutes before close)
  orderCutoffMinutes: 15,

  // Days open (all days)
  daysOpen: [0, 1, 2, 3, 4, 5, 6] as number[], // Sunday - Saturday

  // Display format
  displayHours: '7:00 AM - 10:00 PM',
  displayDays: 'Daily',
} as const;

/**
 * Order Configuration
 * Spec: Pickup and dine-in only (no delivery)
 */
export const ORDER_CONFIG = {
  // Allowed order types
  allowedTypes: ['pickup', 'dine_in'] as const,

  // Order type labels
  typeLabels: {
    pickup: 'Pickup',
    dine_in: 'Dine In',
  } as const,

  // Preparation time estimates (minutes)
  prepTime: {
    pickup: 15,
    dine_in: 10,
  } as const,

  // Maximum advance order time (days)
  maxAdvanceOrderDays: 7,

  // Minimum order amount
  minimumOrderAmount: 0,

  // Tax rate (percentage)
  taxRate: 8.25,
} as const;

/**
 * Language Configuration
 * Spec: English language only (no i18n initially)
 */
export const LANGUAGE_CONFIG = {
  default: 'en-US',
  supported: ['en-US'],
  currency: 'USD',
  currencySymbol: '$',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h', // 12-hour format
} as const;

/**
 * Service Tier Limits
 * Spec Section 9.1 - Technical Constraints
 */
export const SERVICE_LIMITS = {
  supabase: {
    databaseSize: 500, // MB
    bandwidthPerDay: 2048, // MB (2GB)
    warnThreshold: {
      database: 400, // MB
      bandwidth: 1536, // MB (1.5GB)
    },
  },
  square: {
    requestsPerSecond: 10,
    maxRetries: 3,
    retryDelay: 1000, // ms
  },
} as const;

/**
 * Feature Flags
 * Controls which features are enabled based on constraints
 */
export const FEATURES = {
  // Order types
  deliveryEnabled: false, // Phase 2 feature
  cateringEnabled: false, // Phase 2 feature

  // Payment methods
  squarePaymentEnabled: true,
  applePayEnabled: false, // Phase 3 feature
  googlePayEnabled: false, // Phase 3 feature

  // Localization
  multiLanguageEnabled: false, // Phase 3 feature

  // Advanced features
  multiLocationEnabled: false, // Phase 4 feature
  promoCodesEnabled: false, // Phase 4 feature (manual discounts only in MVP)
  subscriptionEnabled: false, // Phase 2 feature
} as const;

/**
 * User Assumptions
 * Spec Section 9.3 - Assumptions
 */
export const USER_ASSUMPTIONS = {
  // Expected traffic distribution
  mobileTrafficPercent: 90,
  desktopTrafficPercent: 10,

  // Connectivity
  hasStableInternet: true,
  offlineFallbackEnabled: true,

  // Devices
  hasSmartphone: true,
  minScreenWidth: 320, // px
  touchTargetSize: 44, // px (iOS minimum)
} as const;

/**
 * Helper function to check if cafe is currently open
 */
export function isCafeOpenNow(): {
  isOpen: boolean;
  status: string;
  nextChange: string | null;
} {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Check if current day is in open days
  if (!BUSINESS_HOURS.daysOpen.includes(currentDay)) {
    return {
      isOpen: false,
      status: 'Closed',
      nextChange: 'Tomorrow at 7:00 AM',
    };
  }

  // Convert current time to minutes since midnight
  const currentMinutes = currentHour * 60 + currentMinute;
  const openMinutes = BUSINESS_HOURS.openHour * 60 + BUSINESS_HOURS.openMinute;
  const closeMinutes = BUSINESS_HOURS.closeHour * 60 + BUSINESS_HOURS.closeMinute;

  // Check if currently open
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    // Calculate time until close
    const minutesUntilClose = closeMinutes - currentMinutes;
    const hoursUntilClose = Math.floor(minutesUntilClose / 60);
    const minsUntilClose = minutesUntilClose % 60;

    let nextChange: string;
    if (hoursUntilClose > 0) {
      nextChange = `Closes at ${BUSINESS_HOURS.closeHour % 12 || 12}:00 PM`;
    } else if (minsUntilClose > 30) {
      nextChange = `Closes in ${minsUntilClose} minutes`;
    } else {
      nextChange = 'Closing soon';
    }

    return {
      isOpen: true,
      status: 'Open Now',
      nextChange,
    };
  }

  // Check if before opening
  if (currentMinutes < openMinutes) {
    const minutesUntilOpen = openMinutes - currentMinutes;
    const hoursUntilOpen = Math.floor(minutesUntilOpen / 60);
    const minsUntilOpen = minutesUntilOpen % 60;

    let nextChange: string;
    if (hoursUntilOpen > 1) {
      nextChange = `Opens at ${BUSINESS_HOURS.openHour}:00 AM`;
    } else if (minutesUntilOpen > 30) {
      nextChange = `Opens in ${hoursUntilOpen}h ${minsUntilOpen}m`;
    } else {
      nextChange = 'Opening soon';
    }

    return {
      isOpen: false,
      status: 'Closed',
      nextChange,
    };
  }

  // After closing
  return {
    isOpen: false,
    status: 'Closed',
    nextChange: 'Tomorrow at 7:00 AM',
  };
}

/**
 * Helper function to check if orders are currently accepted
 * Orders stop 15 minutes before close
 */
export function canAcceptOrders(): {
  canOrder: boolean;
  reason?: string;
} {
  const { isOpen } = isCafeOpenNow();

  if (!isOpen) {
    return {
      canOrder: false,
      reason: 'We are currently closed. Please order during business hours (7 AM - 10 PM).',
    };
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const closeMinutes = BUSINESS_HOURS.closeHour * 60 + BUSINESS_HOURS.closeMinute;
  const cutoffMinutes = closeMinutes - BUSINESS_HOURS.orderCutoffMinutes;

  if (currentMinutes >= cutoffMinutes) {
    return {
      canOrder: false,
      reason: `We stop accepting orders 15 minutes before close (${BUSINESS_HOURS.closeHour - 1}:45 PM). Please visit us tomorrow!`,
    };
  }

  return { canOrder: true };
}

/**
 * Format location address for display
 */
export function getFormattedAddress(): string {
  const { street, city, state, zip } = LOCATION.address;
  return `${street}, ${city}, ${state} ${zip}`;
}

/**
 * Format phone number for display
 */
export function getFormattedPhone(): string {
  return LOCATION.contact.phone;
}

/**
 * Get Google Maps URL for location
 */
export function getGoogleMapsUrl(): string {
  const { lat, lng } = LOCATION.coordinates;
  return `https://www.google.com/maps?q=${lat},${lng}`;
}
