import s from "./Source.module.scss";

const Source = ({ text }: { text: string }) => {
  return <span className={s.source}>— {text}</span>;
};

export default Source;
