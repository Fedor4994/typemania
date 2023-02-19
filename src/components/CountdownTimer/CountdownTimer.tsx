import s from "./CountdownTimer.module.scss";

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className={s.countdownTimer}>Time: {timeLeft}</h2>;
};

export default CountdownTimer;
