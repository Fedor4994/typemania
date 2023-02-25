import GeneratedWords from "../../components/GeneratedWords/GeneratedWords";
import Navigation from "../../components/Navigation/Navigation";
import NextButton from "../../components/NextButton/NextButton";
import RestartButton from "../../components/RestartButton/RestartButton";
import UserTyping from "../../components/UserTyping/UserTyping";
import { useStopwatchTyping } from "../../hooks/useStopwatchTyping";

import s from "./WordsPage.module.scss";

const WordsPage = () => {
  const { wordsCount, setWordsCount, updateWords, onRestart, words, typed } =
    useStopwatchTyping();

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

      <div className={s.buttonsWrapper}>
        <RestartButton onRestart={onRestart} />
        <NextButton
          handleNextTest={() => {
            onRestart();
            updateWords();
          }}
        />
      </div>

      {/* <Results
        accurancyPercentage={calculateAccurancyPercentage(errors, totalTyped)}
        errors={errors}
        speed={calculateWordsPerMinute(totalTyped - errors, secondsPassed)}
        state={state}
      /> */}
    </div>
  );
};

export default WordsPage;
