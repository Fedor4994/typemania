import { useRef } from "react";
import { MdRefresh } from "react-icons/md";
import s from "./RestartButton.module.scss";

const RestartButton = ({ onRestart }: { onRestart: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    onRestart();
  };
  return (
    <button
      tabIndex={-1}
      ref={buttonRef}
      className={s.restartButton}
      onClick={handleClick}
    >
      <MdRefresh size={30} />
    </button>
  );
};

export default RestartButton;
