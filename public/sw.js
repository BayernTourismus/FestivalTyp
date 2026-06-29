const CACHE_NAME = 'festivaltyp-v4'
const VIDEO_PATHS = ['/bayern-gehoert-erlebt.mp4']
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/assets/app.css',
  '/assets/app.js',
  '/assets/museo-sans-300.woff2',
  '/assets/museo-sans-300.woff',
  '/assets/museo-sans-500.woff2',
  '/assets/museo-sans-500.woff',
  '/assets/museo-sans-700.woff2',
  '/assets/museo-sans-700.woff',
  '/assets/museo-slab-300.woff2',
  '/assets/museo-slab-300.woff',
  '/assets/museo-slab-500.woff2',
  '/assets/museo-slab-500.woff',
  '/assets/museo-slab-700.woff2',
  '/assets/museo-slab-700.woff'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(async () => {
        // Pre-cache video separately so a failure here doesn't block app-shell install
        try {
          const cache = await caches.open(CACHE_NAME)
          await Promise.all(
            VIDEO_PATHS.map((path) =>
              fetch(path).then((res) => {
                if (res.ok) cache.put(path, res)
              })
            )
          )
        } catch (_) {
          // Will be cached on first online visit
        }
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  )
})

// Serve a fully-cached video for range requests (needed for offline seek support)
async function respondWithVideo(requestUrl) {
  const cache = await caches.open(CACHE_NAME)
  // Match by bare URL so a cached 200 response satisfies Range sub-requests too
  const cached = await cache.match(requestUrl.href)
  if (cached) return cached

  try {
    // Fetch the full file (no Range header) so we can cache and reuse it
    const response = await fetch(requestUrl.href)
    if (response.ok) {
      cache.put(requestUrl.href, response.clone())
    }
    return response
  } catch (_) {
    return Response.error()
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  const requestUrl = new URL(event.request.url)

  // Cache-first strategy for video assets to support offline and range requests
  if (requestUrl.origin === self.location.origin && VIDEO_PATHS.includes(requestUrl.pathname)) {
    event.respondWith(respondWithVideo(requestUrl))
    return
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', copy))
          return response
        })
        .catch(async () => {
          const cached = await caches.match('/index.html')
          return cached || Response.error()
        })
    )
    return
  }

  if (requestUrl.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          return response
        })
        .catch(() => caches.match(event.request))
    )
  }
})
