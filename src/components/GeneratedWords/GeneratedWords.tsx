import { TbSpace } from "react-icons/tb";
import s from "./GeneratedWords.module.scss";

const GeneratedWords = ({ words }: { words: string }) => {
  return (
    <div className={s.generatedWords}>
      {words.split("").map((char, index) => {
        if (char === " ") {
          return (
            <span className={s.space} key={`${char}_${index}`}>
              <TbSpace className={s.spaceIcon} size={16} />
            </span>
          );
        } else {
          return <span key={`${char}_${index}`}>{char}</span>;
        }
      })}
    </div>
  );
};

export default GeneratedWords;
