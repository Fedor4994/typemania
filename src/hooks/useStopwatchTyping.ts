import { useState, useRef, useEffect, useCallback } from "react";
import useStopwatch from "./useStopwatch";
import { State } from "./useTimerTyping";
import useWords from "./useWords";
import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
  countErrors,
  isKeyboardAllowed,
} from "../utils/helpers";
import { useAppDispatch } from "../redux/store";
import { addTest } from "../redux/tests/tests-operations";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/auth-selectors";
import { setLastTest } from "../redux/tests/testsSlice";
import keypress from "../data/sound.wav";
import { toast } from "react-toastify";

export interface TypingEvent {
  timestamp: number;
  char: string;
}

export const useStopwatchTyping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [typed, setTyped] = useState("");
  const [totalTyped, setTotalTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [state, setState] = useState<State>("start");
  const [typingEvents, setTypingEvents] = useState<TypingEvent[]>([]);

  const totalTypedRef = useRef(0);
  const notify = () =>
    toast.info("Harcore mode is active", {
      toastId: "customId",
    });

  const { words, updateWords, wordsCount, setWordsCount } = useWords();
  const { secondsPassed, startStopwatch, resetStopwatch } = useStopwatch();

  useEffect(() => {
    // Finish words
    if (typed.length === words.length) {
      setTotalTyped(totalTypedRef.current);
      setErrors(countErrors(typed, words));
      setCursor(0);
      resetStopwatch();

      if (totalTyped !== 0) {
        if (isLoggedIn) {
          dispatch(
            addTest({
              wpm: calculateWordsPerMinute(totalTyped - errors, secondsPassed),
              accuracy: calculateAccurancyPercentage(errors, totalTyped),
              time: secondsPassed,
              testType: `Words, ${wordsCount}`,
              language: localStorage.getItem("language") || "english",
              isHardcore:
                localStorage.getItem("isHardcore") === "true" ? true : false,
              text: words,
              record: typingEvents,
            })
          );
        } else {
          dispatch(
            setLastTest({
              wpm: calculateWordsPerMinute(totalTyped - errors, secondsPassed),
              accuracy: calculateAccurancyPercentage(errors, totalTyped),
              time: secondsPassed,
              testType: `Words, ${wordsCount}`,
              text: words,
              record: typingEvents,
            })
          );
        }

        navigate("/results");
      }

      setState("finish");
    }
  }, [
    dispatch,
    errors,
    isLoggedIn,
    navigate,
    resetStopwatch,
    secondsPassed,
    totalTyped,
    typed,
    typingEvents,
    updateWords,
    words,
    wordsCount,
  ]);

  const onRestart = useCallback(() => {
    totalTypedRef.current = 0;

    setTyped("");
    setTotalTyped(0);
    setErrors(0);
    setCursor(0);
    setTypingEvents([]);
    resetStopwatch();
    setState("start");
  }, [resetStopwatch]);

  useEffect(() => {
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    const isHardcore = localStorage.getItem("isHardcore");

    if (countErrors(typed, wordsReached) > 0 && isHardcore === "true") {
      onRestart();
      notify();
    }
  }, [cursor, onRestart, typed, words]);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      const audio = new Audio(keypress);

      const timestamp = Date.now();
      const char = key;
      const typingEvent: TypingEvent = { timestamp, char };
      setTypingEvents((prevEvents) => [...prevEvents, typingEvent]);

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
          if (localStorage.getItem("isSound") === "true") {
            audio.play();
          }

          setTyped((typed) => typed.slice(0, -1));
          setCursor((prevCursor) => prevCursor - 1);
          totalTypedRef.current -= 1;
          break;
        default:
          if (localStorage.getItem("isSound") === "true") {
            audio.play();
          }

          setTyped((typed) => typed.concat(key));
          setCursor((prevCursor) => prevCursor + 1);
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
  };
};
