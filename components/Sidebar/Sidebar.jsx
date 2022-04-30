import React from "react";
import Tab from "@/components/Tab";
import Image from "next/image";
import { FaCommentDots, FaUser } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Avatar from "../Avatar";
import { useRouter } from "next/router";
import Link from "next/link";
import { navMenuState } from "../../atoms/navMenuAtom";
import Backdrop from "./Backdrop";
import { useEffect } from "react";
import { MdCollections } from "react-icons/md";

export default function Sidebar() {
  const { data: session } = useSession();

  const { query } = useRouter();
  const router = useRouter();

  const isTabOneSelected = !!query.home;
  const isTabTwoSelected = !!query.messages;
  const isTabThreeSelected = !!query.profile;

  const [menuOpen, setMenuOpen] = useRecoilState(navMenuState);

  useEffect(() => {
    menuOpen && setMenuOpen(false);
  }, [query]);
  return (
    <aside
      className={`fixed flex flex-col items-center w-20 ${
        menuOpen && "w-60 z-10"
      }  h-screen bg-[#06070D] text-white border-r border-gray-700`}
    >
      <Tab href="/" text="Home" Icon={HiHome} isSelected={isTabOneSelected} />
      <Tab
        href="/messages"
        text="Messages"
        Icon={FaCommentDots}
        isSelected={isTabTwoSelected}
      />
      <Tab
        href="/profile"
        text="Profile"
        Icon={FaUser}
        isSelected={isTabThreeSelected}
      />
      <Tab
        href="/library"
        text="Library"
        Icon={MdCollections}
        isSelected={isTabThreeSelected}
      />
      <div className="w-full border-b border-gray-700"></div>

      {session && (
        <div className={` ${!menuOpen && "hidden"} ml-7 self-start mt-4`}>
          <button
            onClick={() => signOut()}
            className="bg-[#95bca7]  text-white rounded-sm px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"
          >
            Sign Out
          </button>
        </div>
      )}

      {!session && (
        <div
          className={` ${!menuOpen && "hidden"} ml-7 self-start mt-4 space-x-2`}
        >
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#95bca7]   text-white rounded-sm px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"
          >
            Join
          </button>
          <span>Or</span>
          <button
            onClick={() => router.push("/login")}
            className="border text-white rounded-sm px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"
          >
            Sign In
          </button>
        </div>
      )}
    </aside>
  );
}
