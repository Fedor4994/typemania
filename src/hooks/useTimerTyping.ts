import { useCallback, useEffect, useRef, useState } from "react";

import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import { countErrors, isKeyboardAllowed } from "../utils/helpers";

export type State = "start" | "run" | "finish";

export const useTimerTyping = (numberOfWords: number) => {
  const [typed, setTyped] = useState("");
  const { words, updateWords } = useWords(numberOfWords);
  const [totalTyped, setTotalTyped] = useState(0);
  const [state, setState] = useState<State>("start");
  const [cursor, setCursor] = useState(0);
  const [errors, setErrors] = useState(0);

  const totalTypedRef = useRef(0);

  const {
    timeLeft,
    startCountdown,
    resetCountdown,
    countdownSeconds,
    setCountdownSeconds,
  } = useCountdownTimer();

  useEffect(() => {
    // The end of timer
    if (!timeLeft) {
      resetCountdown();
      setTotalTyped(totalTypedRef.current);
      const wordsReached = words.substring(0, Math.min(cursor, words.length));
      setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
      setState("finish");
    }
  }, [cursor, resetCountdown, timeLeft, typed, updateWords, words]);

  useEffect(() => {
    // Finish group of words
    if (typed.length === words.length) {
      setTyped("");
      updateWords();
      setCursor(0);
      setErrors((prevErrors) => prevErrors + countErrors(typed, words));
    }
  }, [typed, updateWords, words]);

  const onRestart = useCallback(() => {
    totalTypedRef.current = 0;

    setTyped("");
    updateWords();
    resetCountdown();
    setTotalTyped(0);
    setErrors(0);
    setCursor(0);
    setState("start");
  }, [resetCountdown, updateWords]);

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
        startCountdown();
        setState("run");
      }
      switch (key) {
        case "Backspace":
          setTyped((typed) => typed.slice(0, -1));
          totalTypedRef.current -= 1;
          setCursor((prevCursor) => prevCursor - 1);
          break;
        default:
          setTyped((typed) => typed.concat(key));
          totalTypedRef.current += 1;
          setCursor((prevCursor) => prevCursor + 1);
          break;
      }
    },
    [onRestart, startCountdown, state]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    errors,
    totalTyped,
    state,
    timeLeft,
    countdownSeconds,
    words,
    typed,
    onRestart,
    setCountdownSeconds,
  };
};
