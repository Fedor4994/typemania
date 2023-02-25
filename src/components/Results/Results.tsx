import { motion } from "framer-motion";
import { formatPercentage } from "../../utils/helpers";
import s from "./Results.module.scss";

interface ResultProps {
  time: number;
  accurancyPercentage: number;
  speed: number;
}

const Results = ({ time, accurancyPercentage, speed }: ResultProps) => {
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
        className={s.percentage}
      >
        Time spend: {time} seconds
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
        className={s.errors}
      >
        Accurancy: {formatPercentage(accurancyPercentage)}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
