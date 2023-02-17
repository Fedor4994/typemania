import { useState } from "react";

const useCountdownTimer = (seconds: number) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  const startCountdown = () => {
    setIntervalId(
      setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000)
    );
  };

  const resetCountdown = () => {
    clearInterval(intervalId);
    setTimeLeft(seconds);
  };

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdownTimer;
