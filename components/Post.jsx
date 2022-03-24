import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../Atoms/modalAtom";
import NavInteractions from "./Post-Interactions/NavInteractions";

import Link from "next/link";

function Post({ post }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  // console.log("FEED", post.creator.username);
  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    setModalOpen(false);
  };

  return (
    // <div>
    //   <Link href={`/user/${post.creator.username}`}>
    //     <a>
    //       <div className="columns-4xs max-w-xs rounded overflow-hidden shadow-lg  border">
    //         <img
    //           className="w-full aspect-video hover:aspect-square"
    //           src={post.images}
    //           alt="Sunset in the mountains"
    //         />
    //         <div className="px-6 py-4 border">
    //           <div className="font-bold text-xl mb-2"></div>
    //           <p className="text-white text-base">CONTENT GOES HERE</p>
    //         </div>
    //       </div>
    //     </a>
    //   </Link>
    // </div>
    <div>
      <Link href={`/user/${post.creator.username}`}>
        <a>
          <div className="columns-4xs max-w-xs text-slate-700 rounded overflow-hidden shadow-lg  border">
            <img
              className=" w-full  aspect-video"
              src={post.images}
              alt="Sunset in the mountains"
            />
            <div className="opacity-50 hover:opacity-100  px-6 py-4 border">
              <div className="font-bold text-xl mb-2"></div>
              <NavInteractions/>
              <p className="text-white text-base">CONTENT GOES HERE</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Post;

//    <div className="max-w-xs rounded overflow-hidden shadow-lg my-2 border">
//   <img className="w-full" src={post.images} alt="Sunset in the mountains" />
//   {/* <div className="px-6 py-4 border">
//     <div className="font-bold text-xl mb-2"></div>
//     <p className="text-white text-base">{post.content}</p>
//   </div> */}
// </div>
