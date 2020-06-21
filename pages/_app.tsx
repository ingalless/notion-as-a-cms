import { AppProps } from "next/app";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
