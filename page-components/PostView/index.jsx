import React from "react";
import {
  SinglePost,
  SinglePostInfo,
  PostFigures,
} from "@/components/PostSingle";

import CommenterForm from "./commentForm";
import CommentList from "./commentList";

export default function UserPost({ post }) {
  return (
    <div className="flex flex-col items-center">
      <SinglePost key={post._id} post={post} />
      <SinglePostInfo post={post} />
      <PostFigures post={post} />
      <CommenterForm post={post} />
      <CommentList post={post} />
    </div>
  );
}
