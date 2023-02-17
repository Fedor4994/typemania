import { formatPercentage } from "../../utils/helpers";
import s from "./Results.module.css";

interface ResultProps {
  errors: number;
  accurancyPercentage: number;
  total: number;
}

const Results = ({ errors, accurancyPercentage, total }: ResultProps) => {
  return (
    <ul className={s.resultsList}>
      <li className={s.total}>Typed: {total}</li>
      <li className={s.errors}>Errors: {errors}</li>
      <li className={s.percentage}>
        Accurancy: {formatPercentage(accurancyPercentage)}
      </li>
    </ul>
  );
};

export default Results;
