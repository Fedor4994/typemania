import { useState, useEffect } from "react";
import wordsFile from "../data/words.json";

const generateWords = (count: number) => {
  const arrayOfWords: Array<String> = wordsFile.words;
  let generatedWords: Array<String> = [];
  for (let i = 0; i <= count; i++) {
    generatedWords.push(
      wordsFile.words[Math.floor(Math.random() * arrayOfWords.length)]
    );
  }
  return generatedWords.join(" ");
};

const useWords = () => {
  const [wordsCount, setWordsCount] = useState(50);
  const [words, setWords] = useState<string>(generateWords(wordsCount));

  const updateWords = () => setWords(generateWords(wordsCount));

  useEffect(() => {
    setWords(generateWords(wordsCount));
  }, [wordsCount]);

  return { words, updateWords, wordsCount, setWordsCount };
};

export default useWords;
