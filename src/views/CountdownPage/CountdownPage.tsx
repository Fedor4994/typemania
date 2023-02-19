import {
  calculateAccurancyPercentage,
  calculateWordsPerMinute,
} from "../../utils/helpers";

import { useTimerTyping } from "../../hooks/useTimerTyping";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import RestartButton from "../../components/RestartButton/RestartButton";
import Results from "../../components/Results/Results";
import UserTyping from "../../components/UserTyping/UserTyping";
import EscapeClue from "../../components/EscapeClue/EscapeClue";
import s from "./CountdownPage.module.scss";

const NUMBER_OF_WORDS = 30;
const COUNTDOWN_SECONDS = 30;

const CountdownPage = () => {
  const { errors, totalTyped, state, timeLeft, words, typed, onRestart } =
    useTimerTyping(NUMBER_OF_WORDS, COUNTDOWN_SECONDS);

  return (
    <div className={s.countdownPage}>
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
          width: "100%",
          wordBreak: "break-all",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GeneratedWords words={words} />
        <UserTyping words={words} userInput={typed} />
      </div>

      <RestartButton onRestart={onRestart} />
      <EscapeClue />
    </div>
  );
};

export default CountdownPage;
