import { useRef } from "react";
import { FaRedo } from "react-icons/fa";
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
      <FaRedo size={24} />
    </button>
  );
};

export default RestartButton;
