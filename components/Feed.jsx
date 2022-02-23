import { useEffect, useState } from "react";
import PostForm from "@/components/PostForm";
import Post from "@/components/Post";
import { IoIosAddCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Nav from "../components/Nav";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { usePostPages } from "../lib/post";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Feed() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const { data: session } = useSession();

  const handleClose = () => {
    setModalOpen(false);
  };

  const { data, error, size, setSize, isLoadingMore, isReachingEnd } =
    usePostPages();

  if (error) return <div className="text-white">Failed to load</div>;
  if (!data) return <div className="text-white">Loading...</div>;

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    // <div
    //   className={`flex-grow border-l border-r border-gray-700 ${
    //     session && "sm:ml-[73px] xl:ml-[245px]"
    //   }`}
    // >
    <div className="flex-grow border-l border-r border-gray-700 max-w-full sm:ml-[73px] xl:ml-[250px] px-10">
      {modalOpen && <Modal handleClose={handleClose} />}
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/user/${post.creator.username}/post/${post._id}`}
            passHref
          >
            <Post post={post} />
          </Link>
          // post.images.length && <Post key={post._id} post={post} />)
        ))}

        <h1 className="text-white-700"></h1>
      </div>
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
      {/* <button
        onClick={() => setSize(size + 1)}
        className="bg-[#e65a5a] rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left w-44 h-14 text-center"
      >
        Load More
      </button> */}
    </div>
  );
}
