import { useRef } from "react";
import { MdRefresh } from "react-icons/md";
import s from "./RestartButton.module.css";

const RestartButton = ({ onRestart }: { onRestart: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    onRestart();
  };
  return (
    <button ref={buttonRef} className={s.restartButton} onClick={handleClick}>
      <MdRefresh size={30} />
    </button>
  );
};

export default RestartButton;
