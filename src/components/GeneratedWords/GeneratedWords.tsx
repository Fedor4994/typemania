import s from "./GeneratedWords.module.css";

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className={s.generatedWords}>{words}</div>;
};

export default GeneratedWords;
