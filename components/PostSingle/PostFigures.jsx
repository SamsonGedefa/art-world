import { AiFillStar } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { useCommentPages } from "@/lib/comment";
import React, { useCallback } from "react";
export default function PostFigures({ post }) {
  const [likeCount, setLikeCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);

  useEffect(() => {
    setLikeCount(post.likes.length);
  }, []);

  const { data } = useCommentPages({ postId: post._id });

  const comments = data
    ? data.reduce((acc, val) => [...acc, ...val.comments], [])
    : [];

  useEffect(() => {
    setCommentsCount(comments.length);
  }, [data]);

  return (
    <div className="flex align-end my-2 w-2/3 max-h-20">
      <div className="flex gap-5 text-gray-400">
        <div className="flex space-x-3">
          <AiFillStar size={20} />
          <h1>{likeCount} Favourites</h1>
        </div>
        <div className="flex space-x-3">
          <MdModeComment size={20} className="p-0" />
          <h1>{commentsCount} Comments</h1>
        </div>
      </div>
    </div>
  );
}
