import React from "react";
import { Post } from "@/components/Post";
import { usePostPages } from "../lib/post";
import Link from "next/link";

export default function Feed() {
  const { data, error, size, setSize, isLoadingMore, isReachingEnd } =
    usePostPages();

  if (error) return <div className="text-white">Failed to load</div>;
  if (!data) return <div className="text-white">Loading...</div>;

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="flex-grow h-full px-10 bg-[#0E1016]">
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

        <h1 className="text-white-700"></h1>
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
