import { motion } from "framer-motion";

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed h-full w-full 2xl:pt-20 xl:pt-20 md:pt-20 overflow-y-scroll bg-black/60 flex items-center justify-center z-50 2xl:pt-25 md:pt-15"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
