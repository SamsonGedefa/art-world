import React from "react";
import { Post } from "@/components/Post";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { findUserByUsername } from "@/lib/db/user";
import { Layout } from "@/components/Layout";
import { usePostPages } from "@/lib/post";
import { motion } from "framer-motion";
import { AiOutlineReload } from "react-icons/ai";

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
    <div className="flex-grow  px-10 ">
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

      {isReachingEnd ? (
        <div className="flex w-full justify-center my-10 text-gray-400 font-bold">
          No more post are found
        </div>
      ) : (
        <div className="flex w-full justify-center my-10">
          <motion.button
            disabled={isLoadingMore || isReachingEnd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex justify-center items-center space-x-2 text-white rounded-sm w-56 h-[36px] text-lg font-bold shadow-md border"
            onClick={() => setSize(size + 1)}
          >
            <span className="inline">
              {isLoadingMore ? (
                <AiOutlineReload size={20} className="animate-spin" />
              ) : (
                "Load more"
              )}
            </span>
          </motion.button>
        </div>
      )}
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
