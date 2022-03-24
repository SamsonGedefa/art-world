import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "@/lib/middleware/database";
import { Layout, FeedLayout } from "../components/Layout";
import Feed from "@/components/Feed";

export default function Home({ posts }) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Home / Art-World</title>
      </Head>
      <Feed />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //   };
  // }

  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  return {
    props: {
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        content: post.content,
        images: post.images,
      })),
    },
  };
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
