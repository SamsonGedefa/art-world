import React, { useState, useEffect, useCallback } from "react";
import { SinglePostInfo, PostFigures } from "@/components/PostSingle";
import { TagDisplay } from "@/components/PostSingle";
import CommenterForm from "./commentForm";
import CommentList from "./commentList";
import { usePostPages } from "../../lib/post";
import Carousal, { CarousalItem } from "@/components/PostSingle/SinglePost";

export default function UserPost({ post }) {
  const [postList, setPostList] = useState([]);
  const [imageOrder, setImageOrder] = useState([]);

  let tags = [];
  if (post.tags) {
    post.tags.map((tag) => {
      tags.push(tag);
    });
  }

  const { data } = usePostPages({
    creatorId: post.creator._id,
  });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  useEffect(() => {
    const firstImage = post.images;
    // Reorder array to display the clicked image first
    const orderedPosts = posts.sort(function (x, y) {
      return x.images === firstImage ? -1 : y.images === firstImage ? 1 : 0;
    });

    setPostList([...orderedPosts]);
  }, [posts.length]);

  const reOrder = (p) => {
    if (p._id !== post._id) {
      return {
        redirect: {
          destination: `/user/${p.creator.username}/post/${p._id}`,
          permanent: false,
        },
      };
    }
  };

  return (
    <div className="flex shrink-0 overflow-auto flex-col items-center">
      <Carousal post={post}>
        {/* {postList &&
          postList.map((p) => (
            <CarousalItem>
              <img
                className="object-cover max-w-full max-h-full  group-hover:opacity-70"
                src={p.images}
                alt={p.content}
              />
            </CarousalItem>
          ))} */}
      </Carousal>
      {/* <SinglePostSlider post={post} /> */}
      <SinglePostInfo post={post} />
      <PostFigures post={post} />
      <TagDisplay tags={tags} />
      <CommenterForm post={post} />
      <CommentList post={post} />
    </div>
  );
}
