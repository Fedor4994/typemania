import { useCallback, useEffect, useState } from "react";
import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import GeneratedWords from "./components/GeneratedWords/GeneratedWords";
import RestartButton from "./components/RestartButton/RestartButton";
import Results from "./components/Results/Results";
import UserTyping from "./components/UserTyping/UserTyping";
import {
  countErrors,
  calculateAccurancyPercentage,
  isKeyboardAllowed,
} from "./utils/helpers";
import useWords from "./hooks/useWords";
import useCountdownTimer from "./hooks/useCountdownTimer";

function App() {
  const [typed, setTyped] = useState("");
  const { words, updateWords } = useWords(12);
  const [errors, setErrors] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);

  const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(30);

  useEffect(() => {
    if (!timeLeft) {
      //  TODO: тут я должен сказать здарова, время вышло, вот твои результаты голова

      setTyped("");
      updateWords();
      resetCountdown();
      setErrors(0);
      setTotalTyped(0);
    }
  }, [resetCountdown, timeLeft, updateWords]);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      const allowed = isKeyboardAllowed(code);
      if (!allowed) {
        return;
      }
      if (typed.length === 0 && totalTyped === 0) {
        startCountdown();
      }
      switch (key) {
        case "Backspace":
          setTyped((typed) => typed.slice(0, -1));
          break;
        default:
          setTyped((typed) => typed.concat(key));
          break;
      }

      if (typed.length === words.length - 1) {
        setTyped("");
        updateWords();

        setErrors((prevErrors) => prevErrors + countErrors(typed, words) - 1);
        setTotalTyped((prevTotalTyped) => prevTotalTyped + typed.length);
      }
    },
    [startCountdown, totalTyped, typed, updateWords, words]
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
          total={totalTyped - errors}
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
          setTyped("");
          updateWords();
          resetCountdown();
          setErrors(0);
          setTotalTyped(0);
        }}
      />
    </div>
  );
}

export default App;
