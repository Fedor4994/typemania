import { TbSpace } from "react-icons/tb";
import Caret from "../Caret/Caret";
import s from "./UserTyping.module.css";
const UserTyping = ({
  userInput,
  words,
}: {
  userInput: string;
  words: string;
}) => {
  const typedCharacters = userInput.split("");

  const characterClassName = (actual: string, expected: string) => {
    const isCorrect = actual === expected;
    const isWhiteSpace = expected === " ";
    if (!isCorrect && !isWhiteSpace) {
      return s.redChar;
    } else if (isCorrect && !isWhiteSpace) {
      return s.yellowChar;
    } else {
      return s.spaceChar;
    }
  };

  return (
    <div className={s.userTyping}>
      {typedCharacters.map((char, index) =>
        words[index] === " " ? (
          <span className={s.spaceChar} key={`${char}_${index}`}>
            <TbSpace
              className={char === " " ? s.spaceIcon : s.redSpaceIcon}
              size={18}
            />
          </span>
        ) : (
          <span
            className={characterClassName(char, words[index])}
            key={`${char}_${index}`}
          >
            {words[index]}
          </span>
        )
      )}

      <Caret />
    </div>
  );
};

export default UserTyping;