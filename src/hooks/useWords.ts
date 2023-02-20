import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

const generateWords = (count: number) => {
  return faker.random.words(count).toLowerCase();
};

const useWords = () => {
  const [wordsCount, setWordsCount] = useState(25);
  const [words, setWords] = useState<string>(generateWords(wordsCount));

  const updateWords = () => setWords(generateWords(wordsCount));

  useEffect(() => {
    setWords(generateWords(wordsCount));
  }, [wordsCount]);

  return { words, updateWords, wordsCount, setWordsCount };
};

export default useWords;
