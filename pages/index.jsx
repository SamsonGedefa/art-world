import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import Feed from "@/components/Feed";
import { getSession } from "next-auth/react";
import { findUserByUsername } from "@/lib/db/user";

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

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   const user = await findUserByUsername(session.user.username);

//   // const user = session.user;

//   if (!user) {
//     return {
//       notFound: true,
//     };
//   }
//   user._id = String(user._id);
//   return { props: { user } };
// }

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
