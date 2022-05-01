import React, { useState, useEffect, useContext } from "react";
import { GlobalStateContext } from "machines/contexts";
import { useActor } from "@xstate/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { useCommentPages } from "@/lib/comment";
import Avatar from "../Avatar";
function Post({ post }) {
  const globalService = useContext(GlobalStateContext);
  const [state, send] = useActor(globalService.likeService);
  const [liked, setLiked] = useState(false);
  const [likedList, setLikedList] = useState([]);
  const [likeCount, setLikeCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);

  const { data } = useCommentPages({ postId: post._id });

  const comments = data
    ? data.reduce((acc, val) => [...acc, ...val.comments], [])
    : [];

  useEffect(() => {
    setCommentsCount(comments.length);
  }, [data]);

  useEffect(() => {
    setLikeCount(post.likes.length);
  }, []);

  const payload = { postId: post._id };

  const updateState = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    globalService.likeService.send("LIKED", payload);
  }, [liked]);

  useEffect(() => {
    likedList.includes(post._id) && setLiked(true);
  }, [likedList]);

  useEffect(() => {
    setLikedList(state.context.likedPosts);
  }, []);

  return (
    <Link href={`/user/${post.creator.username}/post/${post._id}`}>
      <li className="relative md:basis-1/3 lg:basis-1/4 xl:basis-auto 2xl:basis-auto flex-grow group overflow-hidden shadow-lg cursor-pointer">
        <img
          className="h-60 w-full object-cover align-bottom group-hover:opacity-50"
          src={post.images}
        />
        <div className="hidden absolute bottom-3 left-0 group-hover:block duration-300 inset-x-0 px-6 py-4 text-white">
          <div className="space-y-4">
            <h1 className="font-bold">{post.content}</h1>
            <div className="flex text-white space-x-2  items-start">
              <div className="">
                <Avatar size={25} />
              </div>
              <Link href={`/user/${post.creator.username}`}>
                <a className="font-bold hover:text-[#5dec9e]">
                  {post.creator.username}
                </a>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 space-y-4 text-white">
            <div className="flex space-x-2 justify-between">
              <div className="text-sm font-bold">
                {commentsCount != 0 && commentsCount}
              </div>

              <Link href={`/user/${post.creator.username}/post/${post._id}`}>
                <FaRegCommentAlt className=" h-5 w-5  hover:text-[#5dec9e]" />
              </Link>
            </div>

            <div
              onClick={(e) => {
                e.preventDefault(), updateState();
              }}
              className="flex justify-between space-x-2"
            >
              <div className="text-sm font-bold">
                {likeCount != 0 && likeCount}
              </div>

              {liked ? (
                <AiFillHeart className="h-5 w-5  text-[#5dec9e]" />
              ) : (
                <AiOutlineHeart className={"h-5 w-5 hover:text-[#5dec9e]"} />
              )}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default Post;
