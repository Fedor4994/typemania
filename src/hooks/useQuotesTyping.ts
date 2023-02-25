import { useCallback, useEffect, useRef, useState } from "react";

import { useQuotes } from "./useQuotes";
import useStopwatch from "./useStopwatch";
import { State } from "./useTimerTyping";
import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
  countErrors,
  isKeyboardAllowed,
} from "../utils/helpers";
import { useAppDispatch } from "../redux/store";
import { addTest } from "../redux/tests/tests-operations";
import { useNavigate } from "react-router-dom";

export const useQuotesTyping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

      if (totalTyped !== 0) {
        dispatch(
          addTest({
            wpm: calculateWordsPerMinute(totalTyped - errors, secondsPassed),
            accuracy: calculateAccurancyPercentage(errors, totalTyped),
            time: secondsPassed,
          })
        ).then(() => {
          navigate("/results");
        });
      }

      setState("finish");
    }
  }, [
    currentQuote,
    dispatch,
    errors,
    navigate,
    resetStopwatch,
    secondsPassed,
    totalTyped,
    typed,
  ]);

  const onRestart = useCallback(() => {
    totalTypedRef.current = 0;

    setTyped("");
    setTotalTyped(0);
    setErrors(0);
    resetStopwatch();
    setState("start");
  }, [resetStopwatch]);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (key === "Escape") {
        onRestart();
        return;
      }

      if (key === "ArrowRight") {
        onRestart();
        updateQuotes();
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
    [onRestart, startStopwatch, state, updateQuotes]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    quotesCount,
    setQuotesCount,
    updateQuotes,
    onRestart,
    currentQuote,
    typed,
  };
};
