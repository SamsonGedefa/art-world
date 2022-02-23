import { findUserByUsername } from "../../../lib/db/user";
import Head from "next/head";
import { useRouter } from "next/router";
import User from "../../../page-components/User";
import UserPosts from "../../../page-components/UserPosts";
import { usePostPages } from "../../../lib/post";
import Link from "next/link";
import Post from "../../../components/Post";
import { Layout } from "@/components/Layout";
export default function UserPage({ user }) {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages({
    creatorId: user._id,
  });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="flex-grow border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[245px] ">
      <Head>
        <title>{user.username}</title>
      </Head>

      <div className="flex flex-wrap">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/user/${post.creator.username}/post/${post._id}`}
          >
            {/* <a ></a> */}
            <Post post={post} />
          </Link>
        ))}
        <h1 className="text-white-700"></h1>
      </div>
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
