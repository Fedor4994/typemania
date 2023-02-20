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
import s from "./CountdownPage.module.scss";
import Navigation from "../../components/Navigation/Navigation";

const CountdownPage = () => {
  const {
    errors,
    totalTyped,
    state,
    timeLeft,
    countdownSeconds,
    words,
    typed,
    setCountdownSeconds,
    onRestart,
  } = useTimerTyping();

  return (
    <div className={s.countdownPage}>
      <Navigation
        currentPage="time"
        currentValue={countdownSeconds}
        onChange={setCountdownSeconds}
        onRestart={onRestart}
      />
      <CountdownTimer timeLeft={timeLeft} />

      <div className={s.typingArea}>
        <GeneratedWords words={words} />
        <UserTyping words={words} userInput={typed} />
      </div>

      <RestartButton onRestart={onRestart} />
      <Results
        accurancyPercentage={calculateAccurancyPercentage(errors, totalTyped)}
        errors={errors}
        speed={calculateWordsPerMinute(totalTyped - errors, countdownSeconds)}
        state={state}
      />
    </div>
  );
};

export default CountdownPage;
