import { useState } from "react";
import { FaVolumeUp, FaLanguage } from "react-icons/fa";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import s from "./SettingsPage.module.scss";

export const languages = [
  "english",
  "ukrainian",
  "russian",
  "javascript",
  "twitch emotes",
];

const SettingsPage = () => {
  const [isSound, setIsSound] = useState(
    localStorage.getItem("isSound") || "false"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );

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
    </div>
  );
};

export default SettingsPage;
