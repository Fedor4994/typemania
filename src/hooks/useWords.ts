import { useState, useEffect } from "react";
import englishWordsFile from "../data/englishWords.json";
import russianWordsFile from "../data/russianWords.json";
import ukrainianWordsFile from "../data/ukrainianWords.json";

const generateWords = (count: number) => {
  let arrayOfWords: Array<String> = [];
  const language = localStorage.getItem("language");

  switch (language) {
    case "english":
      arrayOfWords = englishWordsFile.words;
      break;
    case "russian":
      arrayOfWords = russianWordsFile.words;
      break;
    case "ukrainian":
      arrayOfWords = ukrainianWordsFile.words;
      break;
    default:
      arrayOfWords = englishWordsFile.words;
      break;
  }

  let generatedWords: Array<String> = [];
  for (let i = 0; i <= count; i++) {
    generatedWords.push(
      arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)]
    );
  }
  return generatedWords.join(" ");
};

const useWords = (optionalCount?: number) => {
  let initialWords: number | null = null;
  if (localStorage.getItem("wordsOption")) {
    initialWords = Number(localStorage.getItem("wordsOption"));
  }

  const [wordsCount, setWordsCount] = useState(
    optionalCount || initialWords || 50
  );
  const [words, setWords] = useState<string>(generateWords(wordsCount));

  const updateWords = () => setWords(generateWords(wordsCount));

  useEffect(() => {
    setWords(generateWords(wordsCount));
  }, [wordsCount]);

  return { words, updateWords, wordsCount, setWordsCount };
};

export default useWords;
