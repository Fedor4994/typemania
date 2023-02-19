import { useState, useEffect } from "react";
import s from "./ThemeSwitcher.module.scss";

export type Theme =
  | "joker"
  | "aurora"
  | "cheesecake"
  | "orange"
  | "ukraine"
  | "matrix";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("joker");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (
      currentThemeColor === "joker" ||
      currentThemeColor === "aurora" ||
      currentThemeColor === "cheesecake" ||
      currentThemeColor === "orange" ||
      currentThemeColor === "ukraine" ||
      currentThemeColor === "matrix"
    ) {
      setTheme(currentThemeColor);
    }

    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleClick = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme-color", theme);
  };

  const isActive = (option: Theme): string => {
    if (theme === option) {
      return s.active;
    }
    return "";
  };

  return (
    <div className={s.themeOptions}>
      <div
        onClick={() => handleClick("joker")}
        className={`${s.themeJoker} ${isActive("joker")}`}
      />
      <div
        onClick={() => handleClick("matrix")}
        className={`${s.themeMatrix} ${isActive("matrix")}`}
      />
      <div
        onClick={() => handleClick("orange")}
        className={`${s.themeOrange} ${isActive("orange")}`}
      />
      <div
        onClick={() => handleClick("ukraine")}
        className={`${s.themeUkraine} ${isActive("ukraine")}`}
      />
      <div
        onClick={() => handleClick("cheesecake")}
        className={`${s.themeCheesecake} ${isActive("cheesecake")}`}
      />
      <div
        onClick={() => handleClick("aurora")}
        className={`${s.themeAurora} ${isActive("aurora")}`}
      />
    </div>
  );
};

export default ThemeSwitcher;
