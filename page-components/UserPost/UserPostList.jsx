import { usePostPages } from "../../lib/post";
import Link from "next/link";
import { Post } from "@/components/Post";
import { AiOutlineReload } from "react-icons/ai";
import { motion } from "framer-motion";
import Image from "next/image";
import Avatar from "@/components/Avatar";
export default function UserPostList({ user }) {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages({
    creatorId: user._id,
  });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="px-10">
      <div className="flex my-10 text-white space-x-4 border-b py-4">
        <div className="">
          <Avatar size={70} username="user" url={user.profilePicture} />
        </div>
        <h2 className="text-2xl">@{user.username}</h2>
      </div>
      <ul className="flex flex-wrap space-x-2 space-y-2">
        {posts.map((post) => (
          <li className="relative md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-auto flex-grow group overflow-hidden shadow-lg ">
            <Link
              key={post._id}
              href={`/user/${post.creator.username}/${post._id}`}
            >
              <a>
                <Post post={post} />
              </a>
            </Link>
          </li>
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
