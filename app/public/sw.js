// The old blog theme installed an offline cache at this address, and browsers that visited back then
// keep showing its saved copy of the old site. This replacement takes over from it, deletes that
// saved copy, removes itself, and reloads any open tabs so they show the current site.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.map((key) => caches.delete(key)))
      await self.registration.unregister()
      const tabs = await self.clients.matchAll({ type: 'window' })
      tabs.forEach((tab) => tab.navigate(tab.url))
    })(),
  )
})
