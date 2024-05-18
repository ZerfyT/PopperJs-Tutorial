/* PWA Config */

if("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./js/sw.js")
        .then(() => { 
            console.log("Service Worker Registered");
        })
        .catch((error) => {
            console.log("Service Worker Registration Failed");
        });
}

/* END - PWA Config */
