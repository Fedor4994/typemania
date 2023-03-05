import { useState, useEffect } from "react";
import {
  FaVolumeUp,
  FaLanguage,
  FaPalette,
  FaFont,
  FaICursor,
} from "react-icons/fa";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import s from "./SettingsPage.module.scss";
import { Theme } from "../../components/ThemeSwitcher/ThemeSwitcher";

export const languages = [
  "english",
  "ukrainian",
  "russian",
  "javascript",
  "twitch emotes",
];

export const themes = [
  "joker",
  "aurora",
  "cheesecake",
  "orange",
  "ukraine",
  "matrix",
];

export const fonts = [
  "Ubuntu Mono",
  "Coming Soon",
  "JetBrains Mono",
  "Caveat",
  "Advent Pro",
];

const SettingsPage = () => {
  const [isSound, setIsSound] = useState(
    localStorage.getItem("isSound") || "false"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );

  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme-color") as Theme) || "joker"
  );

  const [font, setFont] = useState(
    localStorage.getItem("font-family") || "Ubuntu Mono"
  );

  const [caretStyle, setCaretStyle] = useState(
    localStorage.getItem("caret-style") || "thin"
  );

  useEffect(() => {
    document.body.setAttribute("data-font", font);
  }, [font]);

  return (
    <div className={s.settingPage}>
      <div className={s.settingsWrapper}>
        <div className={s.settingsTitleWraper}>
          <div className={s.settingsTitle}>
            <FaVolumeUp />
            <p>play sound on click</p>
          </div>
          <p className={s.settingsSubTitle}>
            Plays a short sound when you press a key.
          </p>
        </div>
        <div className={s.settingsButtons}>
          <button
            className={`${s.settingsButton} ${
              isSound === "false" ? s.activeButton : ""
            }`}
            onClick={() => {
              setIsSound("false");
              localStorage.setItem("isSound", "false");
            }}
          >
            OFF
          </button>
          <button
            className={`${s.settingsButton} ${
              isSound === "true" ? s.activeButton : ""
            }`}
            onClick={() => {
              setIsSound("true");
              localStorage.setItem("isSound", "true");
            }}
          >
            ON
          </button>
        </div>
      </div>

      <div className={s.settingsWrapper}>
        <div className={s.settingsTitleWraper}>
          <div className={s.settingsTitle}>
            <FaFont />
            <p>font-family</p>
          </div>
          <p className={s.settingsSubTitle}>
            Set the font-style of the application's text.
          </p>
        </div>
        <Dropdown
          controlClassName={s.dropdownInput}
          menuClassName={s.dropdown}
          arrowClassName={s.arrow}
          options={fonts}
          onChange={(option) => {
            setFont(option.value as Theme);
            localStorage.setItem("font-family", option.value);
          }}
          value={font}
          placeholder="Select a font"
        />
      </div>

      <div className={s.settingsWrapper}>
        <div className={s.settingsTitleWraper}>
          <div className={s.settingsTitle}>
            <FaICursor />
            <p>caret style</p>
          </div>
          <p className={s.settingsSubTitle}>
            Change the style of the caret during the test.
          </p>
        </div>
        <div className={s.settingsButtons}>
          <button
            className={`${s.settingsSmallButton} ${
              caretStyle === "off" ? s.activeButton : ""
            }`}
            onClick={() => {
              setCaretStyle("off");
              localStorage.setItem("caret-style", "off");
            }}
          >
            off
          </button>
          <button
            className={`${s.settingsSmallButton} ${
              caretStyle === "thin" ? s.activeButton : ""
            }`}
            onClick={() => {
              setCaretStyle("thin");
              localStorage.setItem("caret-style", "thin");
            }}
          >
            |
          </button>
          <button
            className={`${s.settingsSmallButton} ${
              caretStyle === "filled" ? s.activeButton : ""
            }`}
            onClick={() => {
              setCaretStyle("filled");
              localStorage.setItem("caret-style", "filled");
            }}
          >
            ▮
          </button>
          <button
            className={`${s.settingsSmallButton} ${
              caretStyle === "outlined" ? s.activeButton : ""
            }`}
            onClick={() => {
              setCaretStyle("outlined");
              localStorage.setItem("caret-style", "outlined");
            }}
          >
            ▯
          </button>
          <button
            className={`${s.settingsSmallButton} ${
              caretStyle === "underline" ? s.activeButton : ""
            }`}
            onClick={() => {
              setCaretStyle("underline");
              localStorage.setItem("caret-style", "underline");
            }}
          >
            _
          </button>
        </div>
      </div>

      <div className={s.settingsWrapper}>
        <div className={s.settingsTitleWraper}>
          <div className={s.settingsTitle}>
            <FaLanguage />
            <p>language</p>
          </div>
          <p className={s.settingsSubTitle}>
            Change in which language you want to type.
          </p>
        </div>
        <Dropdown
          controlClassName={s.dropdownInput}
          menuClassName={s.dropdown}
          arrowClassName={s.arrow}
          options={languages}
          onChange={(option) => {
            setLanguage(option.value);
            localStorage.setItem("language", option.value);
          }}
          value={language}
          placeholder="Select an language"
        />
      </div>

      <div className={s.settingsWrapper}>
        <div className={s.settingsTitleWraper}>
          <div className={s.settingsTitle}>
            <FaPalette />
            <p>theme</p>
          </div>
          <p className={s.settingsSubTitle}>
            Set the color theme of the application.
          </p>
        </div>
        <Dropdown
          controlClassName={s.dropdownInput}
          menuClassName={s.dropdown}
          arrowClassName={s.arrow}
          options={themes}
          onChange={(option) => {
            setTheme(option.value as Theme);
            localStorage.setItem("theme-color", option.value);
            document.body.setAttribute("data-theme", option.value);
          }}
          value={theme}
          placeholder="Select an theme"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
