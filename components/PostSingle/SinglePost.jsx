import { usePostPages } from "../../lib/post";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

export const CarousalItem = ({ children }) => {
  return (
    <div
      className={`relative inline-flex p-10 justify-center items-center w-full h-full`}
    >
      {children}
    </div>
  );
};

const Carousal = ({ post }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [postList, setPostList] = useState([]);
  const [displayPrevArrow, setDisplayPrevArrow] = useState(true);
  const [displayNextArrow, setDisplayNextArrow] = useState(true);
  const [postIndex, setPostIndex] = useState(0);
  const router = useRouter();

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

  const updateSlide = ({ newIndex, index, prev }) => {
    console.log(postList.length, index, newIndex);
    setPostIndex(newIndex);

    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= postList.length) {
      newIndex = postList.length - 1;
    }

    setActiveIndex(newIndex);

    if (prev) {
      const prevPost = postList[index - 1];
      router.push(`/user/${prevPost.creator.username}/post/${prevPost._id}`);
    } else {
      const nextPost = postList[index + 1];
      router.push(`/user/${nextPost.creator.username}/post/${nextPost._id}`);
    }
  };

  useEffect(() => {
    if (postIndex >= postList.length - 1) {
      setDisplayPrevArrow(false);
    } else if (postIndex <= postList.length - 1) {
      setDisplayNextArrow(false);
    } else if (postIndex == 0) {
      setDisplayNextArrow(true);
      setDisplayPrevArrow(true);
    }

    // return [setDisplayPrevArrow(true), setDisplayNextArrow(true)];
  }, [postIndex]);

  return (
    <div
      className="overflow-hidden flex  justify-center items-center
                w-[1000px] h-[600px] bg-gradient-to-b from-[#171720] to-[#06070D]"
    >
      <div
        className={`whitespace-nowrap h-full w-full  -translate-x-[${
          activeIndex * 100
        }%]`}
      >
        {postList &&
          postList.map((currentPost, index) => (
            <>
              <CarousalItem key={index}>
                {displayPrevArrow && (
                  <MdOutlineArrowBackIosNew
                    size={60}
                    className="text-white absolute left-0 hover:text-gray-400 z-50"
                    onClick={() =>
                      updateSlide({
                        newIndex: activeIndex - 1,
                        index: index,
                        prev: true,
                      })
                    }
                  />
                )}

                <img
                  className="object-cover max-w-full max-h-full  group-hover:opacity-70"
                  src={currentPost.images}
                  alt={currentPost.content}
                />

                {displayNextArrow && (
                  <MdArrowForwardIos
                    size={60}
                    className="text-white absolute right-0 hover:text-gray-400 z-50"
                    onClick={() =>
                      updateSlide({
                        newIndex: activeIndex + 1,
                        index: index,
                        prev: false,
                      })
                    }
                  />
                )}
              </CarousalItem>
            </>
          ))}
      </div>
    </div>
  );
};

export default Carousal;
