import { BsFillCaretRightFill } from "react-icons/bs";
import { Test } from "../../types/test";
import { formatPercentage } from "../../utils/helpers";
import s from "./TestsHistory.module.scss";

const TestsHistory = ({
  tests,
  onSortChange,
  sortValue,
}: {
  tests: Test[];
  onSortChange: (value: number) => void;
  sortValue: number;
}) => {
  return (
    <table className={s.transactionHistory}>
      <thead>
        <tr>
          <th>Test Type</th>
          <th>WPM</th>
          <th>Accuracy</th>
          <th>Time spended</th>
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
            <td>{test.testType}</td>
            <td>{test.wpm}</td>
            <td>{formatPercentage(test.accuracy)}</td>
            <td>{test.time} seconds</td>
            <td>{new Date(test.createdAt).toLocaleString().slice(0, 17)}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default TestsHistory;
