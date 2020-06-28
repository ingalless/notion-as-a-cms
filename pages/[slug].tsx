import { NotionRenderer, BlockMapType } from "react-notion";
import { RootPage } from "../types";

const getAllPosts = async (): Promise<RootPage[]> => {
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

  let table = null;
  if (post.type === "table") {
    const tableBlock: any = Object.values(blocks).find(
      (block: any) => block.value.type === "collection_view"
    );
    if (tableBlock !== undefined) {
      table = await fetch(
        `https://notion-api.ingalless.com/v1/table/${tableBlock!.value.id}`
      ).then((res) => res.json());
    }
  }

  return {
    props: {
      blocks,
      post,
      table,
    },
  };
}

interface Props {
  post: RootPage;
  blocks: BlockMapType;
  table?: RootPage[];
}
export default function Page({ post, blocks, table }: Props) {
  if (table) {
    // we're nesting...
    return (
      <ul>
        {table.map((post) => (
          <li>{post.name}</li>
        ))}
      </ul>
    );
  }

  return (
    <div style={{ maxWidth: "100vw" }}>
      <h1>{post.name}</h1>
      <div>
        <NotionRenderer blockMap={blocks} />
      </div>
    </div>
  );
}

interface TableProps {
  data: BlockMapType;
}
function Table();

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.map((row) => `/${row.slug}`),
    fallback: false,
  };
}
