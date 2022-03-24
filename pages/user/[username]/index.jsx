import { findUserByUsername } from "../../../lib/db/user";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import UserPost from "page-components/UserPost";

export default function UserPage({ user }) {
  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-full sm:ml-[73px] xl:ml-[245px] bg-[#0E1016]">
      <Head>
        <title>{user.username}</title>
      </Head>
      <UserPost user={user} />
    </div>
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
