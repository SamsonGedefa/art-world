import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import Avatar from "@/components/Avatar";
import axios from "axios";
import { useCommentPages } from "@/lib/comment";

const CommenterInner = ({ post }) => {
  const contentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useCommentPages({ postId: post._id });

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);

        await axios.post(
          `/api/post/${post._id}/comments`,
          JSON.stringify({ content: contentRef.current.value }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        toast.success("You have added a comment");
        contentRef.current.value = "";
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate, post._id]
  );

  return (
    <div className=" flex w-2/3 h-20 text-white space-4 my-10">
      <form onSubmit={onSubmit} className="w-full ">
        <div className="">
          <h1 className="text-xl font-black ">Comments</h1>
        </div>
        <div className="flex items-center w-full -px-4">
          <div className="px-4">
            <Avatar size={30} username="user" url="/default_user.jpg" />
          </div>
          <div className="w-full border-b">
            <input
              className="w-full bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide  min-h-[50px]"
              ref={contentRef}
              placeholder="Add your comment"
            />
          </div>

          <button
            onClick={() => onSubmit}
            className="border-gray-300 text-white rounded-xl px-4 py-1.5 font-bold shadow-md hover:bg-[#5dec9e] disabled:hover:bg-[#5dec9e] disabled:opacity-50 disabled:cursor-default"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default function CommentForm({ post }) {
  return (
    <>
      <CommenterInner post={post} />
    </>
  );
}
