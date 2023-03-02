import { useState } from "react";
import s from "./SettingsPage.module.scss";

const SettingsPage = () => {
  const [isSound, setIsSound] = useState(
    localStorage.getItem("isSound") || "false"
  );

  return (
    <div className={s.settingPage}>
      <p>Sound</p>
      <div className={s.soundButtons}>
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
      </div>
    </div>
  );
};

export default SettingsPage;
