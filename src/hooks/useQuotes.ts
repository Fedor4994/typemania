import { useEffect, useState } from "react";
import quotesFile from "../data/quotes.json";

export type Quote = {
  id: number;
  length: number;
  source: string;
  text: string;
};

export type QuoteLength = "short" | "medium" | "long" | "all";
const arrayOfQuotes: Array<Quote> = quotesFile.quotes;

const generatQuotes = (length: QuoteLength) => {
  let randomQuote =
    arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)];
  let arr: Array<Quote> = [];
  switch (length) {
    case "short":
      arr = arrayOfQuotes.filter((quote) => quote.length <= 150);
      return arr[Math.floor(Math.random() * arr.length)];
    case "medium":
      arr = arrayOfQuotes.filter(
        (quote) => quote.length > 150 && quote.length <= 300
      );
      return arr[Math.floor(Math.random() * arr.length)];
    case "long":
      arr = arrayOfQuotes.filter((quote) => quote.length > 300);
      return arr[Math.floor(Math.random() * arr.length)];

    case "all":
      return randomQuote;
  }
};

export const useQuotes = () => {
  const [quoteLength, setQuoteLength] = useState<QuoteLength>("short");
  const [currentQuote, setCurrentQuote] = useState<Quote>(
    generatQuotes(quoteLength)
  );

  const updateQuotes = () => setCurrentQuote(generatQuotes(quoteLength));

  useEffect(() => {
    setCurrentQuote(generatQuotes(quoteLength));
  }, [quoteLength]);

  return { currentQuote, updateQuotes, setQuoteLength };
};
