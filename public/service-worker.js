const CACHE_NAME = "wedding-invite-v4";

// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/assets/index-7I3zK-Fm.js',
//   '/assets/index-DrPzGCUk.css',
//   '/icons/icon-192x192.png',
//   '/icons/icon-512x512.png',
//   '/manifest.json',
//   '/offline.html', // Add offline.html to the cache (this page will show when offline)
//   '/background.jpg',
//   '/logo.png',
// ];

// Install the service worker and cache the specified assets
// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// Cleanup old caches when a new service worker is activated
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercept network requests and serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the file is in the cache, return it, otherwise try the network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If the network fails (no internet), serve the offline page
        return caches.match('/offline.html');
      })
  );
});
