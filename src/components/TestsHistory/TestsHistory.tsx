import { Test } from "../../types/test";
import s from "./TestsHistory.module.scss";

const TestsHistory = ({ tests }: { tests: Test[] }) => {
  return (
    <ul className={s.testsList}>
      {tests.map((test) => (
        <li className={s.test} key={test._id}>
          <p>{test.wpm}</p>
          <p>{test.accuracy}</p>
          <p>{test.time}</p>
          <p>{test.createdAt}</p>
        </li>
      ))}
    </ul>
  );
};

export default TestsHistory;
