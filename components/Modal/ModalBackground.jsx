import { motion } from "framer-motion";

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed h-full w-full overflow-y-scroll bg-black/60 flex items-center justify-center z-50 2xl:translate-y-10 md:translate-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
