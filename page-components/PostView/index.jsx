import React from "react";
import {
  SinglePostSlider,
  SinglePostInfo,
  PostFigures,
} from "@/components/PostSingle";
import { TagDisplay } from "@/components/PostSingle";
import CommenterForm from "./commentForm";
import CommentList from "./commentList";

export default function UserPost({ post }) {
  let tags = [];
  if (post.tags) {
    post.tags.map((tag) => {
      tags.push(tag);
    });
  }
  return (
    <div className="flex flex-col items-center">
      <SinglePostSlider key={post._id} post={post} />
      <SinglePostInfo post={post} />
      <PostFigures post={post} />
      <TagDisplay tags={tags} />
      <CommenterForm post={post} />
      <CommentList post={post} />
    </div>
  );
}
