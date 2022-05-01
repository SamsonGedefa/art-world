import Head from "next/head";
import React, { useState, useEffect } from "react";
// import { connectToDatabase } from "@/lib/middleware/database";
import { Layout } from "../components/Layout";
import Feed from "@/components/Feed";
import { usePostPages } from "@/lib/post";
import { getSession } from "next-auth/react";
import { findUserByUsername } from "@/lib/db/user";
import { useRecoilState } from "recoil";
import { likeUnlikeState } from "@/atoms/likeAtom";
import { useLocalStorage } from "@/lib/useLike";
import { useInterpret } from "@xstate/react";
import { likeMachine } from "machines/likeState";

export default function Home({ user }) {
  return (
    <div className="h-full">
      <Head>
        <title>Home / Art-World</title>
      </Head>
      <Feed />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = await findUserByUsername(session.user.username);
  if (!user) {
    return {
      notFound: true,
    };
  }
  user._id = String(user._id);
  return { props: { user } };
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
