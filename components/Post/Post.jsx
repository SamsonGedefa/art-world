import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Link from "next/link";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";

function Post({ post }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setModalOpen(false);
  };

  return (
    <Link href={`/user/${post.creator.username}/post/${post._id}`}>
      <a>
        <li className="relative h-60 flex-grow group overflow-hidden shadow-lg ">
          <img
            className=" max-w-full max-h-full object-cover align-bottom group-hover:opacity-70"
            src={post.images}
          />

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
          </div>
        </li>
      </a>
    </Link>
  );
}

export default Post;
