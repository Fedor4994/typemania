// import { useEffect, useState } from "react";

// const useCountdownTimer = (seconds: number) => {
//   const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
//   const [timeLeft, setTimeLeft] = useState<number>(seconds);

//   const startCountdown = () => {
//     setIntervalId(
//       setInterval(() => {
//         setTimeLeft((timeLeft) => timeLeft - 1);
//       }, 1000)
//     );
//   };

//   const resetCountdown = () => {
//     if (intervalId) {
//       clearInterval(intervalId);
//       console.log("hello");
//     }
//     setTimeLeft(seconds);
//   };

//   useEffect(() => {
//     if (!timeLeft && intervalId) {
//       clearInterval(intervalId);
//     }
//   }, [intervalId, timeLeft]);

//   return { timeLeft, startCountdown, resetCountdown };
// };

// export default useCountdownTimer;
export const a = 5;
