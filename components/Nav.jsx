import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { modalState } from "../atoms/modalAtom";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { navMenuState } from "atoms/navMenuAtom";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export default function Nav() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [menuOpen, setMenuOpen] = useRecoilState(navMenuState);

  const router = useRouter();
  const { data: session } = useSession();
  const handleMenu = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };
  return (
    <header className="sticky top-0 overflow-hidden h-14 flex justify-start items-center font-semibold uppercase z-10 bg-[#06070D] text-white shadow-md shadow-gray-800/40">
      <div
        onClick={handleMenu}
        className="cursor-pointer hover:text-[#85f8c6] ml-7"
      >
        <RiMenu4Fill size={30} className="" />
      </div>
      <div className="relative flex items-center justify-center w-[140px] h-[140px] cursor-pointer">
        <Link href={"/"}>
          <a>
            <Image src="/logo.png" alt="logo" layout="fill" objectFit="cover" />
          </a>
        </Link>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex justify-center mt-auto ml-auto mb-auto mr-10  items-center space-x-2 bg-[#11EE8F] text-white rounded-sm w-36 h-[36px] text-lg font-bold shadow-md hover:bg-[#a5ddc5]"
        onClick={() => {
          setModalOpen(true);

          !session && router.push("/login");
        }}
      >
        <IoMdAdd size={20} className="" />

        <span className="inline">Post</span>
      </motion.button>
    </header>
  );
}
