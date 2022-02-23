import React from "react";
import Post from "../components/Post";

export default function UserPost({ post }) {
  return (
    <>
      <div className="flex flex-wrap">
        {post.map((p) => p.images.length && <Post key={post._id} post={p} />)}
        <h1 className="text-white-700"></h1>
      </div>
    </>
  );
}
