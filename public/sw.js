/**
 * Service Worker for Progressive Web App
 *
 * Spec Section 6.3 - Network Resilience
 * - Cache menu data (24h)
 * - Cache static assets (images, CSS, JS)
 * - Cache app shell
 * - Queue failed requests, retry on reconnect
 */

const CACHE_VERSION = 'v1';
const CACHE_NAMES = {
  STATIC: `questpoint-static-${CACHE_VERSION}`,
  DYNAMIC: `questpoint-dynamic-${CACHE_VERSION}`,
  MENU: `questpoint-menu-${CACHE_VERSION}`,
};

const STATIC_ASSETS = [
  '/',
  '/menu',
  '/events',
  '/shop',
  '/offline',
];

const MENU_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const DYNAMIC_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(CACHE_NAMES.STATIC).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );

  // Activate immediately
  self.skipWaiting();
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('questpoint-') && !Object.values(CACHE_NAMES).includes(cacheName);
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );

  // Take control immediately
  return self.clients.claim();
});

/**
 * Fetch event - serve from cache, fallback to network
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Skip API requests from caching (except menu data)
  if (url.pathname.startsWith('/api/')) {
    // Cache menu API requests
    if (url.pathname.includes('/menu')) {
      event.respondWith(cacheFirstStrategy(request, CACHE_NAMES.MENU, MENU_CACHE_DURATION));
    } else {
      // Network-only for other API requests
      event.respondWith(fetch(request));
    }
    return;
  }

  // Static assets (JS, CSS, images)
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAMES.STATIC));
    return;
  }

  // Navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstStrategy(request, CACHE_NAMES.DYNAMIC));
    return;
  }

  // Default: network first
  event.respondWith(networkFirstStrategy(request, CACHE_NAMES.DYNAMIC));
});

/**
 * Cache-first strategy: check cache, fallback to network
 */
async function cacheFirstStrategy(request, cacheName, maxAge = DYNAMIC_CACHE_DURATION) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Check if cache is expired
      const cachedDate = new Date(cachedResponse.headers.get('date'));
      const age = Date.now() - cachedDate.getTime();

      if (age < maxAge) {
        console.log('[SW] Serving from cache:', request.url);
        return cachedResponse;
      } else {
        console.log('[SW] Cache expired, fetching fresh:', request.url);
      }
    }

    // Fetch from network
    const networkResponse = await fetch(request);

    // Cache the new response
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first strategy failed:', error);

    // Try to return cached response even if expired
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      console.log('[SW] Serving expired cache as fallback');
      return cachedResponse;
    }

    // Return offline page
    return caches.match('/offline');
  }
}

/**
 * Network-first strategy: try network, fallback to cache
 */
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);

    // Fallback to cache
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }

    throw error;
  }
}

/**
 * Check if URL is for a static asset
 */
function isStaticAsset(pathname) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.woff', '.woff2'];
  return staticExtensions.some((ext) => pathname.endsWith(ext));
}

/**
 * Background sync for queued requests
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    console.log('[SW] Syncing queued orders...');
    event.waitUntil(syncQueuedOrders());
  }
});

/**
 * Sync queued orders when back online
 */
async function syncQueuedOrders() {
  // TODO: Implement order queue sync
  console.log('[SW] [STUB] Would sync queued orders here');

  // In production:
  // 1. Get queued orders from IndexedDB
  // 2. Retry sending each order
  // 3. Remove successful orders from queue
  // 4. Keep failed orders for next sync
}

/**
 * Push notification support
 */
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Questpoint Cafe';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data.url || '/',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * Handle notification clicks
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});
