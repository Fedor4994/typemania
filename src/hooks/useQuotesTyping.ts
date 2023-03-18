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
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/auth/auth-selectors";
import { setLastTest } from "../redux/tests/testsSlice";
import keypress from "../data/sound.wav";
import { toast } from "react-toastify";
import { TypingEvent } from "./useStopwatchTyping";

export const useQuotesTyping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser);

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

  const { currentQuote, setQuoteLength, updateQuotes, quoteLength } =
    useQuotes();
  const { secondsPassed, startStopwatch, resetStopwatch } = useStopwatch();

  let initialQuotesCount: number | null = null;
  if (localStorage.getItem("quoteOption")) {
    initialQuotesCount = Number(localStorage.getItem("quoteOption"));
  }

  const [quotesCount, setQuotesCount] = useState(initialQuotesCount || 1);

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
      setCursor(0);

      if (totalTyped !== 0) {
        if (isLoggedIn && currentUser.verify) {
          dispatch(
            addTest({
              wpm: calculateWordsPerMinute(totalTyped - errors, secondsPassed),
              accuracy: calculateAccurancyPercentage(errors, totalTyped),
              time: secondsPassed,
              testType: `Quote, ${quoteLength}`,
              language: localStorage.getItem("language") || "english",
              isHardcore:
                localStorage.getItem("isHardcore") === "true" ? true : false,
              text: currentQuote.text,
              record: typingEvents,
            })
          );
        } else {
          dispatch(
            setLastTest({
              wpm: calculateWordsPerMinute(totalTyped - errors, secondsPassed),
              accuracy: calculateAccurancyPercentage(errors, totalTyped),
              time: secondsPassed,
              testType: `Quote, ${quoteLength}`,
              text: currentQuote.text,
              record: typingEvents,
            })
          );
        }

        navigate("/results");
      }

      setState("finish");
    }
  }, [
    currentQuote,
    currentUser.verify,
    dispatch,
    errors,
    isLoggedIn,
    navigate,
    quoteLength,
    resetStopwatch,
    secondsPassed,
    totalTyped,
    typed,
    typingEvents,
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
    const wordsReached = currentQuote.text.substring(
      0,
      Math.min(cursor, currentQuote.text.length)
    );
    const isHardcore = localStorage.getItem("isHardcore");

    if (countErrors(typed, wordsReached) > 0 && isHardcore === "true") {
      onRestart();
      notify();
    }
  }, [currentQuote.text, cursor, onRestart, typed]);

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
