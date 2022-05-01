import Head from "next/head";
import UserPost from "@/page-components/PostView";
import { findPostById } from "../../../../lib/db/post";
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
export default function UserPostPage({ post }) {
  if (typeof post.createdAt !== "string") {
    post.createdAt = new Date(post.createdAt);
  }

  return (
    <>
      <Head>
        <title>{post.userId}</title>
      </Head>
      <UserPost post={post} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { postId } = context.params;

  const post = await findPostById(postId);

  if (!post) {
    return {
      notFound: true,
    };
  }

  if (context.params.username !== post.creator.username) {
    return {
      redirect: {
        destination: `/user/${post.creator.username}/post/${post._id}`,
        permanent: false,
      },
    };
  }

  post._id = String(post._id);
  post.userId = String(post.userId);
  post.creator._id = String(post.creator._id);
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}

UserPostPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
