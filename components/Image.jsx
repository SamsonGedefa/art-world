import React from "react";
// import { BsXCircle } from "react-icons/bs";

export default (props) =>
  props.images.map((image, i) => (
    <div key={i} className="relative max-h-full max-w-full h-30 w-30">
      <div
        className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
        onClick={() => props.removeImage(i)}
      >
        {/* <BsXCircle className="text-white h-5" /> */}
      </div>
      <img src={image} className="rounded-2xl object-cover h-full w-full" />
    </div>
  ));
