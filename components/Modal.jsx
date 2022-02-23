import Backdrop from "./ModalBackground";
import { motion } from "framer-motion";
import PostForm from "./PostForm";
import { FiX } from "react-icons/fi";

// const dropIn = {
//   hidden: {
//     y: "-100vh",
//     opacity: 0,
//   },
//   visible: {
//     y: "0",
//     opacity: 1,
//     transition: {
//       duration: 0.1,
//       type: "spring",
//       damping: 25,
//       stiffness: 500,
//     },
//   },
//   exit: {
//     y: "100vh",
//     opacity: 0,
//     scale: 0.75,
//   },
// };

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
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
          <h4 className="text-xl">Create a post</h4>
          {/* <IconButton onClick={handleClose}>
            <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
          </IconButton> */}
          <FiX onClick={handleClose} className="text-white"></FiX>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-2">
            {/* <Avatar src={session?.user?.image} className="!h-11 !w-11" /> */}
            {/* <h6>{session?.user?.name}</h6> */}
          </div>

          <PostForm />
        </div>
      </motion.div>
    </Backdrop>
  );
}
