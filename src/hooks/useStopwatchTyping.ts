import { useState, useRef, useEffect, useCallback } from "react";
import useStopwatch from "./useStopwatch";
import { State } from "./useTimerTyping";
import useWords from "./useWords";
import { countErrors, isKeyboardAllowed } from "../utils/helpers";

export const useStopwatchTyping = () => {
  const [typed, setTyped] = useState("");
  const [totalTyped, setTotalTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [state, setState] = useState<State>("start");

  const totalTypedRef = useRef(0);
  const { words, updateWords, wordsCount, setWordsCount } = useWords();
  const { secondsPassed, startStopwatch, resetStopwatch } = useStopwatch();

  useEffect(() => {
    // Finish words
    if (typed.length === words.length) {
      setTotalTyped(totalTypedRef.current);
      setErrors(countErrors(typed, words));
      resetStopwatch();
      setState("finish");
    }
  }, [resetStopwatch, typed, updateWords, words]);

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
        updateWords();
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
    [onRestart, startStopwatch, state, updateWords]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    wordsCount,
    setWordsCount,
    updateWords,
    onRestart,
    words,
    typed,
    errors,
    totalTyped,
    secondsPassed,
    state,
  };
};
