import Head from "next/head";
import Link from "next/link";

import { NotionRenderer } from "react-notion";

type Post = { id: string; slug: string; name: string };

const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion-api.ingalless.com/v1/table/101251eb21534f20ade05c4eb0702607`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

interface Props {
  posts: Post[];
}
export default function Home({ posts }: Props) {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Head>
        <title>Ingalless</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <nav>
          <ul>
            {posts.map((post) => (
              <li>
                <Link href={post.slug}>{post.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
