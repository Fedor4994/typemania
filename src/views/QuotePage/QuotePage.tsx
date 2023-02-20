import { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import s from "./QuotePage.module.scss";

const QuotePage = () => {
  const [quotesCount, setQuotesCount] = useState(2);

  return (
    <div className={s.quotePage}>
      <Navigation
        currentPage="quote"
        currentValue={quotesCount}
        onChange={setQuotesCount}
      />
      <h1>QUOTE PAGE</h1>
    </div>
  );
};

export default QuotePage;
