import s from "./ProgressBar.module.scss";

const calculate = (wordIndex: number, words: string) => {
  return ((wordIndex / words.length) * 100).toFixed(2) + "%";
};

const ProgressBar = ({
  wordIndex,
  words,
}: {
  wordIndex: number;
  words: string;
}) => {
  const percentage = calculate(wordIndex, words);
  return (
    <div className={s.progressBar}>
      <div
        style={{
          width: percentage,
          height: 30,
          background: "var(--table-color)",
          borderRadius: 7,
          padding: 5,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <p className={s.progressText}>{percentage}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
