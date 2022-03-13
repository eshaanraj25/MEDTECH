import Web3Provider from "../context/Web3Context";
import "../styles/globals.css";
function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}
function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <Web3Provider>
        <div className="body">
          <Component {...pageProps} />
        </div>
      </Web3Provider>
    </SafeHydrate>
  );
}

export default MyApp;
