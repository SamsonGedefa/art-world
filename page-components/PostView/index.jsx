import React from "react";
import { Post } from "@/components/Post";

import {
  SinglePost,
  SinglePostInfo,
  PostFigures,
} from "@/components/PostSingle";
import CommenterForm from "./commentForm";
import CommentList from "./commentList";

export default function UserPost({ post }) {
  return (
    <>
      <div className="flex flex-col items-center w-full bg-black">
        <SinglePost key={post._id} post={post} />
        <SinglePostInfo post={post} />
        <PostFigures />
        <CommenterForm post={post} />
        <CommentList post={post} />
      </div>
    </>
  );
}
