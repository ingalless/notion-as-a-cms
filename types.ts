export type RootPage = {
  id: string;
  slug: string;
  name: string;
  type: "page" | "table";
};

export type Post = RootPage;
