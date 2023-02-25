import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import Navigation from "../../components/Navigation/Navigation";
import NextButton from "../../components/NextButton/NextButton";
import RestartButton from "../../components/RestartButton/RestartButton";
import Source from "../../components/Source/Source";
import UserTyping from "../../components/UserTyping/UserTyping";
import { useQuotesTyping } from "../../hooks/useQuotesTyping";

import s from "./QuotePage.module.scss";

const QuotePage = () => {
  const {
    quotesCount,
    setQuotesCount,
    onRestart,
    updateQuotes,
    currentQuote,
    typed,
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
      <Source text={currentQuote.source} />

      <div className={s.buttonsWrapper}>
        <RestartButton onRestart={onRestart} />
        <NextButton
          handleNextTest={() => {
            onRestart();
            updateQuotes();
          }}
        />
      </div>
      {/* <Results
        accurancyPercentage={calculateAccurancyPercentage(errors, totalTyped)}
        errors={errors}
        speed={calculateWordsPerMinute(totalTyped - errors, secondsPassed)}
        state={state}
      /> */}
    </div>
  );
};

export default QuotePage;
