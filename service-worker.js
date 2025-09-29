const CACHE_VERSION = 'v1.0.10';
const CACHE_NAME = `tarif-cache-${CACHE_VERSION}`;
const FILES_TO_CACHE = [
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install: прекаш усіх критичних файлів
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: видалення старих кешів
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME) && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first для документів, cache-first для статичних ресурсів
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  // Ігноруємо chrome-extension:// та інші нестандартні схеми
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  const dest = event.request.destination;

  if (dest === 'document' || event.request.mode === 'navigate') {
    // Документи: спроба мережі, потім кешований index.html як офлайн-фолбек
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
            );
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Статичні ресурси (CSS/JS/PNG/JSON): cache-first
  event.respondWith(
    caches.match(event.request).then(cached =>
      cached || fetch(event.request).then(res => {
        if (res && res.ok) {
          const clone = res.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
          );
        }
        return res;
      })
    )
  );
});




