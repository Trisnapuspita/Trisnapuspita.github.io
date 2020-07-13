importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log('Workbox berhasil dimuat');
else
  console.log('Workbox gagal dimuat');

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/pages/home.html', revision: '2' },
    { url: '/pages/favorite.html', revision: '2' },
    { url: '/pages/contact.html', revision: '2' },
    { url: '/icon.png', revision: '1' },
    { url: '/images/boy.svg', revision: '1' },
    { url: '/images/criss-cross.png', revision: '1' },
    { url: '/images/question.png', revision: '1' },
    { url: '/images/icon-192x192.png', revision: '1' },
    { url: '/images/icon-512x512.png', revision: '1' },
    { url: '/images/laptop.svg', revision: '1' },
    { url: '/images/front.svg', revision: '1' },
    { url: '/images/picture.svg', revision: '1' },
    { url: '/images/pic2.svg', revision: '1' },
    { url: '/images/call.svg', revision: '1' },
    { url: '/css/custom.css', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/custom.js', revision: '1' },
    { url: '/js/service.js', revision: '2' },
    { url: '/js/api.js', revision: '2' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '3' },
    { url: '/manifest.json', revision: '1' },
    { url: '/team.html', revision: '2' },
    { url: '/js/team-script.js', revision: '1' }
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);


self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
    console.log('Notification Click.');
    return;
  }
  switch (event.action) {
    case 'yes-action':
      console.log('Pengguna memilih action yes.');
      // buka tab baru
      clients.openWindow('./#favorite');
      break;
    case 'no-action':
      console.log('Pengguna memilih action no');
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});