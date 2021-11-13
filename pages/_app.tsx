import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script src="/sw.js"></Script>
            <Script src="/initServiceWorker.js"></Script>
            <Component {...pageProps} />;
        </>
    );
}

export default MyApp;
