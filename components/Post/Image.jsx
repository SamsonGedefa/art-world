import React from "react";
import { FiX } from "react-icons/fi";

const ImageList = (props) => (
  <div className="relative ">
    <div
      className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
      onClick={() => props.removeImage()}
    >
      <FiX className="text-white h-5" />
    </div>
    <img
      src={props.image}
      alt={props.image.content}
      className="rounded-2xl max-h-80 object-contain"
    />
  </div>
);

export default ImageList;
