/* ═══════════════════════════════════════════════════════════════════════
   Easy English — offline app shell service worker.

   Makes the web/PWA build installable and usable offline on Android (and any
   modern browser). Static, same-origin files are cached cache-first; requests
   to other origins (for example Google Fonts) are passed straight through.
   ═══════════════════════════════════════════════════════════════════════ */
var CACHE_NAME = 'easy-english-v17';

var APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './tts-bridge.js',
  './manifest.webmanifest',
  './data/vocabulary.js',
  './data/alphabet.js',
  './data/classroom.js',
  './data/classroom-course.js',
  './data/grammar.js',
  './data/reading.js',
  './data/conversations.js',
  './data/writing.js',
  './data/drills.js',
  './data/listening.js',
  './data/irregular-verbs.js',
  './data/syllabus.js',
  './data/curriculum.js',
  './data/course.js',
  './data/devotional.js',
  './data/devotional-verses.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './favicon.ico',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return Promise.all(APP_SHELL.map(function (url) {
          return cache.add(url).catch(function () { /* ignore individual misses */ });
        }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (key) {
          return key === CACHE_NAME ? null : caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // let fonts and other origins load normally

  // Documents are network-first so a new version of the app appears at once,
  // with the cached copy as an offline fallback. Everything else is cache-first.
  var isDocument = request.mode === 'navigate' || request.destination === 'document';

  if (isDocument) {
    event.respondWith(
      fetch(request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); }).catch(function () {});
        }
        return response;
      }).catch(function () {
        return caches.match(request).then(function (cached) {
          return cached || caches.match('./index.html');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); }).catch(function () {});
        }
        return response;
      }).catch(function () {
        return caches.match('./index.html');
      });
    })
  );
});
