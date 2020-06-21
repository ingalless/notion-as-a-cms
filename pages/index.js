import Head from "next/head";

import { NotionRenderer } from "react-notion";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.ingalless.com/v1/page/Easy-chicken-chow-mein-recipe-BBC-Food-56e7c4741b194162942dd63c62fc4c4e"
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
  };
}

export default function Home({ blockMap }) {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NotionRenderer blockMap={blockMap} />
      </div>
    </div>
  );
}
