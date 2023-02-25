import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Results from "../../components/Results/Results";
import { selectIsLoggedIn } from "../../redux/auth/auth-selectors";
import {
  selectIsLoading,
  selectLastTest,
  selectError,
} from "../../redux/tests/tests-selectors";
import s from "./ResultsPage.module.scss";

const ResultsPage = () => {
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
      {!isLoggedIn && <p>Create an account to save your progress!!!</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Results
          accurancyPercentage={lastTest?.accuracy || 0}
          speed={lastTest?.wpm || 0}
          time={lastTest?.time || 0}
          testType={lastTest?.testType || ""}
        />
      )}
    </div>
  );
};

export default ResultsPage;
