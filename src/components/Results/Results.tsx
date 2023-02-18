import { motion } from "framer-motion";
import { State } from "../../App";
import { formatPercentage } from "../../utils/helpers";
import s from "./Results.module.css";

interface ResultProps {
  errors: number;
  accurancyPercentage: number;
  speed: number;
  state: State;
}

const Results = ({
  errors,
  accurancyPercentage,
  speed,
  state,
}: ResultProps) => {
  if (state !== "finish") {
    return null;
  }

  return (
    <motion.ul className={s.resultsList}>
      <motion.li
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0,
        }}
        className={s.total}
      >
        Speed: {speed} wpm
      </motion.li>
      <motion.li
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        className={s.errors}
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 1,
        }}
        className={s.percentage}
      >
        Accurancy: {formatPercentage(accurancyPercentage)}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
