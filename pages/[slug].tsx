import Head from "next/head";
import { NotionRenderer, BlockMapType } from "react-notion";

type Post = { id: string; slug: string; name: string };

const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion-api.ingalless.com/v1/table/101251eb21534f20ade05c4eb0702607`
  ).then((res) => res.json());
};

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Get all posts again
  const posts = await getAllPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  const blocks = await fetch(
    `https://notion-api.ingalless.com/v1/page/${post!.id}`
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

interface Props {
  post: Post;
  blocks: BlockMapType;
}
export default function Page({ post, blocks }: Props) {
  console.log(blocks);
  return (
    <div style={{ maxWidth: "100vw" }}>
      <h1>{post.name}</h1>
      <div>
        <NotionRenderer blockMap={blocks} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.map((row) => `/${row.slug}`),
    fallback: false,
  };
}
