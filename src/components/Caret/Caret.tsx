import { motion } from "framer-motion";
import s from "./Caret.module.scss";

const Caret = () => {
  const caretStyle = localStorage.getItem("caret-style") || "thin";

  return (
    <div className={s.caretWrapper}>
      {caretStyle === "off" && null}

      {caretStyle === "thin" && (
        <motion.div
          className={s.thinCaret}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      )}

      {caretStyle === "filled" && (
        <motion.div
          className={s.filledCaret}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.7 }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      )}

      {caretStyle === "outlined" && <div className={s.outlinedCaret} />}

      {caretStyle === "underline" && <div className={s.underlineCaret} />}
    </div>
  );
};

export default Caret;
