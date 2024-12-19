const CACHE_NAME = 'todo-v1';
const URLS_TO_CACHE = [
    '/',
    '/home.png',
    '/icon.jpg',
    '/badge.svg',
    '/notification.wav',
    '/login.svg',
    '/_next/static/*',  // This is to cache Next.js static files
    '/_next/image/*',   // Cache images loaded by Next.js image optimization
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async(cache) => {
                try{
                    await cache.addAll(URLS_TO_CACHE);
                    console.log("Successfully addedAll to Caches");
                }
                catch(err){
                    console.log("Error while addingAll to Caches : "+err);
                }
            })
    )
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('push', (event)=>{
    console.log("Push received...")
    let data = event.data ? event.data.json() : { title: 'A Task Due Alert!', body: 'You have a new message from Task Manager.' };
    const options = {
        body: data.body,
        icon: './icon.jpg', // Replace with your icon file path if available
        badge: './badge.svg',
        vibrate: [150, 80, 150],
        sound: './notification.wav',
        actions: [
            {
                action:'open_home',
                title:'view'
            },
            {
                action:'dismiss',
                title:'dismiss'
            },
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event)=>{
    const action = event.action

    if(action === 'dismiss'){
        event.notification.close()
    }

    else if(action === 'open_home'){
        event.notification.close()
        event.waitUntil(
            clients.openWindow('https://srinivas-batthula.github.io/todo/') // Replace with your desired URL
        )
    }

    else{
        event.notification.close()
        event.waitUntil(
            clients.openWindow('https://srinivas-batthula.github.io/todo/') // Replace with your desired URL
        )
    }
})

