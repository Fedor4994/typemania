import { useRef, useState } from "react";

const useStopwatch = () => {
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
  const seconds = useRef(0);

  const startStopwatch = () => {
    setIntervalId(
      setInterval(() => {
        seconds.current += 1;
      }, 1000)
    );
  };

  const resetStopwatch = () => {
    clearInterval(intervalId);
    if (seconds.current !== 0) {
      setSecondsPassed(seconds.current);
    }
    seconds.current = 0;
  };

  return {
    secondsPassed,
    startStopwatch,
    resetStopwatch,
  };
};

export default useStopwatch;
