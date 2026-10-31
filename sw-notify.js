/* Ajouté au Service Worker généré : un tap sur la notification « Repos
   terminé » ramène l'app au premier plan (ou l'ouvre si elle est fermée). */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of all) {
      if ('focus' in client) return client.focus();
    }
    if (self.clients.openWindow) return self.clients.openWindow(self.registration.scope);
  })());
});
