import React from "react";
import Tab from "@/components/Tab";
import Image from "next/image";
import { FaCommentDots, FaUser, FaUniversalAccess} from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useRouter } from "next/router";

export default function Sidebar() {
  const { data: session } = useSession();

  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const { query } = useRouter();
  const router = useRouter();

  const isTabOneSelected = !!query.tabHome;
  const isTabTwoSelected = !!query.tabMessages;
  const isTabThreeSelected = !!query.tabProfile;

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-center xl:w-[250px] p-2 fixed h-full ">
      {/* <div className="flex flex-col justify-center items-center place-self-end justify-self-center bg-blue-500  ">
        <div className="inline object-cover w-20 h-20 rounded-full border bg-red-500  overflow-hidden md:shrink-1">
          <img
            className="inline object-cover w-full h-full"
            src="/user_user.jpg"
            alt="Profile image"
          />
        </div>

        <h1 className="text-white">Samon Gedefa</h1>
        <h1 className="text-white">@samsn</h1>
      </div> */}

      {/* <div className="flex items-center justify-center w-14 h-14 hoverAnimation  ">
        <Image src="/user_user.jpg" width={30} height={30} />
      </div> */}
      {session ? (
        <>
          <nav className="space-y-4 mt-4 mb-2.5 ">
            <Tab
              href="/?tabHome=true"
              text="Home"
              Icon={HiHome}
              isSelected={isTabOneSelected}
            />
            <Tab
              href="/?tabMessages=true"
              text="Massages"
              Icon={FaCommentDots}
              isSelected={isTabTwoSelected}
            />
            <Tab
              href="/?tabProfile=true"
              text="Profile"
              Icon={FaUser}
              isSelected={isTabThreeSelected}
            />
            {/* <Link text="Messages" Icon={FaCommentDots} path="/messages" />
            <Link text="Profile" Icon={FaUser} path="/profile" /> */}
            <div onClick={() => signOut()} className="text-white">
              Signout
            </div>
          </nav>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden xl:inline  bg-[#e65a5a] text-white rounded-full w-36 h-[36px] text-lg font-bold shadow-md hover:bg-[#ee7979]"
            onClick={() => setModalOpen(true)}
          >
            Post
          </motion.button>
        </>
      ) : (
        <div>
          <button onClick={() => router.push("/login")} className="hidden xl:inline ml-auto bg-[#e65a5a] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
          Sign In
        </button>
        <nav className="space-y-4 mt-4 mb-2.5 ">
            <Tab
              href="/?tabHome=true"
              text="Home"
              Icon={HiHome}
              isSelected={isTabOneSelected}
            />
            <Tab
              href="/?tabProfile=true"
              text="About"
              Icon={FaUniversalAccess}
              isSelected={isTabThreeSelected}
            />
            {/* <Link text="Messages" Icon={FaCommentDots} path="/messages" />
            <Link text="Profile" Icon={FaUser} path="/profile" /> */}

          </nav>
        
        </div>)
      }
      {/* <button className="hidden xl:inline ml-auto bg-[#e65a5a] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Post
      </button> */}
      <div className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation  xl:-mr-5">
        <Image src="/logo.png" height={100} width={100} alt="Art World Logo"/>
      </div>
    </div>
  );
}
