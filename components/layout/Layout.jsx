import Head from "next/head";
import Footer from "./footer";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Welcome to Art world</title>
      </Head>
      <main>{children}</main>
      <Nav />
      <Footer />
    </>
  );
}
