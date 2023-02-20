import { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import s from "./WordsPage.module.scss";

const WordsPage = () => {
  const [wordsCount, setWordsCount] = useState(25);

  return (
    <div className={s.wordsPage}>
      <Navigation
        currentPage="words"
        currentValue={wordsCount}
        onChange={setWordsCount}
      />
      <h1>WORDS PAGE</h1>
    </div>
  );
};

export default WordsPage;
