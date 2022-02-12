import { useEffect, useState } from "react";

import PostForm from "@/components/PostForm";
import Post from "@/components/Post";
import { IoIosAddCircleOutline } from "react-icons/io";

function Feed() {
  const [display, setDisplay] = useState(false);

  const removeDisplay = (bool) => {
    setDisplay(bool);
  };
  return (
    <div className="flex-grow border-l border-r border-gray-700  sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>

        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          {/* <SparklesIcon className="h-5 text-white" /> */}
        </div>
      </div>
      <button
        className="bg-[#e65a5a] m-5 text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
        // disabled={display}
        hidden={display}
        onClick={() => setDisplay(true)}
      >
        Add Post
      </button>
      {display && <PostForm removePostForm={removeDisplay} />}
      <Post />;
    </div>
  );
}

export default Feed;

// export default function AddPost() {
//   const [display, setDisplay] = useState(false);
//   return (
//     <div>
//       <button
//         className="bg-[#e65a5a] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
//         // disabled={display}
//         hidden={display}
//         onClick={() => setDisplay(true)}
//       >
//         Share
//       </button>

//       {display && <PostForm />}
//     </div>
//   );
// }
