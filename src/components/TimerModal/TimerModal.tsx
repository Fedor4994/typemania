import s from "./TimerModal.module.scss";

const TimerModal = ({ countDown }: { countDown: string }) => {
  return (
    <div className={s.backdrop}>
      <div className={s.timerModal}>
        Seconds left:{" "}
        <span className={s.timerNumber}>{Number(countDown) + 1}</span>
      </div>
    </div>
  );
};

export default TimerModal;
