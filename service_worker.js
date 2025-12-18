//
// Service worker for abctools offline use resource caching
//
//
//
//
//
//
// Updated 13 Dec 2025 at 1500
//
//
//
//
// ABC Tools Lite:
// Last updated on 2025-12-19

const cacheName = 'abctoolscache-3066';

const CACHE_PREFIX = 'abctools';
const CACHE_VERSION = 'lite-3066-8';
const CACHE_NAME_LITE = `${CACHE_PREFIX}${CACHE_VERSION}`;

const contentToCache = [
    'abctools.html',
    'abctools-quick-editor.html',
    'tunesources.html',
    'tunesources.css',
    'credits.html',
    'tipjars.html',
    'app.css',
    'app-lite.css',
    'codemirror.css',
    'app-lite.js',
    'app.js',
    'jquery-1.11.1.min.js',
	'jszip.min.js',
	'xml2abc-min.js',
	'abcjs-chord-intervals.js',
	'abcjs-basic-eskin-min.js',
	'jspdf.min.js',
    'pdf-lib-min.js',
	'html2image.js',
	'qrcode.js',
	'lz-string.min.js',
    'pako.min.js',
	'daypilot-modal.min-3.10.1.js',
	'lame.min.js',
	'unmute.min.js',
	'tab-injectors-min.js',
    'visualscript-sdk.js',
    'smartdraw-export-min.js',
    'acoustic_grand_piano-mp3.js',
    'percussion-mp3.js',
    'online-check.js',
    'database.js',
    'download-reverb.js',
    'bww2abc.js',
    'manage_database.js',
    'website_generator.js',
    'pdf-website-import.js',
    'context-menu.js',
	'api-keys.js',
    'codemirror.js',
    'simple.min.js',
    'placeholder.min.js',
    'favicon.ico',
    'favicon.svg',
    'fonts/FiraSans-Regular.woff2',
    'fonts/FiraSans-Italic.woff2',
    'fonts/FiraSans-SemiBold.woff2',
    'fonts/FiraSans-SemiBoldItalic.woff2',
    'fonts/FiraMono-Regular.woff2',
    'fonts/FiraMono-Medium.woff2',
    'fonts/FiraMono-Bold.woff2',
    'img/zoomin.png',
    'img/zoomout.png',
    'img/helpbutton.png',
    'img/playbutton.png',
    'img/pdfbutton.png',
    'img/jumpbutton.png',
    'img/qerewindbutton.png',
    'img/qetempobutton.png',
    'img/michael2.jpg',
    'img/michael240.jpg',
    'img/settings.png',
    'img/pureocarinas.png',
    'img/abcjs_logo.png',
    'img/external_share.png',
    'img/abclite-icon-192x192.png',
    'img/abclite-icon-512x512.png',
    'img/abclite-icon-maskable-192x192.png',
    'img/abclite-icon-maskable-512x512.png',
    'img/apple-touch-icon.png',
    'img/abc-manifest.json',
    'img/abc-manifest-qe.json'
];

// Installing Service Worker
self.addEventListener('install', (e) => {

    console.log('[Service Worker Lite] Install');

    // Make this the current service worker
    self.skipWaiting();
    
    e.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME_LITE);
      console.log('[Service Worker Lite] Caching ABC Tools Lite shell and content');
      await cache.addAll(contentToCache);
      console.log(`[Service Worker Lite] Cache addAll complete version ${CACHE_VERSION}`);
    })());


  });

self.addEventListener('activate', event => {

    console.log("[Service Worker Lite] Activate event");

    clients.claim().then(() => {
        //claim means that the html file will use this new service worker.
        console.log(
          '[Service Worker Lite] Service worker has now claimed all pages so they use the new service worker'
        );
    });

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys
                .filter((key) => key.startsWith(`${CACHE_PREFIX}lite`) && key !== CACHE_NAME_LITE)
                .map((key) => {
                    return caches.delete(key);
                })
            );
        })
    );

});
  
// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {

    //console.log(`[Service Worker Lite] fetching: ${e.request.url}`);

    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (!(
        e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
    )) {
        return; 
    }

    e.respondWith((async () => {

        const r = await caches.match(e.request,{ignoreSearch: true, ignoreVary:true});

        if (r){

            //console.log(`[Service Worker Lite] Returning cached resource: ${e.request.url}`);

            return r;
        }

        try{

            //console.log(`[Service Worker Lite] Fetching resource: ${e.request.url}`);

            const response = await fetch(e.request);

            //Don't cache any resources

            // if ((e.request.url.indexOf("service_worker") == -1) && (e.request.url.indexOf("soundfonts") == -1)){
            
            //     const cache = await caches.open(CACHE_NAME_LITE);

            //     console.log(`[Service Worker Lite] Caching new resource: ${e.request.url}`);

            //     cache.put(e.request, response.clone());

            // }
 
            return response;
            
        }
        catch (error){

            //console.log("[Service Worker Lite] Fetch error: " + error);
    
        }
    })());
});


