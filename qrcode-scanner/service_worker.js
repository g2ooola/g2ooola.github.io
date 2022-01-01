const key = "static-fils-v1";
const cached_files = [
  './css/mystyle.css',
  './js/qrcode.js',
  './lib/html5-qrcode@2.1.6.min.js',
  './lib/jquery-3.5.1.min.js',
  './img/camara.svg',
  './img/camara-no.svg',
  './img/qr-icon.svg',
  './img/qr-reader-url.svg'
];



self.addEventListener('install', (event)=> {
  console.log('SW V1 installing…');

  cached_files.forEach(file => {
    event.waitUntil(caches.open(key).then(cache => cache.add(file)));
  });

});

self.addEventListener('activate', (event)=> {
  console.log('SW V1 now ready to handle fetches!');
});

self.addEventListener('fetch', (event)=> {
  const url = new URL(event.request.url);

  if(url.origin == location.origin) {
    cached_files.forEach(file => {
      if(url.pathname == file) {
        console.log("SW", `Use cache ${file}`)
        event.respondWith(caches.match(file));
        return;
      }
    });
  }
});