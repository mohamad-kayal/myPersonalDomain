/* ============================================
   AutoInspect Pro — Service Worker
   Enables offline support and caching
   ============================================ */

const CACHE_NAME = 'autoinspect-v1';
const OFFLINE_URL = 'offline.html';

const PRECACHE_URLS = [
  '/',
  'dashboard.html',
  'inspections.html',
  'new-inspection.html',
  'vehicles.html',
  'report-view.html',
  'profile.html',
  'help.html',
  'offline.html',
  'css/variables.css',
  'css/base.css',
  'css/components.css',
  'css/layout.css',
  'css/responsive.css',
  'css/pages/dashboard.css',
  'css/pages/login.css',
  'js/app.js',
  'js/mock-data.js',
  'manifest.json'
];

// Install — precache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch — network first, fallback to cache, then offline page
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests (CDN fonts, icons, etc.)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;

          // If it's a navigation request, show offline page
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }

          // Return empty response for other resources
          return new Response('', { status: 503, statusText: 'Offline' });
        });
      })
  );
});

// Background sync for inspection data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-inspections') {
    event.waitUntil(syncInspectionData());
  }
});

async function syncInspectionData() {
  // In production: read pending inspection data from IndexedDB
  // and POST to the server API
  console.log('[SW] Syncing inspection data...');
}
