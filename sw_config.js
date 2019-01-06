var CACHE_NAME = 'myapp-cache-v2';
var urlsToCache = [
  "/favicon.ico",
  "/index.html",
  "/main.js",
  "/polyfills.js",
  "/runtime.js",
  "/sw.js",
  "/sw_config.js",
  "/styles.css",
  "/manifest.json",
  "/fontawesome-webfont.eot",
  "/fontawesome-webfont.svg",
  "/fontawesome-webfont.ttf",
  "/fontawesome-webfont.woff",
  "/fontawesome-webfont.woff2",
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        cache.addAll(urlsToCache);
        //return cache.addAll(urlsToCache);
        var assets = [
          // "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
          // "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg",
          // "https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg",
          "http://foodsexplorer.com/upload/060a8c80-30a3-11e7-b1aa-c53e2be3f1ea_den1.png",
          "http://foodsexplorer.com/upload/fdb405c0-30a4-11e7-af73-85e9254d6236_suada.jpg",
          "http://foodsexplorer.com/upload/09646a40-30a7-11e7-ae90-e337f71409d2_suasg1.jpg"
        ];
        cacheAssets(assets)
        .then(() => {
            console.log('All assets cached')
        });
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      fetch(event.request).catch(() => {
        caches.match(event.request)
      })
  );
});


// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.open(CACHE_NAME).then(cache => {
//      return cache.match(event.request).then(response => {
//       return response || fetch(event.request)
//       .then(response => {
//         const responseClone = response.clone();
//         cache.put(event.request, responseClone);
//         })
//       })
//     }
//  ))
// });

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

function cacheAssets( assets ) {
  return new Promise( function (resolve, reject) {
    // open cache
    caches.open(CACHE_NAME)
      .then(cache => {
        // the API does all the magic for us
        // cache.addAll(assets.map(function(urlToPrefetch){
        //   return new Request(urlToPrefetch, { mode: 'no-cors' });
        // }))
        cache.addAll(assets)
          .then(() => {
            console.log('all assets added to cache')
            resolve()
          })
          .catch(err => {
            console.log('error when syncing assets', err)
            reject()
          })
      }).catch(err => {
        console.log('error when opening cache', err)
        reject()
      })
  });
}