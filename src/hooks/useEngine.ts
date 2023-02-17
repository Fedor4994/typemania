// import { useCallback, useEffect, useState } from "react";
// import { countErrors } from "../utils/helpers";
// import useCountdownTimer from "./useCountdownTimer";
// import useTyping from "./useTyping";
// import useWords from "./useWords";

// export type State = "start" | "run" | "finish";

// const NUMBER_OF_WORDS = 12;
// const COUNTDOWN_SECONDS = 30;

// const useEngine = () => {
//   const [state, setState] = useState<State>("start");
//   const [errors, setErrors] = useState(0);
//   const [total, setTotal] = useState(0);
//   const { words, updateWords } = useWords(NUMBER_OF_WORDS);
//   const { timeLeft, resetCountdown, startCountdown } =
//     useCountdownTimer(COUNTDOWN_SECONDS);
//   const { typed, totalTyped, cursor, clearTyped, clearTotalTyped } = useTyping(
//     state !== "finish"
//   );

//   const sumErrors = useCallback(() => {
//     const exprectedWords = words.substring(0, cursor);
//     setErrors((prevErrors) => prevErrors + countErrors(typed, exprectedWords));
//   }, [cursor, typed, words]);

//   const isStarting = state === "start" && cursor > 0;
//   const areWordsFinished = cursor === words.length;

//   useEffect(() => {
//     if (cursor === 0) {
//       setState("start");
//     }
//     if (isStarting) {
//       setState("run");
//       startCountdown();
//     }
//   }, [cursor, isStarting, startCountdown]);

//   useEffect(() => {
//     if (!timeLeft) {
//       setErrors(0);
//       setTotal(0);
//       resetCountdown();
//       updateWords();
//       clearTyped();
//       sumErrors();
//       setTotal(totalTyped.current);
//       clearTotalTyped();
//       setState("finish");
//     }
//   }, [
//     timeLeft,
//     resetCountdown,
//     sumErrors,
//     updateWords,
//     clearTyped,
//     clearTotalTyped,
//     totalTyped,
//   ]);

//   useEffect(() => {
//     if (areWordsFinished) {
//       sumErrors();
//       updateWords();
//       clearTyped();
//     }
//   }, [areWordsFinished, clearTyped, sumErrors, updateWords]);

//   const restart = () => {
//     updateWords();
//     clearTyped();
//     clearTotalTyped();
//     resetCountdown();

//     setState("finish");
//   };

//   return { state, words, timeLeft, typed, total, errors, restart };
// };

// export default useEngine;
export const a = 5;
