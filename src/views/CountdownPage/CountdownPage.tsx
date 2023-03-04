import { useTimerTyping } from "../../hooks/useTimerTyping";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import RestartButton from "../../components/RestartButton/RestartButton";
import UserTyping from "../../components/UserTyping/UserTyping";
import s from "./CountdownPage.module.scss";
import Navigation from "../../components/Navigation/Navigation";
import NextButton from "../../components/NextButton/NextButton";
import AnimatedPage from "../../components/AnimatedPage";
import LanguageSelect from "../../components/LanguageSelect/LanguageSelect";

const CountdownPage = () => {
  const {
    timeLeft,
    countdownSeconds,
    words,
    typed,
    setCountdownSeconds,
    onRestart,
    updateWords,
  } = useTimerTyping();

  return (
    <div className={s.countdownPage}>
      <Navigation
        currentPage="time"
        currentValue={countdownSeconds}
        onChange={setCountdownSeconds}
        onRestart={onRestart}
      />
      <div className={s.timerWrapper}>
        <CountdownTimer timeLeft={timeLeft} />
        <LanguageSelect updateWords={updateWords} />
      </div>
      <AnimatedPage>
        <>
          <div className={s.typingArea}>
            <GeneratedWords words={words} />
            <UserTyping words={words} userInput={typed} />
          </div>

          <div className={s.buttonsWrapper}>
            <RestartButton onRestart={onRestart} />
            <NextButton
              handleNextTest={() => {
                onRestart();
                updateWords();
              }}
            />
          </div>
        </>
      </AnimatedPage>
    </div>
  );
};

export default CountdownPage;
