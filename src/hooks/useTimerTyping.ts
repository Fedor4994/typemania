import { useCallback, useEffect, useRef, useState } from "react";

import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
  countErrors,
  isKeyboardAllowed,
} from "../utils/helpers";
import { useAppDispatch } from "../redux/store";
import { addTest } from "../redux/tests/tests-operations";
import { useNavigate } from "react-router-dom";

export type State = "start" | "run" | "finish";

export const useTimerTyping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [typed, setTyped] = useState("");
  const [state, setState] = useState<State>("start");
  const [cursor, setCursor] = useState(0);
  const [errors, setErrors] = useState(0);

  const totalTypedRef = useRef(0);
  const { words, updateWords } = useWords();

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
      const wordsReached = words.substring(0, Math.min(cursor, words.length));
      setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));

      if (totalTypedRef.current !== 0) {
        dispatch(
          addTest({
            wpm: calculateWordsPerMinute(
              totalTypedRef.current - errors,
              countdownSeconds
            ),
            accuracy: calculateAccurancyPercentage(
              errors,
              totalTypedRef.current
            ),
            time: countdownSeconds,
          })
        ).then(() => {
          navigate("/results");
        });
      }

      setState("finish");
    }
  }, [
    countdownSeconds,
    cursor,
    dispatch,
    errors,
    navigate,
    resetCountdown,
    timeLeft,
    totalTypedRef,
    typed,
    updateWords,
    words,
  ]);

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
    resetCountdown();
    setErrors(0);
    setCursor(0);
    setState("start");
  }, [resetCountdown]);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (key === "Escape") {
        onRestart();
        return;
      }

      if (key === "ArrowRight") {
        onRestart();
        updateWords();
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
    [onRestart, startCountdown, state, updateWords]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    timeLeft,
    countdownSeconds,
    words,
    typed,
    onRestart,
    updateWords,
    setCountdownSeconds,
  };
};
