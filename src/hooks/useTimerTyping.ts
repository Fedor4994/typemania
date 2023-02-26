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
import { setLastTest } from "../redux/tests/testsSlice";
import { selectIsLoggedIn } from "../redux/auth/auth-selectors";
import { useSelector } from "react-redux";

export type State = "start" | "run" | "finish";

export const useTimerTyping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [typed, setTyped] = useState("");
  const [state, setState] = useState<State>("start");
  const [cursor, setCursor] = useState(0);

  const errorsRef = useRef(0);
  const totalTypedRef = useRef(0);
  const { words, updateWords } = useWords(40);

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
      errorsRef.current += countErrors(typed, wordsReached);

      if (totalTypedRef.current !== 0) {
        if (isLoggedIn) {
          dispatch(
            addTest({
              wpm: calculateWordsPerMinute(
                totalTypedRef.current - errorsRef.current,
                countdownSeconds
              ),
              accuracy: calculateAccurancyPercentage(
                errorsRef.current,
                totalTypedRef.current
              ),
              time: countdownSeconds,
              testType: `Timer, ${countdownSeconds} seconds`,
            })
          );
        } else {
          dispatch(
            setLastTest({
              wpm: calculateWordsPerMinute(
                totalTypedRef.current - errorsRef.current,
                countdownSeconds
              ),
              accuracy: calculateAccurancyPercentage(
                errorsRef.current,
                totalTypedRef.current
              ),
              time: countdownSeconds,
              testType: `Timer, ${countdownSeconds} seconds`,
            })
          );
        }

        navigate("/results");
      }

      setState("finish");
    }
  }, [
    countdownSeconds,
    cursor,
    dispatch,
    isLoggedIn,
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
      errorsRef.current += countErrors(typed, words);
    }
  }, [typed, updateWords, words]);

  const onRestart = useCallback(() => {
    totalTypedRef.current = 0;
    errorsRef.current = 0;

    setTyped("");
    resetCountdown();
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
