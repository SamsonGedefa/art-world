import { LogIn } from "../page-components/Auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getProviders } from "next-auth/react";

const LoginPage = () => {
  const { data: session, loading } = useSession();

  if (session) {
    return <div>{session.user.email}</div>;
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LogIn />
    </>
  );
};

export default LoginPage;

// export async function getServerSideProps(ctx) {
//   // const { req } = ctx;

//   const session = await getSession({ req: ctx.req });
//   const providers = await getProviders();
//   console.log("Providers", providers);

//   if (session) {
//     return {
//       redirect: { destination: "/" },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }
