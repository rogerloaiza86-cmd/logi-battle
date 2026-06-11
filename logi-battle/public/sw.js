// Service worker Geronimo Coop — cache de l'app shell pour l'usage
// hors-ligne en atelier (modes local et entraînement).
const CACHE_NAME = 'geronimo-coop-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['./'])))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  // Jamais de cache pour Supabase (temps réel / données de partie)
  if (event.request.method !== 'GET' || url.hostname.endsWith('.supabase.co')) return

  // Réseau d'abord pour le HTML (mises à jour), cache d'abord pour les assets versionnés
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          return response
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('./')))
    )
    return
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then((response) => {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
            return response
          })
      )
    )
  }
})
