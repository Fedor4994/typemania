import { motion } from "framer-motion";
import s from "./Caret.module.css";

const Caret = () => {
  return (
    <motion.div
      className={s.caret}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
    />
  );
};

export default Caret;
