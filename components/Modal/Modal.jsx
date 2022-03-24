import Backdrop from "./ModalBackground";
import { motion } from "framer-motion";
import { PostForm } from "@/components/Post";
import { FiX } from "react-icons/fi";
import { useLockBodyScroll } from "@/lib/bodyScrollLock";

const dropIn = {
  initial: {
    opacity: 0,
    scale: 0.75,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: "easeIn",
      duration: 0.15,
    },
  },
};

export default function Modal({ handleClose }) {
  useLockBodyScroll();

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6 text-white/60 "
        variants={dropIn}
        // initial="hidden"
        animate="visible"
        exit="exit"
      >
        <FiX
          size={25}
          onClick={handleClose}
          className="text-white  hover:text-white/50 m-2 cursor-pointer"
        ></FiX>

        <div className="p-2">
          <PostForm />
        </div>
      </motion.div>
    </Backdrop>
  );
}
