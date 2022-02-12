import React from "react";
import Link from "@/components/Link";
import Image from "next/image";
import { FaCommentDots, FaUser } from "react-icons/fa";
import { BiHome } from "react-icons/bi";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center gap-4 grid-rows-3 xl:w-[345px] fixed min-h-screen">
      <div className="flex flex-col justify-center items-center place-self-end justify-self-center">
        <img
          className="inline object-cover w-20 h-20 rounded-full border"
          src="/user_user.jpg"
          alt="Profile image"
        />
        <h1 className="text-white">Samon Gedefa</h1>
        <h1 className="text-white">@samsn</h1>
      </div>

      <div className="space-y-4 pt-10 pb-10">
        <Link text="Home" Icon={BiHome} active />
        <Link text="Message" Icon={FaCommentDots} />
        <Link text="Profile" Icon={FaUser} />
      </div>
      {/* <button className="hidden xl:inline ml-auto bg-[#e65a5a] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Post
      </button> */}
      <div className="flex flex-col justify-center items-center place-self-end justify-self-center pb-8">
        <h1 className="text-white">Art World</h1>
      </div>
    </div>
  );
}
