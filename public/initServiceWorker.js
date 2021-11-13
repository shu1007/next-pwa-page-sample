function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        const registration = await navigator.serviceWorker
            .register("/sw.js")
            .catch(console.error);
        console.log("sw registered.");

        let subscription = await registration.pushManager.getSubscription();
        console.log(subscription);
        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array(
                    "BEs1bBRQ7WUXKnws0PeHO5pnf36LQOgnhMSxJdIWigJnGxBMbB_39fNxIdt4n8tLfjcy2MEIBA-9e_AUXwxLQ-Q" // 適当
                )
            });
            console.log(`subscribed! endpoint: ${subscription.endpoint}`);
        }
        () => {
            console.log("sw not registered.");
        };
    });
}
