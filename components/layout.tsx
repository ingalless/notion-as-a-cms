import Link from "next/link";

export default function Layout(props) {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      {props.children}
    </div>
  );
}
