import { useState, useEffect } from "react";

const useCountdownTimer = () => {
  let initialSeconds: number | null = null;
  if (localStorage.getItem("timeOption")) {
    initialSeconds = Number(localStorage.getItem("timeOption"));
  }

  const [countdownSeconds, setCountdownSeconds] = useState(
    initialSeconds || 30
  );
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const [timeLeft, setTimeLeft] = useState<number>(countdownSeconds);

  const startCountdown = () => {
    setIntervalId(
      setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000)
    );
  };

  const resetCountdown = () => {
    clearInterval(intervalId);
    setTimeLeft(countdownSeconds);
  };

  useEffect(() => {
    setTimeLeft(countdownSeconds);
  }, [countdownSeconds]);

  return {
    timeLeft,
    startCountdown,
    resetCountdown,
    countdownSeconds,
    setCountdownSeconds,
  };
};

export default useCountdownTimer;
