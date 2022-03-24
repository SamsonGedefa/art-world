import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Link from "next/link";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { PostImage } from "./PostImage";
function Post({ post }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  console.log("FEED", post.creator.username);
  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setModalOpen(false);
  };

  const handleDislike = () => {};

  const handleLike = () => {};

  return (
    <div className="m-2">
      <Link href={`/user/${post.creator.username}/post/${post._id}`}>
        <a>
          <div className="relative group columns-4xs max-w-xs rounded overflow-hidden shadow-lg  ">
            <img
              className=" w-full h-[240px]  group-hover:opacity-70"
              src={post.images}
              alt="Sunset in the mountains"
            />
            {/* <PostImage post={post} /> */}
            <div className="hidden group-hover:block  duration-300 absolute inset-x-0 bottom-0  h-full px-6 py-4 ">
              <div className="absolute bottom-0 left-0  ">
                <Link href={`/user/${post.creator.username}`}>
                  <div className="flex items-center justify-center w-14 h-14 hoverAnimation ">
                    <Image src="/user_user.jpg" width={30} height={30} />
                  </div>
                </Link>

                <Link href={`/user/${post.creator.username}`}>
                  <a className="text-slate-400 hover:text-sky-400">
                    {post.creator.username}
                  </a>
                </Link>
              </div>
              <div className="absolute bottom-0 right-0">
                {/* <button onClick={() => handleLike}>
                  <AiFillLike className="h-7 w-7 text-slate-500 hover:text-white" />
                </button> */}
                <div
                  onClick={(e) => {
                    e.preventDefault(), alert("Liked");
                  }}
                >
                  <FaRegCommentAlt className="h-5 w-5 text-slate-500 hover:text-white" />
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault(), alert("Liked");
                  }}
                >
                  <BsHeartFill className="h-5 w-5 text-slate-500 hover:text-white" />
                </div>
              </div>

              {/* <div className="font-bold text-xl mb-2">
                <Link href={`/user/${post.creator.username}`}>
                  <a className="absolute bottom-0 left-0 text-slate-400 hover:text-sky-400 ">
                    {post.creator.username}
                  </a>
                </Link>
              </div> */}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Post;
