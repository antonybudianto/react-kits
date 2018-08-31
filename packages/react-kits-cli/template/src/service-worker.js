/* eslint-disable no-undef */

workbox.precaching.precacheAndRoute(self.__precacheManifest)

var CACHE_NAME = 'my-pwa-cache-v1'
var urlsToCache = ['/', '/about']
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function(event) {
  console.log(event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  )
})
