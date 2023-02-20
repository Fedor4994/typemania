import { useLocation } from "react-router-dom";
import s from "./EscapeClue.module.scss";

const EscapeClue = () => {
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
      <span className={s.key}>Escape</span> - restart test
    </div>
  );
};

export default EscapeClue;
