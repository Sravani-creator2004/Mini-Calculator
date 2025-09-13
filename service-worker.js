const cacheName = "calculator-cache-v1";
const cacheFiles = [
"index.html",
"style.css",

"manifest.json",
"icon-192.png",
"icon-512.png"
];

// Install Service Worker
self.addEventListener("install", event => {
event.waitUntil(
caches.open(cacheName).then(cache => {
return cache.addAll(cacheFiles);
})
);
self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(
keys.map(key => {
if (key !== cacheName) {
return caches.delete(key);
}
})
)
)
);
self.clients.claim();
});

// Fetch files
self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request);
})
);
});

