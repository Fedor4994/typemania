import { useState, useRef, useEffect, useCallback } from "react";
import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import Navigation from "../../components/Navigation/Navigation";
import RestartButton from "../../components/RestartButton/RestartButton";
import Results from "../../components/Results/Results";
import UserTyping from "../../components/UserTyping/UserTyping";
import { State } from "../../hooks/useTimerTyping";
import useWords from "../../hooks/useWords";
import {
  calculateAccurancyPercentage,
  countErrors,
  isKeyboardAllowed,
} from "../../utils/helpers";
import s from "./WordsPage.module.scss";

const WordsPage = () => {
  const [typed, setTyped] = useState("");
  const [totalTyped, setTotalTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [state, setState] = useState<State>("start");

  const totalTypedRef = useRef(0);
  const { words, updateWords, wordsCount, setWordsCount } = useWords();

  useEffect(() => {
    // Finish group of words
    if (typed.length === words.length) {
      setTotalTyped(totalTypedRef.current);
      setErrors(countErrors(typed, words));
      setState("finish");
    }
  }, [typed, updateWords, words]);

  const onRestart = useCallback(() => {
    totalTypedRef.current = 0;

    setTyped("");
    updateWords();
    setTotalTyped(0);
    setErrors(0);
    setState("start");
  }, [updateWords]);

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
        setState("run");
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
    [onRestart, state]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return (
    <div className={s.wordsPage}>
      <Navigation
        currentPage="words"
        currentValue={wordsCount}
        onChange={setWordsCount}
        onRestart={onRestart}
      />
      <div className={s.typingArea}>
        <GeneratedWords words={words} />
        <UserTyping words={words} userInput={typed} />
      </div>

      <RestartButton onRestart={onRestart} />
      <Results
        accurancyPercentage={calculateAccurancyPercentage(errors, totalTyped)}
        errors={errors}
        speed={totalTyped}
        state={state}
      />
    </div>
  );
};

export default WordsPage;
