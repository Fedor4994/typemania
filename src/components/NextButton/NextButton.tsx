import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import s from "./NextButton.module.scss";

const NextButton = ({ handleNextTest }: { handleNextTest: () => void }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleNextTest();
  };

  return (
    <button
      tabIndex={-1}
      ref={buttonRef}
      className={s.nextButton}
      onClick={handleClick}
    >
      <FaArrowRight size={24} />
    </button>
  );
};

export default NextButton;
