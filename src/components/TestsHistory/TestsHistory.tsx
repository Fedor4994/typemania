import { useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import {
  FaSkull,
  FaSmile,
  FaGlobeAmericas,
  FaPlayCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Test } from "../../types/test";
import { formatPercentage } from "../../utils/helpers";
import s from "./TestsHistory.module.scss";
import { RecordTypingModal } from "../RecordTyping/RecordTypingModal";

const TestsHistory = ({
  tests,
  onSortChange,
  sortValue,
}: {
  tests: Test[];
  onSortChange: (value: number) => void;
  sortValue: number;
}) => {
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [recordedTest, setRecordedTest] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <table className={s.transactionHistory}>
        <thead>
          <tr>
            <th>Test Type</th>
            <th className={s.wpmColumn}>WPM</th>
            <th className={s.wpmColumn}>Accuracy</th>
            <th>Time spended</th>
            <th className={s.infoColumn}>Info</th>

            <th>
              <label className={s.sortCheckbox}>
                Date
                <input
                  checked={sortValue === 1}
                  onChange={() => onSortChange(sortValue === 1 ? -1 : 1)}
                  type="checkbox"
                />
                <span className={s.sortCheckmark}>
                  <BsFillCaretRightFill size={18} />
                </span>
              </label>
            </th>
          </tr>
        </thead>

        {tests.map((test) => (
          <tbody key={test._id}>
            <tr className={s.tr}>
              <td>
                <button
                  className={s.replayButton}
                  onClick={() => {
                    setIsModalOpen(true);
                    setRecordedTest(test._id);
                  }}
                >
                  <FaPlayCircle size={18} />
                </button>

                {isModalOpen && test._id === recordedTest && (
                  <RecordTypingModal
                    words={test.text}
                    typingEvents={test.record}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
                {test.testType}
              </td>
              <td>{test.wpm}</td>
              <td>{formatPercentage(test.accuracy)}</td>
              <td>{test.time} seconds</td>
              <td>
                <div className={s.infoWrapper}>
                  <motion.div
                    onHoverStart={() => setNameErrorMessage(test._id)}
                    onHoverEnd={() => setNameErrorMessage("")}
                    className={s.checkIcon}
                  >
                    <FaGlobeAmericas />
                    {nameErrorMessage === test._id && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: "-50%",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: "-50%",
                        }}
                        transition={{
                          duration: 0.4,
                        }}
                        className={s.tooltip}
                      >
                        {test.language}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    onHoverStart={() =>
                      setNameErrorMessage(`Hardcore ${test._id}`)
                    }
                    onHoverEnd={() => setNameErrorMessage("")}
                    className={s.checkIcon}
                  >
                    {test.isHardcore ? <FaSkull /> : <FaSmile />}

                    {nameErrorMessage === `Hardcore ${test._id}` && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: "-50%",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: "-50%",
                        }}
                        transition={{
                          duration: 0.4,
                        }}
                        className={s.hardcoreTooltip}
                      >
                        {test.isHardcore ? "hardcore" : "normal"}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </td>

              <td>{new Date(test.createdAt).toLocaleString().slice(0, 17)}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};

export default TestsHistory;
