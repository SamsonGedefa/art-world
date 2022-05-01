import { usePostPages } from "../../lib/post";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function SinglePostSlider({ post }) {
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);

  const { data } = usePostPages({
    creatorId: post.userId.toString(),
  });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  useEffect(() => {
    setLength(posts.length);
  }, [data]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const preSldide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="relative flex justify-center items-center overflow-hidden w-3/4 2xl:h-[600px] xl:h-[700px]  sm:h-[500px] md:h-[600px] bg-gradient-to-b from-[#171720] to-[#06070D]">
      {posts.map((p, index) => (
        <div
          key={index}
          className="flex justify-center items-center max-w-3/4 h-full"
        >
          <MdOutlineArrowBackIosNew
            size={60}
            onClick={preSldide}
            className="text-white absolute left-0 hover:text-gray-400"
          />
          {index === current && (
            <img
              key={index}
              className="object-cover max-w-full max-h-full  group-hover:opacity-70"
              src={p.images}
              alt={p.content}
            />
          )}
          <MdArrowForwardIos
            size={60}
            className="text-white absolute right-0 hover:text-gray-400"
            onClick={nextSlide}
          />
        </div>
      ))}
    </div>
  );
}
