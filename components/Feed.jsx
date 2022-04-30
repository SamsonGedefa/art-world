import React, { useState, useContext, useEffect } from "react";
import { Post } from "@/components/Post";
import { usePostPages } from "../lib/post";
import Link from "next/link";
import { AiOutlineReload } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function Feed() {
  const [deferPageLoadSSR, setDeferPageLoadSSR] = useState(false);

  useEffect(() => {
    setDeferPageLoadSSR(true);
  }, []);

  const { data, error, size, setSize, isLoadingMore, isReachingEnd } =
    usePostPages();

  if (error) return <div className="text-white">Failed to load</div>;
  if (!data) return <div className="text-white">Loading...</div>;

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="flex-grow h-full px-10 ">
      <ul className="flex flex-wrap space-x-2 space-y-2">
        {deferPageLoadSSR &&
          posts.map((post) => (
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
