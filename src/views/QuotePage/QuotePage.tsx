import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import Navigation from "../../components/Navigation/Navigation";
import RestartButton from "../../components/RestartButton/RestartButton";
import Results from "../../components/Results/Results";
import UserTyping from "../../components/UserTyping/UserTyping";
import { useQuotesTyping } from "../../hooks/useQuotesTyping";

import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
} from "../../utils/helpers";
import s from "./QuotePage.module.scss";

const QuotePage = () => {
  const {
    quotesCount,
    setQuotesCount,
    onRestart,
    currentQuote,
    typed,
    errors,
    totalTyped,
    secondsPassed,
    state,
  } = useQuotesTyping();

  return (
    <div className={s.quotePage}>
      <Navigation
        currentPage="quote"
        currentValue={quotesCount}
        onChange={setQuotesCount}
        onRestart={onRestart}
      />
      <div className={s.typingArea}>
        <GeneratedWords words={currentQuote.text} />
        <UserTyping words={currentQuote.text} userInput={typed} />
      </div>

      <RestartButton onRestart={onRestart} />
      <Results
        accurancyPercentage={calculateAccurancyPercentage(errors, totalTyped)}
        errors={errors}
        speed={calculateWordsPerMinute(totalTyped - errors, secondsPassed)}
        state={state}
      />
    </div>
  );
};

export default QuotePage;
