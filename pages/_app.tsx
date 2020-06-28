import { AppProps } from "next/app";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import Layout from "../components/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
