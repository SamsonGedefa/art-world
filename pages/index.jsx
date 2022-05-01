import Head from "next/head";
import { Layout } from "@/components/Layout";
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <div className="h-full">
      <Head>
        <title>Home / Art-World</title>
      </Head>
      <Feed />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
