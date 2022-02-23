import LogIn from "../page-components/LogIn";
import Head from "next/head";
import { getSession } from "next-auth/react";

const LoginPage = () => {
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
