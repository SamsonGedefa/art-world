import Head from "next/head";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Welcome to Art world</title>
      </Head>
      <Sidebar />
      <main className="bg-black min-h-screen flex mx-auto">{children}</main>
    </>
  );
}
