self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('chess-clock-store').then((cache) => cache.addAll([
        '/chess-clock/',
        '/chess-clock/index.html',
        '/chess-clock/index.js',
        '/chess-clock/index.css',
        '/chess-clock/icon/arrow.svg',
        '/chess-clock/icon/close.svg',
        '/chess-clock/icon/refresh.svg',
      ])),
    );
  });
  
  self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });