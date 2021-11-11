self.addEventListener("install", (event) => {
    console.log("serviceWorkerインストール");
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

const CACHE_NAME = "v1";
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                console.log(
                    `cache ${JSON.stringify(event.request)} is ${
                        response ? "match" : "not match"
                    }`
                );
                return (
                    response ||
                    fetch(event.request).then((response) => {
                        console.log(`fetch ${event.request}`);
                        cache.put(event.request, response.clone());
                        return response;
                    })
                );
            });
        })
    );
});
