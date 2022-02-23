import Head from "next/head";
export default function AuthLayout({ children }) {
  return (
    <>
      <Head>
        <title>Welcome to Art world</title>
      </Head>
      <main className="bg-black min-h-screen flex mx-auto">{children}</main>
    </>
  );
}
