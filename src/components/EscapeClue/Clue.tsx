import { useLocation } from "react-router-dom";
import s from "./Clue.module.scss";

const Clue = ({
  keyboardButton,
  text,
}: {
  keyboardButton: string;
  text: string;
}) => {
  const location = useLocation();
  const isTypingPage =
    location.pathname === "/" ||
    location.pathname === "/words" ||
    location.pathname === "/quote";

  if (!isTypingPage) {
    return null;
  }

  return (
    <div className={s.clue}>
      <span className={s.key}>{keyboardButton}</span> - {text}
    </div>
  );
};

export default Clue;
