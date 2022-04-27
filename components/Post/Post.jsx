import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import { GlobalStateContext } from "machines/contexts";
import { useActor, useMachine } from "@xstate/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function Post({ post }) {
  const globalService = useContext(GlobalStateContext);
  const [state, send] = useActor(globalService.likeService);
  const [loading, setLoading] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likedList, setLikedList] = useState([]);

  const payload = { postId: post._id };

  const updateState = () => {
    console.log("LIKE", likedList);
    setLiked(!liked);
    globalService.likeService.send("LIKED", payload);
    console.log("LIKE", likedList);

    // setLiked(() => state.context.likedPosts.includes(post._id));
  };

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
        <div className="hidden absolute bottom-3 left-0 group-hover:block duration-300 inset-x-0 bottom-0 px-6 py-4 ">
          <div className="">
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
          <div className="absolute bottom-5 right-5 space-y-2">
            <div>
              <Link href={`/user/${post.creator.username}/post/${post._id}`}>
                <FaRegCommentAlt className="h-5 w-5 text-slate-500 hover:text-white" />
              </Link>
            </div>

            <div
              onClick={(e) => {
                e.preventDefault(), updateState();
              }}
            >
              {likedList.includes(post._id) ? (
                <AiFillHeart className="h-5 w-5  text-[#5dec9e]" />
              ) : (
                <AiOutlineHeart
                  className={"h-5 w-5 text-slate-500 hover:text-white"}
                />
              )}
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default Post;
