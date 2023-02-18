import { useState } from "react";
import s from "./ThemeSwitcher.module.scss";

export type Theme = "white" | "blue" | "green" | "orange" | "purple" | "black";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("purple");

  const isActive = (option: Theme): string => {
    if (theme === option) {
      return s.active;
    }
    return "";
  };

  return (
    <div className={s.themeOptions}>
      <div
        onClick={() => setTheme("black")}
        className={`${s.themeblack} ${isActive("black")}`}
      />
      <div
        onClick={() => setTheme("white")}
        className={`${s.themewhite} ${isActive("white")}`}
      />
      <div
        onClick={() => setTheme("blue")}
        className={`${s.themeblue} ${isActive("blue")}`}
      />
      <div
        onClick={() => setTheme("orange")}
        className={`${s.themeorange} ${isActive("orange")}`}
      />
      <div
        onClick={() => setTheme("purple")}
        className={`${s.themepurple} ${isActive("purple")}`}
      />
      <div
        onClick={() => setTheme("green")}
        className={`${s.themegreen} ${isActive("green")}`}
      />
    </div>
  );
};

export default ThemeSwitcher;
