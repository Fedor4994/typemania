import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight, FaCrown } from "react-icons/fa";
import { formatPercentage } from "../../utils/helpers";
import s from "./Results.module.scss";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/auth-selectors";
import { selectTestsDetails } from "../../redux/tests/tests-selectors";
import { useAppDispatch } from "../../redux/store";
import { getTestsDetails } from "../../redux/tests/tests-operations";
import { useAchievements } from "../../hooks/useAchievements";
import EarnedAchievements from "../EarnedAchievements/EarnedAchievements";

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
  const testsDetails = useSelector(selectTestsDetails);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const earnedAchievements = useAchievements(currentUser._id, testsDetails);

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

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTestsDetails(currentUser._id));
    }
  }, [currentUser._id, dispatch, isLoggedIn]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <EarnedAchievements list={earnedAchievements} />

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

          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            exit={{ rotate: 0 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            className={s.circle}
          >
            <div className={s.line1}></div>
            <div className={s.line2}></div>
            <div className={s.line3}></div>
            <div className={s.line4}></div>
            <div className={s.line5}></div>
            <div className={s.line6}></div>
            <div className={s.insertCircle}></div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              exit={{ rotate: 0 }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
              className={s.insertCircle2}
            >
              <span className={s.timerSeconds}>{time}</span>
              <span className={s.timerSeconds}>seconds</span>
            </motion.div>
          </motion.div>

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

            <span className={s.value}>
              {speedPercentage} WPM
              {speedPercentage === testsDetails?.topWpm && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={s.newRecordCrown}
                >
                  <FaCrown />
                </motion.div>
              )}
            </span>
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
    </div>
  );
};

export default Results;
