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
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
            (registration) => {
                console.log("登録成功");
                registration.pushManager
                    .getSubscription()
                    .then((subscription) => {
                        console.log(subscription);
                        if (!subscription) {
                            registration.pushManager
                                .subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlB64ToUint8Array(
                                        "BEs1bBRQ7WUXKnws0PeHO5pnf36LQOgnhMSxJdIWigJnGxBMbB_39fNxIdt4n8tLfjcy2MEIBA-9e_AUXwxLQ-Q"
                                    )
                                })
                                .then((subscription) => {
                                    console.log(
                                        `endpoint: ${subscription.endpoint}`
                                    );
                                    console.log(
                                        `toJson: ${subscription.toJSON}`
                                    );
                                });
                        }
                    });
            },
            () => {
                console.log("登録失敗");
            }
        );
    });
}
