import { findUserByUsername } from "../../../lib/db/user";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import UserPost from "page-components/UserPost";

export default function UserPage({ user }) {
  return (
    <>
      <Head>
        <title>{user.username}</title>
      </Head>
      <UserPost user={user} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { username } = context.params;

  const user = await findUserByUsername(username);

  if (!user) {
    return {
      notFound: true,
    };
  }
  user._id = String(user._id);
  return { props: { user } };
}

UserPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
