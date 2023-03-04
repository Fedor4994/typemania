import { useState, useEffect } from "react";
import { FaPalette } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import s from "./ThemeSwitcher.module.scss";

export type Theme =
  | "joker"
  | "aurora"
  | "cheesecake"
  | "orange"
  | "ukraine"
  | "matrix";

const ThemeSwitcher = () => {
  const localStorageTheme = localStorage.getItem("theme-color") as Theme;

  const [theme, setTheme] = useState<Theme>(localStorageTheme || "joker");

  useEffect(() => {
    setTheme((localStorage.getItem("theme-color") as Theme) || "joker");
  }, [localStorageTheme]);

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

  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  return (
    <>
      <motion.div
        onHoverStart={toggleHoverMenu}
        onHoverEnd={toggleHoverMenu}
        className={s.dropdown}
      >
        <AnimatePresence>
          <motion.ul
            initial={{
              opacity: 0,
              display: "none",
            }}
            animate={
              isHover
                ? {
                    opacity: 1,
                    display: "flex",
                  }
                : {
                    opacity: 0,
                    display: "none",
                  }
            }
            exit={{
              opacity: 0,
              display: "none",
            }}
            className={s.dropdownContent}
          >
            <motion.li>
              <div
                onClick={() => handleClick("joker")}
                className={`${s.themeJoker} ${isActive("joker")}`}
              />
            </motion.li>
            <motion.li>
              <div
                onClick={() => handleClick("matrix")}
                className={`${s.themeMatrix} ${isActive("matrix")}`}
              />
            </motion.li>
            <motion.li>
              <div
                onClick={() => handleClick("orange")}
                className={`${s.themeOrange} ${isActive("orange")}`}
              />
            </motion.li>

            <motion.li>
              <div
                onClick={() => handleClick("ukraine")}
                className={`${s.themeUkraine} ${isActive("ukraine")}`}
              />
            </motion.li>
            <motion.li>
              <div
                onClick={() => handleClick("cheesecake")}
                className={`${s.themeCheesecake} ${isActive("cheesecake")}`}
              />
            </motion.li>
            <motion.li>
              <div
                onClick={() => handleClick("aurora")}
                className={`${s.themeAurora} ${isActive("aurora")}`}
              />
            </motion.li>
          </motion.ul>
        </AnimatePresence>
        <FaPalette size={22} className={s.dropbtn} />
      </motion.div>
    </>
  );
};

export default ThemeSwitcher;
