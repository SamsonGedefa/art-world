import React from "react";
import { Post } from "@/components/Post";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { findUserByUsername } from "@/lib/db/user";
import { Layout } from "@/components/Layout";
import { usePostPages } from "@/lib/post";
import { useLocalStorage, getAllPostLikedByUser } from "@/lib/useLike";

export default function UserLikedPostPage({ user }) {
  const { data, error, size, setSize, isLoadingMore, isReachingEnd } =
    usePostPages({
      byUserLiked: user._id,
    });

  if (error) return <div className="text-white">Failed to load</div>;
  if (!data) return <div className="text-white">Loading...</div>;

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="flex-grow h-full px-10 ">
      <div className="my-10 text-white  space-y-4">
        <h1 className="font-2xl">
          Hi, <span className="font-bold text-[#5dec9e]">{user.username}</span>
        </h1>
        <h2 className="text-5xl">Favorite Posts</h2>
      </div>

      <ul className="flex flex-wrap space-x-2 space-y-2">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/user/${post.creator.username}/post/${post._id}`}
            passHref
          >
            <Post post={post} />
          </Link>
        ))}
      </ul>

      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
        className="bg-[#e65a5a] rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left w-44 h-14 text-center"
      >
        {isLoadingMore
          ? "Loading..."
          : isReachingEnd
          ? "No more posts"
          : "Load more"}
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const user = await findUserByUsername(session.user.username);

  user._id = String(user._id);
  return { props: { user } };
}

UserLikedPostPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
