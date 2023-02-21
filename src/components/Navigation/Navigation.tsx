import { NavLink } from "react-router-dom";
import { FaClock, FaQuoteLeft } from "react-icons/fa";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import s from "./Navigation.module.scss";

export type CurrentPage = "time" | "words" | "quote";

const Navigation = ({
  currentPage,
  currentValue,
  onRestart,
  onChange,
}: {
  currentPage: CurrentPage;
  currentValue: number;
  onRestart: () => void;
  onChange: (seconds: number) => void;
}) => {
  const currentClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${s.navigationIcon} ${s.activeOption}` : s.navigationIcon;

  const handleChange = (value: number) => {
    onChange(value);
    onRestart();
  };

  return (
    <div className={s.navigation}>
      <ul className={s.navigationList}>
        <li>
          <NavLink to="/" className={currentClassName}>
            <FaClock size={16} />
            <span>Time</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={currentClassName} to="/words">
            <RiCharacterRecognitionFill size={18} />
            <span>Words</span>
          </NavLink>
        </li>
        <li>
          <NavLink className={currentClassName} to="/quote">
            <FaQuoteLeft size={16} />
            <span>Quote</span>
          </NavLink>
        </li>
      </ul>

      <div className={s.divider} />

      {currentPage === "time" && (
        <ul className={s.navigationList}>
          <li
            onClick={() => handleChange(15)}
            className={`${s.navigationIcon} ${
              currentValue === 15 ? s.activeOption : ""
            }`}
          >
            15
          </li>
          <li
            onClick={() => handleChange(30)}
            className={`${s.navigationIcon} ${
              currentValue === 30 ? s.activeOption : ""
            }`}
          >
            30
          </li>
          <li
            onClick={() => handleChange(60)}
            className={`${s.navigationIcon} ${
              currentValue === 60 ? s.activeOption : ""
            }`}
          >
            60
          </li>
          <li
            onClick={() => handleChange(120)}
            className={`${s.navigationIcon} ${
              currentValue === 120 ? s.activeOption : ""
            }`}
          >
            120
          </li>
        </ul>
      )}

      {currentPage === "words" && (
        <ul className={s.navigationList}>
          <li
            onClick={() => handleChange(10)}
            className={`${s.navigationIcon} ${
              currentValue === 10 ? s.activeOption : ""
            }`}
          >
            10
          </li>
          <li
            onClick={() => handleChange(25)}
            className={`${s.navigationIcon} ${
              currentValue === 25 ? s.activeOption : ""
            }`}
          >
            25
          </li>
          <li
            onClick={() => handleChange(50)}
            className={`${s.navigationIcon} ${
              currentValue === 50 ? s.activeOption : ""
            }`}
          >
            50
          </li>
          <li
            onClick={() => handleChange(100)}
            className={`${s.navigationIcon} ${
              currentValue === 100 ? s.activeOption : ""
            }`}
          >
            100
          </li>
        </ul>
      )}

      {currentPage === "quote" && (
        <ul className={s.navigationList}>
          <li
            onClick={() => handleChange(1)}
            className={`${s.navigationIcon} ${
              currentValue === 1 ? s.activeOption : ""
            }`}
          >
            All
          </li>
          <li
            onClick={() => handleChange(2)}
            className={`${s.navigationIcon} ${
              currentValue === 2 ? s.activeOption : ""
            }`}
          >
            Short
          </li>
          <li
            onClick={() => handleChange(3)}
            className={`${s.navigationIcon} ${
              currentValue === 3 ? s.activeOption : ""
            }`}
          >
            Medium
          </li>
          <li
            onClick={() => handleChange(4)}
            className={`${s.navigationIcon} ${
              currentValue === 4 ? s.activeOption : ""
            }`}
          >
            Long
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
