import { useEffect, useState } from "react";
import quotesFile from "../data/quotes.json";

export type Quote = {
  id: number;
  length: number;
  source: string;
  text: string;
};

export const useQuotes = () => {
  const [index, setIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState<Quote>();
  const arrayOfQuotes: Array<Quote> = quotesFile.quotes;

  useEffect(() => {
    if (!currentQuote) {
      setIndex(Math.floor(Math.random() * arrayOfQuotes.length));
    }

    if (arrayOfQuotes[index].length <= 150) {
      setCurrentQuote(arrayOfQuotes[index]);
      console.log(arrayOfQuotes[index]);
      return;
    } else {
      setIndex(Math.floor(Math.random() * arrayOfQuotes.length));
    }
  }, [arrayOfQuotes, currentQuote, index]);
};
