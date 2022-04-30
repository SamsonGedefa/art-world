import { useState } from "react";

const Tag = (props) => (
  <div className="p-2 max-h-30 min-w-md max-w-md flex items-center flex-wrap gap-2 text-white">
    <input
      onKeyDown={(e) => props.handleKeyDown(e)}
      type="text"
      className="flex-grow px-4 py-2 outline-0 rounded-full bg-[#292F34] "
      placeholder="Type something..."
    />

    {props.tags.map((tag, index) => (
      <div className="bg-[#292F34] inline-block p-2 h-10   " key={index}>
        <span className="max-h-full">{tag}</span>
        <span
          className="max-h-full w-6   border-lg inline-flex justify-center items-center ml-2 text-md cursor-pointer"
          onClick={() => props.removeTag(index)}
        >
          &times;
        </span>
      </div>
    ))}
  </div>
);

export default Tag;
