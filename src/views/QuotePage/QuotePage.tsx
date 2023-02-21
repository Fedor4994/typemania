import { useCallback, useEffect, useRef, useState } from "react";
import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import Navigation from "../../components/Navigation/Navigation";
import RestartButton from "../../components/RestartButton/RestartButton";
import Results from "../../components/Results/Results";
import UserTyping from "../../components/UserTyping/UserTyping";
import { useQuotes } from "../../hooks/useQuotes";
import useStopwatch from "../../hooks/useStopwatch";
import { State } from "../../hooks/useTimerTyping";
import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
  countErrors,
  isKeyboardAllowed,
} from "../../utils/helpers";
import s from "./QuotePage.module.scss";

const QuotePage = () => {
  const [typed, setTyped] = useState("");
  const [totalTyped, setTotalTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [state, setState] = useState<State>("start");

  const totalTypedRef = useRef(0);
  const { currentQuote, setQuoteLength, updateQuotes } = useQuotes();
  const { secondsPassed, startStopwatch, resetStopwatch } = useStopwatch();

  const [quotesCount, setQuotesCount] = useState(1);

  useEffect(() => {
    switch (quotesCount) {
      case 1:
        setQuoteLength("all");
        break;
      case 2:
        setQuoteLength("short");
        break;
      case 3:
        setQuoteLength("medium");
        break;
      case 4:
        setQuoteLength("long");
        break;
    }
  }, [currentQuote, quotesCount, setQuoteLength]);

  useEffect(() => {
    // Finish quotes
    if (typed.length === currentQuote.length) {
      setTotalTyped(totalTypedRef.current);
      setErrors(countErrors(typed, currentQuote.text));
      resetStopwatch();
      setState("finish");
    }
  }, [currentQuote, resetStopwatch, typed]);

  const onRestart = useCallback(() => {
    totalTypedRef.current = 0;

    setTyped("");
    updateQuotes();
    setTotalTyped(0);
    setErrors(0);
    resetStopwatch();
    setState("start");
  }, [resetStopwatch, updateQuotes]);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (key === "Escape") {
        onRestart();
        return;
      }

      const allowed = isKeyboardAllowed(code);
      if (!allowed || state === "finish") {
        return;
      }
      if (state === "start") {
        setState("run");
        startStopwatch();
      }
      switch (key) {
        case "Backspace":
          setTyped((typed) => typed.slice(0, -1));
          totalTypedRef.current -= 1;
          break;
        default:
          setTyped((typed) => typed.concat(key));
          totalTypedRef.current += 1;
          break;
      }
    },
    [onRestart, startStopwatch, state]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

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
