import Head from "next/head";
import Nav from "@/components/Nav";
import Feed from "@/components/Feed";

export default function FeedLayout({ children }) {
  return (
    <>
      <Head>{/* <title>Welcome to Art world</title> */}</Head>
      <div className="flex flex-col">
        <Nav />
        <Feed />
      </div>

      <main className="">{children}</main>
    </>
  );
}
