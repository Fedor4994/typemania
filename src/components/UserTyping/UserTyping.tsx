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
    } else if (!isCorrect && isWhiteSpace) {
      return s.spaceRedChar;
    } else {
      return s.spaceChar;
    }
  };

  return (
    <div className={s.userTyping}>
      {typedCharacters.map((char, index) => (
        <span
          className={characterClassName(char, words[index])}
          key={`${char}_${index}`}
        >
          {words[index]}
        </span>
      ))}
      <Caret />
    </div>
  );
};

export default UserTyping;
