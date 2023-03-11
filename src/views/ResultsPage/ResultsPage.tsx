import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { RecordTypingModal } from "../../components/RecordTyping/RecordTypingModal";
import Results from "../../components/Results/Results";
import { selectIsLoggedIn } from "../../redux/auth/auth-selectors";
import {
  selectIsLoading,
  selectLastTest,
  selectError,
} from "../../redux/tests/tests-selectors";
import s from "./ResultsPage.module.scss";

const ResultsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lastTest = useSelector(selectLastTest);
  const isLoading = useSelector(selectIsLoading);
  const resultsError = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (resultsError) {
    return <p>Something goes wrong... We can`t save result of this test.</p>;
  }

  // If user try to go into this page with url line
  if (!lastTest?.wpm && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.resultPage}>
      {!isLoggedIn && (
        <p className={s.signInPlease}>
          <Link className={s.singInLink} to="/login">
            Sign in
          </Link>{" "}
          to save your results
        </p>
      )}
      {isLoading ? (
        <div className={s.resultLoader}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="var(--main-color)"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <div className={s.replayWrapper}>
          <Results
            accurancyPercentage={lastTest?.accuracy || 0}
            speed={lastTest?.wpm || 0}
            time={lastTest?.time || 0}
            testType={lastTest?.testType || ""}
          />
          <button
            className={s.replayButton}
            onClick={() => setIsModalOpen(true)}
          >
            Watch replay <FaPlayCircle size={18} />
          </button>
        </div>
      )}
      {isModalOpen && (
        <RecordTypingModal
          typingEvents={lastTest?.record || []}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ResultsPage;
