import { useCallback, useEffect, useRef, useState } from "react";
import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import GeneratedWords from "./components/GeneratedWords/GeneratedWords";
import RestartButton from "./components/RestartButton/RestartButton";
import Results from "./components/Results/Results";
import UserTyping from "./components/UserTyping/UserTyping";
import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
  countErrors,
  isKeyboardAllowed,
} from "./utils/helpers";
import useWords from "./hooks/useWords";
import useCountdownTimer from "./hooks/useCountdownTimer";

export type State = "start" | "run" | "finish";
const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

function App() {
  const [typed, setTyped] = useState("");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const [totalTyped, setTotalTyped] = useState(0);
  const [state, setState] = useState<State>("start");
  const [cursor, setCursor] = useState(0);
  const [errors, setErrors] = useState(0);

  const totalTypedRef = useRef(0);

  const { timeLeft, startCountdown, resetCountdown } =
    useCountdownTimer(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!timeLeft) {
      resetCountdown();
      setTotalTyped(totalTypedRef.current);
      const wordsReached = words.substring(0, Math.min(cursor, words.length));
      setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
      setState("finish");
    }
  }, [cursor, resetCountdown, timeLeft, typed, updateWords, words]);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
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

      if (typed.length === words.length - 1) {
        setTyped("");
        updateWords();
        setCursor(0);
        setErrors((prevErrors) => prevErrors + countErrors(typed, words));
      }
    },
    [startCountdown, state, typed, updateWords, words]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        background: "rgb(30, 41, 59)",
      }}
    >
      <div>
        <Results
          accurancyPercentage={calculateAccurancyPercentage(errors, totalTyped)}
          errors={errors}
          speed={calculateWordsPerMinute(
            totalTyped - errors,
            COUNTDOWN_SECONDS
          )}
          state={state}
        />
        <CountdownTimer timeLeft={timeLeft} />
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "50%",
          wordBreak: "break-all",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GeneratedWords words={words} />
        <UserTyping words={words} userInput={typed} />
      </div>

      <RestartButton
        onRestart={() => {
          totalTypedRef.current = 0;

          setTyped("");
          updateWords();
          resetCountdown();
          setTotalTyped(0);
          setErrors(0);
          setCursor(0);
          setState("start");
        }}
      />
    </div>
  );
}

export default App;
