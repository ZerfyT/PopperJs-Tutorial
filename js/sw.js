self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open("v1")
            .then((cache) => {
                return cache.addAll([
                    "./",
                    "./index.html",
                    "./css/styles.css",
                    "./js/scripts.js",
                    "./img/favicon.ico",
                    "./img/icon-192.png",
                    "./img/icon-512.png",
                ]);
            })
            .catch((error) => {
                console.log(error);
            })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
            .catch((error) => {
                console.log(error);
            })
    );
});