import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Results from "../../components/Results/Results";
import { selectLastTest } from "../../redux/tests/tests-selectors";
import s from "./ResultsPage.module.scss";

const ResultsPage = () => {
  const lastTest = useSelector(selectLastTest);

  if (!lastTest?.wpm) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.resultPage}>
      <Results
        accurancyPercentage={lastTest.accuracy}
        speed={lastTest.wpm}
        time={lastTest.time}
      />
    </div>
  );
};

export default ResultsPage;
