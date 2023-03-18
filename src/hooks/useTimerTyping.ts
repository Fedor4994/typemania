import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
import { selectIsLoggedIn, selectUser } from "../redux/auth/auth-selectors";
import keypress from "../data/sound.wav";
import { TypingEvent } from "./useStopwatchTyping";

export type State = "start" | "run" | "finish";

export const useTimerTyping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser);

  const notify = () =>
    toast.info("Harcore mode is active", {
      toastId: "customId",
    });

  const [typed, setTyped] = useState("");
  const [state, setState] = useState<State>("start");
  const [cursor, setCursor] = useState(0);
  const [typingEvents, setTypingEvents] = useState<TypingEvent[]>([]);

  const errorsRef = useRef(0);
  const totalTypedRef = useRef(0);
  const totalWords = useRef("");
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
        if (isLoggedIn && currentUser.verify) {
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
              language: localStorage.getItem("language") || "english",
              isHardcore:
                localStorage.getItem("isHardcore") === "true" ? true : false,
              text: totalWords.current,
              record: typingEvents,
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
              text: totalWords.current,
              record: typingEvents,
            })
          );
        }

        navigate("/results");
      }

      setState("finish");
    }
  }, [
    countdownSeconds,
    currentUser.verify,
    cursor,
    dispatch,
    isLoggedIn,
    navigate,
    resetCountdown,
    timeLeft,
    totalTypedRef,
    typed,
    typingEvents,
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
    totalWords.current = "";

    setTyped("");
    resetCountdown();
    setCursor(0);
    setTypingEvents([]);
    setState("start");
  }, [resetCountdown]);

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
        startCountdown();
        setState("run");
      }
      switch (key) {
        case "Backspace":
          if (localStorage.getItem("isSound") === "true") {
            audio.play();
          }

          setTyped((typed) => typed.slice(0, -1));
          totalTypedRef.current -= 1;
          setCursor((prevCursor) => prevCursor - 1);
          break;
        default:
          if (localStorage.getItem("isSound") === "true") {
            audio.play();
          }

          if (totalWords.current === "") {
            totalWords.current = words;
          }

          if (!totalWords.current.includes(words)) {
            totalWords.current += words;
          }

          setTyped((typed) => typed.concat(key));
          totalTypedRef.current += 1;
          setCursor((prevCursor) => prevCursor + 1);
          break;
      }
    },
    [onRestart, startCountdown, state, updateWords, words]
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
