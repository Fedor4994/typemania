import { useCallback, useEffect, useState } from "react";
import CountdownTimer from "./components/CountdownTimer/CountdownTimer";
import GeneratedWords from "./components/GeneratedWords/GeneratedWords";
import RestartButton from "./components/RestartButton/RestartButton";
import Results from "./components/Results/Results";
import UserTyping from "./components/UserTyping/UserTyping";
import {
  calculateAccurancyPercentage,
  isKeyboardAllowed,
} from "./utils/helpers";
import useWords from "./hooks/useWords";

function App() {
  const [typed, setTyped] = useState("");
  const { words, updateWords } = useWords(12);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      const allowed = isKeyboardAllowed(code);
      if (!allowed) {
        return;
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
      }
    },
    [typed.length, updateWords, words.length]
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
          accurancyPercentage={calculateAccurancyPercentage(0, 0)}
          errors={0}
          total={0}
        />
        <CountdownTimer timeLeft={30} />
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

      <RestartButton onRestart={() => {}} />
    </div>
  );
}

export default App;
