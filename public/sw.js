self.addEventListener("install", (event) => {
    console.log("serviceWorkerインストール");
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

const CACHE_NAME = "v1";
const validateRequest = (request) => {
    return !request.url.startsWith("chrome-extension://");
};
self.addEventListener("fetch", (event) => {
    if (!validateRequest(event.request)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                console.log(
                    `cache ${JSON.stringify(event.request.url)} is ${
                        response ? "match" : "not match"
                    }`
                );
                return (
                    response ||
                    fetch(event.request).then((response) => {
                        console.log(`fetch ${event.request.url}`);
                        cache.put(event.request, response.clone());
                        return response;
                    })
                );
            });
        })
    );
});

self.addEventListener("push", function (event) {
    console.log("[Service Worker] Push Received.");
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = "Push Codelab";
    const options = {
        body: "Yay it works.",
        icon: "images/icon.png",
        badge: "images/badge.png"
    };
    console.log(self.registration);
    event.waitUntil(self.registration.showNotification(title, options));
});
