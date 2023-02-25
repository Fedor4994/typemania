import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { formatPercentage } from "../../utils/helpers";
import s from "./Results.module.scss";

interface ResultProps {
  time: number;
  accurancyPercentage: number;
  speed: number;
  testType: string;
}

const Results = ({
  time,
  accurancyPercentage: accurancy,
  speed,
  testType,
}: ResultProps) => {
  const [speedPercentage, setSpeedPercentage] = useState(0);
  const [accurancyPercentage, setAccurancyPercentage] = useState(0);

  const intervalIdSpeed = useRef<NodeJS.Timer>();
  const intervalIdAccurancy = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (!intervalIdSpeed.current) {
      intervalIdSpeed.current = setInterval(() => {
        setSpeedPercentage((prevPercentage) => prevPercentage + 1);
      }, 20);
    }

    if (speedPercentage === speed) {
      clearInterval(intervalIdSpeed.current);
    }
  }, [speedPercentage, speed]);

  useEffect(() => {
    if (!intervalIdAccurancy.current) {
      intervalIdAccurancy.current = setInterval(() => {
        setAccurancyPercentage((prevPercentage) => prevPercentage + 1);
      }, 20);
    }

    if (accurancyPercentage === Number(accurancy.toFixed(0))) {
      clearInterval(intervalIdAccurancy.current);
    }
  }, [accurancy, accurancyPercentage]);

  return (
    <motion.ul className={s.resultsList}>
      <motion.li className={s.circlesWrapper}>
        <motion.div
          style={{
            background: `conic-gradient(
          var(--main-color) ${accurancyPercentage * 3.6}deg,
          var(--backgroud-color) 0deg
          )`,
          }}
          className={s.progressCircular}
        >
          <span className={s.valueTitle}>Accuracy:</span>

          <span className={s.value}>
            {formatPercentage(accurancyPercentage)}
          </span>
        </motion.div>

        <div className={s.circle}>
          <div className={s.line1}></div>
          <div className={s.line2}></div>
          <div className={s.line3}></div>
          <div className={s.line4}></div>
          <div className={s.line5}></div>
          <div className={s.line6}></div>
          <div className={s.insertCircle}></div>
          <div className={s.insertCircle2}>
            <span className={s.timerSeconds}>{time}</span>
            <span className={s.timerSeconds}>seconds</span>
          </div>
        </div>

        <motion.div
          style={{
            background: `conic-gradient(
          var(--main-color) ${speedPercentage * (360 / speed)}deg,
          var(--backgroud-color) 0deg
          )`,
          }}
          className={s.progressCircular}
        >
          <span className={s.valueTitle}>Speed:</span>

          <span className={s.value}>{speedPercentage} WPM</span>
        </motion.div>
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
          delay: 0.8,
        }}
        className={s.testType}
      >
        Test's mode: {testType}
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
          delay: 1.3,
        }}
        className={s.testType}
      >
        <Link
          to={
            testType.slice(0, 3) === "Wor"
              ? "/words"
              : testType.slice(0, 3) === "Quo"
              ? "/quote"
              : "/"
          }
          className={s.goBack}
        >
          Next test <FaArrowAltCircleRight size={18} />
        </Link>
      </motion.li>
    </motion.ul>
  );
};

export default Results;
